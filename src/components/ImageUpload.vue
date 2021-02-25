<template>
  <div class="swiper-uploader">
    <div v-if="modelValue" class="swiper-uploader__result">
      <img class="swiper-uploader__img" :src="modelValue" alt="banner" />
      <div class="swiper-uploader__delete">
        <a href="javascript:;" @click="onDelete"
          ><DeleteFilled style="font-size: 18px;"
        /></a>
      </div>
    </div>
    <div
      v-else
      class="swiper-uploader__box"
      @click="
        () => {
          swiperInput.click();
        }
      "
    >
      <loading-outlined v-if="uploading" />
      <plus-outlined v-else />
      <div>上传</div>
      <input
        type="file"
        ref="swiperInput"
        class="swiper-uploader__input"
        @change="onUpload"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import {
  PlusOutlined,
  LoadingOutlined,
  DeleteFilled
} from "@ant-design/icons-vue";
import { ApiUpload } from "@/api";

export default defineComponent({
  name: "ImageUpload",
  components: {
    PlusOutlined,
    LoadingOutlined,
    DeleteFilled
  },
  props: {
    modelValue: {
      type: String,
      default: ""
    }
  },
  setup(props, { emit }) {
    const imgurl = ref("");

    const uploading = ref(false);
    const swiperInput = ref();

    const onUpload = async (event: MouseEvent) => {
      uploading.value = true;
      const target = event.target as HTMLInputElement;
      const file = target.files && target.files[0];
      if (file) {
        const form = new FormData();
        form.append("file", file);
        const res = await ApiUpload(form);
        uploading.value = false;
        if (res.retCode === "1") {
          emit("update:modelValue", res.data.file);
        }
      }
    };

    const onDelete = () => {
      emit("update:modelValue", "");
    };

    return {
      imgurl,
      uploading,
      swiperInput,
      onUpload,
      onDelete
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
