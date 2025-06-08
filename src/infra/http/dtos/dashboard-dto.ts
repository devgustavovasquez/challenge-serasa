import { ApiProperty } from "@nestjs/swagger";

export class DashboardResponse {
  @ApiProperty({
    example: 12,
    description: "Total number of registered farms",
  })
  totalFarms!: number;

  @ApiProperty({
    example: 1500,
    description: "Total number of hectares across all farms",
  })
  totalHectares!: number;

  @ApiProperty({
    description: "Distribution of farms by state (UF)",
    example: [
      { state: "SP", count: 5 },
      { state: "MG", count: 3 },
    ],
  })
  farmsByState!: { state: string; count: number }[];

  @ApiProperty({
    description: "Distribution of farms by main crop",
    example: [
      { culture: "Soybean", count: 4 },
      { culture: "Corn", count: 6 },
    ],
  })
  farmsByCulture!: { culture: string; count: number }[];

  @ApiProperty({
    description: "Land usage in hectares by type",
    example: [
      { type: "agricultavel", total: 1200 },
      { type: "vegetacao", total: 300 },
    ],
  })
  landUse!: { type: "agricultavel" | "vegetacao"; total: number }[];
}
