export interface TableQuery {
  pageSize: number;
  pageIndex: number;
  filterRoles: Array<unknown>;
  viewSlug?: string | null;
  inactiveMode?: boolean;
  sortBy?: Array<{ id: string; desc: boolean }>;
}
