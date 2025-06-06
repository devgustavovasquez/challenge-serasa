import { Controller, Get } from "@nestjs/common";
import { DashboardQuery } from "src/application/queries/dashboard-query";

@Controller("dashboard")
export class DashboardController {
  constructor(private readonly dashboardQuery: DashboardQuery) {}

  @Get()
  async getDashboard() {
    return this.dashboardQuery.getDashboardData();
  }
}
