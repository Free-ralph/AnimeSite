import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import HeadsetIcon from "@mui/icons-material/Headset";
import { AnimatePresence, motion } from "framer-motion";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import CloseIcon from "@mui/icons-material/Close";
import { getMusicFiles } from "../../services/api";
import { useQuery } from "react-query";
import "./musicPlayer.css";
import { useStateContext } from "../../context/StateContextProvider";
import { PuffLoader } from "react-spinners";

export default function MusicPlayer() {
  const { Toast } = useStateContext();
  const audioPlayerRef = useRef<HTMLAudioElement>(null);
  // const [audio, setAudio] = useState(new Audio(audioFile));
  const [showMusicPlayer, setShowMusicPlayer] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const [curMusicIndex, setCurMusicIndex] = useState(0);
  const [canPlayNext, setCanPlayNext] = useState(false);
  // const [currTime, setCurrTime] = useState(0);
  // const [duration, setDuration] = useState(0);

  const { data: musicFiles, isLoading } = useQuery(
    "music-files",
    getMusicFiles,
    {
      onError: () => {
        Toast("Something's wrong with the music", "failure");
      },
    }
  );

  const toggleePlayPause = () => {
    const audio = audioPlayerRef.current;
    if (isPlaying) {
      audio?.pause();
      setCanPlayNext(false);
    } else {
      audio?.play();
      setCanPlayNext(true);
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMusicPlayer = () => {
    setShowMusicPlayer(!showMusicPlayer);
  };

  const updateCurrentTime = (
    e: React.SyntheticEvent<HTMLAudioElement, Event>
  ) => {
    const progressPercent = e.currentTarget.duration
      ? (
          (e.currentTarget.currentTime / e.currentTarget.duration) *
          100
        ).toFixed(2)
      : 0;
    // const curTime = e.currentTarget.currentTime;

    setProgress(+progressPercent);
    // setCurrTime(+curTime.toFixed(2));
  };

  const skipRight = () => {
    setIsPlaying(false);
    if (musicFiles && musicFiles.length > 0) {
      setCurMusicIndex((prev) => (prev + 1) % musicFiles.length);
    }
    setAudioReady(false);
    setCanPlayNext(true);
  };

  const skipLeft = () => {
    setIsPlaying(false);
    if (musicFiles && musicFiles.length > 0) {
      setCurMusicIndex(
        (prev) => (prev - 1 + musicFiles.length) % musicFiles.length
      );
    }
    setAudioReady(false);
    setCanPlayNext(true);
  };

  const handleAudioEnded = () => {
    skipRight();
  };

  const onSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    const audio = audioPlayerRef.current;
    if (audio) {
      audio.currentTime = (audio.duration / 100) * +e.target.value;
      if (audio.currentTime === audio.duration) {
        setIsPlaying(false);
      }
    }
    setProgress(+e.target.value);
  };
  const handleAudioReady = () => {
    setAudioReady(true);
  };

  useEffect(() => {
    if (canPlayNext && audioReady) {
      toggleePlayPause();
    }
  }, [audioReady]);

  const MusicPlayerVariant = {
    initial: {
      width: 0,
    },
    animate: {
      width: "100%",
      transition: {
        when: "beforeChildren",
        delayChildren: 0.2,
      },
    },

    exit: {
      width: 0,
      transition: {
        when: "afterChildren",
        delayChildren: 0.1,
      },
    },
  };

  const MusicControlsVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  };

  if (isLoading) {
    return (
      <div className="fixed bottom-2  h-[3rem] right-0 md:right-2 z-50 flex w-full md:w-[20rem] justify-end pointer-events-none">
        <div className="p-3 w-[3rem] h-full flex items-center justify-center bg-primary border-2 border-secondary text-secondary cursor-pointer pointer-events-auto">
          <PuffLoader color="#e6e4d5" size={20} />
        </div>
      </div>
    );
  }

  if (!audioReady) {
    <></>;
  }

  return (
    <>
      {musicFiles && (
        <div
          className={`fixed bottom-2  h-[3rem] right-0 md:right-2 z-50 flex w-full md:w-[20rem] justify-end  ${
            !showMusicPlayer && "pointer-events-none"
          }`}
        >
          <div
            onClick={toggleMusicPlayer}
            className="rounded-md p-3 w-[3rem] h-full flex items-center justify-center bg-primary border-2 border-secondary text-secondary cursor-pointer pointer-events-auto"
          >
            {showMusicPlayer ? <CloseIcon /> : <HeadsetIcon />}
          </div>
          <AnimatePresence>
            {showMusicPlayer && (
              <motion.div
                variants={MusicPlayerVariant}
                initial="initial"
                animate="animate"
                exit="exit"
                className="bg-primary border border-secondary h-full border-l-0 rounded-md"
              >
                <motion.div
                  variants={MusicControlsVariants}
                  className="relative justify-around items-center w-full h-full text-secondary flex"
                >
                  {" "}
                  <Slider
                    audioReady={audioReady}
                    progress={progress}
                    onChange={onSliderChange}
                  />
                  <Controls
                    audioReady={audioReady}
                    isPlaying={isPlaying}
                    toggleePlayPause={toggleePlayPause}
                    skipLeft={skipLeft}
                    skipRight={skipRight}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          <audio
            ref={audioPlayerRef}
            src={musicFiles[curMusicIndex].audio}
            onLoadedData={handleAudioReady}
            onTimeUpdate={updateCurrentTime}
            onEnded={handleAudioEnded}
          />
        </div>
      )}
    </>
  );
}

const Controls = ({
  toggleePlayPause,
  isPlaying,
  audioReady,
  skipLeft,
  skipRight,
}: {
  toggleePlayPause: () => void;
  isPlaying: boolean;
  audioReady: boolean;
  skipLeft: () => void;
  skipRight: () => void;
}) => {
  return (
    <div className="z-[1] w-[35%] flex justify-around mr-4">
      {audioReady ? (
        <>
          <span onClick={skipLeft} className=" cursor-pointer">
            <SkipPreviousIcon />
          </span>
          <span className=" cursor-pointer" onClick={toggleePlayPause}>
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </span>
          <span onClick={skipRight} className=" cursor-pointer">
            <SkipNextIcon />
          </span>
        </>
      ) : (
        <div className="text-gray-400">
          <div className=" cursor-pointer">
            <PuffLoader color="#e6e4d5" size={30} />
          </div>
        </div>
      )}
    </div>
  );
};

const Slider = ({
  progress,
  onChange,
  audioReady,
}: {
  progress: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  audioReady: boolean;
}) => {
  return (
    <div className="w-[65%] flex justify-center items-center">
      <div
        className="bg-gray-700 slider-progress h-full absolute left-0 top-0"
        style={{ width: `${progress}%` }}
      ></div>
      {audioReady ? (
        <input
          type="range"
          id="seek-slider"
          max="100"
          value={progress}
          className="w-[80%]"
          onChange={onChange}
        />
      ) : (
        <p className="text-center leading-tight"> Awesome Music Loading</p>
      )}
    </div>
  );
};
