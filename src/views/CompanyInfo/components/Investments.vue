<template>
  <div class="custom-collapse-form-item">
    <div class="hd">
      <label :class="{ required: required }">投资机构</label>
      <PlusCircleOutlined @click="onCreate" style="cursor: pointer;" />
    </div>
    <a-collapse v-model:activeKey="activeKey" accordion :bordered="false">
      <a-collapse-panel
        v-for="(item, index) in investments"
        :key="index + 1 + ''"
        :header="'投资机构' + (index + 1)"
        class="custom-collapse-panel"
      >
        <template #extra
          ><DeleteOutlined @click="onDelete(index, $event)"
        /></template>
        <a-form-item label="名称">
          <a-input v-model:value="item.name" placeholder="请输名称" />
        </a-form-item>
        <a-form-item label="logo">
          <ImageUpload
            v-model="item.logo"
            style="width: 100px; height: 100px;"
          />
        </a-form-item>
        <a-form-item label="描述">
          <a-textarea
            v-model:value="item.profile"
            placeholder="请输描述"
            :auto-size="{ minRows: 2 }"
          />
        </a-form-item>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";
import ImageUpload from "@/components/ImageUpload.vue";
import { DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons-vue";
import { Investment } from "@/api/companyinfo";

export default defineComponent({
  name: "Investments",
  components: {
    ImageUpload,
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
    const investments = ref<Investment[]>([]);
    // 初始化
    watchEffect(() => {
      investments.value = props.modelValue as Investment[];
    });

    const activeKey = ref("");

    const onCreate = () => {
      investments.value.push({
        name: "",
        logo: "",
        profile: ""
      });
      activeKey.value = String(investments.value.length);
      emit("update:modelValue", investments.value);
    };
    const onDelete = (index: number, event: MouseEvent) => {
      event.stopPropagation();
      investments.value.splice(index, 1);
      emit("update:modelValue", investments.value);
    };

    return {
      investments,
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
