<template>
  <div class="custom-collapse-form-item">
    <div class="hd">
      <label :class="{ required: required }">所获荣誉</label>
      <PlusCircleOutlined @click="onCreate" style="cursor: pointer;" />
    </div>
    <a-collapse v-model:activeKey="activeKey" accordion :bordered="false">
      <a-collapse-panel
        v-for="(item, index) in honors"
        :key="index + 1 + ''"
        :header="'所获荣誉' + (index + 1)"
        class="custom-collapse-panel"
      >
        <template #extra
          ><DeleteOutlined @click="onDelete(index, $event)"
        /></template>
        <a-form-item label="年份">
          <a-input v-model:value="item.year" placeholder="请输年份" />
        </a-form-item>
        <a-form-item label="季度">
          <a-input v-model:value="item.quarter" placeholder="请输季度" />
        </a-form-item>
        <a-form-item label="事件">
          <a-textarea
            v-model:value="item.events"
            placeholder="请输事件"
            :auto-size="{ minRows: 3 }"
          />
        </a-form-item>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";
import { DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons-vue";
import { Honor } from "@/api/companyinfo";

export default defineComponent({
  name: "Cultures",
  components: {
    DeleteOutlined,
    PlusCircleOutlined
  },
  props: {
    modelValue: {
      type: Array,
      default: () => []
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const honors = ref<Honor[]>([]);
    // 初始化
    watchEffect(() => {
      honors.value = props.modelValue as Honor[];
    });
    const activeKey = ref("");

    const onCreate = () => {
      honors.value.push({
        year: "",
        quarter: "",
        events: ""
      });
      activeKey.value = String(honors.value.length);
      emit("update:modelValue", honors.value);
    };
    const onDelete = (index: number, event: MouseEvent) => {
      event.stopPropagation();
      honors.value.splice(index, 1);
      emit("update:modelValue", honors.value);
    };

    return {
      honors,
      onCreate,
      onDelete,
      activeKey
    };
  }
});
</script>
<style lang="less" scoped>
.custom-collapse-form-item {
  .hd {
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 1.5715;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
  }
  .required::before {
    content: "*";
    display: inline-block;
    margin-right: 4px;
    line-height: 1;
    font-size: 14px;
    color: #f5222d;
  }
}
</style>
