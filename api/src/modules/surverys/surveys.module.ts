import { Module } from "@nestjs/common";
import { SurveysController } from "./surveys.controller";
import { SurveyService } from "./surveys.service";
import { CommonFilterModule } from "src/common/filter/filter.module";

@Module({
  imports: [CommonFilterModule],
  controllers: [SurveysController],
  providers: [SurveyService],
})
export class SurveysModule { }
