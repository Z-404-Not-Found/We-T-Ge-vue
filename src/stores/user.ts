import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
    state: () => {
        return {
            avatar: "assets/avatar/user.jpg",
            name: "微信用户123(瞎起的，随便改)",
            signature: "兜兜啭啭①圏，蕞終還媞徊菿伱這裡(快把它改掉吧，谢谢你🥹)",
        };
    },
    actions: {
        updateUser(name: string, signature: string, avatar: string) {
            this.name = name;
            this.signature = signature;
            this.avatar = avatar;
            showSuccessToast("修改个人信息成功");
        },
    },
    persist: true,
});
