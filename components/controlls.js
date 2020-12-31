import { useEffect, useReducer, useState } from "react";
import time from "../lib/time";
import { fetchFile } from "@ffmpeg/ffmpeg";
import styled from "styled-components";
import Container from "./container";
import AnimatedButton from "./animatedButton";

const ControllsContainer = styled(Container)`
  justify-content: space-evenly;
  margin-top: 20px;
`;

const Input = styled.input`
  border: 1px solid #ccc;
  border-radius: 10px;
  outline: none;
  padding: 3px;
  min-width: 50px;
  max-width: 50px;

  &:focus {
    border: 1px solid #313131;
  }
`;

const TimeInputContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;

  &:first-child {
    margin-bottom: 5px;
  }

  & span:first-child {
    width: 100px;
    text-align: right;
    margin-right: 5px;
  }

  & span:last-child {
    margin: 0 5px;
  }
`;

const timeActionTypes = {
  SET_TIME: "SET_TIME",
  CHANGE_HOURS: "CHANGE_HOURS",
  CHANGE_MINUTES: "CHANGE_MINUTES",
  CHANGE_SECONDS: "CHANGE_SECONDS",
};

export default function Controlls({ video, videoRef, setGif, ffmpeg }) {
  const [isConverting, setIsConverting] = useState(false);
  const [visible, setVisible] = useState(false);

  const timeReducer = (state, action) => {
    switch (action.type) {
      case timeActionTypes.SET_TIME:
        return time.toHHMMSS(action.seconds);

      case timeActionTypes.CHANGE_HOURS:
        return { ...state, hours: action.hours };

      case timeActionTypes.CHANGE_MINUTES:
        return { ...state, minutes: action.minutes };

      case timeActionTypes.CHANGE_SECONDS:
        return { ...state, seconds: action.seconds };
      default:
        return state;
    }
  };

  const [startTime, startTimeDispatch] = useReducer(timeReducer, {
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [endTime, endTimeDispatch] = useReducer(timeReducer, {
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [videoDuration, videoDurationDispatch] = useReducer(timeReducer, {
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const convert = async (e) => {
    setIsConverting(true);
    const startSeconds = time.toSeconds(startTime);
    const endSeconds = time.toSeconds(endTime);

    e.preventDefault();
    ffmpeg.FS("writeFile", "test.mp4", await fetchFile(video));

    await ffmpeg.run(
      "-i",
      "test.mp4",
      "-t",
      `${endSeconds - startSeconds}`,
      "-ss",
      `${startSeconds}`,
      "-f",
      "gif",
      "out.gif"
    );

    const data = ffmpeg.FS("readFile", "out.gif");

    const url = URL.createObjectURL(
      new Blob([data.buffer], { type: "image/gif" })
    );

    setGif(url);
    setIsConverting(false);
  };

  useEffect(() => {
    if (video) {
      const setTime = () => {
        const duration = videoRef.current.duration;
        if (duration) {
          videoDurationDispatch({
            type: timeActionTypes.SET_TIME,
            seconds: duration,
          });

          startTimeDispatch({ type: timeActionTypes.SET_TIME, seconds: 0 });

          endTimeDispatch({
            type: timeActionTypes.SET_TIME,
            seconds: duration,
          });
        } else {
          setTimeout(() => {
            setTime();
          }, 100);
        }
      };

      setTimeout(() => {
        setTime();
      }, 100);

      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [video]);

  return (
    <ControllsContainer as="form" onSubmit={convert} visible={visible}>
      <div>
        <TimeInputContainer>
          <span>Start Time:</span>
          <span>
            <Input
              type="number"
              value={`${startTime.hours}`}
              min="0"
              max={`${endTime.hours}`}
              onChange={(e) => {
                startTimeDispatch({
                  type: timeActionTypes.CHANGE_HOURS,
                  hours: parseInt(e.target.value),
                });
              }}
              required
            />
            <span>:</span>
            <Input
              type="number"
              value={startTime.minutes}
              min="0"
              max={`${
                startTime.hours < videoDuration.hours ? 59 : endTime.minutes
              }`}
              onChange={(e) =>
                startTimeDispatch({
                  type: timeActionTypes.CHANGE_MINUTES,
                  minutes: parseInt(e.target.value),
                })
              }
              required
            />
            <span>:</span>
            <Input
              type="number"
              value={startTime.seconds}
              min="0"
              max={`${
                startTime.minutes < videoDuration.minutes ? 59 : endTime.seconds
              }`}
              onChange={(e) =>
                startTimeDispatch({
                  type: timeActionTypes.CHANGE_SECONDS,
                  seconds: parseInt(e.target.value),
                })
              }
              required
            />
          </span>
        </TimeInputContainer>
        <TimeInputContainer>
          <span>End Time:</span>
          <span>
            <Input
              type="number"
              value={endTime.hours}
              min={`${startTime.hours}`}
              max={`${videoDuration.hours}`}
              onChange={(e) =>
                endTimeDispatch({
                  type: timeActionTypes.CHANGE_HOURS,
                  hours: parseInt(e.target.value),
                })
              }
              required
            />
            <span>:</span>
            <Input
              type="number"
              value={endTime.minutes}
              min={`${startTime.minutes}`}
              max={`${
                endTime.hours < videoDuration.hours ? 59 : videoDuration.minutes
              }`}
              onChange={(e) =>
                endTimeDispatch({
                  type: timeActionTypes.CHANGE_MINUTES,
                  minutes: parseInt(e.target.value),
                })
              }
              required
            />
            <span>:</span>
            <Input
              type="number"
              value={endTime.seconds}
              min={`${startTime.seconds}`}
              max={`${
                endTime.minutes < videoDuration.minutes
                  ? 59
                  : videoDuration.seconds
              }`}
              onChange={(e) =>
                endTimeDispatch({
                  type: timeActionTypes.CHANGE_SECONDS,
                  seconds: parseInt(e.target.value),
                })
              }
            />
          </span>
        </TimeInputContainer>
      </div>

      <AnimatedButton
        loading={isConverting}
        text="Convert"
        loadingText="Converting..."
      />
    </ControllsContainer>
  );
}
