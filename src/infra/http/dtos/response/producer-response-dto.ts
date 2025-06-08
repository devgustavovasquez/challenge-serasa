import { ApiProperty } from "@nestjs/swagger";
import { PaginatedResponseDto } from "./paginated-response-dto";

export class ProducerResponseDto {
  @ApiProperty({
    example: "c8b68c88-6b3a-4c2f-bd28-34a43b0ea8ff",
    description: "Unique identifier of the producer",
  })
  id!: string;

  @ApiProperty({
    example: "João Silva",
    description: "Full name of the producer",
  })
  name!: string;

  @ApiProperty({
    example: "12345678900",
    description: "CPF or CNPJ of the producer (document)",
  })
  document!: string;

  @ApiProperty({
    example: "2024-05-20T18:20:00.000Z",
    description: "Timestamp when the producer was created",
  })
  createdAt!: Date;

  @ApiProperty({
    required: false,
    example: "2024-05-21T10:00:00.000Z",
    description: "Timestamp when the harvest was last updated",
  })
  updatedAt?: Date;
}

export class PaginatedProducerResponseDto extends PaginatedResponseDto(
  ProducerResponseDto,
) {}
