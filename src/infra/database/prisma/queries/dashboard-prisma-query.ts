import { Injectable } from "@nestjs/common";
import {
  DashboardOutput,
  DashboardQuery,
} from "src/application/queries/dashboard-query";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaDashboardQuery implements DashboardQuery {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboardData(): Promise<DashboardOutput> {
    const farmAggregate = await this.prisma.farm.aggregate({
      _sum: {
        totalArea: true,
        cultivatedArea: true,
        vegetationArea: true,
      },
      _count: { id: true },
    });

    const farmsWithAddress = await this.prisma.farm.findMany({
      select: {
        address: { select: { state: true } },
      },
    });

    const farmsByStateMap = farmsWithAddress.reduce(
      (acc, farm) => {
        const state = farm.address?.state || "Desconhecido";
        acc[state] = (acc[state] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    const farmsByState = Object.entries(farmsByStateMap).map(
      ([state, count]) => ({
        state,
        count,
      }),
    );

    const cropsByName = await this.prisma.crop.groupBy({
      by: ["name"],
      _count: true,
    });

    const farmsByCulture = cropsByName.map((crop) => ({
      culture: crop.name,
      count: crop._count,
    }));

    const landUse: DashboardOutput["landUse"] = [
      { type: "agricultavel", total: farmAggregate._sum.cultivatedArea ?? 0 },
      { type: "vegetacao", total: farmAggregate._sum.vegetationArea ?? 0 },
    ];

    return {
      totalFarms: farmAggregate._count.id,
      totalHectares: farmAggregate._sum.totalArea ?? 0,
      farmsByState,
      farmsByCulture,
      landUse,
    };
  }
}
