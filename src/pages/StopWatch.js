import Modal from "./Modal";
import Table from "./Table";
import React, { useEffect, useMemo, useState } from "react";
import "./stopWatch.css";

const StopWatch = () => {
  const [timer, setTimer] = useState(0);
  const [isSplit, setIsSplit] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [splitTimer, setSplitTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [timeSplits, setTimeSplits] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && !isPause) {
      interval = setInterval(function () {
        setTimer(timer + 1);
        if (!isSplit) setSplitTimer(splitTimer + 1);
      }, 1);
    } else clearInterval(interval);
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPause, timer, isSplit, splitTimer]);

  useEffect(() => {
    let splitInterval = null;
    if (isSplit && !isPause) {
      splitInterval = setInterval(() => {
        setSplitTimer(splitTimer + 1);
        if (!isActive) setTimer(timer + 1);
      });
    } else clearInterval(splitInterval);
    return () => {
      clearInterval(splitInterval);
    };
  }, [isActive, isPause, isSplit, timer, splitTimer]);

  const handleStart = () => {
    setIsActive(true);
    setIsPause(false);
  };

  const handleSplit = () => {
    timeSplits.push({
      time: `${splitHour}:${splitMin}:${splitSec}:${splitMilliSec}`,
      type: "Split",
    });
    setSplitTimer(0);
    setIsSplit(true);
    setIsPause(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setIsSplit(false);
    setTimeSplits([]);
    setSplitTimer(0);
    setTimer(0);
  };

  const handlePause = () => {
    if (!isPause)
      timeSplits.push({
        time: `${splitHour}:${splitMin}:${splitSec}:${splitMilliSec}`,
        type: "Pause",
      });
    setIsPause(!isPause);
  };
  const hour = useMemo(
    () => ("0" + Math.floor((timer / 3600000) % 60)).slice(-2),
    [timer]
  );
  const min = useMemo(
    () => ("0" + Math.floor((timer / 60000) % 60)).slice(-2),
    [timer]
  );
  const sec = useMemo(
    () => ("0" + Math.floor((timer / 1000) % 60)).slice(-2),
    [timer]
  );
  const milliSec = useMemo(() => ("0" + (timer % 1000)).slice(-3), [timer]);

  const splitHour = useMemo(
    () => ("0" + Math.floor((splitTimer / 3600000) % 60)).slice(-2),
    [splitTimer]
  );
  const splitMin = useMemo(
    () => ("0" + Math.floor((splitTimer / 60000) % 60)).slice(-2),
    [splitTimer]
  );
  const splitSec = useMemo(
    () => ("0" + Math.floor((splitTimer / 1000) % 60)).slice(-2),
    [splitTimer]
  );
  const splitMilliSec = useMemo(
    () => ("0" + (splitTimer % 1000)).slice(-3),
    [splitTimer]
  );

  return (
    <div>
      <div className="timer">
        <div>{hour}:</div>
        <div>{min}:</div>
        <div>{sec}.</div>
        <div>{milliSec}</div>
      </div>
      <div className="split-timer">
        <div>{splitHour}:</div>
        <div>{splitMin}:</div>
        <div>{splitSec}.</div>
        <div>{splitMilliSec}</div>
      </div>

      {!isActive ? (
        <button onClick={handleStart} className="start">
          Start
        </button>
      ) : (
        <button onClick={handlePause} className="pause">
          Pause
        </button>
      )}
      <button onClick={handleSplit} className="split">
        Split
      </button>
      <button onClick={handleReset} className="reset">
        Reset
      </button>

      <Table timeSplits={timeSplits} />

      <button
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "green",
          color: "white",
          border: "none",
          borderRadius: "5px",
          textTransform: "uppercase",
        }}
        onClick={() => setOpenModal(true)}
      >
        Export
      </button>

      {openModal && (
        <Modal
          open={openModal}
          setOpen={setOpenModal}
          timeSplits={timeSplits}
        />
      )}
    </div>
  );
};

export default StopWatch;
