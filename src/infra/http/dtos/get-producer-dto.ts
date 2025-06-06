import { IsNotEmpty, IsUUID } from "class-validator";

export class GetProducerDto {
  @IsNotEmpty({ message: "Id is required." })
  @IsUUID(4, { message: "Id must be a valid UUID." })
  id!: string;
}
