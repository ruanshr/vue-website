<template>
  <div>
    <a-form layout="vertical" :model="form">
      <a-form-item label="页面名称" required>
        <a-input v-model:value="form.title" />
      </a-form-item>
      <a-form-item label="链接" required>
        <a-input v-model:value="form.url" />
      </a-form-item>
      <a-form-item label="排序">
        <a-input v-model:value="form.sort" type="number" />
      </a-form-item>
      <a-form-item label="状态">
        <a-radio-group v-model:value="form.status">
          <a-radio :value="1">
            显示
          </a-radio>
          <a-radio :value="0">
            隐藏
          </a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="keywords">
        <a-input
          v-model:value="form.keywords"
          placeholder="关键字，非必填(用于SEO)"
        />
      </a-form-item>
      <a-form-item label="description">
        <a-input
          v-model:value="form.description"
          placeholder="描述，非必填(用于SEO)"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="onSave">保存</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, reactive, toRaw, toRefs } from "vue";
import { PageManager } from "@/api/pagemanager";
import { useMessage } from "@/utils/hooks";
import { useForm } from "@ant-design-vue/use";
import { ApiPage } from "@/api";

export default defineComponent({
  name: "PagesManagerDetail",
  props: {
    item: {
      type: Object as PropType<PageManager | null>,
      required: true
    }
  },
  setup(props, { emit }) {
    const $message = useMessage();
    const form = reactive<PageManager>({
      id: undefined,
      title: "",
      url: "",
      sort: 0,
      status: 1,
      keywords: "",
      description: ""
    });
    const rules = reactive({
      title: [{ required: true, message: "请输入页面名称" }],
      content: [{ required: true, message: "请输入链接" }]
    });

    const { item } = toRefs(props);
    if (item.value) {
      form.id = item.value.id;
      form.title = item.value.title;
      form.url = item.value.url;
      form.sort = item.value.sort;
      form.status = item.value.status;
      form.keywords = item.value.keywords;
      form.description = item.value.description;
    }

    const { validate } = useForm(form, rules);
    const onSave = async () => {
      try {
        await validate();
        const data = toRaw(form);
        let res;
        if (!data.id) {
          res = await ApiPage.add(data);
          if (res.retCode === "1") {
            $message.success("创建成功");
            emit("update", true);
          }
        } else {
          res = await ApiPage.update(data);
          if (res.retCode === "1") {
            $message.success("修改成功");
            emit("update", true);
          }
        }
      } catch (err) {
        $message.error(err.errorFields[0].errors[0]);
      }
    };

    return {
      form,
      onSave
    };
  }
});
</script>
