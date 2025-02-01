import { useState, useEffect } from "react";

interface UnclickedProps {
  setClicked: (clicked: boolean) => void;
}

export default function Unclicked({ setClicked }: UnclickedProps) {
  const [bubbleCount, setBubbleCount] = useState(50);
  const [bubbles, setBubbles] = useState<{ size: number; }[]>([]);

  useEffect(() => {
    const updateBubbleCount = () => {
      const width = window.innerWidth;
      setBubbleCount(Math.max(40, Math.floor(width / 20)));
    };

    const generateBubbles = () => {
      const newBubbles = Array.from({ length: bubbleCount }).map(() => {
        const size = Math.floor(Math.random() * 20) + 30;
        return {
          size,
        };
      });
      setBubbles(newBubbles);
    };

    updateBubbleCount();
    generateBubbles();
    window.addEventListener("resize", updateBubbleCount);
    return () => window.removeEventListener("resize", updateBubbleCount);
  }, [bubbleCount]);

  return (
    <div className="container min-h-screen min-w-full flex flex-col justify-center items-center relative overflow-hidden">
      <div className="z-50">
        <button
          className="px-6 py-3 font-semibold shadow-lg italic text-lg bg-purple-600 text-white rounded-lg transition-transform duration-300 hover:bg-purple-700 hover:scale-105"
          style={{ animation: "breathing 3s ease-in-out infinite" }}
          onClick={() => setClicked(true)}
        >
          ⚠️ Warning: Sensitive Content ⚠️
        </button>
      </div>
      <div className="bubbles absolute top-0 left-0 w-full h-full flex flex-wrap">
        {bubbles.map((bubble, i) => (
          <span
            key={i}
            style={{
              "--i": bubble.size,
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
            } as React.CSSProperties}
          ></span>
        ))}
      </div>
    </div>
  );
}