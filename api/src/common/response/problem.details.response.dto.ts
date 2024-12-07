import { HttpException } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import ApiResponseDto from "./api.response.dto";

export default class ProblemDetails extends ApiResponseDto<HttpException> {
    status: "success" | "error" = "error";

    @ApiProperty({ description: 'The validation message list' })
    validations?: []
}