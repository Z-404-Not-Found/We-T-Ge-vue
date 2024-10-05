import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            name: "layout",
            redirect: "/chatList",
            meta: {
                index: 0,
                navBarColor: "#ededed",
            },
            component: () => import("@/views/Layout/index.vue"),
            children: [
                {
                    path: "chatList",
                    name: "微t哥",
                    meta: {
                        index: 0,
                        navBarColor: "#ededed",
                    },
                    component: () => import("@/views/chatList/index.vue"),
                },
                {
                    path: "personalCenter",
                    name: "个人中心",
                    meta: {
                        index: 0,
                        navBarColor: "#fff",
                    },
                    component: () => import("@/views/personalCenter/index.vue"),
                },
            ],
        },
        {
            path: "/chat",
            name: "",
            meta: {
                index: 1,
                navBarColor: "#ededed",
            },
            component: () => import("@/views/chat/index.vue"),
        },
        {
            path: "/addRole",
            name: "",
            meta: {
                index: 1,
                navBarColor: "#ededed",
            },
            component: () => import("@/views/addRole/index.vue"),
        },
        {
            path: "/about",
            name: "",
            meta: {
                index: 1,
                navBarColor: "#ededed",
            },
            component: () => import("@/views/about/index.vue"),
        },
        {
            path: "/roleCenter",
            name: "",
            meta: {
                index: 2,
                navBarColor: "#fff",
            },
            component: () => import("@/views/roleCenter/index.vue"),
        },
        {
            path: "/userCenter",
            name: "",
            meta: {
                index: 2,
                navBarColor: "#fff",
            },
            component: () => import("@/views/userCenter/index.vue"),
        },
    ],
});

export default router;
