<template>
  <a-layout class="main-layout">
    <a-layout-sider v-model:collapsed="collapsed" collapsible :trigger="null">
      <div class="logo">大道金服</div>
      <a-menu
        theme="dark"
        mode="inline"
        v-model:selectedKeys="selectKeys"
        v-model:openKeys="openKeys"
        @select="onSiderSelect"
      >
        <a-menu-item key="post">
          <SvgIcon style="width: 24px; height: 24px;">
            <SvgPost />
          </SvgIcon>
          <span>文章管理</span>
        </a-menu-item>
        <a-menu-item key="swiper">
          <SvgIcon style="width: 24px; height: 24px;">
            <SvgPics />
          </SvgIcon>
          <span>轮播图</span>
        </a-menu-item>
        <a-menu-item key="partner">
          <SvgIcon style="width: 24px; height: 24px;">
            <SvgPartner />
          </SvgIcon>
          <span>合作伙伴</span>
        </a-menu-item>
        <a-menu-item key="team">
          <SvgIcon style="width: 24px; height: 24px;">
            <SvgTeam />
          </SvgIcon>
          <span>管理团队</span>
        </a-menu-item>
        <a-menu-item key="solution">
          <SvgIcon style="width: 24px; height: 24px;">
            <SvgSolv />
          </SvgIcon>
          <span>解决方案</span>
        </a-menu-item>
        <a-sub-menu key="sys">
          <template v-slot:title>
            <span>
              <SvgIcon style="width: 24px; height: 24px;">
                <SvgSetting />
              </SvgIcon>
              <span>系统管理</span>
            </span>
          </template>
          <a-menu-item key="keyword">网站关键字</a-menu-item>
          <a-menu-item key="pagesmanager">页面管理</a-menu-item>
          <a-menu-item key="siteinfo">网站信息</a-menu-item>
          <a-menu-item key="companyinfo">公司信息</a-menu-item>
          <a-menu-item key="user">用户管理</a-menu-item>
          <a-menu-item key="aboutme">个人信息</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined
          v-else
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <a-dropdown>
          <div class="avatar">
            <a-avatar>
              <template #icon><UserOutlined /></template>
            </a-avatar>
            <span style="margin-left: 8px;">{{ accountInfo.account }}</span>
          </div>
          <template #overlay>
            <a-menu>
              <a-menu-item @click="onExit">
                <LogoutOutlined />
                <span>退出</span>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </a-layout-header>
      <a-layout-content>
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import {
  UserOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from "@ant-design/icons-vue";
import { useRoute, useRouter } from "vue-router";
import { MenuSelectCallBackOptions } from "@/types/antd";
import { ApiLogin } from "@/api";
import { useMessage } from "@/utils/hooks";
import SvgIcon from "@/components/SvgIcon.vue";
import SvgPost from "@/assets/svgs/icon-post.svg";
import SvgPics from "@/assets/svgs/icon-pics.svg";
import SvgPartner from "@/assets/svgs/icon-partner.svg";
import SvgTeam from "@/assets/svgs/icon-team.svg";
import SvgSolv from "@/assets/svgs/icon-solv.svg";
import SvgSetting from "@/assets/svgs/icon-setting.svg";

export default defineComponent({
  name: "Home",
  components: {
    UserOutlined,
    LogoutOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    SvgIcon,
    SvgPost,
    SvgPics,
    SvgPartner,
    SvgTeam,
    SvgSolv,
    SvgSetting
  },
  setup() {
    const $message = useMessage();
    const router = useRouter();
    const collapsed = ref(false);

    const route = useRoute();
    const initKey = route.path.slice(1);

    const selectKeys = ref<string[]>([initKey]);
    const onSiderSelect = ({ key }: MenuSelectCallBackOptions) => {
      selectKeys.value = [key];
      router.push({ path: `/${key}` });
    };
    // 初始化是否展开
    const sysSub = [
      "keyword",
      "pagesmanager",
      "companyinfo",
      "user",
      "aboutme"
    ];
    const initOpenKey = sysSub.indexOf(initKey) > -1 ? ["sys"] : [];
    const openKeys = ref<string[]>(initOpenKey);

    const onExit = async () => {
      const res = await ApiLogin.signout();
      if (res.retCode === "1") {
        localStorage.removeItem("token");
        router.push({ name: "Login" });
        $message.success("退出成功");
      }
    };

    const accountInfo = ref({});
    accountInfo.value = JSON.parse(localStorage.getItem("account") || "{}");

    return {
      collapsed,
      onSiderSelect,
      selectKeys,
      openKeys,
      onExit,
      accountInfo
    };
  }
});
</script>
<style lang="less" scoped>
.main-layout {
  height: 100vh;
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
      color: #1890ff;
    }
  }
  .logo {
    height: 32px;
    margin: 20px 0;
    color: #fff;
    font-size: 24px;
    font-weight: 400;
    line-height: 32px;
    white-space: nowrap;
    padding-left: 24px;
    transition: all 0.2s ease;
  }
  .ant-layout-sider-collapsed {
    .logo {
      font-size: 14px;
      padding-left: 10px;
    }
  }
  .avatar {
    float: right;
    padding: 0 12px;
    margin-right: 8px;
    cursor: pointer;
    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }
  }
}
</style>
