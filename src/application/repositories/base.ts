export type PaginationParams<Where, OrderBy> = {
  page?: number;
  perPage?: number;
  where?: Where;
  orderBy?: OrderBy;
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
  abstract findAll(
    params?: PaginationParams<unknown, unknown>,
  ): Promise<PaginatedResult<T>>;
  abstract update(data: T): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
