<template>
  <div class="page-container">
    <a-card :bordered="false">
      <a-form layout="vertical" :model="form" style="max-width: 500px;">
        <a-form-item label="邮箱">
          <a-input v-model:value="form.email" disabled />
        </a-form-item>
        <a-form-item label="账号">
          <a-input v-model:value="form.account" disabled />
        </a-form-item>
        <a-form-item label="旧密码">
          <a-input-password
            v-model:value="form.password"
            placeholder="请输入旧密码"
          />
        </a-form-item>
        <a-form-item label="新密码">
          <a-input-password
            v-model:value="form.newPassword"
            placeholder="请输入新密码"
          />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="onSave">修改密码</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, toRaw } from "vue";
import { User } from "@/api/login";
import { ApiLogin } from "@/api";
import { useForm } from "@ant-design-vue/use";
import { useMessage } from "@/utils/hooks";

export default defineComponent({
  name: "Aboutme",
  setup() {
    const form = reactive<User & { newPassword: string }>({
      id: undefined,
      account: "",
      password: "",
      newPassword: "",
      name: "",
      status: 1,
      email: "",
      type: 1
    });
    const rules = reactive({
      password: [{ required: true, message: "请输入旧密码" }],
      newPassword: [{ required: true, message: "请输入新密码" }]
    });
    const { validate } = useForm(form, rules);
    const $message = useMessage();
    const onSave = async () => {
      try {
        await validate();
        const data = toRaw(form);
        if (data.password === data.newPassword) {
          $message.error("新密码不能和旧密码相同");
          return;
        }
        const res = await ApiLogin.update({
          oldPassword: data.password,
          newPassword: data.newPassword
        });
        if (res.retCode === "1") {
          $message.success("修改成功");
          form.password = "";
          form.newPassword = "";
        } else {
          $message.error(res.retMsg);
        }
      } catch (err) {
        $message.error(err.errorFields[0].errors[0]);
      }
    };

    const query = async () => {
      const res = await ApiLogin.get();
      if (res.retCode === "1") {
        form.account = res.data.account;
        form.email = res.data.email;
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
