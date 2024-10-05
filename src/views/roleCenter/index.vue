<template>
    <div>
        <van-nav-bar
            fixed
            placeholder
            left-arrow
            @click-left="onClickLeft"
            :border="false"
            style="
                --van-nav-bar-height: 50px;
                --van-nav-bar-icon-color: var(--app-icon-color);
            "
        />

        <div class="w-full bg-white h-36 py-2 pl-6 pr-4 flex box-border">
            <div class="w-1/5 h-1/5">
                <van-image radius="10%" :src="getAssetsSource(roleAvatar)" />
            </div>
            <div class="w-8/12 ml-6 mr-2">
                <div class="mb-6 font-semibold">
                    <van-text-ellipsis rows="1" :content="roleName" />
                </div>
                <div class="text-sm text-text-gay-color">
                    <van-text-ellipsis
                        class=""
                        rows="3"
                        :content="'角色简介：' + roleDescription"
                    />
                </div>
            </div>
            <div class="w-1/12 flex justify-end mt-12"></div>
        </div>
        <div style="--van-cell-right-icon-color: #171717">
            <van-cell-group class="my-2">
                <van-cell
                    title="查看详细信息"
                    is-link
                    @click="showDetail = true"
                >
                </van-cell>
                <van-cell
                    title="修改角色信息"
                    is-link
                    @click="showChange = true"
                >
                </van-cell>
            </van-cell-group>
            <van-cell-group class="my-2">
                <van-cell is-link @click="onClickLeft">
                    <template #title>
                        <div
                            class="text-center my-1 text-lg"
                            style="color: var(--app-primary-color)"
                        >
                            <van-icon name="chat-o" />
                            发消息
                        </div>
                    </template>
                    <template #right-icon></template>
                </van-cell>
                <van-cell is-link @click="deleteChat(id)">
                    <template #title>
                        <div
                            class="text-center my-1 text-lg"
                            style="color: var(--app-danger-color)"
                        >
                            <van-icon name="delete-o" />
                            删除角色
                        </div>
                    </template>
                    <template #right-icon></template>
                </van-cell>
            </van-cell-group>
        </div>
        <van-dialog
            v-model:show="showDetail"
            title="详细信息"
            confirmButtonText="害，这么个事儿啊"
            confirmButtonColor="var(--app-primary-color)"
        >
            <div class="p-6">
                <div class="flex justify-start mb-4">
                    <div class="w-1/3 font-semibold text-text-gay-color">
                        角色名称：
                    </div>
                    <div class="w-3/4">{{ roleName }}</div>
                </div>
                <div class="flex justify-start mb-4">
                    <div class="w-1/3 font-semibold text-text-gay-color">
                        角色简介：
                    </div>
                    <div class="w-3/4">{{ roleDescription }}</div>
                </div>
                <div class="flex justify-start mb-4">
                    <div class="w-1/3 font-semibold text-text-gay-color">
                        角色定义：
                    </div>
                    <div class="w-3/4">{{ roleDefinition }}</div>
                </div>
            </div>
        </van-dialog>
        <van-dialog
            v-model:show="showChange"
            title="修改信息"
            showCancelButton
            confirmButtonText="就是这样"
            confirmButtonColor="var(--app-primary-color)"
            @confirm="changeConfirm"
            @cancel="
                changeName = roleName;
                changeSignature = roleDescription;
                changeDefinition = roleDefinition;
            "
        >
            <div class="p-2 py-6">
                <van-field
                    label-class="font-semibold !text-text-gay-color !w-1/4"
                    v-model="changeName"
                    label="角色名称"
                    placeholder="请输入角色名称"
                    :rules="[{ required: true, message: '请填写角色名称' }]"
                    :border="false"
                />
                <van-field
                    label-class="font-semibold !text-text-gay-color !w-1/4"
                    v-model="changeSignature"
                    label="角色简介"
                    placeholder="请输入角色简介"
                    type="textarea"
                    :border="false"
                    :rules="[{ required: true, message: '请填写角色简介' }]"
                    rows="3"
                />
                <van-field
                    label-class="font-semibold !text-text-gay-color !w-1/4"
                    v-model="changeDefinition"
                    label="角色定义"
                    placeholder="请输入角色定义"
                    type="textarea"
                    :border="false"
                    :rules="[{ required: true, message: '请填写角色定义' }]"
                    rows="4"
                />
            </div>
        </van-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import getAssetsSource from "@/utils/getAssetsSource";
import router from "@/router";
import { useRoute } from "vue-router";
const route = useRoute();
let id = route.query.id as string;
import { useChatRecordStore } from "@/stores/chatRecord";
const chatRecordStore = useChatRecordStore();
const chatRecord = ref(chatRecordStore.getChatRecordById(id as string));
const showDetail = ref(false);
const showChange = ref(false);
const roleName = ref(chatRecord.value!.name);
const roleAvatar = ref(chatRecord.value!.avatar);
const roleDescription = ref(chatRecord.value!.description);
const roleDefinition = ref(chatRecord.value!.history[0].content);
const changeName = ref(roleName.value);
const changeSignature = ref(roleDescription.value);
const changeDefinition = ref(roleDefinition.value);
const onClickLeft = () => history.back();
const changeConfirm = () => {
    if (
        changeName.value === "" ||
        changeSignature.value === "" ||
        changeDefinition.value === ""
    ) {
        showFailToast("修改失败\n需要完整信息");
    } else {
        if (changeDefinition.value !== roleDefinition.value) {
            showConfirmDialog({
                title: "确认修改角色定义？？",
                message: "修改角色定义将直接开启新对话，删除上下文记录。",
                confirmButtonText: "确定",
                cancelButtonText: "不确定",
                confirmButtonColor: "var(--app-primary-color)",
            })
                .then(() => {
                    chatRecord.value!.history.push({
                        role: "divide",
                        content: "",
                    });
                    chatRecordStore.setRecordCountById(id, 0);
                    chatRecord.value = chatRecordStore.getChatRecordById(id);
                    chatRecordStore.updateChatRecordById(
                        id,
                        changeName.value,
                        changeSignature.value,
                        changeDefinition.value
                    );
                    roleName.value = changeName.value;
                    roleDescription.value = changeSignature.value;
                    roleDefinition.value = changeDefinition.value;
                })
                .catch(() => {
                    changeName.value = roleName.value;
                    changeSignature.value = roleDescription.value;
                    changeDefinition.value = roleDefinition.value;
                    showToast({
                        message: "已取消修改",
                        position: "bottom",
                        duration: 1000,
                    });
                });
        } else {
            chatRecordStore.updateChatRecordById(
                id,
                changeName.value,
                changeSignature.value,
                changeDefinition.value
            );
            roleName.value = changeName.value;
            roleDescription.value = changeSignature.value;
            roleDefinition.value = changeDefinition.value;
        }
    }
};
const deleteChat = (id: string) => {
    showConfirmDialog({
        title: "确认删除？？",
        message: "你真想删除？？？！",
        confirmButtonText: "删。。。",
        cancelButtonText: "不！！！",
        confirmButtonColor: "var(--app-primary-color)",
    }).then(() => {
        chatRecordStore.deleteChatRecordById(id);
        router.push("/chatList");
    });
};
</script>

<style scoped></style>
