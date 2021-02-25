<template>
  <div class="page-container">
    <a-card :bordered="false">
      <a-form layout="vertical" :model="form" style="max-width: 800px;">
        <a-form-item label="Logo" required>
          <ImageUpload v-model="form.logoImage" />
        </a-form-item>
        <a-form-item label="公众号" required>
          <ImageUpload v-model="form.gzhImage" />
        </a-form-item>
        <a-form-item label="版权信息" required>
          <a-input
            v-model:value="form.copyright"
            placeholder="请输入版权所有文案"
          />
        </a-form-item>
        <a-form-item label="备案号" required>
          <a-input v-model:value="form.caseNumber" placeholder="请输入备案号" />
        </a-form-item>
        <a-form-item label="服务热线" required>
          <a-input v-model:value="form.hotline" placeholder="请输入服务热线" />
        </a-form-item>
        <a-form-item label="服务热线说明" required>
          <a-input
            v-model:value="form.hotlineInfo"
            placeholder="请输入服务热线说明"
          />
        </a-form-item>
        <a-form-item label="客服">
          <a-input
            v-model:value="form.customerService"
            placeholder="请输入客服相关信息"
          />
        </a-form-item>
        <a-form-item label="公司信息">
          <Editor v-model="form.companyInfo" />
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
import { Siteinfo } from "@/api/siteinfo";
import { ApiSite } from "@/api";
import { useForm } from "@ant-design-vue/use";
import { useMessage } from "@/utils/hooks";
import ImageUpload from "@/components/ImageUpload.vue";
import Editor from "@/components/Editor.vue";

export default defineComponent({
  name: "Siteinfo",
  components: {
    ImageUpload,
    Editor
  },
  setup(_, { emit }) {
    const form = reactive<Siteinfo>({
      logoImage: "",
      gzhImage: "",
      copyright: "",
      caseNumber: "",
      hotline: "",
      hotlineInfo: "",
      customerService: "",
      companyInfo: ""
    });
    const rules = reactive({
      logoImage: [{ required: true, message: "请上传Logo" }],
      gzhImage: [{ required: true, message: "请上传公众号二维码" }],
      caseNumber: [{ required: true, message: "请输入备案号" }]
    });
    const { validate } = useForm(form, rules);
    const $message = useMessage();
    const onSave = async () => {
      try {
        await validate();
        const data = toRaw(form);
        const res = await ApiSite.update(data);
        if (res.retCode === "1") {
          $message.success("修改成功");
          emit("update", true);
        }
      } catch (err) {
        $message.error(err.errorFields[0].errors[0]);
      }
    };

    const query = async () => {
      const res = await ApiSite.get();
      if (res.retCode === "1") {
        form.logoImage = res.data.logoImage;
        form.gzhImage = res.data.gzhImage;
        form.copyright = res.data.copyright;
        form.caseNumber = res.data.caseNumber;
        form.hotline = res.data.hotline;
        form.hotlineInfo = res.data.hotlineInfo;
        form.customerService = res.data.customerService;
        form.companyInfo = res.data.companyInfo;
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
