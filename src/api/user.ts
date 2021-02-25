import http from "@/utils/http";
import { ResponseData } from "@/types/common";
import { APIURL } from "@/utils/config";

export type User = {
  id: number | undefined;
  account: string;
  password: string | undefined;
  name: string;
  status: 0 | 1;
  email: string;
  type: 1 | 2; // 1 管理员 / 2 编辑员
};
type UserQuery = Partial<Pick<User, "account" | "status">> & {
  pageNum: number;
  pageSize: number;
};

export function list(query: UserQuery) {
  return http.get<ResponseData, ResponseData>(`${APIURL}/user`, {
    params: {
      ...query
    }
  });
}
export function add(user: Omit<User, "id">) {
  return http.post<ResponseData, ResponseData>(`${APIURL}/user`, user);
}
export function update(user: User) {
  const noId = {
    ...user,
    id: undefined
  };
  return http.put<ResponseData, ResponseData>(
    `${APIURL}/user/${user.id}`,
    noId
  );
}
export function del(userId: number) {
  return http.delete<ResponseData, ResponseData>(`${APIURL}/user/${userId}`);
}
