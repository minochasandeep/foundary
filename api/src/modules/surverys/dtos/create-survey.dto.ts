import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateSurveyDto {
  @ApiProperty(
    {
      description: "Acronym of the Survey",
      example: "FAMILY_SD.1",
      required: true,
      type: "string"
    }
  )
  @IsNotEmpty()
  acronym: string;

  @ApiProperty(
    {
      description: "Location of the centre",
      example: "01",
      required: true,
      type: "string"
    }
  )
  @IsNotEmpty()
  subjectID: string;

  @ApiProperty(
    {
      description: "visitID of the survey",
      example: 1,
      required: true,
      type: "number"
    }
  )
  @IsNotEmpty()
  visitID: number;

  @ApiProperty(
    {
      description: "visitOcc of the survey",
      example: "1",
      required: true,
      type: "number"
    }
  )
  @IsNotEmpty()
  visitOcc: number;

  @ApiProperty(
    {
      description: "formCode of the survey",
      example: "END_VISIT",
      required: true,
      type: "string"
    }
  )
  @IsNotEmpty()
  formOcc: number;
}
