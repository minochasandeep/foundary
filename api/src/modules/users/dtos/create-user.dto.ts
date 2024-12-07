import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class CreateUserDto {
  @ApiProperty(
    {
      description: "Email of the user",
      example: "example@example.com",
      required: true,
      type: "string"
    }
  )
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty(
    {
      description: "First name of the user",
      example: "John",
      required: true,
      type: "string"
    }
  )
  @IsNotEmpty()
  firstName: string;

  @ApiProperty(
    {
      description: "Last name of the user",
      example: "Doe",
      required: true,
      type: "string"
    }
  )
  @IsNotEmpty()
  lastName: string;

  @ApiProperty(
    {
      description: "Phone number of the user",
      example: "1234567890",
      required: false,
      type: "string"
    }
  )
  @IsOptional()
  phoneNumber: string;

  @ApiProperty(
    {
      description: "Primary Organization Id of the user",
      example: 1,
      required: false,
      type: "number"
    }
  )
  @IsOptional()
  organizationId: number;

  @ApiProperty(
    {
      description: "Authentication provider of the user",
      example: "Okta",
      required: false,
      type: "string"
    }
  )
  @IsOptional()
  externalAuthProvider: string;

  @ApiProperty(
    {
      description: "Authentication id of the user",
      example: "123456",
      required: false,
      type: "string"
    }
  )
  @IsOptional()
  externalAuthId: string;

  @ApiProperty(
    {
      description: "Status of the user",
      example: true,
      required: false,
      type: "boolean"
    }
  )
  @IsOptional()
  isActive?: boolean;


  @ApiProperty(
    {
      description: "Start date",
      example: "2021-01-01",
      required: false,
      type: "string"
    }
  )
  @IsOptional()
  startDate?: Date;
}
