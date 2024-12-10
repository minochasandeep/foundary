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
import { GetVisitDataDto } from "./dtos/get-visit-data.dto";
import { UpdateVisitDataDto } from "./dtos/update-visit-data.dto";
import { GetVisitByDateDto } from "./dtos/get-visit-by-date.dto";


@Injectable()
export class VisitService {
  
  constructor(
    private prisma: PrismaService,
    private logger: Logger,
  ) {
    logger.setContext(VisitService.name);
  }

  async getLatestVisit(getVisitDataDto: GetVisitDataDto): Promise<any[]> {
    /*
      API - /api/visits/get/latestOcc
      Method - POST
      Params - 
      {
        acronym: "DEMO.50",
        centreID: "CENTRE_A",
        subjectID: "123456",
        visitID: 1,
        eventID ?: "12345",
        eventOcc ?: 1
      }
    */

    const username = process.env.DACIMA_API_USER_NAME;
    const password = process.env.DACIMA_API_PASSWORD;
    if (!username || !password) {
      throw new HttpException('Username and password are required', HttpStatus.BAD_REQUEST);
    }
    const DACIMA_FOUNDARY_URL = process.env.DACIMA_FOUNDARY_URL;
    const VISIT_REQUEST_URL = `${DACIMA_FOUNDARY_URL}/api/visits/get/latestOcc`
   
    const Visitstatus = await axios.post(VISIT_REQUEST_URL, {
      acronym: ToolboxAcronym.Youth,
      centreID: getVisitDataDto.centreID,
      subjectID: getVisitDataDto.subjectID,
      visitID: getVisitDataDto.visitID
    },{auth: {
      username: username,
      password: password,
    },
    headers: {
      'Content-Type': 'application/json',
    },});

    return Visitstatus.data;
  }

  async getVisitByDate(getVisitByDate: GetVisitByDateDto): Promise<any[]> {
    /*
      API - /api/visits/get/byDateRange
      Method - POST
      Params - 
      {
        acronym: "DEMO.50",
        centreID: "CENTRE_A",
        subjectID: "123456",
        visitID: 8,
        dateRangeStart: "2020-03-03T00:00:00-08:00",
        dateRangeEnd: "2020-03-03T23:59:59-08:00"
      }
    */

    const username = process.env.DACIMA_API_USER_NAME;
    const password = process.env.DACIMA_API_PASSWORD;
    if (!username || !password) {
      throw new HttpException('Username and password are required', HttpStatus.BAD_REQUEST);
    }
    const DACIMA_FOUNDARY_URL = process.env.DACIMA_FOUNDARY_URL;
    
    const Visitstatus = await axios.post(`${DACIMA_FOUNDARY_URL}/api/visits/add`, {
      acronym: ToolboxAcronym.Youth,
      centreID: getVisitByDate.centreID,
      subjectID: getVisitByDate.subjectID,
      visitID: getVisitByDate.visitID,
      dateRangeStart: getVisitByDate.startDate,
      dateRangeEnd: getVisitByDate.endDate,
    },{auth: {
      username: username,
      password: password,
    },
    headers: {
      'Content-Type': 'application/json',
    },});

    return Visitstatus.data;
  }

  async addVisit(updateVisitDataDto: UpdateVisitDataDto): Promise<any[]> {
    /*
      API - /api/visits/add
      Method - POST
      Params - 
      {
        acronym: "DEMO.50",
        centreID: "CENTRE_A",
        subjectID: "123456",
        visitID: 8,
        date: "2020-03-03T00:00:00-08:00"
      }
    */

    
    const username = process.env.DACIMA_API_USER_NAME;
    const password = process.env.DACIMA_API_PASSWORD;
    if (!username || !password) {
      throw new HttpException('Username and password are required', HttpStatus.BAD_REQUEST);
    }
    const DACIMA_FOUNDARY_URL = process.env.DACIMA_FOUNDARY_URL;
    
    const Visitstatus = await axios.post(`${DACIMA_FOUNDARY_URL}/api/visits/add`, {
      acronym: ToolboxAcronym.Youth,
      centreID: updateVisitDataDto.centreID,
      subjectID: updateVisitDataDto.subjectID,
      visitID: updateVisitDataDto.visitID,
      date: updateVisitDataDto.date
    },{auth: {
      username: username,
      password: password,
    },
    headers: {
      'Content-Type': 'application/json',
    },});

    return Visitstatus.data;
  }


  async updateVisitDate(updateVisitDataDto: UpdateVisitDataDto): Promise<any[]> {
    /*
      API - /api/visits/update/date
      Method - POST
      Params - 
      {
        acronym: "DEMO.50",
        centreID: "CENTRE_A",
        subjectID: "123456",
        visitID: 8,
        date: "2020-03-04T23:59:59-08:00”
      }
    */

    const username = process.env.DACIMA_API_USER_NAME;
    const password = process.env.DACIMA_API_PASSWORD;
    if (!username || !password) {
      throw new HttpException('Username and password are required', HttpStatus.BAD_REQUEST);
    }
    const DACIMA_FOUNDARY_URL = process.env.DACIMA_FOUNDARY_URL;
    
    const Visitstatus = await axios.post(`${DACIMA_FOUNDARY_URL}/api/visits/update/date`, {
      acronym: ToolboxAcronym.Youth,
      centreID: updateVisitDataDto.centreID,
      subjectID: updateVisitDataDto.subjectID,
      visitID: updateVisitDataDto.visitID,
      date: updateVisitDataDto.date
    },{auth: {
      username: username,
      password: password,
    },
    headers: {
      'Content-Type': 'application/json',
    },});

    return Visitstatus.data;
  }
}
