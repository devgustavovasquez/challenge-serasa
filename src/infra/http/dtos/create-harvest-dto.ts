import { Transform } from "class-transformer";
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
  @IsNotEmpty({ message: "Name is required." })
  @MinLength(5, { message: "Name must be at least 5 characters." })
  @MaxLength(100, { message: "Name must be at most 100 characters." })
  name!: string;

  @IsNotEmpty({ message: "Production is required." })
  @Transform(({ value }) => Number(value))
  @IsInt({ message: "Production must be an integer." })
  @IsPositive({ message: "Production must be greater than 0." })
  production!: number;
}

export class CreateHarvestDto {
  @IsNotEmpty({ message: "Producer ID is required." })
  @IsUUID(4, { message: "Producer ID must be a valid UUID." })
  farmId!: string;

  @ValidateNested({ each: true })
  crops!: CropDto[];

  @IsNotEmpty({ message: "Year is required." })
  @Transform(({ value }) => Number(value))
  @IsInt({ message: "Year must be an integer." })
  @IsPositive({ message: "Year must be greater than 0." })
  year!: number;
}
