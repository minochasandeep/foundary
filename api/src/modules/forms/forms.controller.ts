import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { FormService } from './forms.service';

import { Body, Post } from '@nestjs/common';
import { GetSFormDetailDto } from './dtos/get-form-detail.dto';
const axios = require('axios');

// visitID and visitOcc will be fetched from visit api before form related operations
@Controller('toolbox/form')
export class FormsController {
  constructor(private readonly formService: FormService) {}

  
  @Post('status')
  async getFormStatus(@Body() getSFormDetailDto: GetSFormDetailDto): Promise<{ success: boolean; formStatus: any[] }> {
    try {
      const formStatus = await this.formService.getFormStatus(getSFormDetailDto);
      return { success: true, formStatus };
    } catch (error) {
      throw new HttpException(
        error.response.data.errorMessage || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('change-status')
  async changeFormStatus(@Body() getSFormDetailDto: GetSFormDetailDto): Promise<{ success: boolean; formStatus: any[] }> {
    try {
      const formStatus = await this.formService.changeFormStatusToInProgress(getSFormDetailDto);
      return { success: true, formStatus };
    } catch (error) {
      throw new HttpException(
        error.response.data.errorMessage || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('validate')
  async validateForm(@Body() getSFormDetailDto: GetSFormDetailDto): Promise<{ success: boolean; formStatus: any[] }> {
    try {
      const formStatus = await this.formService.validateForm(getSFormDetailDto);
      return { success: true, formStatus };
    } catch (error) {
      throw new HttpException(
        error.response.data.errorMessage || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}