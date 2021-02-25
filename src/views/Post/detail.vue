<template>
  <div>
    <a-form layout="vertical" :model="form">
      <a-form-item label="标题" required>
        <a-input v-model:value="form.title" placeholder="请输入文章标题" />
      </a-form-item>
      <a-form-item label="类别" required>
        <a-radio-group v-model:value="form.type">
          <a-radio value="article">
            文章
          </a-radio>
          <a-radio value="news">
            简讯
          </a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="状态" required>
        <a-radio-group v-model:value="form.status">
          <a-radio :value="1">
            显示
          </a-radio>
          <a-radio :value="0">
            隐藏
          </a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="作者">
        <a-input v-model:value="form.author" placeholder="填写自定义文章作者" />
      </a-form-item>
      <a-form-item>
        <template v-slot:label
          >排序<small style="color: #999"
            >(数字越小越前面，默认值为0)</small
          ></template
        >
        <a-input v-model:value="form.sort" type="number" />
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
      <a-form-item label="内容" required :autoLink="false">
        <Editor v-model="form.content" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="onSave">保存</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, PropType, toRaw } from "vue";
import Editor from "@/components/Editor.vue";
import { Post } from "@/api/post";
import { useForm } from "@ant-design-vue/use";
import { ApiPost } from "@/api";
import { useMessage } from "@/utils/hooks";

export default defineComponent({
  name: "PostDetail",
  components: {
    Editor
  },
  props: {
    post: Object as PropType<Post>
  },
  setup(props, { emit }) {
    const form = reactive<Omit<Post, "publicationDate" | "reading">>({
      id: undefined,
      title: "",
      type: "article",
      content: "",
      status: 1,
      author: "",
      sort: 0,
      keywords: "",
      description: ""
    });
    const rules = reactive({
      title: [{ required: true, message: "请输入文章标题" }],
      content: [{ required: true, message: "请输入文章内容" }]
    });
    const { post } = toRefs(props);
    if (post && post.value) {
      form.id = post.value.id;
      form.title = post.value.title;
      form.type = post.value.type;
      form.content = post.value.content;
      form.status = post.value.status;
      form.author = post.value.author;
      form.sort = post.value.sort;
      form.keywords = post.value.keywords;
      form.description = post.value.description;
    }

    const { validate } = useForm(form, rules);
    const $message = useMessage();
    const onSave = async () => {
      try {
        await validate();
        let res;
        if (!form.id) {
          res = await ApiPost.add(toRaw(form));
          if (res.retCode === "1") {
            $message.success("创建成功");
            emit("update", true);
          }
        } else {
          res = await ApiPost.update(toRaw(form));
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
