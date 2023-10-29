// 本地存储操作用户信息
// 也可以用pinia-persistedstate-plugin做持久化

export const SET_TOKEN = (userInfo: string)=> {
  localStorage.setItem("userInfo", userInfo)
}

export const GET_TOKEN = ()=> {
  const res = localStorage.getItem("userInfo")
  return res? JSON.parse(res): undefined
}

export const REMOVE_TOKEN = ()=> {
  localStorage.removeItem("userInfo")
}