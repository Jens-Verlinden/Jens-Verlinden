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

  useEffect(() => {
    if (audio) {
      const pulseElements = document.querySelectorAll('.pulse');
      if (clicked) {
        pulseElements.forEach((element) => element.classList.add('pulse-active'));
      } else {
        pulseElements.forEach((element) => element.classList.remove('pulse-active'));
      }
    }
  }, [clicked, audio]);

  useEffect(() => {
    if (audio) {
      const footer = document.querySelector('footer');
      if (clicked) {
        footer?.classList.add('new-dance');
      } else {
        footer?.classList.remove('new-dance');
      }
    }
  }, [clicked, audio]);

  return (
    <>
      <Head>
        <title>{!clicked ? "Jens Verlinden" : ":)"}</title>
        <meta name="description" content="Jens Verlinden - An unexpected introduction" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container min-h-screen min-w-full flex flex-col justify-center items-center relative overflow-hidden">
        <div className="absolute top-0 pt-4 right-0 m-4 z-50 flex space-x-4 pr-4">
          <a href="https://www.linkedin.com/in/jens-verlinden-informaticus" target="_blank" rel="noopener noreferrer" className="pulse">
            <img src="/linkedin.png" alt="LinkedIn" className="w-[9vw] max-w-14 filter invert opacity-100" />
          </a>
          <a href="https://github.com/Jens-Verlinden" target="_blank" rel="noopener noreferrer" className="pulse">
            <img src="/github.png" alt="GitHub" className="w-[9vw] max-w-14 filter invert opacity-100" />
          </a>
        </div>
        <img
          src="/favicon.ico"
          alt="favicon"
          className={`absolute ml-4 top-0 pt-4 left-2 m-4 z-50 w-[10vw] max-w-16 cursor-pointer ${clicked ? 'rotate' : ''}`}
          onClick={playQuack}
        />
        {clicked ? <Clicked /> : <Unclicked setClicked={setClicked} />}
      </div>
      <footer className="w-full absolute bottom-0 py-4 bg-transparent text-white text-center new-dance">
        <p className="text-xs opacity-80 italic md:text-sm lg:text-lg">© {new Date().getFullYear()} Jens Verlinden. All rights reserved. Inspired by <a className='underline' href="https://matias.me/nsfw/">matias.me</a>.</p>
      </footer>
    </>
  );
}
