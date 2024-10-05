<template>
    <div
        class="h-full w-full flex flex-col justify-between overflow-hidden bg-bg-color"
    >
        <div class="flex-1 w-full overflow-hidden">
            <router-view> </router-view>
        </div>

        <van-tabbar
            route
            placeholder
            active-color="#0CC160"
            inactive-color="var(--app-icon-color)"
            style="
                --van-tabbar-height: 64px;
                --van-tabbar-background: #f7f7f7;
                --van-tabbar-item-active-background: #f7f7f7;
            "
        >
            <van-tabbar-item
                v-for="item in tabbar"
                :key="item.path"
                :to="item.path"
                :icon="getItemIcon(item)"
                >{{ item.title }}</van-tabbar-item
            >
        </van-tabbar>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useTabbarStore } from "@/stores/tabbar";
const tabbarStore = useTabbarStore();
const route = useRoute();
const tabbar = ref(tabbarStore.tabbar);

interface TabbarItem {
    name: string;
    path: string;
    title: string;
    icon: string;
    activeIcon: string;
}

const getItemIcon = (item: TabbarItem) => {
    return item.path === route.path ? item.activeIcon : item.icon;
};
</script>

<style scoped></style>
