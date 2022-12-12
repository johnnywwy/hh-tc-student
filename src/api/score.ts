import axios from "../../src/axios";

// 登录
// export function login(username :string, password:string) {
//   return axios.post("/login", {
//     username,
//     password,
//   });
// }

// 获取体测系统信息
export function getSysList() {
  return axios.get("/getSysList");
}

// 获取系统成绩数据
export function getScore() {
  return axios.get("/getSorce");
}