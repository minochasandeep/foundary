import { Optional } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";


export class GetSubjectDto {
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
      description: "Sorting field name",
      example: "FIRST_NAME",
      required: true,
      type: "string"
    }
  )
  @IsOptional()
  sortField: string;


  @ApiProperty(
    {
      description: "Sorting direction ASC/DESC.",
      example:"asc",
      required: false,
      type: "string"
    }
  )
  @IsOptional()
  sortDirection: string;


  @ApiProperty(
    {
      description: "Number of results",
      example: 1,
      required: false,
      type: "int"
    }
  )
  @IsOptional()
  maxResults: string;

  @ApiProperty(
    {
      description: "Filter value for FIRST_NAME",
      example: "test",
      required: true,
      type: "string"
    }
  )
  @IsOptional()
  firstName: string;

  @ApiProperty(
    {
      description: "Filter value for LAST_NAME",
      example: "test",
      required: true,
      type: "string"
    }
  )
  @IsOptional()
  lastName: string;


  @ApiProperty(
    {
      description: "Filter value for DOB",
      example: "21-12-2000",
      required: true,
      type: "string"
    }
  )
  @IsOptional()
  dob: string;


  @ApiProperty(
    {
      description: "Filter value PHN",
      example: "9876543212",
      required: true,
      type: "string"
    }
  )
  @IsOptional()
  phn: string;

  @ApiProperty(
    {
      description: "Filter value CLIENT_ID",
      example: "01",
      required: true,
      type: "string"
    }
  )
  @IsOptional()
  clientID: string;
 }

