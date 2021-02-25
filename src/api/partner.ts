import http from "@/utils/http";
import { ResponseData } from "@/types/common";
import { APIURL } from "@/utils/config";

export type Partner = {
  id: number | undefined;
  title: string;
  image: string;
  url: string;
  sort: number;
  status: 0 | 1;
};
type PartnerQuery = Partial<Pick<Partner, "title" | "status">> & {
  pageNum: number;
  pageSize: number;
};

export function list(query: PartnerQuery) {
  return http.get<ResponseData, ResponseData>(`${APIURL}/partner`, {
    params: {
      ...query
    }
  });
}
export function add(partner: Omit<Partner, "id">) {
  return http.post<ResponseData, ResponseData>(`${APIURL}/partner`, partner);
}
export function update(partner: Partner) {
  const noId = {
    ...partner,
    id: undefined
  };
  return http.put<ResponseData, ResponseData>(
    `${APIURL}/partner/${partner.id}`,
    noId
  );
}
export function del(partnerId: number) {
  return http.delete<ResponseData, ResponseData>(
    `${APIURL}/partner/${partnerId}`
  );
}
