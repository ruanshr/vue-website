<template>
  <div class="page-container">
    <a-card :bordered="false">
      <a-form layout="vertical" :model="form" style="max-width: 800px;">
        <a-form-item>
          <a-form-item label="标题" required>
            <a-input v-model:value="form.title" placeholder="请输标题" />
          </a-form-item>
          <a-form-item label="标语" required>
            <a-textarea
              v-model:value="form.slogan"
              placeholder="请输标语"
              :auto-size="{ minRows: 2 }"
            />
          </a-form-item>
          <a-form-item label="公司概况" required>
            <Editor v-model="form.overview" />
          </a-form-item>
          <Cultures v-model="form.cultures" required />
          <Investments v-model="form.investmentAgencies" />
          <Developments v-model="form.developmentPath" />
          <Honors v-model="form.honors" />
          <a-button type="primary" @click="onSave">保存</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, toRaw } from "vue";
import { CompanyInfo } from "@/api/companyinfo";
import { ApiCompanyinfo } from "@/api";
import { useForm } from "@ant-design-vue/use";
import { useMessage } from "@/utils/hooks";
import Editor from "@/components/Editor.vue";
import Cultures from "./components/Cultures.vue";
import Investments from "./components/Investments.vue";
import Developments from "./components/Developments.vue";
import Honors from "./components/Honors.vue";

export default defineComponent({
  name: "CompanyInfo",
  components: {
    Editor,
    Cultures,
    Investments,
    Developments,
    Honors
  },
  setup(_, { emit }) {
    const form = reactive<CompanyInfo>({
      title: "",
      slogan: "",
      overview: "",
      cultures: [],
      investmentAgencies: [],
      developmentPath: [],
      honors: []
    });
    const rules = reactive({
      title: [{ required: true, message: "请输入标题" }],
      slogan: [{ required: true, message: "请输入标语" }],
      overview: [{ required: true, message: "请输入公司概况" }]
    });

    const { validate } = useForm(form, rules);
    const $message = useMessage();
    const validateArr: { <T extends {}>(arr: T[]): number } = (arr): number => {
      for (let i = 0; i < arr.length; i++) {
        const hasEmpty = Object.values(arr[i]).indexOf("") > -1;
        if (hasEmpty) {
          return i;
        }
      }
      return -1;
    };
    const onSave = async () => {
      try {
        await validate();
        const data = toRaw(form);

        if (data.cultures.length > 0) {
          const errIndex = validateArr(data.cultures);
          if (errIndex > -1) {
            $message.error(`公司文化${errIndex + 1}信息不完整`);
            return;
          }
        }
        if (data.investmentAgencies.length > 0) {
          const errIndex = validateArr(data.investmentAgencies);
          if (errIndex > -1) {
            $message.error(`投资机构${errIndex + 1}信息不完整`);
            return;
          }
        }
        if (data.developmentPath.length > 0) {
          const errIndex = validateArr(data.developmentPath);
          if (errIndex > -1) {
            $message.error(`发展历程${errIndex + 1}信息不完整`);
            return;
          }
        }
        if (data.honors.length > 0) {
          const errIndex = validateArr(data.honors);
          if (errIndex > -1) {
            $message.error(`所获荣誉${errIndex + 1}信息不完整`);
            return;
          }
        }
        const res = await ApiCompanyinfo.update(data);
        if (res.retCode === "1") {
          $message.success("修改成功");
          emit("update", true);
        }
      } catch (err) {
        $message.error(err.errorFields[0].errors[0]);
      }
    };

    const query = async () => {
      const res = await ApiCompanyinfo.get();
      if (res.retCode === "1") {
        form.title = res.data.title;
        form.slogan = res.data.slogan;
        form.overview = res.data.overview;
        form.cultures = res.data.cultures;
        form.investmentAgencies = res.data.investmentAgencies;
        form.developmentPath = res.data.developmentPath;
        form.honors = res.data.honors;
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
