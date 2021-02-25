<template>
  <div class="custom-collapse-form-item">
    <div class="hd">
      <label :class="{ required: required }">发展历程</label>
      <PlusCircleOutlined @click="onCreate" style="cursor: pointer;" />
    </div>
    <a-collapse v-model:activeKey="activeKey" accordion :bordered="false">
      <a-collapse-panel
        v-for="(item, index) in developments"
        :key="index + 1 + ''"
        :header="'发展历程' + (index + 1)"
        class="custom-collapse-panel"
      >
        <template #extra
          ><DeleteOutlined @click="onDelete(index, $event)"
        /></template>
        <a-form-item label="时间">
          <a-input v-model:value="item.date" placeholder="请输时间" />
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
import { Development } from "@/api/companyinfo";

export default defineComponent({
  name: "Developments",
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
    const developments = ref<Development[]>([]);
    // 初始化
    watchEffect(() => {
      developments.value = props.modelValue as Development[];
    });

    const activeKey = ref("");

    const onCreate = () => {
      developments.value.push({
        date: "",
        events: ""
      });
      activeKey.value = String(developments.value.length);
      emit("update:modelValue", developments.value);
    };
    const onDelete = (index: number, event: MouseEvent) => {
      event.stopPropagation();
      developments.value.splice(index, 1);
      emit("update:modelValue", developments.value);
    };

    return {
      developments,
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
