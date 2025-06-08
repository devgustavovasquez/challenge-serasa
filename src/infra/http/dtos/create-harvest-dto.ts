import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsUUID,
  MaxLength,
  MinLength,
  ValidateNested,
} from "class-validator";

class CropDto {
  @ApiProperty({
    example: "Soybean",
    description: "Name of the crop",
  })
  @IsNotEmpty({ message: "Name is required." })
  @MinLength(5, { message: "Name must be at least 5 characters." })
  @MaxLength(100, { message: "Name must be at most 100 characters." })
  name!: string;

  @ApiProperty({
    example: 1200,
    description: "Crop production in metric tons",
  })
  @IsNotEmpty({ message: "Production is required." })
  @Transform(({ value }) => Number(value))
  @IsInt({ message: "Production must be an integer." })
  @IsPositive({ message: "Production must be greater than 0." })
  production!: number;
}

export class CreateHarvestDto {
  @ApiProperty({
    example: "89b6a91b-65b9-4f14-96fc-3fa3c4bb9e61",
    description: "UUID of the farm",
  })
  @IsNotEmpty({ message: "Producer ID is required." })
  @IsUUID(4, { message: "Producer ID must be a valid UUID." })
  farmId!: string;

  @ApiProperty({
    description: "List of crops in this harvest",
    type: () => [CropDto],
  })
  @ValidateNested({ each: true })
  @Type(() => CropDto)
  crops!: CropDto[];

  @ApiProperty({
    example: 2025,
    description: "Year of the harvest",
  })
  @IsNotEmpty({ message: "Year is required." })
  @Transform(({ value }) => Number(value))
  @IsInt({ message: "Year must be an integer." })
  @IsPositive({ message: "Year must be greater than 0." })
  year!: number;
}
