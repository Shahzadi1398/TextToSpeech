import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

const formWaveSurferOptions = ref => ({
  container: ref,
  waveColor: "#eee",
  progressColor: "OrangeRed",
  barWidth: 3,
  barRadius: 3,
  width:300,
  height: 100,
});

export default function Waveform({ url, onAudioPlay, onAudioPause }) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);

  useEffect(() => {
    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);
    wavesurfer.current.load(url);
    if (wavesurfer.current) {
      wavesurfer.current.on("ready", function() {   
        wavesurfer.current.play();
      });
    }
    return () => wavesurfer.current.destroy();
  }, [url]);

  const handleAudioPlay = () => {
    if (onAudioPlay) {
      onAudioPlay();
    }
    if (wavesurfer.current) {
      wavesurfer.current.play();
    }
  };

  const handleAudioPause = () => {
    if (onAudioPause) {
      onAudioPause();
    }
    if (wavesurfer.current) {
      wavesurfer.current.pause();
    }
  };


  return (
    <div>
      <div id="waveform" ref={waveformRef} />
    </div>
  );
}
