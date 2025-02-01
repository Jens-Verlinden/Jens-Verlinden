import { JSX, useEffect, useRef, useState } from 'react';

export default function Clicked() {
  const [logos, setLogos] = useState<JSX.Element[]>([]);
  const logoIndexRef = useRef(0);
  const initialLogoFiles = [
    "azure.png", "c.png", "c-sharp.png", "c++.png", "cisco.png", "css.png", "docker.png", "debian.png", "expressjs.png", "expo.png", "esp32.png", "figma.png", "git.png", "github.png", "gleam.png", "helmet.png", "html.png", "java.png", "javascript.png", "jest.png", "jwt.png", "linux.png", "mikrotik.png", "mysql.png", "nextjs.png", "nodejs.png", "okd.png", "postgres.png", "pandas.png", "python.png", "prisma.png", "rabbitmq.png", "react.png", "ruby.png", "sass.png", "scikit.png", "spring.png", "tailwind.png", "typescript.png", "ubuntu.png", "vercel.png", "vmware.png", "wireshark.png",
  ];
  let logoFiles = [...initialLogoFiles];

  useEffect(() => {
    const getRandomValue = (min: number, max: number) => Math.random() * (max - min) + min;

    const generateLogoElement = (index: number) => {
      if (logoFiles.length === 0) {
        logoFiles = [...initialLogoFiles];
      }
      const randomIndex = Math.floor(Math.random() * logoFiles.length);
      const randomLogo = logoFiles[randomIndex];
      logoFiles = logoFiles.filter((_, i) => i !== randomIndex);
      const randomTop = getRandomValue(0.2, 0.7);
      const randomSize = getRandomValue(0.7, 1.1);
      const randomOpacity = getRandomValue(0.3, 0.6);
      const moveDirection = index % 2 ? 'moveLeftToRight' : 'moveRightToLeft';
      const randomDelay = getRandomValue(0, 5);

      return (
        <img
          key={logoIndexRef.current++}
          src={`/logos/${randomLogo}`}
          alt="Moving logo"
          className="logo z-10"
          style={{
            '--random-top': randomTop,
            '--random-size': randomSize,
            '--random-opacity': randomOpacity,
            '--move-direction': moveDirection,
            '--random-delay': `${randomDelay}s`,
          } as React.CSSProperties}
          onAnimationEnd={() => handleAnimationEnd(index)}
        />
      );
    };

    const handleAnimationEnd = (index: number) => {
      setLogos((prevLogos) => {
        const newLogos = [...prevLogos];
        newLogos[index] = generateLogoElement(index);
        return newLogos;
      });
    };

    const generateLogoElements = () => {
      const initialLogos = [];
      for (let i = 0; i < 10; i++) {
        initialLogos.push(generateLogoElement(i));
      }
      setLogos(initialLogos);
    };

    generateLogoElements();
  }, []);

  return (
    <div className="container min-h-screen min-w-full flex flex-col justify-center items-center relative overflow-hidden disco p-8">
      <img
        src="/shiny-ditto.gif"
        alt="Dancing Ditto, but shiny..."
        className="absolute w-70 h-70 px-16 transform transition-transform duration-1000 ease-in-out z-50"
        style={{ animation: 'zoomIn 2s forwards' }}
      />
      {logos}
    </div>
  );
}