import React, { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { gsap } from "gsap";
import "./style.css";
import { OrbitControls } from "@react-three/drei";
import { Bloom, ToneMapping } from "@react-three/postprocessing";
import {
  EffectComposer,
  BrightnessContrast,
} from "@react-three/postprocessing";

import Scene from "./Scene";

const App = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const animateText = () => {
      gsap.fromTo(
        textRef.current,
        { x: window.innerWidth }, // Start from the right
        {
          x: -textRef.current.offsetWidth, // Move to the left, based on text width
          duration: 10, // Duration of the animation
          repeat: -1, // Infinite repeat
          ease: "linear", // Linear movement
        }
      );
    };

    animateText();

    // Update animation on window resize
    window.addEventListener("resize", animateText);
    return () => {
      window.removeEventListener("resize", animateText);
    };
  }, []);

  return (
    <>
      <Canvas camera={{ fov: 35 }}>
        <OrbitControls />
        <ambientLight />
        <Scene />
        <EffectComposer>
          <Bloom
            intensity={3.0}
            luminanceThreshold={0}
            luminanceSmoothing={0}
            mipmapBlur
          />
          <ToneMapping adaptive />
          <BrightnessContrast contrast={0.1} />
        </EffectComposer>
      </Canvas>
      <div className="w-full overflow-hidden">
        <div
          ref={textRef}
          className="  inline-block font-semibold text-center text-8xl text-zinc-400 py-10 font-mono tracking-tighter"
          style={{ whiteSpace: "nowrap" }}
        >
          Hey Guys, This is Suraj and Welcome to LogicalCoder's Website.
        </div>
      </div>
    </>
  );
};

export default App;
