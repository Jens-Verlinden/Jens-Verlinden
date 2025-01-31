import { useState, useEffect } from "react";

export default function Clicked() {

  return (
    <div className="container min-h-screen min-w-full flex flex-col justify-center items-center relative overflow-hidden disco">
      <img
        src="/shiny-ditto.gif"
        alt="Dancing Ditto, but shiny"
        className="absolute w-70 h-70 px-5 transform transition-transform duration-1000 ease-in-out"
        style={{ animation: 'zoomIn 2s forwards' }}
      />
      <style jsx>{`
        @keyframes zoomIn {
          0% {
            transform: scale(0);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes disco {
          0% { background-color: #ff0000; }
          25% { background-color: #00ff00; }
          50% { background-color: #0000ff; }
          75% { background-color: #ffff00; }
          100% { background-color: #ff00ff; }
        }

        .disco {
          animation: disco 1s infinite;
        }
      `}</style>
    </div>
  );
}