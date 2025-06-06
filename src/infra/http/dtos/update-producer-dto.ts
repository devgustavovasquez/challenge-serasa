import { IsNotEmpty, IsUUID, MaxLength, MinLength } from "class-validator";
import { IsDocument } from "./is-document";

export class UpdateProducerParamsDto {
  @IsNotEmpty({ message: "Id is required." })
  @IsUUID(4, { message: "Id must be a valid UUID." })
  id!: string;
}

export class UpdateProducerBodyDto {
  @IsNotEmpty({ message: "Name is required." })
  @MinLength(5, { message: "Name must be at least 5 characters." })
  @MaxLength(100, { message: "Name must be at most 100 characters." })
  name!: string;

  @IsNotEmpty({ message: "Document is required." })
  @MinLength(11, { message: "Document must be at least 11 characters." })
  @MaxLength(18, { message: "Document must be at most 18 characters." })
  @IsDocument()
  document!: string;
}
