import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsUUID,
  MaxLength,
  MinLength,
} from "class-validator";

export class UpdateFarmParamsDto {
  @ApiProperty({
    description: "Farm ID (UUID v4)",
    example: "a3f6e4b9-8cde-4f2d-a917-123456789abc",
  })
  @IsNotEmpty({ message: "Id is required." })
  @IsUUID(4, { message: "Id must be a valid UUID." })
  id!: string;
}

export class UpdateFarmBodyDto {
  @ApiProperty({
    description: "Producer ID (UUID v4)",
    example: "c2b7d1a0-1c4b-4f19-bf8a-abcdef123456",
  })
  @IsNotEmpty({ message: "Producer ID is required." })
  @IsUUID(4, { message: "Producer ID must be a valid UUID." })
  producerId!: string;

  @ApiProperty({
    description: "Farm name",
    example: "Fazenda Boa Vista",
  })
  @IsNotEmpty({ message: "Name is required." })
  @MinLength(5, { message: "Name must be at least 5 characters." })
  @MaxLength(100, { message: "Name must be at most 100 characters." })
  name!: string;

  @ApiProperty({
    description: "City where the farm is located",
    example: "Vitória",
  })
  @IsNotEmpty({ message: "City is required." })
  @MinLength(2, { message: "City must be at least 2 characters." })
  @MaxLength(100, { message: "City must be at most 100 characters." })
  city!: string;

  @ApiProperty({
    description: "State abbreviation (UF) of the farm location",
    example: "ES",
  })
  @IsNotEmpty({ message: "State is required." })
  @MinLength(2, { message: "State must be at least 2 characters." })
  @MaxLength(2, { message: "State must be at most 2 characters." })
  state!: string;

  @ApiProperty({
    description: "Total area of the farm in hectares",
    example: 2500,
  })
  @IsNotEmpty({ message: "Total area is required." })
  @Transform(({ value }) => Number(value))
  @IsInt({ message: "Total area must be an integer." })
  @IsPositive({ message: "Total area must be greater than 0." })
  totalArea!: number;

  @ApiProperty({
    description: "Cultivated area of the farm in hectares",
    example: 1200,
  })
  @IsNotEmpty({ message: "Cultivated area is required." })
  @Transform(({ value }) => Number(value))
  @IsInt({ message: "Cultivated area must be an integer." })
  @IsPositive({ message: "Cultivated area must be greater than 0." })
  cultivatedArea!: number;

  @ApiProperty({
    description: "Vegetation area of the farm in hectares",
    example: 1300,
  })
  @IsNotEmpty({ message: "Vegetation area is required." })
  @Transform(({ value }) => Number(value))
  @IsInt({ message: "Vegetation area must be an integer." })
  @IsPositive({ message: "Vegetation area must be greater than 0." })
  vegetationArea!: number;
}
