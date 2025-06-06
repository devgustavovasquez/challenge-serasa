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
  @IsNotEmpty({ message: "Id is required." })
  @IsUUID(4, { message: "Id must be a valid UUID." })
  id!: string;
}

export class UpdateFarmBodyDto {
  @IsNotEmpty({ message: "Producer ID is required." })
  @IsUUID(4, { message: "Producer ID must be a valid UUID." })
  producerId!: string;

  @IsNotEmpty({ message: "Name is required." })
  @MinLength(5, { message: "Name must be at least 5 characters." })
  @MaxLength(100, { message: "Name must be at most 100 characters." })
  name!: string;

  @IsNotEmpty({ message: "City is required." })
  @MinLength(2, { message: "City must be at least 2 characters." })
  @MaxLength(100, { message: "City must be at most 100 characters." })
  city!: string;

  @IsNotEmpty({ message: "State is required." })
  @MinLength(2, { message: "State must be at least 2 characters." })
  @MaxLength(2, { message: "State must be at most 2 characters." })
  state!: string;

  @IsNotEmpty({ message: "Total area is required." })
  @Transform(({ value }) => Number(value))
  @IsInt({ message: "Page must be an integer." })
  @IsPositive({ message: "Page must be greater than 0." })
  totalArea!: number;

  @IsNotEmpty({ message: "Cultivated area is required." })
  @Transform(({ value }) => Number(value))
  @IsInt({ message: "Page must be an integer." })
  @IsPositive({ message: "Page must be greater than 0." })
  cultivatedArea!: number;

  @IsNotEmpty({ message: "Vegetation area is required." })
  @Transform(({ value }) => Number(value))
  @IsInt({ message: "Page must be an integer." })
  @IsPositive({ message: "Page must be greater than 0." })
  vegetationArea!: number;
}
