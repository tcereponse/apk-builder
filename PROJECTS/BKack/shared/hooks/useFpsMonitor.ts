export const useFpsMonitor = () => {
  const [fps, setFps] = useState(0);
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());

  useEffect(() => {
    let frameId: number;

    const measureFps = () => {
      frameCount.current++;
      const now = performance.now();
      const delta = now - lastTime.current;

      if (delta >= 1000) {
        setFps(Math.round(frameCount.current * 1000 / delta));
        frameCount.current = 0;
        lastTime.current = now;
      }

      frameId = requestAnimationFrame(measureFps);
    };

    measureFps();

    return () => cancelAnimationFrame(frameId);
  }, []);

  return fps;
};
🧪 Tests
Configuration Jest