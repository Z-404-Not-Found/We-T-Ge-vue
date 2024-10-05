import { ref } from "vue";
import { defineStore } from "pinia";

export const useTabbarStore = defineStore("tabbar", () => {
    const tabbar = ref([
        {
            path: "/chatList",
            name: "chatList",
            title: "聊天",
            icon: "chat-o",
            activeIcon: "chat",
        },
        {
            path: "/personalCenter",
            name: "personalCenter",
            title: "个人中心",
            icon: "contact-o",
            activeIcon: "contact",
        },
    ]);
    return { tabbar };
});
