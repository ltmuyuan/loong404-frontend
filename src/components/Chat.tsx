"use client";
import { useCallback, useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { base64Encode } from "@/utils";
import { useRouter } from "next/navigation";
import debounce from "lodash/debounce";
import { ChatMessage } from "@ant-design/pro-chat/es/types/message";
import dynamic from "next/dynamic"; // 生成 ID

const ProChat = dynamic(() => import("./ProChat"), { ssr: false });
const HolidayMusicPlayer = dynamic(() => import("./Music"), { ssr: false });

// 生成 ID
const userId = nanoid();

export function Chat() {
  useEffect(() => {
    // 1s 后模拟点击html一下
    setTimeout(() => {
      if (typeof window !== "undefined") {
        const html = document.querySelector("html");
        if (html) {
          html.click();
          console.log("click html");
        }
      }
    }, 1000);
  }, []);

  const router = useRouter();

  const [chats, setChats] = useState<ChatMessage<any>[]>([]);

  const navigateDebounced = useCallback(
    debounce((url) => {
      router.push(url);
    }, 1000),
    [],
  ); // 1000ms的防抖时间

  return (
    <div
      style={{
        // backgroundColor: theme.colorBgLayout,
        backgroundImage:
          "url('https://oss.anuniverse.com/public/background.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {/*<HolidayMusicPlayer*/}
      {/*  src={"https://oss.anuniverse.com/public/257893594.mp3"}*/}
      {/*/>*/}
      <ProChat
        chats={chats}
        style={{
          height: "100vh",
          width: "100vw",
        }}
        helloMessage={
          "2024，财神到你家！帮你算算新的一年你能赚多少钱。告诉财神爷你叫什么名字吧"
        }
        onChatsChange={(chats: any) => {
          const lastChat = chats[chats.length - 1];
          const lastContent = lastChat.content as string;
          if (
            chats.length > 0 &&
            lastChat.role === "assistant" &&
            lastContent?.includes("可以赚")
          ) {
            if (typeof window !== "undefined") {
              // 分割 lastContent use 。，！
              const list = lastContent.split(/[。，！？]|2024年/);
              // 获取包含“今年能赚”的语句
              const current = list.find((item) => item.includes("可以赚"));
              if (!current) {
                return;
              }
              const res = base64Encode(current);
              navigateDebounced("/res?res=" + res);
            }
          }
          setChats(chats);
        }}
        request={async (messages: any) => {
          const response = await fetch("/api/openai", {
            method: "POST",
            body: JSON.stringify({
              messages: messages,
              userId: userId,
            }),
          });
          return response;
        }}
        chatItemRenderConfig={{
          avatarRender: false,
          actionsRender: false,
        }}
      />
    </div>
  );
}
