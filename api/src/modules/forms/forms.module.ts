import { Module } from "@nestjs/common";
import { FormsController } from "./forms.controller";
import { FormService } from "./forms.service";
import { CommonFilterModule } from "src/common/filter/filter.module";

@Module({
  imports: [CommonFilterModule],
  controllers: [FormsController],
  providers: [FormService],
})
export class SurveysModule { }
