import http from "@/utils/http";
import { ResponseData } from "@/types/common";
import { APIURL } from "@/utils/config";

export type Culture = {
  title: string;
  etitle: string;
  logo: string;
  profile: string;
};
export type Investment = {
  name: string;
  logo: string;
  profile: string;
};
export type Development = {
  date: string;
  events: string;
};
export type Honor = {
  year: string;
  quarter: string;
  events: string;
};
export type CompanyInfo = {
  title: string;
  slogan: string;
  overview: string;
  cultures: Culture[];
  investmentAgencies: Investment[];
  developmentPath: Development[];
  honors: Honor[];
};

export function get() {
  return http.get<ResponseData, ResponseData>(`${APIURL}/item/companyinfo`);
}

export function update(cinfo: CompanyInfo) {
  return http.put<ResponseData, ResponseData>(
    `${APIURL}/item/companyinfo`,
    cinfo
  );
}
