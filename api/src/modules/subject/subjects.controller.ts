import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { SubjectService } from './subjects.service';

import { Body, Post } from '@nestjs/common';
import { GetSubjectDto } from './dtos/get-subject.dto';
const axios = require('axios');


@Controller('toolbox/subject')
export class SubjectsController {
  constructor(private readonly SubjectService: SubjectService) {}

  
  @Post('detail')
  async getSubjectByAcronym(@Body() getSubjectDto: GetSubjectDto): Promise<{ success: boolean; subjects: any[] }> {
    try {
      const subjects = await this.SubjectService.getSubjectByAcronym(getSubjectDto);
      return { success: true, subjects };
    } catch (error) {
      console.log(error.response.data)
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('search-fields')
  async getSearchFields(): Promise<{ success: boolean; fields: any[] }> {
    try {
      const fields = await this.SubjectService.getSearchFields();
      return { success: true, fields };
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

