import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { DashboardQuery } from "src/application/queries/dashboard-query";
import { DashboardResponseDto } from "../dtos/response/dashboard-response-dto";

@ApiTags("Dashboard")
@Controller("dashboard")
export class DashboardController {
  constructor(private readonly dashboardQuery: DashboardQuery) {}

  @Get()
  @ApiOperation({ summary: "Dashboard Query" })
  @ApiResponse({
    status: 200,
    type: DashboardResponseDto,
    description: "Data to serve the dashboard",
  })
  async getDashboard() {
    return this.dashboardQuery.getDashboardData();
  }
}
