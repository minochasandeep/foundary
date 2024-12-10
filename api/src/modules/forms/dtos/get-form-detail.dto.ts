import { Optional } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";


export class GetSFormDetailDto {

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
      description: "Identifier of the form ",
      example: "01",
      required: true,
      type: "string"
    }
  )
  @IsNotEmpty()
  formCode: string;


  @ApiProperty(
    {
      description: "The occurrence of the requested form",
      example: "01",
      required: true,
      type: "string"
    }
  )
  @IsOptional()
  formOcc: string;
 }

