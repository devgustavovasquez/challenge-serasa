import { Transform } from "class-transformer";
import { IsInt, IsOptional, IsPositive } from "class-validator";

export class ListFarmsDto {
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt({ message: "Page must be an integer." })
  @IsPositive({ message: "Page must be greater than 0." })
  page?: number;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt({ message: "PerPage must be an integer." })
  @IsPositive({ message: "PerPage must be greater than 0." })
  perPage?: number;
}
