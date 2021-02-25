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
          <img class="max-img" :src="record.image" :alt="record.title || ''" />
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
      width="270"
      destroyOnClose
    >
      <Detail :item="currentItem" @update="onDetailUpdate" />
    </a-drawer>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { PlusOutlined } from "@ant-design/icons-vue";
import Detail from "./detail.vue";
import { Partner } from "@/api/partner";
import { ApiPartner } from "@/api";
import { useNormalPage } from "@/utils/hooks";

export default defineComponent({
  name: "Partner",
  components: {
    PlusOutlined,
    Detail
  },
  setup() {
    const columns = [
      {
        title: "标题",
        dataIndex: "title",
        key: "title"
      },
      {
        title: "图片",
        key: "image",
        slots: { customRender: "image" }
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
        dataIndex: "status",
        key: "status"
      },
      {
        title: "操作",
        key: "action",
        width: 200,
        slots: { customRender: "action" }
      }
    ];
    const {
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
    } = useNormalPage<Partner>(ApiPartner);

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
