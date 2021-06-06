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
        <h2>实验室管理</h2>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column label="实验室名称">
            <template v-slot="scope">
              <el-input
                v-if="scope.row.id == editId"
                v-model="scope.row.labname"
              ></el-input>
              <span v-else>{{ scope.row.labname }}</span>
            </template>
          </el-table-column>
          <el-table-column label="实验室简介">
            <template v-slot="scope">
              <el-input
                v-if="scope.row.id == editId"
                v-model="scope.row.introduction"
              ></el-input>
              <span v-else>{{ scope.row.introduction }}</span>
            </template>
          </el-table-column>
          <el-table-column label="机器数量">
            <template v-slot="scope">
              <el-input
                v-if="scope.row.id == editId"
                v-model="scope.row.numbers"
              ></el-input>
              <span v-else>{{ scope.row.numbers }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template v-slot="scope">
              <el-button
                type="text"
                v-if="scope.row.id != editId"
                @click="handleClick(scope.row)"
                size="small"
              >
                查看
              </el-button>
              <el-button
                type="text"
                v-if="scope.row.id != editId"
                @click="changeClick(scope.row)"
                size="small"
              >
                编辑
              </el-button>
              <el-button
                type="text"
                v-if="scope.row.id != editId"
                @click="delClick(scope.$index, scope.row)"
                size="small"
              >
                删除
              </el-button>
              <el-button
                type="text"
                v-if="scope.row.id == editId"
                @click="cancelClick(scope.row)"
                size="small"
              >
                取消
              </el-button>
              <el-button
                type="text"
                v-if="scope.row.id == editId"
                @click="saveClick(scope.row)"
                size="small"
              >
                保存
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="add">新增</el-button>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data() {
    return {
      editData: [], //编辑行初始数据
      editId: "", //判断编辑的是哪一行
      tableData: [
        {
          id: "1",
          labname: "丹青901",
          introduction: "计算机实验室",
          numbers: "120",
        },
        {
          id: "2",
          labname: "丹青902",
          introduction: "计算机实验室",
          numbers: "120",
        },
        {
          id: "3",
          labname: "丹青903",
          introduction: "机器人实验室",
          numbers: "90",
        },
        {
          id: "4",
          labname: "丹青904",
          introduction: "机器人实验室",
          numbers: "90",
        },
        {
          id: "5",
          labname: "丹青905",
          introduction: "大数据实验室",
          numbers: "90",
        },
        {
          id: "6",
          labname: "丹青906",
          introduction: "大数据实验室",
          numbers: "90",
        },
        {
          id: "7",
          labname: "丹青907",
          introduction: "人工智能实验室",
          numbers: "50",
        },
        {
          id: "8",
          labname: "丹青908",
          introduction: "人工智能实验室",
          numbers: "50",
        },
        {
          id: "9",
          labname: "丹青909",
          introduction: "软件工程实验室",
          numbers: "70",
        },
        {
          id: "10",
          labname: "丹青910",
          introduction: "软件工程实验室",
          numbers: "70",
        },
      ],
    };
  },
  methods: {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    delClick(index) {
      this.tableData.splice(index, 1);
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    cancelClick(row) {
      if (row.id) {
        for (let i in row) {
          row[i] = this.editData[i];
        }
        this.editId = "";
      } else {
        this.tableData.forEach((item, index) => {
          if (item.id == "") {
            this.tableData.splice(index, 1);
          }
        });
      }
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    saveClick() {
      //保存接口 成功以后
      this.editId = "";
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    changeClick(row) {
      if (
        this.tableData.some((item) => {
          return item.id == "";
        })
      ) {
        this.$message({
          message: "请先保存",
          type: "warning",
        });
        return;
      }
      this.editData = JSON.parse(JSON.stringify(row)); //把当前行数据存一份，取消的时候行数据还原
      this.editId = row.id;
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    handleClick(row) {
      console.log(row);
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    add() {
      if (this.editId != "") {
        this.$message({
          message: "请先保存",
          type: "warning",
        });
        return;
      }
      if (
        this.tableData.some((item) => {
          return item.id == "";
        })
      ) {
        this.$message({
          message: "请先保存",
          type: "warning",
        });
        return;
      }
      this.tableData.push({
        coursename: "",
        teachername: "",
        hours: "",
        id: "5",
      });
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
</style>
