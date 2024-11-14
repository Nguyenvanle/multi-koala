import { useState, useRef, useCallback } from "react";
import { Video, AVPlaybackStatus } from "expo-av";

export const useVideoPlayer = () => {
  const videoRef = useRef<Video | null>(null);
  const [status, setStatus] = useState<AVPlaybackStatus>(
    {} as AVPlaybackStatus
  );

  const handlePlaybackStatusUpdate = useCallback(
    (newStatus: AVPlaybackStatus) => {
      setStatus(newStatus);
    },
    []
  );

  const playVideo = useCallback(async () => {
    if (videoRef.current) {
      try {
        await videoRef.current.playAsync();
      } catch (error) {}
    }
  }, []);

  const pauseVideo = useCallback(async () => {
    if (videoRef.current) {
      try {
        await videoRef.current.pauseAsync();
      } catch (error) {}
    }
  }, []);

  const stopVideo = useCallback(async () => {
    if (videoRef.current) {
      try {
        await videoRef.current.stopAsync();
      } catch (error) {}
    }
  }, []);

  const seekVideo = useCallback(async (millis: number) => {
    if (videoRef.current) {
      try {
        await videoRef.current.setPositionAsync(millis);
      } catch (error) {}
    }
  }, []);

  const unloadVideo = useCallback(async () => {
    if (videoRef.current) {
      try {
        await videoRef.current.unloadAsync();
      } catch (error) {}
    }
  }, []);
  return {
    videoRef,
    status,
    handlePlaybackStatusUpdate,
    playVideo,
    pauseVideo,
    stopVideo,
    seekVideo,
    unloadVideo,
  };
};
