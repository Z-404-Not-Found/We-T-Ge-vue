import { defineStore } from "pinia";

export const useIsSupportH5Plus = defineStore("isSupportH5Plus", {
    state: () => {
        return {
            isSupportH5Plus: false,
        };
    },
    actions: {
        checkIsSupportH5Plus() {
            if (navigator.userAgent.indexOf("Html5Plus") < 0) {
                //不支持5+ API
                this.isSupportH5Plus = false;
                console.log("不支持5+ API", this.isSupportH5Plus);
            } else {
                //支持5+ API
                this.isSupportH5Plus = true;
                console.log("支持5+ API", this.isSupportH5Plus);
            }
        },
    },
});
