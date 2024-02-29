"use client";
import React, { useEffect, useState } from "react";
import { Howl } from "howler";
import { PauseCircleTwoTone, PlayCircleTwoTone } from "@ant-design/icons";

Howler.autoUnlock = true;
Howler.html5PoolSize = 100; // It's because I play a lot of sounds

const HolidayMusicPlayer = ({ src }: { src: string }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [player, setPlayer] = useState<Howl | null>(null);

  useEffect(() => {
    // 初始化播放器
    const newPlayer = new Howl({
      src: [src],
      html5: false,
      format: ["mp3"],
      // 自动播放
      autoplay: true,
      loop: true,
      volume: 1,
    });
    setPlayer(newPlayer);

    // 组件卸载时停止播放
    return () => {
      newPlayer.stop();
    };
  }, [src]);

  // 控制播放和暂停
  const togglePlay = () => {
    if (!player) return;

    if (isPlaying) {
      player.pause();
    } else {
      player.play();
      player.fade(0, 1, 5000);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "10px",
        right: "10px",
        zIndex: 1000,
        borderRadius: "10px",
      }}
    >
      {isPlaying ? (
        <PauseCircleTwoTone
          onClick={togglePlay}
          style={{ fontSize: "36px", cursor: "pointer" }}
          // 红色
          twoToneColor="#ef0e0b"
        />
      ) : (
        <PlayCircleTwoTone
          onClick={togglePlay}
          style={{ fontSize: "36px", cursor: "pointer" }}
          // 红色
          twoToneColor="#ef0e0b"
        />
      )}
    </div>
  );
};

export default HolidayMusicPlayer;
