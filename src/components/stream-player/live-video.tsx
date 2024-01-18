import { useEffect, useRef, useState } from "react";
import { useEventListener } from "usehooks-ts";
import { Participant, Track } from "livekit-client";
import { useTracks } from "@livekit/components-react";
import { FullScreenControl } from "./fullscreen-control";
import { VolumeControl } from "./volume-contol";

type LiveVideoprops = {
  participant: Participant;
};

export const LiveVideo = ({ participant }: LiveVideoprops) => {
  const videoref = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((track) => track.participant.identity === participant.identity)
    .forEach((track) => {
      if (videoref.current) {
        track.publication.track?.attach(videoref.current);
      }
    });

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [volume, setVolume] = useState(0);

  useEffect(() => {
    //set volume to zero in initial page load
    onVolumeChange(0);
  }, []);

  const handleFullScreenChange = () => {
    const isFullScreenElement = document.fullscreenElement !== null;
    setIsFullScreen(isFullScreenElement);
  };
  useEventListener("fullscreenchange", handleFullScreenChange, wrapperRef);

  const toggleFullScreen = () => {
    if (isFullScreen) document.exitFullscreen();
    else if (wrapperRef.current) wrapperRef.current.requestFullscreen();
  };

  const onVolumeChange = (value: number) => {
    setVolume(+value);
    if (videoref.current) {
      videoref.current.muted = value === 0;
      videoref.current.volume = +value * 0.01;
    }
  };

  const toggleMute = () => {
    const isMuted = volume === 0;
    setVolume(isMuted ? 50 : 0);

    if (videoref.current) {
      videoref.current.muted = !isMuted;
      videoref.current.volume = isMuted ? 0.5 : 0;
    }
  };

  return (
    <div ref={wrapperRef} className="relative h-full flex border border-white">
      <video src="" ref={videoref} width={"100%"} />
      <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all border border-white">
        <div className="absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4 border border-white">
          <VolumeControl
            value={volume}
            onChange={onVolumeChange}
            onToggle={toggleMute}
          />
          <FullScreenControl
            isFullScreen={isFullScreen}
            onToggle={toggleFullScreen}
          />
        </div>
      </div>
    </div>
  );
};
