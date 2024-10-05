<template>
    <div class="h-full w-full overflow-hidden bg-white flex flex-col">
        <van-nav-bar
            title="关于"
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
        </van-nav-bar>
        <div
            class="p-4 flex-1 flex flex-col overflow-hidden"
            style="background-color: var(--app-background-color)"
        >
            <div class="w-full h-28 text-center">
                <van-image
                    radius="8px"
                    class="w-24 h-24"
                    :src="getAssetsSource('assets/avatar/myAvatar.jpg')"
                />
            </div>
            <div
                class="container w-full flex-1 overflow-y-auto box-border flex flex-col rounded-sm p-4 indent-8 text-base"
                style="background-color: var(--app-background-color)"
                ref="container"
                @touchstart="changeStyle"
                @touchend="resetStyle"
            >
                <div>你的关于</div>
                <!-- <div>
                    首先，谢谢你点开了这款APP的“关于”，愿意更多的地了解这款APP以及它的开发者<span
                        class="text-text-gay-color text-xs"
                        >（其实遇到这种我都懒得点开来着😳）</span
                    >，另外，如果你愿意继续读下去，那就再谢谢你一次🤯<span
                        class="text-text-gay-color text-xs"
                        >（其实遇到这种我也都懒得读下去来着😳）</span
                    >。
                </div>
                <div>
                    如你所见，微t哥是一个可以跟ChatGPT聊天的APP，这款APP名字中的“微”字与整体界面的风格有关，我自不必多说<span
                        class="text-text-gay-color text-xs"
                        >（这是致敬！！）</span
                    >，“t哥”是指ChatGPT，我们都喜欢t哥，有事儿找你t哥准没错！特别的，微t哥允许用户在国内的网络环境中访问，并且可以免费使用OpenAI的接口服务。其次，关于这款APP的技术栈，这是个纯前端项目，基于<a
                        class="text-blue-500"
                        href="https://cn.vuejs.org/"
                        >vue3</a
                    >；ui基于<a
                        class="text-blue-500"
                        href="https://vant-ui.github.io/vant/#/zh-CN"
                        >Vant4</a
                    >组件库；图标、图片素材来源见下方“素材来源”，遇到喜欢的素材可以找到原作者；至于OpenAI的聊天接口，我使用了Github项目：<a
                        class="text-blue-500"
                        href="https://github.com/chatanywhere/GPT_API_free"
                        >ChatAnywhere</a
                    >提供的免费公益接口，免费版有一天200次的对话限制，所以，如果回复报错，大概率是次数被用完了🤯<span
                        class="text-text-gay-color text-xs"
                        >（但凡只要是用到t哥的接口的地方，我用的都是这个Key💔）</span
                    >，大语言模型固定为gpt-4o-mini<span
                        class="text-text-gay-color text-xs"
                        >（好用，不用想别的了）</span
                    >。另外，微t哥已开源在github，如果有想知道怎么实现的朋友可以点击此<a
                        class="text-blue-500"
                        href="https://github.com/Z-404-Not-Found/We-T-Ge-vue"
                    >
                        链接</a
                    >跳转github拉取源代码，上下文记忆的功能实现其实是我自认为的一个小巧思来着（狗头），当然，如果可以，希望点个star🌟，再谢你一次🤯。最后，我在这个APP中藏了一个触发概率1%的彩蛋，如果你找到它了，那就说明你找到它了🤯，你会得到我的夸奖，触发之后自动到账🤯！<span
                        class="text-text-gay-color text-xs"
                        >（提示：与聊天功能无关，一般会在无聊的时候触发）</span
                    >
                </div>
                <div>
                    然后，关于我。。。关于我没什么好说的🤯，在这种不想透露姓名的场合我一般叫Sure或者404_Not-Found，一臭大三软工在读，臭打游戏的，臭写代码的🫸🫷。
                </div>
                <div>好，那么最后，希望t哥能帮到你，玩儿的开心🎉。</div>
                <div class="indent-0 text-xs text-text-gay-color">
                    <div>素材来源 ：</div>
                    <div>
                        1. 部分头像及图标：<a
                            class="text-blue-500"
                            href="https://www.iconfont.cn/"
                            >iconfont</a
                        >
                    </div>
                    <div>
                        2.用户头像及默认角色头像图片：小🍠——月小七🍬（小🍠号：Jelly777）
                    </div>
                    <div>
                        3.“中国亲妈”头像图片：小🍠——星光慧慧子（小🍠号：cmh188o）
                    </div>
                    <div>
                        4.“故事王”头像图片：小🍠——Oneone（小🍠号：4272273487）
                    </div>
                    <div>
                        5.“文字冒险游戏”头像图片：小🍠——梦境匠人H.Po（小🍠号：9624138367）
                    </div>
                    <div>6. “励志师”头像图片：《爱情公寓》截图</div>
                    <div>7. “小🍠写手”头像图片：小🍠表情</div>
                    <div>
                        8. “彩蛋”图片：小🍠——Uynixgnaw（小🍠号：849299507）
                    </div>
                    <div>（小🍠真是个找素材的好地方🤯）</div>
                    <div>
                        注：素材来源于网络，如有侵权及时删除，此项目不作任何商业用途。
                    </div>
                    <div>
                        开发者邮箱：<a class="text-blue-500"
                            >Zhsh_404-NotFound_P@outlook.com</a
                        >
                    </div>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useTemplateRef } from "vue";
import getAssetsSource from "@/utils/getAssetsSource";

const container = useTemplateRef("container");
const onClickLeft = () => history.back();

const changeStyle = () => {
    if (container.value) {
        container.value.classList.add("container-touched");
    }
};
const resetStyle = () => {
    if (container.value) {
        container.value.classList.remove("container-touched");
    }
};
</script>

<style scoped>
.container {
    transition: all 0.3s;
}
.container-touched {
    box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.2) inset,
        -6px -6px 6px rgb(255, 255, 255) inset;
    background-color: #f1f1f1 !important;
}
</style>
