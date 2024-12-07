import { Module } from "@nestjs/common";
import { OrganizationFilter } from "./filter.service";

@Module({
  exports: [OrganizationFilter],
  providers:[OrganizationFilter]
})
export class CommonFilterModule { }