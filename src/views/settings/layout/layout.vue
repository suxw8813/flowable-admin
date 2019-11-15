<template>
  <div class="portal-layout-main">
    <el-container>
      <asideMenu></asideMenu>
      <el-container>
        <el-main>
          <keep-alive :include="$store.state.app.includePageNames.toString()">
            <router-view> </router-view>
          </keep-alive>
          <div class="welcome-tip" v-if="$store.state.app.routerViews.length == 0">欢迎使用通用流转框架</div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from './common/header'
import asideMenu from './common/asideMenu'
export default {
  components: {
    Header,
    asideMenu
  },
  name: 'layout',
  data () {
    return {
    }
  },
  computed: {
    tagRouters () {
      return this.$store.state.app.routerViews
    }
  },
  watch: {
    '$router' (to, form) {
    }
  },
  created () {
  },
  methods: {
    closeSelectedTag (tag) {
      console.log(this)
      this.$store.commit('delRouterViews', tag)
    }
  }
}
</script>

<style scoped rel="tylesheet/scss" lang="scss">
  .portal-layout-main {
    height: 100%;
    .el-container {
      height: 100%;
      background-color: #f3f3f4;
      .el-header, .el-footer {
        height: 96px !important;
        background-color: #e9ecf1;
        color: #333;
        text-align: center;
        line-height: 96px;
      }
      .el-aside {
        font-size: 14px;
        min-width: 239px;
        background-color: #2b2b38;
        color: #333;
        text-align: left;
      }
      .el-main {
        color: #333;
        padding-top: 0;
      }
    }
  }
  .welcome-tip{
    font-size:24px;
    line-height:112px;
    text-align:center;
    color: rgba(75, 73, 81, 0.75);
  }
</style>
