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
import { PrismaService } from "src/common/database/prisma/prisma.service";
import Logger from "src/common/logger/logger";
import { ToolboxAcronym } from "src/common/constants/app.constants";
import { GetSubjectDto } from "./dtos/get-subject.dto";

const FilterFields = {
  firstName: "FIRST_NAME",
  lastName: "LAST_NAME",
  dob: "DOB",
  phn: "PHN",
  clinetId: "CLIENT_ID"
}

@Injectable()
export class SubjectService {
  
  constructor(
    private prisma: PrismaService,
    private logger: Logger,
  ) {
    logger.setContext(SubjectService.name);
  }

  createSubjectFilter(getSubjectDto: GetSubjectDto): any { 
    const filters = []

    for (const [fieldKey, fieldName] of Object.entries(FilterFields)) {
      if (getSubjectDto.hasOwnProperty(fieldKey) && getSubjectDto[fieldKey]) {
        filters.push({
          fieldName: fieldName,
          value: getSubjectDto[fieldKey]
        })
      }
    }

    return filters;

  }

  async getSubjectByAcronym(getSubjectDto: GetSubjectDto): Promise<any[]> {
    /*
      API - /api/subjects/search
      Method - GET
      Params - 
      {
        acronym: "YOUTH_SD.1",
        centreID: "REAL",
        sortField: "SUBJECT_ID",
        sortDirection: "DESC",
        sortField ?: "SUBJECT_ID",
        sortDirection ?: "ASC",
        maxResults ?: 10,
        filters:
        [
          { fieldName: "MENTAL_HEALTH_SERVICES", value: [2, 3]},
          { fieldName: "PHN", value: "1234567891", comparison: 0 -> "
            0: Equal
            1: Greather than
            2: Less than
            3: Greather than or equal
            4: Less than or equal
            5: Contains 
          
          "},
        ]
      }
    */

    const username = process.env.DACIMA_API_USER_NAME;
    const password = process.env.DACIMA_API_PASSWORD;
    if (!username || !password) {
      throw new HttpException('Username and password are required', HttpStatus.BAD_REQUEST);
    }
    const DACIMA_FOUNDARY_URL = process.env.DACIMA_FOUNDARY_URL;
    const filter = this.createSubjectFilter(getSubjectDto);
    
    const serachFields = await axios.post(`${DACIMA_FOUNDARY_URL}/api/subjects/search`, {
      acronym: ToolboxAcronym.Youth,
      centreID: getSubjectDto.centreID,
      filters: filter
    },
    {
      auth: {
        username: username,
        password: password,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return serachFields.data;
  }

  async getSearchFields(): Promise<any[]> {
    /*
      API - /api/subjects/availableSearchFields 
      Method - GET
      Params - 
      {
        acronym: "DEMO.50"
      }
    */

    const username = process.env.DACIMA_API_USER_NAME;
    const password = process.env.DACIMA_API_PASSWORD;
    if (!username || !password) {
      throw new HttpException('Username and password are required', HttpStatus.BAD_REQUEST);
    }
    const DACIMA_FOUNDARY_URL = process.env.DACIMA_FOUNDARY_URL;
    
    const serachFields = await axios.get(`${DACIMA_FOUNDARY_URL}/api/subjects/availableSearchFields`, {
      acronym: ToolboxAcronym.Youth
    },
    {
      auth: {
        username: username,
        password: password,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return serachFields.data;
  }

}
