import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { VisitService } from './visits.service';

import { Body, Post } from '@nestjs/common';
import { GetVisitDataDto } from './dtos/get-visit-data.dto';
const axios = require('axios');


@Controller('toolbox/visit')
export class VisitsController {
  constructor(private readonly Visitservice: VisitService) {}

  @Post('latest')
  async getVisitstatus(@Body() getVisitDataDto: GetVisitDataDto): Promise<{ success: boolean; visits: any[] }> {
    try {
      const visits = await this.Visitservice.getLatestVisit(getVisitDataDto);
      return { success: true, visits };
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

