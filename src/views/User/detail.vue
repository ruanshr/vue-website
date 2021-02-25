<template>
  <div>
    <a-form layout="vertical" :model="form">
      <a-form-item label="账号" required>
        <a-input v-model:value="form.account" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item label="密码">
        <a-input-password
          v-model:value="form.password"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item label="姓名">
        <a-input v-model:value="form.name" placeholder="请输入姓名" />
      </a-form-item>
      <a-form-item label="邮箱">
        <a-input v-model:value="form.email" placeholder="请输入邮箱" />
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
      <a-form-item label="类型">
        <a-radio-group v-model:value="form.type">
          <a-radio :value="2">
            编辑人员
          </a-radio>
          <a-radio :value="1">
            管理员
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
import { User } from "@/api/user";
import { useMessage } from "@/utils/hooks";
import { ApiUser } from "@/api";

export default defineComponent({
  name: "UserDetail",
  props: {
    item: {
      type: Object as PropType<User | null>,
      required: true
    }
  },
  setup(props, { emit }) {
    const $message = useMessage();
    const form = reactive<User>({
      id: undefined,
      account: "",
      password: undefined,
      name: "",
      email: "",
      type: 2,
      status: 1
    });

    const { item } = toRefs(props);
    if (item.value) {
      form.id = item.value.id;
      form.account = item.value.account;
      form.name = item.value.name;
      form.email = item.value.email;
      form.type = item.value.type;
      form.status = item.value.status;
    }

    const onSave = async () => {
      if (!form.account) {
        $message.error("请输入账号");
        return;
      }
      const data = toRaw(form);
      let res;
      if (!data.id) {
        res = await ApiUser.add(data);
        if (res.retCode === "1") {
          $message.success("创建成功");
          emit("update", true);
        }
      } else {
        res = await ApiUser.update(data);
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
