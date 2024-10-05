<template>
    <van-config-provider
        :theme-vars="{ borderColor: '#d5d5d5' }"
        theme-vars-scope="global"
        theme="light"
    >
        <div class="overflow-hidden h-dvh w-dvw bg-bg-color">
            <router-view v-slot="{ Component, route }">
                <transition :name="transitionName">
                    <component :is="Component" :key="route.path" />
                </transition>
            </router-view>
        </div>
    </van-config-provider>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { RouterView, useRoute } from "vue-router";
import { useIsSupportH5Plus } from "./stores/isSupportH5Plus";
import { useInSupportStatus } from "./stores/inSupportStatus";
const isSupportH5Plus = useIsSupportH5Plus();
const inSupportStatusStore = useInSupportStatus();
const route = useRoute();
const transitionName = ref("slide-left");

const setSysNavBarColor = () => {
    plus.navigator.setStatusBarBackground("#ededed");
    watch(
        () => route.meta as any,
        (newMeta: any) => {
            plus.navigator.setStatusBarBackground(newMeta.navBarColor);
        }
    );
};

const backButtonClick = () => {
    let firstPressTime: number | null = null; // 跟踪第一次按下的时间
    plus.key.addEventListener("backbutton", function () {
        if (route.path === "/chatList" || route.path === "/") {
            // 检查是否是第一次按下
            if (!firstPressTime) {
                firstPressTime = new Date().getTime();
                showToast({
                    message: "再按一次退出应用",
                    duration: 1000,
                    position: "bottom",
                });

                // 在1秒后重置计时器
                setTimeout(function () {
                    firstPressTime = null;
                }, 1000);
            } else {
                // 如果第二次按下发生在1秒内，退出应用
                if (new Date().getTime() - firstPressTime < 1500) {
                    plus.runtime.quit();
                }

                // 在检查第二次按下后重置计时器
                firstPressTime = null;
            }
        } else {
            // 对于其他路由，直接后退
            history.back();
        }
    });
};

watch(
    () => route.meta as any,
    (newMeta: any, oldMeta: any) => {
        if (newMeta.index > oldMeta.index) {
            transitionName.value = "slide-left";
        } else if (newMeta.index < oldMeta.index) {
            transitionName.value = "slide-right";
        } else if (newMeta.index === oldMeta.index) {
            transitionName.value = "null";
        }
    }
);
declare namespace plus {
    interface Navigator {
        setStatusBarBackground(color: string): void;
    }
    const navigator: Navigator;
    interface Runtime {
        quit(): void;
    }
    const runtime: Runtime;
    interface Key {
        addEventListener(event: "backbutton", callback: () => void): void;
    }
    const key: Key;
}

inSupportStatusStore.getApiKey();
isSupportH5Plus.checkIsSupportH5Plus();
if (isSupportH5Plus.isSupportH5Plus) {
    document.addEventListener("plusready", function () {
        backButtonClick();
        setSysNavBarColor();
    });
}
</script>

<style>
:root:root {
    --van-toast-position-bottom-distance: 10%;
    --app-background-color: #ededed;
    --app-danger-color: #e75e58;
    --app-primary-color: #5a6992;
    --app-icon-color: #171717;
    touch-action: pan-x pan-y;
    color-scheme: light;
}
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
    transition: all 0.3s cubic-bezier(0.6, -0.28, 0.73, 0.04);
}
.slide-left-enter-from {
    transform: translateX(100%);
}
.slide-left-enter-to {
    transform: translateX(0);
}
.slide-left-leave-from {
    transform: translateX(0);
}
.slide-left-leave-to {
    transform: translateX(-100%);
}
.slide-right-enter-from {
    transform: translateX(-100%);
}
.slide-right-enter-to {
    transform: translateX(0);
}
.slide-right-leave-from {
    transform: translateX(0);
}
.slide-right-leave-to {
    transform: translateX(100%);
}
.null-enter-active,
.null-leave-active {
    transition: none;
}
.null-enter-from {
    transform: translateX(0);
}
.null-enter-to {
    transform: translateX(0);
}
.null-leave-from {
    transform: translateX(0);
}
.null-leave-to {
    transform: translateX(0);
}
</style>
