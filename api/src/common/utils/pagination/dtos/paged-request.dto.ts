import { Transform } from "class-transformer";
import { IsNumberString, IsObject, IsOptional } from "class-validator";

// PagedRequest
export class PagedRequest<T, K> {
  @IsOptional()
  @IsNumberString()
  page?: number;

  @IsOptional()
  @IsNumberString()
  pageSize?: number;

  @IsOptional()
  @Transform(({ value }) => JSON.parse(value))
  @IsObject()
  where?: T;

  @IsOptional()
  @Transform(({ value }) => JSON.parse(value))
  @IsObject()
  orderBy?: K;

}

