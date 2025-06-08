import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { IsDocument } from "./is-document";

export class CreateProducerDto {
  @ApiProperty({
    description: "Full name of the producer",
    example: "João da Silva",
  })
  @IsNotEmpty({ message: "Name is required." })
  @MinLength(5, { message: "Name must be at least 5 characters." })
  @MaxLength(100, { message: "Name must be at most 100 characters." })
  name!: string;

  @ApiProperty({
    description: "CPF or CNPJ of the producer",
    example: "12345678900",
  })
  @IsNotEmpty({ message: "Document is required." })
  @MinLength(11, { message: "Document must be at least 11 characters." })
  @MaxLength(18, { message: "Document must be at most 18 characters." })
  @IsDocument()
  document!: string;
}
