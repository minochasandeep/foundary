import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Prisma, Survey, User } from ".prisma/client";
// import { CreateSurveyDto, CreateUserDto } from "./dtos/create-survey.dto";
// import { UpdateUsertDto } from "./dtos/update-survey.dto";
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


interface SurveyToken {
  token: string;
  user_id: number;
  expiry_date: Date;
  created_at: Date;
  updated_at: Date;
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

  async createSurvey(surveydata:SurveyToken): Promise<string> {
    // console.log("===========>",data);
    try {
      // delete surveydata.user_id;
      const data = {
        ...surveydata,
        
      };

      await this.prisma.survey.create({ data: surveydata });

      return 'Survey created successfully';
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(error, 500);
    }
  }



}
