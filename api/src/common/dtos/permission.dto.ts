import { ApiProperty } from "@nestjs/swagger";
import { IsISO8601, IsNotEmpty, IsOptional } from "class-validator";

/**
 * Represents a permission data transfer object.
 */
export abstract class PermissionDto {
    @ApiProperty(
        {
            description: "Permission sequence value",
            example: "1",
            required: true,
            type: "number"
        }
    )
    @IsNotEmpty()
    id: number;
}


