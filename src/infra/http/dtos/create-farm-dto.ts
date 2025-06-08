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

export class CreateFarmDto {
  @ApiProperty({
    description: "ID of the producer who owns the farm",
    example: "1d0f1879-4c22-4c18-8513-5d4a9fcdba29",
  })
  @IsNotEmpty({ message: "Producer ID is required." })
  @IsUUID(4, { message: "Producer ID must be a valid UUID." })
  producerId!: string;

  @ApiProperty({
    description: "Name of the farm",
    example: "Santa Helena Farm",
  })
  @IsNotEmpty({ message: "Name is required." })
  @MinLength(5, { message: "Name must be at least 5 characters." })
  @MaxLength(100, { message: "Name must be at most 100 characters." })
  name!: string;

  @ApiProperty({
    description: "City where the farm is located",
    example: "Uberlândia",
  })
  @IsNotEmpty({ message: "City is required." })
  @MinLength(2, { message: "City must be at least 2 characters." })
  @MaxLength(100, { message: "City must be at most 100 characters." })
  city!: string;

  @ApiProperty({
    description: "State (UF) abbreviation where the farm is located",
    example: "MG",
  })
  @IsNotEmpty({ message: "State is required." })
  @MinLength(2, { message: "State must be at least 2 characters." })
  @MaxLength(2, { message: "State must be at most 2 characters." })
  state!: string;

  @ApiProperty({
    description: "Total area of the farm in hectares",
    example: 150,
  })
  @IsNotEmpty({ message: "Total area is required." })
  @Transform(({ value }) => Number(value))
  @IsInt({ message: "Total area must be an integer." })
  @IsPositive({ message: "Total area must be greater than 0." })
  totalArea!: number;

  @ApiProperty({
    description: "Cultivated area of the farm in hectares",
    example: 80,
  })
  @IsNotEmpty({ message: "Cultivated area is required." })
  @Transform(({ value }) => Number(value))
  @IsInt({ message: "Cultivated area must be an integer." })
  @IsPositive({ message: "Cultivated area must be greater than 0." })
  cultivatedArea!: number;

  @ApiProperty({
    description: "Vegetation area of the farm in hectares",
    example: 70,
  })
  @IsNotEmpty({ message: "Vegetation area is required." })
  @Transform(({ value }) => Number(value))
  @IsInt({ message: "Vegetation area must be an integer." })
  @IsPositive({ message: "Vegetation area must be greater than 0." })
  vegetationArea!: number;
}
