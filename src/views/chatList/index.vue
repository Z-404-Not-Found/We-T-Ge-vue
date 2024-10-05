<template>
    <div class="h-full w-full overflow-hidden bg-white flex flex-col">
        <div>
            <van-nav-bar
                title="微t哥"
                fixed
                placeholder
                style="
                    --van-nav-bar-height: 50px;
                    --van-nav-bar-background: var(--app-background-color);
                    --van-nav-bar-icon-color: var(--app-icon-color);
                "
            >
                <template #right>
                    <div @click="router.push('/addRole')">
                        <van-icon name="plus" size="18" />
                        <div
                            class="text-xs leading-3"
                            style="color: var(--app-icon-color)"
                        >
                            添加角色
                        </div>
                    </div>
                </template>
            </van-nav-bar>
        </div>
        <div>
            <van-notice-bar
                v-if="!localStorageAtLast5KB"
                left-icon="volume-o"
                scrollable
                text="警告：聊天记录剩余缓存空间已不足5KB，请及时适当清理聊天记录！！！否则将无法继续聊天！！！"
            />
            <van-notice-bar
                v-if="!isInSupport"
                color="#E47470"
                background="#FCF0F0"
                left-icon="info-o"
                scrollable
                text="注意：该App已停止服务，不再支持聊天功能，具体事项请咨询开发者。"
            />
        </div>
        <div class="flex-1 overflow-y-auto">
            <van-swipe-cell v-for="item in chatList">
                <van-cell
                    class="w-full"
                    is-link
                    :style="
                        item.onTop
                            ? '--van-cell-background: var(--app-background-color)'
                            : ''
                    "
                    @click="
                        router.push({
                            path: '/chat',
                            query: {
                                id: item.id,
                            },
                        })
                    "
                >
                    <template #title>
                        <div class="ml-3 w-64 text-base">
                            <van-text-ellipsis rows="1" :content="item.name" />
                        </div>
                    </template>
                    <template #icon>
                        <div class="w-12 h-12">
                            <van-image
                                class="w-12 h-12"
                                fit="contain"
                                radius="10%"
                                :src="getAssetsSource(item.avatar)"
                            />
                        </div>
                    </template>
                    <template #label>
                        <div class="ml-3">
                            <van-text-ellipsis
                                rows="1"
                                :content="
                                    item.history.length == 1 ||
                                    item.history[item.history.length - 1]
                                        .role == 'divide'
                                        ? item.description
                                        : item.history[item.history.length - 1]
                                              .content
                                "
                            />
                        </div>
                    </template>
                    <template #right-icon> </template>
                </van-cell>
                <template #right>
                    <div class="h-full">
                        <van-button
                            class="!h-full w-16 text-base"
                            square
                            type="danger"
                            text="删除"
                            @click="deleteChat(item.id)"
                        />
                        <van-button
                            class="!h-full w-16 text-base"
                            square
                            type="warning"
                            :text="item.onTop ? '取消置顶' : '置顶'"
                            @click="setOnTop(item.id)"
                        />
                    </div>
                </template>
            </van-swipe-cell>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import router from "@/router";
import { useChatRecordStore } from "@/stores/chatRecord";
import { useInSupportStatus } from "@/stores/inSupportStatus";
const chatRecordStore = useChatRecordStore();
const inSupportStatusStore = useInSupportStatus();
const chatList = ref(chatRecordStore.returnSortedChatRecord());
import getAssetsSource from "@/utils/getAssetsSource";
const localStorageAtLast5KB = ref(true);
const isInSupport = ref();
const deleteChat = (id: string) => {
    showConfirmDialog({
        title: "确认删除？？",
        message: "你真想删除？？？！",
        confirmButtonText: "删。。。",
        cancelButtonText: "不！！！",
        confirmButtonColor: "var(--app-primary-color)",
    }).then(() => {
        chatRecordStore.deleteChatRecordById(id);
        chatList.value = chatRecordStore.returnSortedChatRecord();
    });
};

const setOnTop = (id: string) => {
    chatRecordStore.setOnTopById(id, !chatRecordStore.getOnTopStatusById(id));
    chatList.value = chatRecordStore.returnSortedChatRecord();
};

// 测试localStorage剩余空间
const isLocalStorageAtLeast5KB = () => {
    try {
        const storage = window.localStorage;
        const testKey = "test";
        const testValue = "a".repeat(1024 * 5); // 5KB
        storage.setItem(testKey, testValue);
        storage.removeItem(testKey);
        return true;
    } catch (e) {
        return false;
    }
};

localStorageAtLast5KB.value = isLocalStorageAtLeast5KB();

watch(
    () => inSupportStatusStore.inSupportStatus,
    (newValue) => {
        isInSupport.value = newValue;
    },
    { immediate: true }
);

onMounted(() => {
    chatList.value = chatRecordStore.returnSortedChatRecord();
});
</script>

<style scoped></style>
