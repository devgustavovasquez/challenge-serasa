import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export class DeleteProducerDto {
  @ApiProperty({
    example: "89b6a91b-65b9-4f14-96fc-3fa3c4bb9e61",
    description: "UUID of the producer",
  })
  @IsNotEmpty({ message: "Id is required." })
  @IsUUID(4, { message: "Id must be a valid UUID." })
  id!: string;
}
