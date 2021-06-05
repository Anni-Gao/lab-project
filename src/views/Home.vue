<template>
  <el-container>
    <el-header class="indexHeader">
      <h2>实验室预约管理系统</h2>
      <el-dropdown @command="commandHandler">
        <el-button type="primary">
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="userinfo">个人信息</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-header>
    <el-container>
      <el-aside>
        <el-menu router>
          <el-submenu index="1">
            <template #title>
              <i class="el-icon-s-custom">管理员管理</i>
            </template>
            <el-menu-item @click="getLab">实验室管理</el-menu-item>
            <el-menu-item @click="getTeacher">教师管理</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template #title>
              <i class="el-icon-date">预约管理</i>
            </template>
            <el-menu-item index="/reservation">实验室预约</el-menu-item>
            <el-menu-item index="/courses">课程管理</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <div class="Box">
          <el-backtop><div>UP</div></el-backtop>
          <div class="content">
            <h3>欢迎来到实验室预约管理系统</h3>
            <pre>
          预约使用说明：
          1、需提前1天登陆系统预约，当天预约须及时与管理员联系确认。
          2、按照格式正确填写预约内容。选定课程、实验室、日期及预约时段。
          3、为了保证高效利用公共资源，请合理安排预约时间，感谢各位老师的理解与配合。
        </pre
            >
            <el-steps
              :active="1"
              finish-status="success"
              simple
              style="margin-top: 20px"
            >
              <el-step title="登录系统"></el-step>
              <el-step title="课程管理"></el-step>
              <el-step title="实验室预约"></el-step>
              <el-step title="审核通过"></el-step>
            </el-steps>
            <el-calendar v-model="value"></el-calendar>
          </div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts">
import { State } from "@/store";
import { GET_LAB, GET_TEACHER } from "@/store/VuexTypes";
import { defineComponent } from "vue";
import { Store, useStore } from "vuex";
export default defineComponent({
  setup() {
    const store: Store<State> = useStore();
    const getLab = () => {
      store.dispatch(GET_LAB);
    };
    const getTeacher = () => {
      store.dispatch(GET_TEACHER);
    };
    return {
      getLab,
      getTeacher,
    };
  },
});
</script>

<style scoped>
.indexHeader {
  background: #409eff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
}
.indexTitle {
  color: white;
  font-size: 20px;
  font-family: "Times New Roman", Times, serif;
}
pre {
  font-size: 15px;
  font-family: "Times New Roman", Times, serif;
}
</style>
