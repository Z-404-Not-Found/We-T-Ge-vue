<template>
    <div class="flex flex-col overflow-hidden h-full">
        <van-nav-bar
            :title="navBarTitle"
            left-arrow
            @click-left="onClickLeft"
            fixed
            placeholder
            style="
                --van-nav-bar-height: 50px;
                --van-nav-bar-background: var(--app-background-color);
                --van-nav-bar-icon-color: var(--app-icon-color);
            "
        >
            <template #right>
                <van-icon
                    name="ellipsis"
                    size="28"
                    @click="showActionSheet = true"
                />
            </template>
        </van-nav-bar>
        <div class="bg-bg-color flex-1 w-full overflow-auto" ref="chatRef">
            <div class="w-full p-4 text-xs text-center text-text-gay-color">
                声明：聊天服务产生的所有内容均由人工智能模型生成，其生成内容的准确性和完整性无法保证，不代表开发者的态度或观点
            </div>
            <van-divider :hairline="false" style="margin: 2vw 4vw"
                >这是一条分割线</van-divider
            >
            <div
                class="w-full px-6 py-4 text-sm text-center text-text-gay-color"
            >
                {{ chatRecord!.description }}
            </div>
            <chattingBox
                v-for="item in chatRecord!.history"
                :type="item.role"
                :content="item.content"
                :avatar="chatRecord!.avatar"
                :id="chatRecord!.id"
            ></chattingBox>
        </div>
        <div
            class="w-full h-16 flex items-center box-border"
            style="
                background-color: #f7f7f7;
                padding: 2vw 3vw;
                border-top: 0.5px var(--van-border-color) solid;
            "
        >
            <van-field
                v-model="sendText"
                placeholder="请输入内容"
                :border="false"
                @click="scrollToBottom"
                ref="fieldRef"
            />
            <van-button
                color="#0cc160"
                @click.prevent="sendMessage"
                :disabled="
                    sendText == '' ||
                    navBarTitle == '对方正在输入...' ||
                    !isInSupport
                "
                >发送</van-button
            >
        </div>
        <van-action-sheet
            v-model:show="showActionSheet"
            :actions="actions"
            cancel-text="取消"
            close-on-click-action
            @select="selectAction"
            @open="openActionSheet"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, useTemplateRef, onMounted, onUpdated } from "vue";
import { useRoute } from "vue-router";
import { useChatRecordStore } from "@/stores/chatRecord";
import { useInSupportStatus } from "@/stores/inSupportStatus";
import chattingBox from "@/components/chattingBox.vue";
const route = useRoute();
let id = route.query.id as string;
const chatRecordStore = useChatRecordStore();
const chatRecord = ref(chatRecordStore.getChatRecordById(id as string));
const inSupportStatusStore = useInSupportStatus();
const navBarTitle = ref(chatRecord.value!.name);
const chatRef = useTemplateRef("chatRef");
const fieldRef = useTemplateRef("fieldRef");
const sendText = ref("");
const showActionSheet = ref(false);
const apiKey = ref(inSupportStatusStore.apiKey);
const isInSupport = ref(inSupportStatusStore.inSupportStatus);

const actions = ref([
    {
        name: "开启新对话",
        icon: "replay",
        color: "",
        subname: "此选项将清空上下文记忆，开启新对话",
        disabled: true,
    },
    {
        name: "删除聊天记录",
        icon: "delete-o",
        color: "",
        subname: "此选项将删除聊天记录，不可恢复",
        disabled: true,
    },
]);

const openActionSheet = () => {
    actions.value[0]!.disabled =
        chatRecord.value!.history[chatRecord.value!.history.length - 1].role ==
            "divide" || chatRecord.value!.history.length == 1;
    actions.value[0]!.color =
        chatRecord.value!.history[chatRecord.value!.history.length - 1].role ==
            "divide" || chatRecord.value!.history.length == 1
            ? ""
            : "var(--app-primary-color)";
    actions.value[1]!.disabled = chatRecord.value!.history.length == 1;
    actions.value[1]!.color =
        chatRecord.value!.history.length == 1 ? "" : "var(--app-danger-color)";
};

const onClickLeft = () => history.back();
const scrollToBottom = () => {
    setTimeout(() => {
        chatRef.value!.scrollTo({ top: chatRef.value!.scrollHeight });
    }, 100);
};

const selectAction = (action: any, index: number) => {
    if (index === 0) {
        chatRecord.value!.history.push({ role: "divide", content: "" });
        chatRecordStore.setRecordCountById(id, 0);
        chatRecord.value = chatRecordStore.getChatRecordById(id);
    } else {
        showConfirmDialog({
            title: "清除聊天记录？？",
            message: "你确定清除聊天记录！？？",
            confirmButtonText: "确定",
            cancelButtonText: "不确定",
            confirmButtonColor: "var(--app-primary-color)",
        }).then(() => {
            chatRecordStore.clearHistoryById(id);
            chatRecord.value = chatRecordStore.getChatRecordById(id);
        });
    }
};

const formatMessage = (history: any[], n: number) => {
    if (history.length === 1) {
        return [history[0]].filter((messages) => messages.role !== "divide");
    } else if (history.length <= n + 2) {
        return history
            .slice(0, -1)
            .filter((messages) => messages.role !== "divide");
    } else {
        const result = [history[0]].concat(history.slice(-n - 1, -1));
        return result.filter((messages) => messages.role !== "divide");
    }
};

const sendMessage = async () => {
    // @ts-ignore:
    fieldRef.value?.focus();
    chatRecord.value!.history.push({
        role: "user",
        content: sendText.value,
    });
    chatRecord.value!.history.push({
        role: "assistant",
        content: "",
    });
    sendText.value = "";
    chatRecordStore.add2RecordCountById(id);
    chatRecordStore.moveRecordToFirstById(id);
    navBarTitle.value = "对方正在输入...";
    fetch("https://api.chatanywhere.tech/v1/chat/completions", {
        method: "POST",
        headers: {
            Authorization: apiKey.value,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            stream: true,
            messages: formatMessage(
                chatRecord.value!.history as any[],
                chatRecord.value!.recordCount as number
            ),
        }),
    })
        .then((res) => {
            if (res.status === 200) {
                const reader = res.body!.getReader();
                const decoder = new TextDecoder();
                const readStream = async () => {
                    const { done, value } = await reader.read();
                    if (done) {
                        return;
                    }
                    const chunk = decoder.decode(value);
                    const messages = chunk
                        .split("data: ")
                        .filter((msg) => msg.trim());
                    for (const message of messages) {
                        try {
                            if (message.includes("[DONE]")) {
                                navBarTitle.value = chatRecord.value!.name;
                                return;
                            }
                            const json = JSON.parse(message);
                            if (json.choices[0].delta.content) {
                                chatRecord.value!.history[
                                    chatRecord.value!.history.length - 1
                                ].content += json.choices[0].delta.content;
                            }
                        } catch (error) {
                            console.log(error);
                        }
                    }
                    readStream();
                };
                readStream();
            } else {
                const reader = res.body!.getReader();
                const decoder = new TextDecoder();
                const readStream = async () => {
                    const { done, value } = await reader.read();
                    if (done) {
                        navBarTitle.value = chatRecord.value!.name;
                        return;
                    }
                    const chunk = decoder.decode(value);
                    const json = JSON.parse(chunk);
                    if (json.error) {
                        chatRecord.value!.history[
                            chatRecord.value!.history.length - 1
                        ].content = json.error.message;
                    }
                    readStream();
                };
                readStream();
            }
        })
        .catch((err) => {
            console.log(err);
        });
};

onUpdated(() => {
    scrollToBottom();
});

onMounted(() => {
    scrollToBottom();
});
</script>

<style scoped>
/* 输入框样式自定义 */
.van-cell {
    padding: 3vw;
    margin-right: 1.5vw;
    line-height: 1;
    border-radius: 4px;
    height: 10vw;
}
/* 发送按钮样式自定义 */
.van-button {
    margin-left: 1.5vw;
    height: 8vw;
    width: 15vw;
    white-space: nowrap;
    border-radius: 4px;
}
</style>
