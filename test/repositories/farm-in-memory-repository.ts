import {
  PaginatedResult,
  PaginationParams,
} from "src/application/repositories/base";
import { FarmRepository } from "src/application/repositories/farm-repository";
import { Farm } from "src/domain/entities/farm";

export class FarmInMemoryRepository implements FarmRepository {
  farms: Farm[] = [];

  async create(farm: Farm): Promise<Farm> {
    this.farms.push(farm);
    return farm;
  }

  async findById(id: string): Promise<Farm | null> {
    return this.farms.find((farm) => farm.id === id) ?? null;
  }

  async findAll(params: PaginationParams): Promise<PaginatedResult<Farm>> {
    const { page = 1, perPage = 10, orderBy, where } = params;

    let filteredFarms = [...this.farms];

    if (where) {
      filteredFarms = filteredFarms.filter((farm) => {
        return Object.entries(where).every(([key, value]) => {
          const field = farm[key as keyof Farm];

          return field === value;
        });
      });
    }

    if (orderBy) {
      filteredFarms = filteredFarms.sort((a, b) => {
        const aValue = a[orderBy as keyof Farm];
        const bValue = b[orderBy as keyof Farm];

        if (aValue === undefined || bValue === undefined) return 0;

        if (typeof aValue === "string" && typeof bValue === "string") {
          return aValue.localeCompare(bValue);
        }

        if (typeof aValue === "number" && typeof bValue === "number") {
          return aValue - bValue;
        }

        if (aValue instanceof Date && bValue instanceof Date) {
          return aValue.getTime() - bValue.getTime();
        }

        return 0;
      });
    }

    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const paginatedFarms = filteredFarms.slice(startIndex, endIndex);

    return {
      data: paginatedFarms,
      meta: {
        total: filteredFarms.length,
        page,
        perPage,
        totalPages: Math.ceil(filteredFarms.length / perPage),
      },
    };
  }

  async update(farm: Farm): Promise<void> {
    const farmIndex = this.farms.findIndex((p) => p.id === farm.id);
    this.farms[farmIndex] = farm;
  }

  async delete(id: string): Promise<void> {
    this.farms = this.farms.filter((farm) => farm.id !== id);
  }
}
