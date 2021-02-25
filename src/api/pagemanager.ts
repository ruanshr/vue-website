import http from "@/utils/http";
import { ResponseData } from "@/types/common";
import { APIURL } from "@/utils/config";

export type PageManager = {
  id: number | undefined;
  title: string;
  url: string;
  sort: number;
  status: 0 | 1;
  keywords: string;
  description: string;
};
type PageManagerQuery = Partial<Pick<PageManager, "title" | "status">> & {
  pageNum: number;
  pageSize: number;
};

export function list(query: PageManagerQuery) {
  return http.get<ResponseData, ResponseData>(`${APIURL}/navigationbar`, {
    params: {
      ...query
    }
  });
}
export function add(page: Omit<PageManager, "id">) {
  return http.post<ResponseData, ResponseData>(`${APIURL}/navigationbar`, page);
}
export function update(page: PageManager) {
  const noId = {
    ...page,
    id: undefined
  };
  return http.put<ResponseData, ResponseData>(
    `${APIURL}/navigationbar/${page.id}`,
    noId
  );
}
export function del(pageId: number) {
  return http.delete<ResponseData, ResponseData>(
    `${APIURL}/navigationbar/${pageId}`
  );
}
