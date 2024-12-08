import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";


export class GetSurveyCenterSubjectDto {

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

 }
