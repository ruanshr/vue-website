<template>
  <div class="custom-collapse-form-item">
    <div class="hd">
      <label :class="{ required: required }">公司文化</label>
      <PlusCircleOutlined @click="onCreate" style="cursor: pointer;" />
    </div>
    <a-collapse v-model:activeKey="activeKey" accordion :bordered="false">
      <a-collapse-panel
        v-for="(item, index) in cultures"
        :key="index + 1 + ''"
        :header="'公司文化' + (index + 1)"
        class="custom-collapse-panel"
      >
        <template #extra
          ><DeleteOutlined @click="onDelete(index, $event)"
        /></template>
        <a-form-item label="名称">
          <a-input v-model:value="item.title" placeholder="请输名称" />
        </a-form-item>
        <a-form-item label="英文名称">
          <a-input v-model:value="item.etitle" placeholder="请输英文名称" />
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
import { Culture } from "@/api/companyinfo";

export default defineComponent({
  name: "Cultures",
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
    const cultures = ref<Culture[]>([]);
    // 初始化
    watchEffect(() => {
      cultures.value = props.modelValue as Culture[];
    });
    const activeKey = ref("");

    const onCreate = () => {
      cultures.value.push({
        title: "",
        etitle: "",
        logo: "",
        profile: ""
      });
      activeKey.value = String(cultures.value.length);
      emit("update:modelValue", cultures.value);
    };
    const onDelete = (index: number, event: MouseEvent) => {
      event.stopPropagation();
      cultures.value.splice(index, 1);
      emit("update:modelValue", cultures.value);
    };

    return {
      cultures,
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
