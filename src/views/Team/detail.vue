<template>
  <div>
    <a-form layout="vertical" :model="form">
      <a-form-item label="名字" required>
        <a-input v-model:value="form.name" />
      </a-form-item>
      <a-form-item label="职位" required>
        <a-input v-model:value="form.position" />
      </a-form-item>
      <a-form-item label="图片" required>
        <ImageUpload
          v-model="form.image"
          style="width: 100px; height: 100px;"
        />
      </a-form-item>
      <a-form-item label="介绍" :autoLink="false">
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
import { Team } from "@/api/team";
import ImageUpload from "@/components/ImageUpload.vue";
import Editor from "@/components/Editor.vue";
import { useMessage } from "@/utils/hooks";
import { ApiTeam } from "@/api";
import { useForm } from "@ant-design-vue/use";

export default defineComponent({
  name: "TeamDetail",
  components: {
    ImageUpload,
    Editor
  },
  props: {
    item: {
      type: Object as PropType<Team | null>,
      required: true
    }
  },
  setup(props, { emit }) {
    const $message = useMessage();
    const form = reactive<Team>({
      id: undefined,
      name: "",
      position: "",
      image: "",
      content: "",
      sort: 0,
      status: 1
    });

    const rules = reactive({
      name: [{ required: true, message: "请输入名字" }],
      position: [{ required: true, message: "请输入职位" }],
      image: [{ required: true, message: "请上传图片" }]
    });

    const { item } = toRefs(props);
    if (item.value) {
      form.id = item.value.id;
      form.name = item.value.name;
      form.position = item.value.position;
      form.image = item.value.image;
      form.content = item.value.content;
      form.sort = item.value.sort;
      form.status = item.value.status;
    }
    const { validate } = useForm(form, rules);

    const onSave = async () => {
      try {
        await validate();
        const data = toRaw(form);
        let res;
        if (!data.id) {
          res = await ApiTeam.add(data);
          if (res.retCode === "1") {
            $message.success("创建成功");
            emit("update", true);
          }
        } else {
          res = await ApiTeam.update(data);
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
