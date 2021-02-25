import http from "@/utils/http";
import { ResponseData } from "@/types/common";
import { APIURL } from "@/utils/config";

export type PostType = "article" | "news";

export type Post = {
  id: number | undefined;
  title: string;
  type: PostType;
  content: string;
  status: 0 | 1; // 0:下线 1:上线
  author: string;
  publicationDate: Date;
  sort: number;
  reading: number;
  keywords: string;
  description: string;
};

type PostQuery = Partial<Pick<Post, "title" | "type" | "status">> & {
  pageNum: number;
  pageSize: number;
};

export function list(query: PostQuery) {
  return http.get<ResponseData, ResponseData>(`${APIURL}/content`, {
    params: {
      ...query
    }
  });
}
export function add(post: Omit<Post, "id" | "publicationDate" | "reading">) {
  return http.post<ResponseData, ResponseData>(`${APIURL}/content`, post);
}
export function update(post: Omit<Post, "publicationDate" | "reading">) {
  const noIdPost = {
    ...post,
    id: undefined
  };
  return http.put<ResponseData, ResponseData>(
    `${APIURL}/content/${post.id}`,
    noIdPost
  );
}
export function del(postId: number) {
  return http.delete<ResponseData, ResponseData>(`${APIURL}/content/${postId}`);
}
