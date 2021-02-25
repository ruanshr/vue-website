<template>
  <div>
    <a-form layout="vertical" :model="form">
      <a-form-item label="标题" required>
        <a-input v-model:value="form.title" placeholder="请输入标题" />
      </a-form-item>
      <a-form-item label="图片">
        <ImageUpload v-model="form.image" style="height: 110px" />
      </a-form-item>
      <a-form-item label="类型">
        <a-input v-model:value="form.type" />
      </a-form-item>
      <a-form-item label="内容">
        <Editor v-model="form.content" />
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
      <a-form-item>
        <a-button type="primary" @click="onSave">保存</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, reactive, toRaw, toRefs } from "vue";
import { Solution } from "@/api/solution";
import ImageUpload from "@/components/ImageUpload.vue";
import { useMessage } from "@/utils/hooks";
import { ApiSolution } from "@/api";
import Editor from "@/components/Editor.vue";

export default defineComponent({
  name: "SolutionDetail",
  components: {
    ImageUpload,
    Editor
  },
  props: {
    item: {
      type: Object as PropType<Solution | null>,
      required: true
    }
  },
  setup(props, { emit }) {
    const $message = useMessage();
    const form = reactive<Solution>({
      id: undefined,
      title: "",
      image: "",
      content: "",
      type: "",
      sort: 0,
      status: 1
    });

    const { item } = toRefs(props);
    if (item.value) {
      form.id = item.value.id;
      form.title = item.value.title;
      form.image = item.value.image;
      form.content = item.value.content;
      form.type = item.value.type;
      form.sort = item.value.sort;
      form.status = item.value.status;
    }

    const onSave = async () => {
      if (!form.title) {
        $message.error("请输入标题");
        return;
      }
      const data = toRaw(form);
      let res;
      if (!data.id) {
        res = await ApiSolution.add(data);
        if (res.retCode === "1") {
          $message.success("创建成功");
          emit("update", true);
        }
      } else {
        res = await ApiSolution.update(data);
        if (res.retCode === "1") {
          $message.success("修改成功");
          emit("update", true);
        }
      }
    };

    return {
      form,
      onSave
    };
  }
});
</script>
