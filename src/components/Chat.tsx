"use client";
import { useCallback, useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { base64Encode } from "@/utils";
import { useRouter } from "next/navigation";
import debounce from "lodash/debounce";
import { ChatMessage } from "@ant-design/pro-chat/es/types/message";
import dynamic from "next/dynamic"; // 生成 ID
import RisingBg from "@/assets/rising-bg.jpg";
import { Header } from "./Header";

const ProChat = dynamic(() => import("./ProChat"), { ssr: false });

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
        backgroundImage: `url(${RisingBg.src})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        paddingTop: "90px",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Header />
      {/*<HolidayMusicPlayer*/}
      {/*  src={"https://oss.anuniverse.com/public/257893594.mp3"}*/}
      {/*/>*/}
      <ProChat
        chats={chats}
        style={{
          height: "100%",
          width: "100%",
          position: "relative",
          zIndex: 1
        }}
        helloMessage={
          "神龙精灵保佑你赚大钱！2024年运气如何？让神秘的东方玄学给你分析一下吧！"
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
          const response = await fetch("/chat/api/openai", {
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
