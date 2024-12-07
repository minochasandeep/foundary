import { Controller, Get } from '@nestjs/common';
import { SurveyService } from './surveys.service';
import { CreateSurveyDto } from './dtos/create-survey.dto';
import { Body, Post } from '@nestjs/common';
const axios = require('axios');

interface SurveyToken {
  token: string;
  user_id: number;
  expiry_date: Date;
  created_at: Date;
  updated_at: Date;
}


@Controller('surveys')
export class SurveysController {
  constructor(private readonly surveyService: SurveyService) {}

  @Get()
  async getAllSurveys() {
    return this.surveyService.getSurvey();
  }

  
  @Post()
  async createSurvey(@Body() createSurveyDto: CreateSurveyDto) {
    try {
      const surveyFormUrl = process.env.DEEPLINK_SURVEY_FORM_URL;
      const response = await axios.post(surveyFormUrl, createSurveyDto, {
        headers: {
          Authorization: `Basic ${process.env.AUTH_TOKEN}`,
        },
      });

      const survey: SurveyToken = {
        token: response.data.token,
        user_id: 1,
        expiry_date: new Date(response.data.expiryUTC),
        created_at: new Date(),
        updated_at: new Date(),
      };

      await this.surveyService.createSurvey(survey);
      return response.data;
    } catch (error) {
      console.error('Error creating survey:', error);
      throw error;
    }
    console.log(createSurveyDto);
  }
}