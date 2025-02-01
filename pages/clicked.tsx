import { CSSProperties, useEffect, useRef, useState } from 'react';

interface LogoData {
  id: number;
  side: 'left' | 'right';
  fixedTop: number;
  slotIndex: number;
  totalSlots: number;
  logoFile: string;
  size: number;
  opacity: number;
  delay: number;
}

export default function Clicked() {
  const initialLogoFiles = [
    "azure.png", "c.png", "c-sharp.png", "c++.png", "cisco.png", "css.png", "docker.png", "debian.png",
    "expressjs.png", "expo.png", "esp32.png", "figma.png", "git.png", "github.png", "gleam.png", "helmet.png",
    "html.png", "java.png", "javascript.png", "jest.png", "jwt.png", "linux.png", "mikrotik.png", "mysql.png",
    "nextjs.png", "nodejs.png", "okd.png", "postgres.png", "pandas.png", "python.png", "prisma.png", "rabbitmq.png",
    "react.png", "ruby.png", "sass.png", "scikit.png", "spring.png", "tailwind.png", "typescript.png", "ubuntu.png",
    "vercel.png", "vmware.png", "wireshark.png",
  ];

  const nextIdRef = useRef(0);
  const [logos, setLogos] = useState<LogoData[]>([]);

  const getRandomValue = (min: number, max: number) =>
    Math.random() * (max - min) + min;

  const pickLogoFile = (currentlyUsed: string[], oldLogoFile?: string): string => {
    let availableFiles = initialLogoFiles.filter(
      file => !currentlyUsed.includes(file) && file !== oldLogoFile
    );
    if (availableFiles.length === 0) {
      availableFiles = initialLogoFiles.filter(file => file !== oldLogoFile);
    }
    if (availableFiles.length === 0) {
      return oldLogoFile || initialLogoFiles[0];
    }
    return availableFiles[Math.floor(Math.random() * availableFiles.length)];
  };

  const calculateFixedTop = (slotIndex: number, totalSlots: number) => {
    if (slotIndex % 2 === 0) {
      return 0.15 + (slotIndex / totalSlots) * 0.3;
    } else {
      return 0.6 + ((slotIndex - 1) / totalSlots) * 0.2;
    }
  };

  const createLogoData = (
    side: 'left' | 'right',
    slotIndex: number,
    totalSlots: number,
    currentlyUsed: string[],
    oldLogoFile?: string
  ): LogoData => {
    const logoFile = pickLogoFile(currentlyUsed, oldLogoFile);
    const fixedTop = calculateFixedTop(slotIndex, totalSlots);
    return {
      id: nextIdRef.current++,
      side,
      fixedTop,
      slotIndex,
      totalSlots,
      logoFile,
      size: getRandomValue(0.7, 1.1),
      opacity: getRandomValue(0.3, 0.6),
      delay: getRandomValue(0, 5),
    };
  };

  const TOTAL_LOGOS = 20;
  const leftCount = Math.ceil(TOTAL_LOGOS / 2);
  const rightCount = Math.floor(TOTAL_LOGOS / 2);

  useEffect(() => {
    let count = 0;
    let timerId: number;
    const addNextLogo = () => {
      setLogos(prev => {
        let side: 'left' | 'right';
        let slotIndex: number;
        let totalSlots: number;
        if (count % 2 === 0) {
          side = 'left';
          slotIndex = Math.floor(count / 2);
          totalSlots = leftCount;
        } else {
          side = 'right';
          slotIndex = Math.floor(count / 2);
          totalSlots = rightCount;
        }
        const currentlyUsed = prev.map(l => l.logoFile);
        const newLogo = createLogoData(side, slotIndex, totalSlots, currentlyUsed);
        return [...prev, newLogo];
      });
      count++;
      if (count < TOTAL_LOGOS) {
        timerId = window.setTimeout(addNextLogo, 500);
      }
    };

    addNextLogo();
    return () => window.clearTimeout(timerId);
  }, []);

  const handleAnimationEnd = (logoId: number) => {
    setTimeout(() => {
      setLogos(prev =>
        prev.map(logo => {
          if (logo.id === logoId) {
            const currentlyUsed = prev
              .filter(l => l.id !== logo.id)
              .map(l => l.logoFile);
            const totalSlots = logo.side === 'left' ? leftCount : rightCount;
            const updated = createLogoData(
              logo.side,
              logo.slotIndex,
              totalSlots,
              currentlyUsed,
              logo.logoFile
            );
            return {
              ...updated,
              id: logo.id, 
              fixedTop: logo.fixedTop,
              slotIndex: logo.slotIndex,
              totalSlots,
            };
          }
          return logo;
        })
      );
    }, 300);
  };

  return (
    <div className="container min-h-screen min-w-full flex flex-col justify-center items-center relative overflow-hidden disco p-8">
      <img
        src="/shiny-ditto.gif"
        alt="Dancing Ditto, but shiny..."
        className="absolute w-70 h-70 px-16 transform transition-transform duration-1000 ease-in-out z-50"
        style={{ animation: 'zoomIn 2s forwards' }}
      />
      {logos.map(logo => {
        const moveDirection =
          logo.side === 'left' ? 'moveRightToLeft' : 'moveLeftToRight';
        const style: CSSProperties = {
          '--random-top': logo.fixedTop,
          '--random-size': logo.size,
          '--random-opacity': logo.opacity,
          '--move-direction': moveDirection,
          '--random-delay': `${logo.delay}s`,
          opacity: 0,
          animation: `fadeIn 0.5s forwards ${logo.delay}s, ${moveDirection} 5s linear infinite`
        } as CSSProperties;
        return (
          <img
            key={logo.id}
            src={`/logos/${logo.logoFile}`}
            alt="Moving logo"
            className="logo z-10"
            style={style}
            onAnimationEnd={() => handleAnimationEnd(logo.id)}
          />
        );
      })}
    </div>
  );
}
