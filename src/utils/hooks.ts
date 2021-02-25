import { getCurrentInstance, Ref, ref, toRaw } from "vue";
import { MessageApi } from "ant-design-vue/lib/message";
import { PaginationConfig } from "@/types/common";
import { ResponseData } from "@/types/common";
import dayjs from "dayjs";

export function useMessage(): MessageApi {
  const instance = getCurrentInstance();
  return instance?.appContext.config.globalProperties.$message;
}

export function useDayjs() {
  return dayjs;
}

type ApiService<T> = {
  list(query: any): Promise<ResponseData>;
  add(item: Omit<T, "id">): Promise<ResponseData>;
  update(item: T): Promise<ResponseData>;
  del(itemid: number): Promise<ResponseData>;
};
type QueryParams = {
  [key: string]: any;
};

export function useNormalPage<T>(
  apiService: ApiService<T>,
  queryParams?: QueryParams
) {
  const tableData = ref<T[]>([]);
  const pagination = ref<PaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0
  });
  const loading = ref(false);
  const query = async () => {
    loading.value = true;
    const res = await apiService.list({
      ...queryParams,
      pageNum: pagination.value.current,
      pageSize: pagination.value.pageSize
    });
    loading.value = false;
    if (res.retCode === "1") {
      tableData.value = res.data.list;
      pagination.value.total = res.data.total;
    }
  };
  const onTableChange = (pager: PaginationConfig) => {
    pagination.value = pager;
    query();
  };
  const $message = useMessage();
  const delConfirm = async (record: T & { id: number }) => {
    if (record.id) {
      const res = await apiService.del(record.id);
      if (res.retCode === "1") {
        await query();
        $message.success("删除成功");
      }
    }
  };
  const delCancel = () => {
    console.log("cancel");
  };

  const showDrawer = ref<boolean>(false);
  const currentItem = ref<T | null>(null) as Ref<T | null>;
  const onCreate = () => {
    currentItem.value = null;
    showDrawer.value = true;
  };
  const onEdit = (record: T) => {
    currentItem.value = toRaw(record);
    showDrawer.value = true;
  };

  const onDetailUpdate = () => {
    query();
    showDrawer.value = false;
  };

  return {
    tableData,
    pagination,
    loading,
    query,
    onTableChange,
    delConfirm,
    delCancel,

    showDrawer,
    currentItem,
    onCreate,
    onEdit,
    onDetailUpdate
  };
}
