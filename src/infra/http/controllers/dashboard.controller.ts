import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { DashboardQuery } from "src/application/queries/dashboard-query";
import { DashboardResponse } from "../dtos/dashboard-dto";

@ApiTags("Dashboard")
@Controller("dashboard")
export class DashboardController {
  constructor(private readonly dashboardQuery: DashboardQuery) {}

  @Get()
  @ApiOperation({ summary: "Dashboard Query" })
  @ApiResponse({
    status: 200,
    type: DashboardResponse,
    description: "Data to serve the dashboard",
  })
  async getDashboard() {
    return this.dashboardQuery.getDashboardData();
  }
}
