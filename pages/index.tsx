"use client";

import Head from "next/head";
import { useEffect, useState } from "react";
import Unclicked from "./unclicked";
import Clicked from "./clicked";

export default function Home() {

  const [clicked, setClicked] = useState(false);

  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
  const [quackAudio, setQuackAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const enamoradaElement = new Audio("/enamorada.wav");
    enamoradaElement.loop = true;
    setAudio(enamoradaElement);

    const quackElement = new Audio("/quack.mp3");
    setQuackAudio(quackElement);
  }, []);

  const start = () => {
    audio?.play()
  }

  const playQuack = () => {
    if (quackAudio) {
      quackAudio.currentTime = 0;
      quackAudio.play();
    }
  };

  useEffect(() => {
    start()
  }, [clicked])

  return (
    <>
      <Head>
        <title>:)</title>
        <meta name="description" content="Jens Verlinden - An unexpected introduction" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container min-h-screen min-w-full flex flex-col justify-center items-center relative overflow-hidden">
        <div className="absolute top-0 right-0 m-4 z-50 flex space-x-4">
          <a href="https://www.linkedin.com/in/jens-verlinden-informaticus" target="_blank" rel="noopener noreferrer">
            <img src="/linkedin.png" alt="LinkedIn" className="w-8 h-8 filter invert opacity-70" />
          </a>
          <a href="https://github.com/Jens-Verlinden" target="_blank" rel="noopener noreferrer">
            <img src="/github.png" alt="GitHub" className="w-8 h-8 filter invert opacity-70" />
          </a>
        </div>
        <img
          src="/favicon.ico"
          alt="favicon"
          className="absolute top-0 left-0 m-4 z-50 w-10 h-10 cursor-pointer"
          onClick={playQuack}
        />
        {clicked ? <Clicked /> : <Unclicked setClicked={setClicked} />}
      </div>
      <footer className="w-full absolute bottom-0 py-4 bg-transparent text-white text-center">
        <p className="text-xs opacity-70 md:text-sm">© {new Date().getFullYear()} Jens Verlinden. All rights reserved. Inspired by <a className='underline' href="https://matias.me/nsfw/">matias.me</a>.</p>
      </footer>
    </>
  );
}