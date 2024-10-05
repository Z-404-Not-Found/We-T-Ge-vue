<template>
    <div class="container">
        <div class="userBox" v-if="type === 'user'">
            <div class="userContent">
                {{ content }}
            </div>
            <div class="avatar">
                <van-image
                    radius="10%"
                    :src="getAssetsSource(userAvatar)"
                    @click="router.push('/userCenter')"
                />
            </div>
        </div>
        <div class="gptBox" v-else-if="type === 'assistant'">
            <div class="avatar">
                <van-image
                    radius="10%"
                    :src="getAssetsSource(avatar)"
                    @click="
                        router.push({ path: '/roleCenter', query: { id: id } })
                    "
                />
            </div>
            <div class="gptContent">
                <div v-if="content.length > 0">
                    {{ content }}
                </div>
                <div v-else>
                    <van-loading type="spinner" size="16" />
                </div>
            </div>
        </div>
        <div class="divider" v-else-if="type === 'divide'">
            <van-divider :hairline="false" style="margin: 2vw 4vw"
                >以下为新对话</van-divider
            >
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import router from "@/router";
import { useUserStore } from "@/stores/user";
import getAssetsSource from "@/utils/getAssetsSource";
const userStore = useUserStore();
const userAvatar = ref(userStore.avatar);
defineProps({
    type: {
        type: String,
        default: "assistant",
    },
    content: {
        type: String,
        default: "",
    },
    avatar: {
        type: String,
        default: "",
    },
    id: {
        type: String,
        default: 0,
    },
});
</script>

<style scoped>
.container {
    box-sizing: border-box;
    width: 100%;
    padding-top: 3vw;
}
.gptBox {
    box-sizing: border-box;
    display: flex;
    margin-bottom: 3vw;
}
.userBox {
    box-sizing: border-box;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 3vw;
}
.avatar {
    width: 10vw;
    height: 10vw;
    margin-left: 3vw;
    margin-right: 3vw;
}
.gptContent {
    box-sizing: border-box;
    max-width: 68vw;
    min-width: 10vw;
    padding: 3vw;
    line-height: 1;
    border-radius: 4px;
    overflow-wrap: break-word;
    white-space: pre-wrap;
    position: relative;
    background-color: #fff;
}
.gptContent:before {
    content: "";
    width: 0;
    height: 0;
    border-top: 1.5vw solid transparent;
    border-bottom: 1.5vw solid transparent;
    border-right: 1.5vw solid #fff;
    position: absolute;
    left: -1.5vw;
    top: 3.5vw;
}
.userContent {
    box-sizing: border-box;
    max-width: 68vw;
    min-width: 10vw;
    padding: 3vw;
    line-height: 16px;
    border-radius: 4px;
    overflow-wrap: break-word;
    white-space: pre-wrap;
    position: relative;
    background-color: #96ec69;
}
.userContent:before {
    content: "";
    width: 0;
    height: 0;
    border-top: 1.5vw solid transparent;
    border-bottom: 1.5vw solid transparent;
    border-left: 1.5vw solid #96ec69;
    position: absolute;
    right: -1.5vw;
    top: 3.5vw;
}
</style>
