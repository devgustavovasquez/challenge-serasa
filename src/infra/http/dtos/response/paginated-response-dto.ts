import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class PaginationMetaDto {
  @ApiProperty()
  total!: number;

  @ApiProperty()
  page!: number;

  @ApiProperty()
  perPage!: number;

  @ApiProperty()
  totalPages!: number;
}

export function PaginatedResponseDto<T>(classRef: new () => T) {
  class PaginatedDto {
    @ApiProperty({ type: [classRef] })
    @Type(() => classRef)
    data!: T[];

    @ApiProperty({ type: PaginationMetaDto })
    @Type(() => PaginationMetaDto)
    meta!: PaginationMetaDto;
  }

  return PaginatedDto;
}
