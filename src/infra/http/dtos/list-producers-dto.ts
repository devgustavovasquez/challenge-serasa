import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsInt, IsOptional, IsPositive } from "class-validator";

export class ListProducersDto {
  @ApiPropertyOptional({
    description: "Page number for pagination",
    example: 1,
    type: Number,
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt({ message: "Page must be an integer." })
  @IsPositive({ message: "Page must be greater than 0." })
  page?: number;

  @ApiPropertyOptional({
    description: "Number of items per page",
    example: 10,
    type: Number,
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt({ message: "PerPage must be an integer." })
  @IsPositive({ message: "PerPage must be greater than 0." })
  perPage?: number;
}
