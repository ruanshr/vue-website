import http from "@/utils/http";
import { ResponseData } from "@/types/common";
import { APIURL } from "@/utils/config";

export type SEO = {
  title: string;
  keywords: string;
  description: string;
};

export function get() {
  return http.get<ResponseData, ResponseData>(`${APIURL}/item/seo`);
}

export function update(seo: SEO) {
  return http.put<ResponseData, ResponseData>(`${APIURL}/item/seo`, seo);
}
