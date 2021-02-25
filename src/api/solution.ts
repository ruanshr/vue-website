import http from "@/utils/http";
import { ResponseData } from "@/types/common";
import { APIURL } from "@/utils/config";

export type Solution = {
  id: number | undefined;
  title: string;
  image: string;
  sort: number;
  status: 0 | 1;
  content: string;
  type: string;
};
type SolutionQuery = Partial<Pick<Solution, "title" | "status">> & {
  pageNum: number;
  pageSize: number;
};

export function list(query: SolutionQuery) {
  return http.get<ResponseData, ResponseData>(`${APIURL}/solution`, {
    params: {
      ...query
    }
  });
}
export function add(solution: Omit<Solution, "id">) {
  return http.post<ResponseData, ResponseData>(`${APIURL}/solution`, solution);
}
export function update(solution: Solution) {
  const noId = {
    ...solution,
    id: undefined
  };
  return http.put<ResponseData, ResponseData>(
    `${APIURL}/solution/${solution.id}`,
    noId
  );
}
export function del(solutionId: number) {
  return http.delete<ResponseData, ResponseData>(
    `${APIURL}/solution/${solutionId}`
  );
}
