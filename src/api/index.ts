import http from "@/utils/http";
import { ResponseData } from "@/types/common";
import * as LoginServices from "./login";
import * as PostServices from "./post";
import * as SwiperServices from "./swiper";
import * as TeamServices from "./team";
import * as PageServices from "./pagemanager";
import * as PartnerServices from "./partner";
import * as SolutionServices from "./solution";
import * as SeoServices from "./seo";
import * as CompanyinfoServices from "./companyinfo";
import * as UserServices from "./user";
import * as SiteServices from "./siteinfo";

export const ApiUpload = (form: FormData): any => {
  return http.post<ResponseData, ResponseData>("/home/file", form);
};

export const ApiLogin = LoginServices;
export const ApiPost = PostServices;
export const ApiSwiper = SwiperServices;
export const ApiTeam = TeamServices;
export const ApiPage = PageServices;
export const ApiPartner = PartnerServices;
export const ApiSolution = SolutionServices;
export const ApiSeo = SeoServices;
export const ApiCompanyinfo = CompanyinfoServices;
export const ApiUser = UserServices;
export const ApiSite = SiteServices;
