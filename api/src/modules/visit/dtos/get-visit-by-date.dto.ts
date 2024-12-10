import { Optional } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";


export class GetVisitByDateDto {
  @ApiProperty(
    {
      description: "Acronym of the Survey",
      example: "YOUTH_SD.1",
      required: true,
      type: "string"
    }
  )
  @IsOptional()
  acronym: string;

  @ApiProperty(
    {
      description: "Center of the survey",
      example: "Richmond",
      required: true,
      type: "string"
    }
  )
  @IsNotEmpty()
  centreID: string;

  @ApiProperty(
    {
      description: "The unique identifier of the subject",
      example: "01",
      required: true,
      type: "string"
    }
  )
  @IsNotEmpty()
  subjectID: string;


  @ApiProperty(
    {
      description: "Identifier of an event if enabled at the study level.",
      example: 1,
      required: false,
      type: "int"
    }
  )
  @IsOptional()
  eventID: string;


  @ApiProperty(
    {
      description: "Occurrence of the requested event ID if enabled at the study level",
      example: 1,
      required: false,
      type: "int"
    }
  )
  @IsOptional()
  eventOcc: string;

  @ApiProperty(
    {
      description: "Identifier of a visit",
      example: 1,
      required: true,
      type: "int"
    }
  )
  @IsNotEmpty()
  visitID: string;

  @ApiProperty(
    {
      description: "Identifier of a start date",
      example: "2020-03-04T23:59:59-08:00",
      required: true,
      type: "string"
    }
  )
  @IsNotEmpty()
  startDate: string;

  @ApiProperty(
    {
      description: "Identifier of a end date",
      example: "2020-03-04T23:59:59-08:00",
      required: true,
      type: "string"
    }
  )
  @IsNotEmpty()
  endDate: string;
 }

