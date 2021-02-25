<template>
  <div class="page-container">
    <a-card :bordered="false">
      <div class="page-querybox">
        <a-form layout="inline" :model="queryParams">
          <a-form-item label="标题">
            <a-input v-model:value="queryParams.title" />
          </a-form-item>
          <a-form-item label="类别">
            <a-select v-model:value="queryParams.type" style="width: 120px">
              <a-select-option value="">全部</a-select-option>
              <a-select-option value="article">文章</a-select-option>
              <a-select-option value="news">简讯</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="状态">
            <a-select v-model:value="queryParams.status" style="width: 120px">
              <a-select-option value="">全部</a-select-option>
              <a-select-option value="1">显示</a-select-option>
              <a-select-option value="0">隐藏</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="onSearch">查询</a-button>
            <a-button style="margin-left: 8px;" @click="onReset">重置</a-button>
          </a-form-item>
        </a-form>
        <a-button type="primary" @click="onCreate">
          <template v-slot:icon><PlusOutlined /></template>创建
        </a-button>
      </div>
      <a-table
        :columns="columns"
        :data-source="tableData"
        :bordered="true"
        :loading="loading"
        :pagination="pagination"
        @change="onTableChange"
        rowKey="id"
      >
        <template v-slot:status="{ record }">
          <a-tag color="green" v-if="record.status === 1">显示</a-tag>
          <a-tag v-if="record.status === 0">隐藏</a-tag>
        </template>
        <template v-slot:publicationDate="{ record }">
          {{ dayjs(record.publicationDate).format("YYYY-MM-DD HH:mm") }}
        </template>
        <template v-slot:action="{ record }">
          <span>
            <a @click="onEdit(record)">编辑</a>
            <a-divider type="vertical" />
            <a-popconfirm
              title="确定删除此条数据吗?"
              ok-text="确定"
              cancel-text="取消"
              @confirm="delConfirm(record)"
              @cancel="delCancel"
            >
              <a>删除</a>
            </a-popconfirm>
          </span>
        </template>
      </a-table>
    </a-card>
    <a-drawer
      title="详情"
      placement="right"
      v-model:visible="showDrawer"
      width="800"
      destroyOnClose
    >
      <Detail :post="currentPost" @update="onDetailUpdate" />
    </a-drawer>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRaw, toRefs } from "vue";
import { PlusOutlined } from "@ant-design/icons-vue";
import Detail from "./detail.vue";
import { ApiPost } from "@/api";
import { Post, PostType } from "@/api/post";
import { PaginationConfig } from "@/types/common";
import { useMessage, useDayjs } from "@/utils/hooks";

export default defineComponent({
  name: "Post",
  components: {
    Detail,
    PlusOutlined
  },
  setup() {
    const state = reactive({
      columns: [
        {
          title: "标题",
          dataIndex: "title",
          key: "title"
        },
        {
          title: "分类",
          dataIndex: "type",
          key: "type"
        },
        {
          title: "状态",
          key: "status",
          slots: { customRender: "status" }
        },
        {
          title: "日期",
          key: "publicationDate",
          slots: { customRender: "publicationDate" },
          width: 200
        },
        {
          title: "操作",
          key: "action",
          width: 200,
          slots: { customRender: "action" }
        }
      ],
      tableData: [],
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0
      },
      loading: false
    });

    const queryParams = reactive<{
      title: string;
      type: PostType | string;
      status: 0 | 1 | string;
    }>({
      title: "",
      type: "",
      status: ""
    });

    const query = async () => {
      const type = (queryParams.type ?? undefined) as PostType;
      const status = (queryParams.status ?? undefined) as 0 | 1;
      const res = await ApiPost.list({
        title: queryParams.title,
        type,
        status,
        pageNum: state.pagination.current,
        pageSize: state.pagination.pageSize
      });
      if (res.retCode === "1") {
        state.tableData = res.data.list;
        state.pagination.total = res.data.total;
      }
    };
    const onSearch = () => {
      state.pagination.current = 1;
      query();
    };
    const onReset = () => {
      queryParams.title = "";
      queryParams.type = "";
      queryParams.status = "";
      query();
    };

    const onTableChange = (pagination: PaginationConfig) => {
      const pager = { ...pagination };
      state.pagination = pager;
      query();
    };

    const showDrawer = ref<boolean>(false);
    const currentPost = ref<Post>();
    const onEdit = (record: Post) => {
      currentPost.value = toRaw(record);
      showDrawer.value = true;
    };
    const onCreate = () => {
      currentPost.value = undefined;
      showDrawer.value = true;
    };

    const $message = useMessage();
    const delConfirm = async (record: Post) => {
      if (record.id) {
        const res = await ApiPost.del(record.id);
        if (res.retCode === "1") {
          await query();
          $message.success("删除成功");
        }
      }
    };
    const delCancel = () => {
      console.log("cancel");
    };

    const onDetailUpdate = () => {
      query();
      showDrawer.value = false;
    };

    const dayjs = useDayjs();

    onMounted(() => {
      query();
    });

    return {
      ...toRefs(state),
      queryParams,
      onSearch,
      onReset,
      onTableChange,
      showDrawer,
      currentPost,
      onEdit,
      onCreate,
      delConfirm,
      delCancel,
      onDetailUpdate,
      dayjs
    };
  }
});
</script>
