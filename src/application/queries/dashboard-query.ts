export type DashboardOutput = {
  totalFarms: number;
  totalHectares: number;
  farmsByState: { state: string; count: number }[];
  farmsByCulture: { culture: string; count: number }[];
  landUse: { type: "agricultavel" | "vegetacao"; total: number }[];
};

export abstract class DashboardQuery {
  abstract getDashboardData(): Promise<DashboardOutput>;
}
