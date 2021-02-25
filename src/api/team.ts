import http from "@/utils/http";
import { ResponseData } from "@/types/common";
import { APIURL } from "@/utils/config";

export type Team = {
  id: number | undefined;
  name: string;
  position: string;
  image: string;
  sort: number;
  content: string;
  status: 0 | 1;
};
type TeamQuery = Partial<Pick<Team, "name" | "status">> & {
  pageNum: number;
  pageSize: number;
};

export function list(query: TeamQuery) {
  return http.get<ResponseData, ResponseData>(`${APIURL}/managenmentteam`, {
    params: {
      ...query
    }
  });
}
export function add(team: Omit<Team, "id">) {
  return http.post<ResponseData, ResponseData>(
    `${APIURL}/managenmentteam`,
    team
  );
}
export function update(team: Team) {
  const noIdTeam = {
    ...team,
    id: undefined
  };
  return http.put<ResponseData, ResponseData>(
    `${APIURL}/managenmentteam/${team.id}`,
    noIdTeam
  );
}
export function del(teamId: number) {
  return http.delete<ResponseData, ResponseData>(
    `${APIURL}/managenmentteam/${teamId}`
  );
}
