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
                <van-image radius="10%" :src="getAssetsSource(userAvatar)" />
            </div>
            <div class="w-8/12 ml-6 mr-2">
                <div class="mb-6 font-semibold">
                    <van-text-ellipsis rows="1" :content="userName" />
                </div>
                <div class="text-sm text-text-gay-color">
                    <van-text-ellipsis
                        class=""
                        rows="3"
                        :content="'个性签名：' + userSignature"
                    />
                </div>
            </div>
            <div class="w-1/12 flex justify-end mt-12"></div>
        </div>
        <div style="--van-cell-right-icon-color: #171717">
            <van-cell-group class="my-2">
                <van-cell title="更多信息" is-link @click="showDetail = true">
                </van-cell>
                <van-cell title="修改信息" is-link @click="showChange = true">
                </van-cell>
            </van-cell-group>
            <van-cell-group class="my-2">
                <van-cell is-link>
                    <template #title>
                        <div
                            @click="showLogout"
                            class="text-center my-1 text-lg"
                            style="color: var(--app-danger-color)"
                        >
                            退出登录
                        </div>
                    </template>
                    <template #right-icon></template>
                </van-cell>
            </van-cell-group>
        </div>
        <van-dialog
            v-model:show="showDetail"
            title="详细信息"
            confirmButtonText="没劲，看看修改信息去🥱"
            confirmButtonColor="var(--app-primary-color)"
            @confirm="showChange = true"
        >
            <div class="p-6">
                <div class="flex justify-start mb-4">
                    <div class="w-1/3 font-semibold text-text-gay-color">
                        用户名：
                    </div>
                    <div class="w-3/4">{{ userName }}</div>
                </div>
                <div class="flex justify-start mb-4">
                    <div class="w-1/3 font-semibold text-text-gay-color">
                        个性签名：
                    </div>
                    <div class="w-3/4">{{ userSignature }}</div>
                </div>
                <div
                    class="text-center font-normal text-sm mt-2 text-text-gay-color"
                >
                    (对啊，就这些，还想看啥🤯🤯🤯)
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
                changeName = userName;
                changeSignature = userSignature;
                changeAvatar = userAvatar;
            "
        >
            <div class="p-2 py-6">
                <div
                    v-if="
                        userSignature ==
                        '兜兜啭啭①圏，蕞終還媞徊菿伱這裡(快把它改掉吧，谢谢你🥹)'
                    "
                    class="text-center text-text-gay-color text-sm px-6 pb-2"
                >
                    (怎么说，谁让我搜到的第一句个签就是这东西🫠)
                </div>
                <div class="flex justify-start pl-4">
                    <div
                        class="w-1/4 font-semibold text-text-gay-color text-sm"
                    >
                        头像
                    </div>
                    <van-image
                        width="100"
                        height="100"
                        radius="8"
                        @click="showChangAvatar = true"
                        :src="getAssetsSource(changeAvatar)"
                    />
                </div>
                <van-field
                    label-class="font-semibold !text-text-gay-color !w-1/4"
                    v-model="changeName"
                    label="用户名"
                    placeholder="请输入用户名"
                    :rules="[{ required: true, message: '请填写用户名' }]"
                    :border="false"
                />
                <van-field
                    label-class="font-semibold !text-text-gay-color !w-1/4"
                    v-model="changeSignature"
                    label="个性签名"
                    placeholder="请输入个性签名"
                    type="textarea"
                    :border="false"
                    :rules="[{ required: true, message: '请填写个性签名' }]"
                    rows="3"
                />
            </div>
        </van-dialog>
        <van-action-sheet
            v-model:show="showChangAvatar"
            title="更改头像"
            cancel-text="就现在这个！"
        >
            <div class="p-2">
                <div class="text-text-gay-color text-sm text-center">
                    (是的，不能自己改，我没给它做后端🫠)
                </div>
                <van-grid :column-num="3" :border="false">
                    <van-grid-item v-for="num in 6">
                        <van-image
                            width="100"
                            height="100"
                            radius="8"
                            :src="getAssetsSource(changeAvatarSrc(num - 1))"
                            @click="
                                changeAvatar = changeAvatarSrc(num - 1);
                                showChangAvatar = false;
                            "
                        />
                    </van-grid-item>
                </van-grid>
            </div>
        </van-action-sheet>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import getAssetsSource from "@/utils/getAssetsSource";
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
const userAvatar = ref(userStore.avatar);
const userName = ref(userStore.name);
const userSignature = ref(userStore.signature);
const showDetail = ref(false);
const showChange = ref(false);
const changeAvatar = ref(userAvatar.value);
const changeName = ref(userName.value);
const changeSignature = ref(userSignature.value);
const showChangAvatar = ref(false);
const onClickLeft = () => history.back();
const changeAvatarSrc = (num: number) => {
    if (userAvatar.value.includes(num.toString())) {
        return "assets/avatar/default.jpg";
    } else {
        return "assets/avatar/user" + num + ".jpg";
    }
};
const changeConfirm = () => {
    if (changeName.value === "" || changeSignature.value === "") {
        showFailToast("修改失败\n需要完整信息");
    } else {
        userStore.updateUser(
            changeName.value,
            changeSignature.value,
            changeAvatar.value
        );
        userAvatar.value = changeAvatar.value;
        userName.value = changeName.value;
        userSignature.value = changeSignature.value;
        showSuccessToast("修改成功");
    }
};

const showLogout = () => {
    showDialog({
        title: "退出登录？？",
        message: "我寻思着，咱也妹登录过啊🤯",
        confirmButtonText: "那就不退出",
        confirmButtonColor: "var(--app-primary-color)",
    }).then(() => {
        // on close
    });
};
</script>

<style scoped></style>
