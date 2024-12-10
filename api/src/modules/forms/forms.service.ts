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
import { GetSFormDetailDto } from "./dtos/get-form-detail.dto";


@Injectable()
export class FormService {
  
  constructor(
    private prisma: PrismaService,
    private logger: Logger,
  ) {
    logger.setContext(FormService.name);
  }

  async validateForm(getSFormDetailDto: GetSFormDetailDto): Promise<any[]> {
    /*
      API - /api/forms/validate
      Params -
      {
        acronym: "DEMO.50",
        centreID: "CENTRE_A",
        subjectID: "123456",
        visitID: 8,
        visitOcc: 2,
        formCode: “FORM1”,
        formOcc?: 1,
        eventID?: "Testing",
        eventOcc?: 1
      }
    */
    const username = process.env.DACIMA_API_USER_NAME;
    const password = process.env.DACIMA_API_PASSWORD;
    if (!username || !password) {
      throw new HttpException('Username and password are required', HttpStatus.BAD_REQUEST);
    }
    const DACIMA_FOUNDARY_URL = process.env.DACIMA_FOUNDARY_URL;
    
    const formStatus = await axios.post(`${DACIMA_FOUNDARY_URL}/api/forms/validate`, {
      acronym: ToolboxAcronym.Youth,
      centreID: getSFormDetailDto.centreID,
      subjectID: getSFormDetailDto.subjectID,
      visitID: 1,
      visitOcc: 18,
      formCode: getSFormDetailDto.formCode
    },{auth: {
      username: username,
      password: password,
    },
    headers: {
      'Content-Type': 'application/json',
    },});

    return formStatus.data;
  }

  async changeFormStatusToInProgress(getSFormDetailDto: GetSFormDetailDto): Promise<any[]> {
    /*
      API - /api/forms/inprogress
      Params - 
      {
        acronym: "DEMO.50",
        centreID: "CENTRE_A",
        subjectID: "123456",
        visitID: 8,
        visitOcc: 2,
        formCode: “FORM1”,
        formOcc?: 1,
        eventID?: "Testing",
        eventOcc?: 1
      }
    */

    const username = process.env.DACIMA_API_USER_NAME;
    const password = process.env.DACIMA_API_PASSWORD;
    if (!username || !password) {
      throw new HttpException('Username and password are required', HttpStatus.BAD_REQUEST);
    }
    const DACIMA_FOUNDARY_URL = process.env.DACIMA_FOUNDARY_URL;
    
    const formStatus = await axios.post(`${DACIMA_FOUNDARY_URL}/api/forms/inprogress`, {
      acronym: ToolboxAcronym.Youth,
      centreID: getSFormDetailDto.centreID,
      subjectID: getSFormDetailDto.subjectID,
      visitID: 1,
      visitOcc: 18,
      formCode: getSFormDetailDto.formCode
    },{auth: {
      username: username,
      password: password,
    },
    headers: {
      'Content-Type': 'application/json',
    },});

    return formStatus.data;
  }


  async getFormStatus(getSFormDetailDto: GetSFormDetailDto): Promise<any[]> {
    /*
      API - /api/forms/status
      Params - 
      {
        acronym: "DEMO.50",
        centreID: "CENTRE_A",
        subjectID: "123456",
        visitID: 8,
        visitOcc: 2,
        formCode: “FORM1”,
        formOcc?: 1,
        eventID?: "Testing",
        eventOcc?: 1

      }
    */
    const username = process.env.DACIMA_API_USER_NAME;
    const password = process.env.DACIMA_API_PASSWORD;
    if (!username || !password) {
      throw new HttpException('Username and password are required', HttpStatus.BAD_REQUEST);
    }
    const DACIMA_FOUNDARY_URL = process.env.DACIMA_FOUNDARY_URL;
    
    const formStatus = await axios.post(`${DACIMA_FOUNDARY_URL}/api/forms/status`, {
      acronym: ToolboxAcronym.Youth,
      centreID: getSFormDetailDto.centreID,
      subjectID: getSFormDetailDto.subjectID,
      visitID: 1,
      visitOcc: 18,
      formCode: getSFormDetailDto.formCode
    },{auth: {
      username: username,
      password: password,
    },
    headers: {
      'Content-Type': 'application/json',
    },});

    return formStatus.data;
  }
}
