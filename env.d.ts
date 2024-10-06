/// <reference types="vite/client" />

interface chatHistory {
    role: string;
    content: string;
}

interface chatRecord {
    id: string;
    onTop: boolean;
    // recordCount记录该角色上下文数
    recordCount: number;
    maxRecordCount: number;
    name: string;
    avatar: string;
    description: string;
    history: chatHistory[];
}
