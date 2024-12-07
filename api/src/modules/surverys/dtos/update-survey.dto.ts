import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";
import { CreateSurveyDto } from "./create-survey.dto";

export class UpdateSurveyDto extends PartialType(CreateSurveyDto) {
    status: any;
}
