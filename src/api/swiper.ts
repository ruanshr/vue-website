import http from "@/utils/http";
import { ResponseData } from "@/types/common";
import { APIURL } from "@/utils/config";

export type Banner = {
  id: number | undefined;
  image: string;
  title: string;
  url: string;
  sort: number;
  status: 0 | 1;
};
type BannerQuery = Partial<Pick<Banner, "title" | "status">> & {
  pageNum: number;
  pageSize: number;
};

export function list(query: BannerQuery) {
  return http.get<ResponseData, ResponseData>(`${APIURL}/banner`, {
    params: {
      ...query
    }
  });
}
export function add(banner: Omit<Banner, "id">) {
  return http.post<ResponseData, ResponseData>(`${APIURL}/banner`, banner);
}
export function update(banner: Banner) {
  const noIdBanner = {
    ...banner,
    id: undefined
  };
  return http.put<ResponseData, ResponseData>(
    `${APIURL}/banner/${banner.id}`,
    noIdBanner
  );
}
export function del(bannerId: number) {
  return http.delete<ResponseData, ResponseData>(
    `${APIURL}/banner/${bannerId}`
  );
}
