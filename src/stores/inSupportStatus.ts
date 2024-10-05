import { defineStore } from "pinia";

export const useInSupportStatus = defineStore("inSupportStatus", {
    state: () => {
        return {
            inSupportStatus: true,
            apiKey: "YOUR_API_KEY",
        };
    },
    actions: {
        getApiKey() {
            // TODO: 可以从服务器取得API_KEY，并控制服务提供状态
        },
    },
});
