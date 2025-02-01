"use client";

import Head from "next/head";
import { useEffect, useState } from "react";
import Unclicked from "./unclicked";
import Clicked from "./clicked";

export default function Home() {
  const [clicked, setClicked] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [quackAudio, setQuackAudio] = useState<HTMLAudioElement | null>(null);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);

  useEffect(() => {
    const enamoradaElement = new Audio("/enamorada.wav");
    enamoradaElement.loop = true;
    enamoradaElement.volume = 0.3;
    setAudio(enamoradaElement);

    const quackElement = new Audio("/quack.mp3");
    setQuackAudio(quackElement);
  }, []);

  const startAudio = () => {
    if (!audio) return;

    if (!audioContext) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) {
        console.error("Web Audio API is niet ondersteund in deze browser.");
        return;
      }
      const newAudioContext = new AudioContextClass();
      const source = newAudioContext.createMediaElementSource(audio);
      const analyserNode = newAudioContext.createAnalyser();

      analyserNode.fftSize = 256;
      source.connect(analyserNode);
      analyserNode.connect(newAudioContext.destination);

      setAudioContext(newAudioContext);
      setAnalyser(analyserNode);
    }

    audio.play().catch((error) => console.error("Autoplay blocked:", error));
  };

  const playQuack = () => {
    if (quackAudio) {
      quackAudio.currentTime = 0;
      quackAudio.play();
    }
  };

  useEffect(() => {
    if (clicked) {
      startAudio();
    }
  }, [clicked]);

  return (
    <>
      <Head>
        <title>:)</title>
        <meta name="description" content="Jens Verlinden - An unexpected introduction" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container min-h-screen min-w-full flex flex-col justify-center items-center relative overflow-hidden">
        <img
          src="/favicon.ico"
          alt="favicon"
          className={`absolute top-0 left-0 m-4 z-50 w-10 h-10 cursor-pointer ${clicked ? 'rotate' : ''}`}
          onClick={playQuack}
        />
        {clicked ? <Clicked /> : <Unclicked setClicked={setClicked} />}
      </div>
    </>
  );
}
