<template>
  <router-view />
</template>
<style lang="less">
.page-container {
  margin: 24px 24px 0;
}
.page-querybox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}
.custom-collapse-panel {
  background: #f4f4f4;
  border-radius: 4px;
  margin-bottom: 12px;
  border: 0 !important;
  overflow: hidden;
}
.max-img {
  max-width: 100px;
}
.svgicon {
  display: inline-flex;
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
  vertical-align: -5px;
  margin-right: 10px;
  /deep/ svg {
    width: 100%;
    height: 100%;
  }
}
.ant-menu-dark {
  .ant-menu-item {
    .svgicon + span {
      display: inline;
    }
  }
  &.ant-menu-inline-collapsed {
    .svgicon + span {
      display: none;
    }
  }
}
</style>
