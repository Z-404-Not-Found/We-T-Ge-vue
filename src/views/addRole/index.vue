<template>
    <div>
        <van-nav-bar
            title="添加角色"
            fixed
            placeholder
            left-arrow
            @click-left="onClickLeft"
            style="
                --van-nav-bar-height: 50px;
                --van-nav-bar-background: var(--app-background-color);
                --van-nav-bar-icon-color: var(--app-icon-color);
            "
        >
            <template #right>
                <div @click="reset">
                    <van-icon name="replay" size="18" />
                    <div
                        class="text-xs leading-3"
                        style="color: var(--app-icon-color)"
                    >
                        重置
                    </div>
                </div>
            </template>
        </van-nav-bar>
        <van-form @submit="onSubmit">
            <van-field
                label-class="font-semibold !text-text-gay-color"
                v-model="roleName"
                name="角色名称"
                label="角色名称"
                placeholder="请输入角色名称"
                required
                :rules="[{ required: true, message: '请填写角色名称' }]"
            />
            <van-field
                label-class="font-semibold !text-text-gay-color"
                v-model="roleDescription"
                name="角色描述"
                label="角色描述"
                placeholder="请输入角色描述，如“这是一个通用助手，会回答你的各种问题。”（给自己看）"
                required
                type="textarea"
                rows="3"
                autosize
                :rules="[{ required: true, message: '请填写角色描述' }]"
            />
            <van-field
                label-class="font-semibold !text-text-gay-color"
                v-model="roleDefinition"
                name="角色定义"
                label="角色定义"
                placeholder="请输入角色定义，如“你是一个助手，你会帮助用户回答问题，并且所有对话要以中文进行”（给AI看）"
                required
                type="textarea"
                rows="3"
                autosize
                :rules="[{ required: true, message: '请填写角色定义' }]"
            />
            <van-cell is-link class="my-2" @click="onSubmit">
                <template #title>
                    <div
                        class="text-center my-1 text-lg"
                        style="color: var(--app-primary-color)"
                        native-type="submit"
                    >
                        <van-icon name="success" />
                        提交
                    </div>
                </template>
                <template #right-icon></template>
            </van-cell>
        </van-form>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useChatRecordStore } from "@/stores/chatRecord";

const chatRecordStore = useChatRecordStore();
const roleName = ref("");
const roleDescription = ref("");
const roleDefinition = ref("");

const onClickLeft = () => history.back();

const chatRecord = ref({
    id: "",
    onTop: false,
    // recordCount记录该角色上下文数
    recordCount: 0,
    name: "",
    avatar: "assets/avatar/default.jpg",
    description: "",
    history: [
        {
            role: "system",
            content: "",
        },
    ],
});
// 得到最大id并加一
const setId = () => {
    let maxId = "0";
    chatRecordStore.chatRecord.forEach((item) => {
        if (parseInt(item.id) > parseInt(maxId)) {
            maxId = item.id;
        }
    });
    return (parseInt(maxId) + 1).toString();
};
const onSubmit = () => {
    if (
        roleName.value === "" ||
        roleDescription.value === "" ||
        roleDefinition.value === ""
    ) {
        showFailToast("请填写完整信息");
    } else {
        chatRecord.value.id = setId();
        chatRecord.value.name = roleName.value;
        chatRecord.value.description = roleDescription.value;
        chatRecord.value.history[0].content = roleDefinition.value;
        chatRecordStore.addChatRecord(chatRecord.value);
        history.back();
    }
};

const reset = () => {
    roleName.value = "";
    roleDescription.value = "";
    roleDefinition.value = "";
};
</script>

<style scoped></style>
