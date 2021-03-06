import axios from "@/axios";
import router from "@/router";
import { User, Teacher } from "@/datasource/Types";
import { ResultVO } from "@/mock";
import { ActionTree, createStore, GetterTree, MutationTree } from "vuex";
import * as vxt from "./VuexTypes";

export interface State {
  user: User;
  teacher: Teacher;
  exception: string;
  isLogin: boolean;
}

const myState: State = {
  user: {},
  teacher: {},
  exception: "",
  isLogin: false,
};
const myMutations: MutationTree<State> = {
  [vxt.UPDATE_USER]: (state, data: User) => (state.user = data),
  [vxt.UPDATE_TEACHER]: (state, data: User) => (state.teacher = data),
  [vxt.UPDATE_EXCEPTION]: (state, data: string) => (state.exception = data),
};

const myActions: ActionTree<State, State> = {
  [vxt.UPDATE_USER]: ({ commit }, data: User) => {
    setTimeout(() => commit(vxt.UPDATE_USER, data), 2000);
  },
  [vxt.UPDATE_TEACHER]: ({ commit }, data: Teacher) => {
    setTimeout(() => commit(vxt.UPDATE_TEACHER, data), 2000);
  },
  [vxt.LOGIN]: async ({ commit }, user) => {
    // try可避免控制台的未捕获异常信息
    try {
      const resp = await axios.post<ResultVO>("login", user);
      console.log(resp.headers.token);
      sessionStorage.setItem("token", resp.headers.token);
      commit(vxt.UPDATE_USER, resp.data.data.user);
      router.push("/home");
    } catch (error) {
      // eslint默认禁止空执行体。加一段注释或关闭该检测
    }
  },
  [vxt.GET_LAB]: async ({ commit }) => {
    // 未捕获异常，请求失败在控制台输出信息
    router.push("/labs");
    const resp = await axios.get<ResultVO>("lab");
    commit(vxt.GET_LAB, resp.data.data?.lab);
    router.push("/labs");
  },
  [vxt.GET_TEACHER]: async ({ commit }) => {
    // 未捕获异常，请求失败在控制台输出信息
    router.push("/teachers");
    const resp = await axios.get<ResultVO>("teacher");
    commit(vxt.GET_TEACHER, resp.data.data.teacher);
    router.push("/teachers");
  },
};
const myGetters: GetterTree<State, State> = {
  premission: (state) => (level: string) => state.user?.level == level,
  [vxt.GETTER_PREMISSION]: (state) => (level: string) =>
    state.user?.level == level,
};
// 加载vuex时，判断登录/角色等信息，加载初始化数据
const token = sessionStorage.getItem("token");
if (token && token.length > 96) {
  myState.isLogin = true;
}

export default createStore({
  state: myState,
  mutations: myMutations,
  actions: myActions,
  getters: myGetters,
  modules: {},
});
// https://next.vuex.vuejs.org/guide/typescript-support.html#simplifying-usestore-usage
//const key: InjectionKey<Store<State>> = Symbol()
// export function useStore () {
//   return baseUseStore(key)
// }
