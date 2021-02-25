<template>
  <div class="page-container">
    <a-card :bordered="false">
      <a-form layout="vertical" :model="form" style="max-width: 500px;">
        <a-form-item label="title" required>
          <a-input
            v-model:value="form.title"
            placeholder="请输入官网的网页标题"
          />
        </a-form-item>
        <a-form-item label="keywords" required>
          <a-textarea
            v-model:value="form.keywords"
            :auto-size="{ minRows: 2 }"
            placeholder="请输入官网的关键字，用于SEO，关键字之间用 , 分隔"
          />
        </a-form-item>
        <a-form-item label="description" required>
          <a-textarea
            v-model:value="form.description"
            :auto-size="{ minRows: 3 }"
            placeholder="请输入官网的描述，用于SEO"
          />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="onSave">保存</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, toRaw } from "vue";
import { SEO } from "@/api/seo";
import { ApiSeo } from "@/api";
import { useForm } from "@ant-design-vue/use";
import { useMessage } from "@/utils/hooks";

export default defineComponent({
  name: "Keyword",
  setup(_, { emit }) {
    const form = reactive<SEO>({
      title: "",
      keywords: "",
      description: ""
    });
    const rules = reactive({
      title: [{ required: true, message: "请输入官网标题" }],
      keywords: [{ required: true, message: "请输入SEO关键字" }],
      description: [{ required: true, message: "请输入SEO描述" }]
    });
    const { validate } = useForm(form, rules);
    const $message = useMessage();
    const onSave = async () => {
      try {
        await validate();
        const data = toRaw(form);
        const res = await ApiSeo.update(data);
        if (res.retCode === "1") {
          $message.success("修改成功");
          emit("update", true);
        }
      } catch (err) {
        $message.error(err.errorFields[0].errors[0]);
      }
    };

    const query = async () => {
      const res = await ApiSeo.get();
      if (res.retCode === "1") {
        form.title = res.data.title;
        form.keywords = res.data.keywords;
        form.description = res.data.description;
      }
    };

    onMounted(() => {
      query();
    });

    return {
      form,
      onSave
    };
  }
});
</script>
