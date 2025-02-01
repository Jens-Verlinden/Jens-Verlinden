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
        <meta name="title" content="Jens Verlinden" />
        <meta name="description" content="An unexpected introduction" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jensverlinden.be" />
        <meta property="og:title" content="Jens Verlinden" />
        <meta property="og:description" content="An unexpected introduction" />
        <meta property="og:image" content="data:image/png;base64,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" />
        <meta name="author" content="Jens verlinden" />
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
