import { ApiProperty } from "@nestjs/swagger";

class CropResponseDto {
  @ApiProperty({
    example: "Soybean",
    description: "Name of the crop",
  })
  name!: string;

  @ApiProperty({
    example: 1500,
    description: "Production amount of the crop (e.g., in tons)",
  })
  production!: number;

  @ApiProperty({
    example: "soybean-2024",
    description: "Slugified version of the crop name",
  })
  slug!: string;

  @ApiProperty({
    example: 2024,
    description: "Year of the crop production",
  })
  year!: number;
}

export class HarvestResponseDto {
  @ApiProperty({
    example: "e74c7a0c-1cd6-44e9-8736-c0c8f7f22cde",
    description: "Unique identifier of the harvest",
  })
  id!: string;

  @ApiProperty({
    example: "a2c72ef3-d8a4-4b0a-8a6b-88f5a43b3f1f",
    description: "ID of the farm related to the harvest",
  })
  farmId!: string;

  @ApiProperty({
    example: 2024,
    description: "Year the harvest was made",
  })
  year!: number;

  @ApiProperty({
    type: [CropResponseDto],
    description: "List of crops harvested",
  })
  crops!: CropResponseDto[];

  @ApiProperty({
    example: "2024-05-20T18:20:00.000Z",
    description: "Timestamp when the harvest was created",
  })
  createdAt!: Date;

  @ApiProperty({
    required: false,
    example: "2024-05-21T10:00:00.000Z",
    description: "Timestamp when the harvest was last updated",
  })
  updatedAt?: Date;
}
