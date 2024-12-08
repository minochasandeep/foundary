import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";


export class GetSurveyCenterSubjectDto {
  @ApiProperty(
    {
      description: "Acronym of the Survey",
      example: "YOUTH_SD.1",
      required: true,
      type: "string"
    }
  )
  @IsNotEmpty()
  acronym: string;

  @ApiProperty(
    {
      description: "Center of the survey",
      example: "01",
      required: true,
      type: "string"
    }
  )
  @IsNotEmpty()
  centreID: string;

  @ApiProperty(
    {
      description: "visitID of the survey",
      example: "[{ fieldName: 'CENTRE_ID', value: 'RICHMOND' }]",
      required: false,
      type: "Array"
    }
  )
  @IsOptional()
  @IsNotEmpty({ each: true })
  filters: Array<{ fieldName: string, value: string }>;
}
