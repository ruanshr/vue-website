import http from "@/utils/http";
import { ResponseData } from "@/types/common";
import { APIURL } from "@/utils/config";

export type User = {
  id: number | undefined;
  account: string;
  password: string;
  name: string;
  status: 0 | 1;
  email: string;
  type: 1 | 2; // 1 管理员 / 2 编辑员
};

export function signin(user: Pick<User, "account" | "password">) {
  return http.post<ResponseData, ResponseData>(`${APIURL}/login`, {
    ...user
  });
}
export function signout() {
  return http.delete<ResponseData, ResponseData>(`${APIURL}/login`);
}
export function get() {
  return http.get<ResponseData, ResponseData>(`${APIURL}/login`);
}
export function update(chgpass: { oldPassword: string; newPassword: string }) {
  return http.put<ResponseData, ResponseData>(`${APIURL}/login`, chgpass);
}
