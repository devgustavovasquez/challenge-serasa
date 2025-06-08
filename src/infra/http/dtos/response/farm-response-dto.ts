import { ApiProperty } from "@nestjs/swagger";
import { PaginatedResponseDto } from "./paginated-response-dto";

export class FarmResponseDto {
  @ApiProperty({
    example: "88cb9ecf-2bd0-4b1f-91cb-05f8c4c1c64a",
    description: "Unique identifier of the farm",
  })
  id!: string;

  @ApiProperty({
    example: "a2c72ef3-d8a4-4b0a-8a6b-88f5a43b3f1f",
    description: "ID of the producer who owns the farm",
  })
  producerId!: string;

  @ApiProperty({
    example: "Santa Maria Farm",
    description: "Name of the farm",
  })
  name!: string;

  @ApiProperty({
    example: 100,
    description: "Total area of the farm (in hectares)",
  })
  totalArea!: number;

  @ApiProperty({
    example: 60,
    description: "Area used for cultivation (in hectares)",
  })
  cultivatedArea!: number;

  @ApiProperty({
    example: 40,
    description: "Area covered by vegetation (in hectares)",
  })
  vegetationArea!: number;

  @ApiProperty({
    example: "Uberaba",
    description: "City where the farm is located",
  })
  city!: string;

  @ApiProperty({
    example: "MG",
    description: "State where the farm is located",
  })
  state!: string;

  @ApiProperty({
    example: "2024-05-20T18:20:00.000Z",
    description: "Timestamp when the farm was created",
  })
  createdAt!: Date;

  @ApiProperty({
    required: false,
    example: "2024-05-21T10:00:00.000Z",
    description: "Timestamp when the harvest was last updated",
  })
  updatedAt?: Date;
}

export class FarmPaginatedResponseDto extends PaginatedResponseDto(
  FarmResponseDto,
) {}
