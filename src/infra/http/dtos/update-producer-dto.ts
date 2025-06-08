import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID, MaxLength, MinLength } from "class-validator";
import { IsDocument } from "./is-document";

export class UpdateProducerParamsDto {
  @ApiProperty({
    description: "Producer ID (UUID v4)",
    example: "a3f6e4b9-8cde-4f2d-a917-123456789abc",
  })
  @IsNotEmpty({ message: "Id is required." })
  @IsUUID(4, { message: "Id must be a valid UUID." })
  id!: string;
}

export class UpdateProducerBodyDto {
  @ApiProperty({
    description: "Name of the producer",
    example: "João da Silva",
  })
  @IsNotEmpty({ message: "Name is required." })
  @MinLength(5, { message: "Name must be at least 5 characters." })
  @MaxLength(100, { message: "Name must be at most 100 characters." })
  name!: string;

  @ApiProperty({
    description: "Document number (CPF or CNPJ)",
    example: "123.456.789-00",
  })
  @IsNotEmpty({ message: "Document is required." })
  @MinLength(11, { message: "Document must be at least 11 characters." })
  @MaxLength(18, { message: "Document must be at most 18 characters." })
  @IsDocument()
  document!: string;
}
