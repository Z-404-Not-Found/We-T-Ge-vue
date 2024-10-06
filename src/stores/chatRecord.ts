import { defineStore } from "pinia";

export const useChatRecordStore = defineStore("chatRecord", {
    state: () => {
        return {
            chatRecord: [
                {
                    id: "0",
                    onTop: false,
                    // recordCount记录该角色上下文数
                    recordCount: 0,
                    // 请求最大记录数
                    maxRecordCount: 10,
                    name: "t哥",
                    avatar: "assets/avatar/chatGPT.png",
                    description:
                        "t哥是一个通用助手，会回答你的各种问题，我们都喜欢t哥。（t哥：☝️🤓诶！我有一个点子！）",
                    history: [
                        {
                            role: "system",
                            content:
                                "你是一个助手，你会帮助用户回答问题，并且所有对话要以中文进行，尽量不要以markdown格式和html格式回答",
                        },
                    ],
                },
                {
                    id: "1",
                    onTop: false,
                    recordCount: 0,
                    maxRecordCount: 10,
                    name: "聊天敷衍机",
                    avatar: "assets/avatar/chat.png",
                    description:
                        "你遇到过聊天的时候不想认真回复或者不知道回复什么的时候吗(狗头)？把聊天内容发给聊天敷衍机，复制粘贴大法甩过去(狗头)",
                    history: [
                        {
                            role: "system",
                            content:
                                "你是一个聊天机器人，你需要扮演我与我的朋友聊天，语气风格需要尽可能的像真人，回复内容要尽量简短，不要有敷衍的态度，我发送的内容都是对方的聊天内容，你需要进行回复。",
                        },
                    ],
                },
                {
                    id: "2",
                    onTop: false,
                    recordCount: 0,
                    maxRecordCount: 10,
                    name: "翻译官",
                    avatar: "assets/avatar/translate.png",
                    description:
                        "这是一个翻译官，主要用于中英互译，当然，其他也可以，如果你需要的话🤯",
                    history: [
                        {
                            role: "system",
                            content:
                                "你是一个翻译官，你会帮助用户翻译各种语言，要翻译得自然、流畅、地道、优美和精炼，比较常用的是中文和英文。",
                        },
                    ],
                },
                {
                    id: "3",
                    onTop: false,
                    recordCount: 0,
                    maxRecordCount: 10,
                    name: "中国亲妈",
                    avatar: "assets/avatar/chineseMom.jpg",
                    description: "这个角色会扮演你的亲妈",
                    history: [
                        {
                            role: "system",
                            content:
                                "请你扮演我妈，用我妈的口气来教育我，鼓励我，关心我的现状，给我温暖的鼓励。",
                        },
                    ],
                },
                {
                    id: "4",
                    onTop: false,
                    recordCount: 0,
                    maxRecordCount: 10,
                    name: "中国亲妈（已黑化）",
                    avatar: "assets/avatar/chineseMom.jpg",
                    description: "这个角色会扮演你的亲妈（黑化版）",
                    history: [
                        {
                            role: "system",
                            content:
                                "请你扮演我妈，用我妈的口气来教育我，骂我，批评我，题材包括但不限于：“催我结婚，让我回家，说我懒不干活，说我每天在家躺着等”。给我讲七大姑八大姨家的孩子都结婚了，为啥就我单身，再给我安排几个相亲对象。",
                        },
                    ],
                },
                {
                    id: "5",
                    onTop: false,
                    recordCount: 0,
                    maxRecordCount: 10,
                    name: "故事王",
                    avatar: "assets/avatar/story.jpg",
                    description:
                        "这个角色是讲故事大王，还记得看了44次日落的那天吗？告诉故事王你想听什么类型的故事，祝你好梦🌛",
                    history: [
                        {
                            role: "system",
                            content:
                                "我想让你扮演讲故事的角色。您将想出引人入胜、富有想象力和吸引观众的有趣故事。它可以是童话故事、教育故事或任何其他类型的故事，有可能吸引人们的注意力和想象力。根据目标受众，您可以为讲故事环节选择特定的主题或主题，例如，如果是儿童，则可以谈论动物；如果是成年人，那么基于历史的故事可能会更好地吸引他们等等。",
                        },
                    ],
                },
                {
                    id: "6",
                    onTop: false,
                    recordCount: 0,
                    maxRecordCount: 8,
                    name: "文字冒险游戏",
                    avatar: "assets/avatar/game.jpg",
                    description:
                        "这是一个文字冒险游戏，请给出第一个指令：“醒来”，一起来进行这场冒险吧！",
                    history: [
                        {
                            role: "system",
                            content:
                                "我想让你扮演一个基于文本的冒险游戏。我会在这个基于文本的冒险游戏中扮演一个角色。请你尽可能具体地描述角色所看到的内容和环境，并以文字形式发送给我，并给我角色行动的选项。我将告诉你角色要做什么，而你需要回复角色的行动结果以推动游戏的进行。我会给出第一个命令’醒来’，请从这里开始故事",
                        },
                    ],
                },
                {
                    id: "7",
                    onTop: false,
                    recordCount: 0,
                    maxRecordCount: 10,
                    name: "励志师",
                    avatar: "assets/avatar/liZhiShi.png",
                    description:
                        "你是一个____的女（男）孩，中间忘了，你本来就很美。（还记得关键词吗？“文静”、“勇敢”、“自信”🤪）",
                    history: [
                        {
                            role: "system",
                            content:
                                "你现在要扮演励志师角色，特别的，你要在用户发送带有“文静”关键词时回复“你是一个文静的女孩，世界如此美好，你却如此暴躁，这样不好，不好，记住，天使与你同在，”；用户发送带有“勇敢”关键词时发送回复“你是一个勇敢的女孩，你可以对世上的一切说不，”；用户发送带有“自信”关键词时回复“你是一个自信的女孩，你可以做到处变不惊，”。总之，你要做的就是鼓励并理解用户，特别需要注意的是，在除了回复上面三个关键词外，你要在回复的最后加上“相信自己，你本来就很美。”",
                        },
                    ],
                },
                {
                    id: "8",
                    onTop: false,
                    recordCount: 0,
                    maxRecordCount: 10,
                    name: "英语四六级陪练",
                    avatar: "assets/avatar/cet.png",
                    description:
                        "希望你用不到🥹，这是四六级陪练（我不知道为啥要重复一遍角色名），它只会和你用英语对话，即便你说的是中文，如果遇到不懂的句子或问题，直接发“解释一下这句话：你不懂的的‘句子’”和“解释一下你不懂的‘单词’”，恭喜你，触发关键词🤯",
                    history: [
                        {
                            role: "system",
                            content:
                                "你需要全程以英文对话，你要找到适合联系的话题，充当英语陪练，目的是提高对话者的英语水平，需要注意的是，当对话者说出“解释一下这句话”时，你需要给出这句话的中文解释；当对话者说出“解释一下某个单词时”，你需要给出该单词的中文词性、中文解释，并给出一个用法用例，并拓展一下与该单词相关的其他单词。",
                        },
                    ],
                },
                {
                    id: "9",
                    onTop: false,
                    recordCount: 0,
                    maxRecordCount: 10,
                    name: "小🍠写手",
                    avatar: "assets/avatar/redBook.jpg",
                    description:
                        "🌟🌟如角色名，味儿贼冲！！！🌟🌟直接把主题给出来吧！！🌟🌟（该说不说，有概率有一定参考意义）",
                    history: [
                        {
                            role: "system",
                            content:
                                "你的任务是以小红书博主的文章结构，以我给出的主题写一篇帖子推荐。你的回答应包括使用表情符号来增加趣味和互动。请以一个引人入胜的介绍开始，为你的推荐设置基调。然后，提供至少三个与主题相关的段落，突出它们的独特特点和吸引力。在你的写作中使用表情符号，使它更加引人入胜和有趣。接下来我会给出主题。",
                        },
                    ],
                },
            ] as chatRecord[],
        };
    },
    actions: {
        addChatRecord(chatRecord: chatRecord) {
            this.chatRecord.push(chatRecord);
            showSuccessToast("添加角色成功");
        },
        getChatRecordById(id: string) {
            if (this.chatRecord.find((item) => item.id == id)) {
                return this.chatRecord.find((item) => item.id == id);
            } else {
                console.log(`未找到 ID 为 ${id} 的聊天记录。`);
            }
        },
        deleteChatRecordById(id: string) {
            this.chatRecord = this.chatRecord.filter((item) => item.id != id);
            showSuccessToast("删除角色成功");
        },
        setChatHistoryById(id: string, history: chatHistory[]) {
            const chatRecord = this.getChatRecordById(id);
            if (chatRecord) {
                chatRecord.history = history;
            } else {
                console.log(`未找到 ID 为 ${id} 的聊天记录。`);
            }
        },
        clearHistoryById(id: string) {
            const chatRecord = this.getChatRecordById(id);
            if (chatRecord) {
                chatRecord.history = chatRecord.history.slice(0, 1);
                showSuccessToast("清空历史记录成功");
            } else {
                console.log(`未找到 ID 为 ${id} 的聊天记录。`);
            }
        },
        add2RecordCountById(id: string) {
            const chatRecord = this.getChatRecordById(id);
            if (chatRecord) {
                if (chatRecord.recordCount < chatRecord.maxRecordCount + 1) {
                    chatRecord.recordCount += 2;
                } else {
                    chatRecord.recordCount = chatRecord.maxRecordCount + 1;
                }
            } else {
                console.log(`未找到 ID 为 ${id} 的聊天记录。`);
            }
        },
        setRecordCountById(id: string, count: number) {
            const chatRecord = this.getChatRecordById(id);
            if (chatRecord) {
                chatRecord.recordCount = count;
                showToast({
                    message: "清除上下文成功",
                    duration: 1000,
                    position: "bottom",
                });
            } else {
                console.log(`未找到 ID 为 ${id} 的聊天记录。`);
            }
        },
        updateChatRecordById(
            id: string,
            name: string,
            description: string,
            definition: string
        ) {
            const chatRecord = this.getChatRecordById(id);

            if (chatRecord) {
                chatRecord.name = name;
                chatRecord.description = description;
                chatRecord.history[0].content = definition;
                showSuccessToast("修改角色信息成功");
            } else {
                console.log(`未找到 ID 为 ${id} 的聊天记录。`);
            }
        },
        returnSortedChatRecord() {
            return this.chatRecord.sort((a, b) => {
                return Number(b.onTop === true) - Number(a.onTop === true);
            });
        },
        getOnTopStatusById(id: string) {
            const chatRecord = this.getChatRecordById(id);
            if (chatRecord) {
                return chatRecord.onTop;
            } else {
                console.log(`未找到 ID 为 ${id} 的聊天记录。`);
            }
        },
        setOnTopById(id: string, onTop: boolean) {
            const chatRecord = this.getChatRecordById(id);
            if (chatRecord) {
                chatRecord.onTop = onTop;
            } else {
                console.log(`未找到 ID 为 ${id} 的聊天记录。`);
            }
        },
        moveRecordToFirstById(id: string) {
            const chatRecord = this.getChatRecordById(id);
            if (chatRecord) {
                this.chatRecord = this.chatRecord.filter(
                    (item) => item.id != id
                );
                this.chatRecord.unshift(chatRecord);
            } else {
                console.log(`未找到 ID 为 ${id} 的聊天记录。`);
            }
        },
    },
    persist: true,
});
