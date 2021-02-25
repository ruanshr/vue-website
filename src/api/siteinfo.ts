import http from "@/utils/http";
import { ResponseData } from "@/types/common";
import { APIURL } from "@/utils/config";

export type Siteinfo = {
  logoImage: string;
  gzhImage: string;
  copyright: string;
  caseNumber: string;
  hotline: string;
  hotlineInfo: string;
  customerService: string;
  companyInfo: string;
};

export function get() {
  return http.get<ResponseData, ResponseData>(`${APIURL}/item/websiteinfo`);
}

export function update(site: Siteinfo) {
  return http.put<ResponseData, ResponseData>(
    `${APIURL}/item/websiteinfo`,
    site
  );
}
