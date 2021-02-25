<template>
  <div class="login-layout">
    <div class="container">
      <section>
        <img src="@/assets/images/pic1.png" alt="插画1.png" />
      </section>
      <section style="width: 400px; margin-left: 30px">
        <img class="logo" src="@/assets/images/logo.png" alt="logo.png" />
        <a-form :model="form">
          <a-alert
            v-if="loginError"
            type="error"
            showIcon
            style="margin-bottom: 24px"
            :message="loginError"
          />
          <a-form-item v-bind="validateInfos.name">
            <a-input
              v-model:value="form.name"
              size="large"
              type="text"
              placeholder="用户名"
              @change="loginError = ''"
            >
              <template v-slot:prefix>
                <UserOutlined style="color: rgba(85, 178, 163, 1)" />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item v-bind="validateInfos.pass">
            <a-input-password
              v-model:value="form.pass"
              size="large"
              placeholder="密码"
              @change="loginError = ''"
            >
              <template v-slot:prefix>
                <LockOutlined style="color: rgba(85, 178, 163, 1)" />
              </template>
            </a-input-password>
          </a-form-item>
          <a-form-item>
            <a-button
              size="large"
              htmlType="submit"
              class="login-btn"
              @click="onSubmit"
              :loading="loading"
            >
              确定
            </a-button>
          </a-form-item>
        </a-form>
      </section>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRaw } from "vue";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { useForm } from "@ant-design-vue/use";
import { useRouter } from "vue-router";
import { ApiLogin } from "@/api";

interface LoginFormOptions {
  name: string;
  pass: string;
}

export default defineComponent({
  name: "Login",
  components: {
    UserOutlined,
    LockOutlined
  },
  setup() {
    const form = reactive<LoginFormOptions>({
      name: "",
      pass: ""
    });
    const rules = reactive({
      name: [{ required: true, message: "请输入账号" }],
      pass: [{ required: true, message: "请输入密码" }]
    });
    const loginError = ref("");
    const loading = ref(false);
    const { validate, validateInfos } = useForm(form, rules);

    const router = useRouter();

    const onSubmit = async () => {
      loading.value = true;
      try {
        await validate();
        const { name, pass } = toRaw(form);
        const res = await ApiLogin.signin({
          account: name,
          password: pass
        });
        if (res.retCode === "1") {
          const token = res.data || "";
          localStorage.setItem("token", token);
          const accountInfo = await ApiLogin.get();
          if (accountInfo.retCode === "1") {
            localStorage.setItem("account", JSON.stringify(accountInfo.data));
          }
          router.push({ name: "Home" });
        } else {
          loginError.value = res.retMsg;
        }
      } catch (err) {
        console.log("error", err);
      } finally {
        loading.value = false;
      }
    };
    return {
      form,
      validateInfos,
      onSubmit,
      loginError,
      loading
    };
  }
});
</script>
<style lang="less" scoped>
.login-layout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  background-image: url("../../assets/images/loginbg.png"),
    linear-gradient(-45deg, #0da4af 0%, #66c098 100%);
  background-size: cover;
  .container {
    width: 862px;
    height: 464px;
    margin: 0 auto;
    background: #fff;
    padding: 42px;
    display: flex;
    align-items: center;
    border-radius: 8px;
    box-shadow: 0px 4px 10px 0px #32a5a6;
  }
  .login-btn {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
    background-image: linear-gradient(45deg, #00bfce 0%, #58dec5 100%);
    background-size: 200% 200%;
    background-position: 50% 50%;
    color: #fff;
    border-width: 0;
    transition: background-position 0.5s ease;
    &:hover {
      background-position: 100% 50%;
    }
  }
  .logo {
    margin: 0 auto 40px;
    display: block;
    width: 164px;
    height: 68px;
  }
  ::v-deep(.ant-form-item-control-wrapper) {
    width: 100%;
  }
  ::v-deep(.ant-input-affix-wrapper:hover) {
    border-color: #55b2a3;
  }
  ::v-deep(.ant-input-lg) {
    font-weight: 200;
  }
  ::v-deep(.ant-input-affix-wrapper-focused) {
    border-color: #55b2a3;
    box-shadow: 0 0 0 2px rgba(85, 178, 163, 0.2);
  }
}
</style>
