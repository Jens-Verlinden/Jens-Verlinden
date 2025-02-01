import { useState, useEffect } from "react";

interface UnclickedProps {
  setClicked: (clicked: boolean) => void;
}

export default function Unclicked({ setClicked }: UnclickedProps) {
  const [bubbleCount, setBubbleCount] = useState(50);
  const [bubbles, setBubbles] = useState<{ size: number; }[]>([]);
  const [showButton, setShowButton] = useState(false);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container min-h-screen min-w-full flex flex-col justify-center items-center relative overflow-hidden">
      <div className="z-50 px-6">
        <p
          style={{
            padding: 0,
            margin: 0,
            backgroundColor: "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "2rem",
            width: "40em",
            position: "relative",
            color: "hsl(0, 0%, 68%)",
            fontWeight: "extrabold",
            fontFamily: '"Anonymous Pro", monospace',
            letterSpacing: "7px",
            overflow: "hidden",
            borderRight: "2px solid hsl(0, 0%, 80%)",
            animation:
              "typewriter 2s steps(22) 1s 1 normal both, blinkTextCursor 800ms infinite",
          }}
        >
          Welcome to the very professional porfolio of Jens Verlinden :)
        </p>
        <button
        className={`px-2 py-3 font-semibold shadow-lg italic text-lg bg-purple-600 text-white rounded-lg ${showButton ? 'animate-zoomIn' : 'invisible'}`}
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