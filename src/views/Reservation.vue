/* eslint-disable vue/no-unused-vars */
<template>
  <el-container>
    <el-header class="indexHeader">
      <h2>实验室预约管理系统</h2>
      <el-dropdown @command="commandHandler">
        <router-link to="home"><el-button>首页</el-button></router-link>
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
        <h2>实验室预约管理</h2>
        <el-select
          v-model="value1"
          @change="selectLab"
          clearable
          placeholder="请选择实验室"
        >
          <el-option
            v-for="item in options1"
            :key="item.value1"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>

        <el-select v-model="value2" clearable placeholder="请选择周次">
          <el-option
            v-for="item in options2"
            :key="item.value2"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>

        <el-select v-model="value3" clearable placeholder="请选择日期">
          <el-option
            v-for="item in options3"
            :key="item.value3"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>

        <el-select v-model="value4" clearable placeholder="请选择节次">
          <el-option
            v-for="item in options4"
            :key="item.value4"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>

        <table border="1">
          <tr>
            <th aria-disabled="true">节次\星期</th>
            <th>星期日</th>
            <th>星期一</th>
            <th>星期二</th>
            <th>星期三</th>
            <th>星期四</th>
            <th>星期五</th>
            <th>星期六</th>
          </tr>
          <tr v-for="(s, index) of section" :key="index">
            <th>{{ s.name }}</th>
            <td v-for="(w, index) of week" :key="index"></td>
          </tr>
        </table>
        <br />
        {{ selectedLabName }}
        <el-button type="primary" @click="add">预约</el-button>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data() {
    return {
      options1: [
        {
          value: "选项1",
          label: "丹青901",
        },
        {
          value: "选项2",
          label: "丹青902",
        },
        {
          value: "选项3",
          label: "丹青903",
        },
        {
          value: "选项4",
          label: "丹青904",
        },
        {
          value: "选项5",
          label: "丹青905",
        },
        {
          value: "选项6",
          label: "丹青906",
        },
        {
          value: "选项7",
          label: "丹青907",
        },
        {
          value: "选项8",
          label: "丹青908",
        },
        {
          value: "选项9",
          label: "丹青909",
        },
      ],
      options2: [
        {
          value: "选项1",
          label: "第一周",
        },
        {
          value: "选项2",
          label: "第二周",
        },
        {
          value: "选项3",
          label: "第三周",
        },
        {
          value: "选项4",
          label: "第四周",
        },
        {
          value: "选项5",
          label: "第五周",
        },
        {
          value: "选项6",
          label: "第六周",
        },
        {
          value: "选项7",
          label: "第七周",
        },
        {
          value: "选项8",
          label: "第八周",
        },
        {
          value: "选项9",
          label: "第九周",
        },
        {
          value: "选项10",
          label: "第十周",
        },
        {
          value: "选项11",
          label: "第十一周",
        },
        {
          value: "选项12",
          label: "第十二周",
        },
        {
          value: "选项13",
          label: "第十三周",
        },
        {
          value: "选项14",
          label: "第十四周",
        },
        {
          value: "选项15",
          label: "第十五周",
        },
        {
          value: "选项16",
          label: "第十六周",
        },
        {
          value: "选项17",
          label: "第十七周",
        },
        {
          value: "选项18",
          label: "第十八周",
        },
      ],
      options3: [
        {
          value: "选项1",
          label: "周一",
        },
        {
          value: "选项2",
          label: "周二",
        },
        {
          value: "选项3",
          label: "周三",
        },
        {
          value: "选项4",
          label: "周四",
        },
        {
          value: "选项5",
          label: "周五",
        },
        {
          value: "选项6",
          label: "周六",
        },
        {
          value: "选项7",
          label: "周日",
        },
      ],
      options4: [
        {
          value: "选项1",
          label: "一二节",
        },
        {
          value: "选项2",
          label: "三四节",
        },
        {
          value: "选项3",
          label: "五六节",
        },
        {
          value: "选项4",
          label: "七八节",
        },
        {
          value: "选项5",
          label: "九十节",
        },
      ],
      section: [
        {
          id: 1,
          name: "一二节",
        },
        {
          id: 2,
          name: "三四节",
        },
        {
          id: 3,
          name: "五六节",
        },
        {
          id: 4,
          name: "七八节",
        },
        {
          id: 5,
          name: "九十节",
        },
      ],
      value1: "",
      value2: "",
      value3: "",
      value4: "",
    };
  },
  methods: {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    selectLab(id) {
      console.log("select中对应value值", id);
      let selectedLabName = {};
      selectedLabName = this.options.find((item) => {
        return item.value === id;
        //筛选出匹配数据，是对应数据的整个对象
      });
      return selectedLabName;
    },
  },
};
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
table {
  background-color: white;
  border-collapse: collapse;
  width: 68vw;
  height: 62vh;
}
</style>
