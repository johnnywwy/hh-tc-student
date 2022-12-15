import axios from "../../src/axios";

// 登录
export function login(username :string, studentID:string,idCard:string) {
  return axios.post("/login", {
    username,
    studentID,
    idCard
  });
}

// 获取信息
export function getinfo() {
  return axios.post("/admin/getinfo");
}

// 登出
export function logout() {
  return axios.post("/admin/logout");
}