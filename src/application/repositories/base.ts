export type PaginationParams = {
  page?: number;
  perPage?: number;
  where?: unknown;
  orderBy?: unknown;
};

export type PaginatedResult<T> = {
  data: T[];
  meta: {
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
  };
};

export abstract class BaseRepository<T> {
  abstract create(data: T): Promise<T>;
  abstract findById(id: string): Promise<T | null>;
  abstract findAll(params?: PaginationParams): Promise<PaginatedResult<T>>;
  abstract update(data: T): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
