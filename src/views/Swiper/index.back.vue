<template>
  <div class="page-container">
    <a-card :bordered="false">
      <a-button type="primary" @click="onCreate" style="margin-bottom: 15px;">
        <template v-slot:icon><PlusOutlined /></template>创建
      </a-button>
      <a-table
        :columns="columns"
        :data-source="tableData"
        :bordered="true"
        :loading="loading"
        :pagination="pagination"
        @change="onTableChange"
        rowKey="id"
      >
        <template v-slot:image="{ record }">
          <img :src="record.image" :alt="record.title || ''" />
        </template>
        <template v-slot:status="{ record }">
          <a-tag color="green" v-if="record.status === 1">显示</a-tag>
          <a-tag v-if="record.status === 0">隐藏</a-tag>
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
      width="500"
      destroyOnClose
    >
      <Detail :item="currentItem" @update="onDetailUpdate" />
    </a-drawer>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, toRaw } from "vue";
import { PlusOutlined } from "@ant-design/icons-vue";
import { PaginationConfig } from "@/types/common";
import Detail from "./detail.vue";
import { ApiSwiper } from "@/api";
import { Banner } from "@/api/swiper";
import { useMessage } from "@/utils/hooks";

export default defineComponent({
  name: "Swiper",
  components: {
    PlusOutlined,
    Detail
  },
  setup() {
    const columns = [
      {
        title: "图片",
        key: "image",
        slots: { customRender: "image" }
      },
      {
        title: "标题",
        dataIndex: "title",
        key: "title"
      },
      {
        title: "链接",
        dataIndex: "url",
        key: "url"
      },
      {
        title: "排序",
        dataIndex: "sort",
        key: "sort"
      },
      {
        title: "状态",
        key: "status",
        slots: { customRender: "status" }
      },
      {
        title: "操作",
        key: "action",
        width: 200,
        slots: { customRender: "action" }
      }
    ];
    const tableData = ref<Banner[]>([]);
    const pagination = ref<PaginationConfig>({
      current: 1,
      pageSize: 10,
      total: 0
    });
    const loading = ref(false);
    const query = async () => {
      loading.value = true;
      const res = await ApiSwiper.list({
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

    const showDrawer = ref<boolean>(false);
    const currentItem = ref<Banner | null>(null);
    const onCreate = () => {
      currentItem.value = null;
      showDrawer.value = true;
    };
    const onEdit = (record: Banner) => {
      currentItem.value = toRaw(record);
      showDrawer.value = true;
    };

    const $message = useMessage();
    const delConfirm = async (record: Banner) => {
      if (record.id) {
        const res = await ApiSwiper.del(record.id);
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

    onMounted(() => {
      query();
    });

    return {
      columns,
      tableData,
      pagination,
      loading,
      onTableChange,
      showDrawer,
      currentItem,
      onCreate,
      onEdit,
      delConfirm,
      delCancel,
      onDetailUpdate
    };
  }
});
</script>
