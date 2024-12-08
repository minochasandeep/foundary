import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { parseStringPromise } from 'xml2js';
const axios = require('axios');
import { Prisma, Survey, User } from ".prisma/client";
import { GetSurveyCenterSubjectDto } from './dtos/get-survey-center-subject.dto';

import { ViewUserDto } from "./dtos/view-survey.dto";
import { PrismaService } from "src/common/database/prisma/prisma.service";
import { PagedRequest } from "src/common/utils/pagination/dtos/paged-request.dto";
import {
  IPaginationResult,
  paginate,
} from "src/common/utils/pagination/pagination";
import Logger from "src/common/logger/logger";
// import { RequestUserProvider } from "src/common/authentication/request-user.provider";
// import { UserOrganizationService } from "../user-organizations/user-organizations.service";
// import { OrganizationFilter } from "src/common/filter/filter.service";

enum ToolboxSurvayForms {
  Registration = 'REGISTRATION',
  Demographic = 'DEMOGRAPHIC',
  ServiceRequest = 'SERVICE_REQUEST',
  StartVisit = 'START_VISIT',
  ORS = 'ORS',
  POST_ORS = 'POST_ORS',
  SRS = 'SRS',
  SU5Q = 'SU_5Q',
  EndVisit = 'END_VISIT_REDESIGN',
  EndVisitCaregiver = 'END_VISIT',
  PG_Engagement = 'PG_ENGAGEMENT',
  PG_Family = 'PG_FAMILY',
  PG_Gendercare = 'PG_GENDERCARE',
  FCC_Walkin = 'FCC_WALKIN',
  Penticton_Walkin = 'PENTICTON_WALKIN',
  InspireO = 'INSPIRE_O',
  K10 = 'K10',
}


interface SurveyToken {
    token:        string;
    subjectId:   string;
    acronym:     string;
    formOcc:     number;
    formCode:    string;
    visitOcc:    number;
    visitID :    number;
    centreID:    string;
    status  :    string;
    expiryDate: Date;
    // createdAt: Date;
    // updatedAt: Date;
  }
  


@Injectable()
export class SurveyService {
  
  constructor(
    private prisma: PrismaService,
    // private readonly organizationFilter: OrganizationFilter,
    // private readonly userOrganizationService: UserOrganizationService,
    private logger: Logger,
    // private readonly userProvider: RequestUserProvider,
  ) {
    logger.setContext(SurveyService.name);
  }

  async getSurvey(
  ): Promise<Survey[]> {
    try {
      return this.prisma.survey.findMany();
    } catch (error) {
      this.logger.error(error);

      throw new HttpException(error, 500);
    }
  }

  async initiateSurvey(surveydata:SurveyToken): Promise<string> {
    try {
      const data = {
        ...surveydata,
      };

      await this.prisma.survey.create({ data: surveydata });

      return 'Survey initiated successfully';
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(error, 500);
    }
  }


  async getAllCenters(): Promise<any[]> {
    const username = process.env.DACIMA_API_USER_NAME;
    const password = process.env.DACIMA_API_PASSWORD;
    if (!username || !password) {
      throw new HttpException('Username and password are required', HttpStatus.BAD_REQUEST);
    }
    const DACIMA_FOUNDARY_URL = process.env.DACIMA_FOUNDARY_URL;

    const centers = await axios.post(`${DACIMA_FOUNDARY_URL}/api/odm/generateMeta`, {
      acronym: "YOUTH_SD.1",
      generateAdminData: true,
    },{auth: {
      username: username,
      password: password,
    },
    headers: {
      'Content-Type': 'application/json',
    },});

    const parsedXml = await this.parseXml(centers.data.odm);
    const locations = parsedXml.ODM.AdminData.User
      .filter((user) => user.LoginName === username)
      .flatMap((user) => user.LocationRef || [])
      .map((location) => location.$.LocationOID);

    return locations;

    
  }

  async getAllSubjectsByCenter(getSurveyCenterSubjectDto: GetSurveyCenterSubjectDto): Promise<any> {
    const username = process.env.DACIMA_API_USER_NAME;
    const password = process.env.DACIMA_API_PASSWORD;
    if (!username || !password) {
      throw new HttpException('Username and password are required', HttpStatus.BAD_REQUEST);
    }
    const DACIMA_FOUNDARY_URL = process.env.DACIMA_FOUNDARY_URL;

    const inputParams = {
      acronym: "YOUTH_SD.1",
      centreID: getSurveyCenterSubjectDto.centreID,
      // filters: getSurveyCenterSubjectDto.filters? getSurveyCenterSubjectDto.filters : [],
      filters: [{ fieldName: 'CENTRE_ID', value: getSurveyCenterSubjectDto.centreID }],
    };
 
    console.log("inputParams",inputParams);
    const subjects = await axios.post(`${DACIMA_FOUNDARY_URL}/api/subjects/search`, inputParams,{auth: {
      username: username,
      password: password,
    },
    headers: {
      'Content-Type': 'application/json',
    },});
    
    console.log("subjects",subjects);

    return subjects.data;
  }

  private async parseXml(xml: string): Promise<any> {
    if (!xml || !xml.trim().startsWith('<')) {
      throw new Error('Invalid XML response');
    }
    return parseStringPromise(xml, {
      explicitArray: false,
      tagNameProcessors: [(name) => name.replace(/^.*:/, '')],
    });
  }

  
  async getSurveyForms(): Promise<string[]>  {
    return Object.values(ToolboxSurvayForms);
  }
}
