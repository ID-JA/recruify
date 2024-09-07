import { create } from "zustand"

interface UserInfo {
  data: any
  setUserInfo: (userInfo: any) => void
}

export const useUserInfoStore = create<UserInfo>((set) => ({
  data: null,
  setUserInfo: (data: any) => {
    set({ data })
  },
}))
