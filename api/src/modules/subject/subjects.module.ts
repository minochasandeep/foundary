import { Module } from "@nestjs/common";
import { SubjectsController } from "./subjects.controller";
import { SubjectService } from "./subjects.service";
import { CommonFilterModule } from "src/common/filter/filter.module";

@Module({
  imports: [CommonFilterModule],
  controllers: [SubjectsController],
  providers: [SubjectService],
})
export class SurveysModule { }
