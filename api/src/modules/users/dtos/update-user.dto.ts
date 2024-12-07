import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";

export class UpdateUsertDto extends PartialType(CreateUserDto) {
    status: any;
}
export class UpdateUserStatusDto {
    @IsNotEmpty()
    isActive: boolean;

}
