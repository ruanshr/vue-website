<template>
  <div ref="editor"></div>
</template>
<script lang="ts">
import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  ref,
  toRefs,
  watch
} from "vue";
import WangEditor from "wangeditor";
import { ApiUpload } from "@/api";

export default defineComponent({
  name: "Editor",
  props: {
    modelValue: {
      type: String,
      default: ""
    }
  },
  setup(props, context) {
    const editor = ref();
    let instance: WangEditor | null;
    const { modelValue } = toRefs(props);

    onMounted(() => {
      instance = new WangEditor(editor.value);
      instance.config.menus = [
        "head",
        "bold",
        "fontSize",
        "fontName",
        "italic",
        "underline",
        "strikeThrough",
        "indent",
        // "lineHeight",
        "foreColor",
        "backColor",
        "link",
        "list",
        "justify",
        "quote",
        // "emoticon",
        "image",
        "video",
        "table",
        // "code",
        "splitLine",
        "undo",
        "redo"
      ];
      instance.config.onchange = (newhtml: string) => {
        context.emit("update:modelValue", newhtml);
      };
      instance.config.focus = false;
      instance.config.uploadImgMaxLength = 1;
      instance.config.customUploadImg = function(
        resultFiles: [File],
        insertImgFn: (imgurl: string) => {}
      ) {
        if (resultFiles.length > 0) {
          const file = resultFiles[0];
          const form = new FormData();
          form.append("file", file);
          ApiUpload(form).then((res: any) => {
            if (res.retCode === "1") {
              insertImgFn(res.data.file);
            }
          });
        }
        // resultFiles 是 input 中选中的文件列表
        // insertImgFn 是获取图片 url 后，插入到编辑器的方法
      };
      instance.config.zIndex = 5;
      instance.create();
      // 初始化内容
      instance.txt.html(modelValue.value);
    });
    // 初始化内容
    watch(modelValue, val => {
      if (val !== instance?.txt.html()) {
        instance?.txt.html(val);
      }
    });

    onBeforeUnmount(() => {
      if (instance) {
        instance.destroy();
      }
      instance = null;
    });
    return {
      editor
    };
  }
});
</script>
