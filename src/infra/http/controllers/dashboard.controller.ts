import { Controller, Get, Logger } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { DashboardQuery } from "src/application/queries/dashboard-query";
import { DashboardResponseDto } from "../dtos/response/dashboard-response-dto";

@ApiTags("Dashboard")
@Controller("dashboard")
export class DashboardController {
  private readonly logger = new Logger(DashboardController.name);

  constructor(private readonly dashboardQuery: DashboardQuery) {}

  @Get()
  @ApiOperation({ summary: "Dashboard Query" })
  @ApiResponse({
    status: 200,
    type: DashboardResponseDto,
    description: "Data to serve the dashboard",
  })
  async getDashboard(): Promise<DashboardResponseDto> {
    this.logger.log(`getDashboard() called`);
    try {
      const data = await this.dashboardQuery.getDashboardData();
      this.logger.log(`getDashboard() success`);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(
          `getDashboard() failed: ${error.message}`,
          error.stack,
        );
      }
      throw error;
    }
  }
}
