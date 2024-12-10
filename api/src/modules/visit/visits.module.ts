import { Module } from "@nestjs/common";
import { VisitsController } from "./visits.controller";
import { VisitService } from "./visits.service";
import { CommonFilterModule } from "src/common/filter/filter.module";

@Module({
  imports: [CommonFilterModule],
  controllers: [VisitsController],
  providers: [VisitService],
})
export class VisitModule { }
