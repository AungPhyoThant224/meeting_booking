export default interface Response<T> {
  status: number;
  message: string;
  data: T;
}

export interface PaginatedData<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    lastPage: number;
  };
}