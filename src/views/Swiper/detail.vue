<template>
  <div>
    <a-form layout="vertical" :model="form">
      <a-form-item label="图片" required>
        <ImageUpload v-model="form.image" />
      </a-form-item>
      <a-form-item label="描述">
        <a-input
          v-model:value="form.title"
          placeholder="请输入图片的文字描述"
        />
      </a-form-item>
      <a-form-item label="链接">
        <a-input v-model:value="form.url" placeholder="请输入图片的链接" />
      </a-form-item>
      <a-form-item>
        <template v-slot:label
          >排序<small style="color: #999"
            >(数字越小越前面，默认值为0)</small
          ></template
        >
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
import { Banner } from "@/api/swiper";
import ImageUpload from "@/components/ImageUpload.vue";
import { useMessage } from "@/utils/hooks";
import { ApiSwiper } from "@/api";

export default defineComponent({
  name: "SwiperDetail",
  components: {
    ImageUpload
  },
  props: {
    item: {
      type: Object as PropType<Banner | null>,
      required: true
    }
  },
  setup(props, { emit }) {
    const $message = useMessage();
    const form = reactive<Banner>({
      id: undefined,
      image: "",
      title: "",
      url: "",
      sort: 0,
      status: 1
    });

    const { item } = toRefs(props);
    if (item.value) {
      form.id = item.value.id;
      form.image = item.value.image;
      form.title = item.value.title;
      form.url = item.value.url;
      form.sort = item.value.sort;
      form.status = item.value.status;
    }

    const onSave = async () => {
      if (!form.image) {
        $message.error("请上传图片");
        return;
      }
      const data = toRaw(form);
      let res;
      if (!data.id) {
        res = await ApiSwiper.add(data);
        if (res.retCode === "1") {
          $message.success("创建成功");
          emit("update", true);
        }
      } else {
        res = await ApiSwiper.update(data);
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
<style lang="less" scoped>
.swiper-uploader {
  width: 100%;
  height: 100px;
  border: 1px dashed #d9d9d9;
  background: #fafafa;
  border-radius: 2px;
  transition: border-color 0.3s ease;
  overflow: hidden;
  position: relative;
  &:hover {
    border-color: #1890ff;
  }
  &__result {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }
  &__img {
    display: block;
    width: 100%;
  }
  &__delete {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: opacity 0.3s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      display: block;
      color: #333;
      background: #fff;
      border-radius: 50%;
      padding: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0.8;
    }
  }
  &__result:hover &__delete {
    opacity: 1;
  }
  &__box {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  &__input {
    display: none !important;
  }
}
</style>
