export interface PaginationConfig {
  current: number;
  pageSize: number;
  total: number;
}

export interface ResponseData {
  data: any;
  retCode: string;
  retMsg: string;
  [key: string]: any;
}
