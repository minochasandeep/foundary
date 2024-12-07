import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { CommonFilterModule } from "src/common/filter/filter.module";

@Module({
  imports: [CommonFilterModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule { }
