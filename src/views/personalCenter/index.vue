<template>
    <div>
        <van-nav-bar
            fixed
            placeholder
            :border="false"
            style="--van-nav-bar-height: 50px"
        />
        <div
            class="w-full bg-white h-36 py-2 pl-6 pr-4 flex box-border"
            @click="showDetail = true"
        >
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
            <div class="w-1/12 flex justify-end mt-12">
                <van-icon name="arrow" color="var(--app-icon-color)" />
            </div>
        </div>
        <div style="--van-cell-right-icon-color: #171717">
            <van-cell-group class="my-2">
                <van-cell title="更多信息" is-link @click="showDetail = true">
                    <template #icon>
                        <div class="flex justify-center items-center mr-2">
                            <van-icon
                                name="weapp-nav"
                                size="16"
                                color="#57bf6a"
                            />
                        </div>
                    </template>
                </van-cell>
                <van-cell title="修改信息" is-link @click="showChange = true">
                    <template #icon>
                        <div class="flex justify-center items-center mr-2">
                            <van-icon
                                name="records"
                                size="16"
                                color="#f6c544"
                            />
                        </div>
                    </template>
                </van-cell>
            </van-cell-group>
            <van-cell-group class="my-2">
                <van-cell title="关于" is-link to="/about">
                    <template #icon>
                        <div class="flex justify-center items-center mr-2">
                            <van-icon name="info" size="16" color="#3e84e6" />
                        </div>
                    </template>
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
                    (服了嗷，谁让我搜到的第一句个签就是这东西🫠)
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
        <van-dialog
            v-model:show="easterEggShow"
            title="🌟🌟恭喜你发现彩蛋🌟🌟"
            confirmButtonText="谢谢小狗🐶"
            @confirm="easterEggShow = false"
        >
            <div class="p-2">
                <van-image
                    radius="10%"
                    :src="getAssetsSource('assets/img/egg.jpg')"
                />
            </div>
            <div class="px-4 text-text-gay-color text-center text-sm">
                是的，这就是彩蛋，恭喜你，这个彩蛋被触发的概率只有1%，你很幸运🎉（你就说是不是彩色的蛋吧（狗头））
            </div>
            <div class="p-4 text-text-gay-color text-center">
                🌟总之，看到小狗祝你天天开心🌟
            </div>
        </van-dialog>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
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
const easterEggShow = ref(false);
const changeAvatarSrc = (num: number) => {
    if (changeAvatar.value.includes(num.toString())) {
        return "assets/avatar/user.jpg";
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

onMounted(() => {
    if (Math.random() < 0.01) {
        easterEggShow.value = true;
    }
});
</script>

<style scoped></style>
