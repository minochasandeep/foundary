import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { SurveyService } from './surveys.service';
import { CreateSurveyDto } from './dtos/create-survey.dto';
import { GetSurveyCenterSubjectDto } from './dtos/get-survey-center-subject.dto';

import { Body, Post } from '@nestjs/common';
const axios = require('axios');

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
}

@Controller('toolbox')
export class SurveysController {
  constructor(private readonly surveyService: SurveyService) {}

  
  @Post('centers')
  async getAllCenters(): Promise<{ success: boolean; locations: any[] }> {
    try {
      const locations = await this.surveyService.getAllCenters();
      return { success: true, locations };
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }


    
  @Post('subjects')
  async getAllCenterSubjects(@Body() getSurveyCenterSubjectDto: GetSurveyCenterSubjectDto): Promise<{ success: boolean; subjects: any[] }> {
    try {
      const subjects = await this.surveyService.getAllCenterSubjects(getSurveyCenterSubjectDto);
      return { success: true, subjects };
    } catch (error) {
      console.error('Error getting center subjects:', error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  
  @Get("surveys")
  async getAllSurveys() :Promise<SurveyToken[]> {
    return this.surveyService.getSurvey();
  }

  
  @Post("initiate")
  async initiateSurvey(@Body() createSurveyDto: CreateSurveyDto) :Promise<string>{
    try {
      
      //get latest occ
      // https://secure.dacimasoftware.com/foundry_uat/api/visits/get/latestOcc
      
      const surveyFormUrl = process.env.DACIMA_FOUNDARY_URL;
      const latestOccResponse = await axios.post(`${surveyFormUrl}/api/visits/get/latestOcc`, createSurveyDto, {
        headers: {
          Authorization: `Basic ${process.env.AUTH_TOKEN}`,
        },
      }).catch((error) => {
        throw new HttpException(
          error.response.data.errorMessage || 'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        )
      });
      console.log("latestOccResponse",latestOccResponse.data[0])
      console.log("latestOccResponse.data.visitOcc",latestOccResponse.data[0].visitOcc)
      
      const visitOcc = latestOccResponse.data[0].visitOcc;
      if(visitOcc === null || visitOcc === undefined){
        throw new HttpException(
          'Unable to get visitOcc',
          HttpStatus.INTERNAL_SERVER_ERROR,
        )

      }
      createSurveyDto.visitOcc = visitOcc;

      console.log("createSurveyDto",createSurveyDto)
      const response = await axios.post(`${surveyFormUrl}/api/deeplink/survey-form`, createSurveyDto, {
        headers: {
          Authorization: `Basic ${process.env.AUTH_TOKEN}`,
        },
      }).catch((error) => {
        throw new HttpException(
          error.response.data.errorMessage || 'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        )
      });

      const survey: SurveyToken = {
        token: response.data.token,
        subjectId:  createSurveyDto.subjectID,
        acronym:    createSurveyDto.acronym,
        formOcc:    createSurveyDto.formOcc,
        formCode:   createSurveyDto.formCode,
        visitOcc:   createSurveyDto.visitOcc,
        visitID:    createSurveyDto.visitID,
        centreID:   createSurveyDto.centreID,
        status:     "PENDING",
        expiryDate: new Date(response.data.expiryUTC),
      };
      if(response.data.error){
        return response.data.error;
      }

      await this.surveyService.initiateSurvey(survey);
      return response.data;
    } catch (error) {
      console.error('Error creating survey:', error);
      throw error;
    }
    console.log(createSurveyDto);
  }
}