"use client";

import { useEffect, useRef } from "react";

interface LightOrb {
  x: number;
  y: number;
  radius: number;
  color: string;
  opacity: number;
  pulseSpeed: number;
  pulsePhase: number;
  drift: number;
  vy: number;
}

interface Raindrop {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
}

const CITY_COLORS = [
  "255,180,100",   // warm streetlight amber
  "255,140,60",    // sodium orange
  "248,152,128",   // coral (brand)
  "255,220,140",   // warm yellow
  "74,111,165",    // steel blue (brand)
  "100,160,255",   // cool blue neon
  "255,100,100",   // red taillight
  "255,255,220",   // bright white headlight
  "200,130,255",   // purple neon
  "100,255,180",   // green neon
  "255,80,80",     // brake light red
  "255,200,80",    // taxi yellow
];

export function CityLights({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let orbs: LightOrb[] = [];
    let raindrops: Raindrop[] = [];

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx!.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    function initOrbs() {
      if (!canvas) return;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const count = 45;

      orbs = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * (h + 400) + 200,
        radius: Math.random() * 350 + 50,
        color: CITY_COLORS[Math.floor(Math.random() * CITY_COLORS.length)],
        opacity: Math.random() * 0.2 + 0.06,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        pulsePhase: Math.random() * Math.PI * 2,
        drift: (Math.random() - 0.5) * 0.15,
        vy: -(Math.random() * 0.3 + 0.1),
      }));
    }

    function initRain() {
      if (!canvas) return;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      raindrops = Array.from({ length: 120 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        length: Math.random() * 25 + 10,
        speed: Math.random() * 4 + 2,
        opacity: Math.random() * 0.15 + 0.03,
      }));
    }

    let time = 0;

    function draw() {
      if (!canvas || !ctx) return;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      time += 1;

      // Draw light orbs with heavy blur
      for (const orb of orbs) {
        const pulse = Math.sin(time * orb.pulseSpeed + orb.pulsePhase);
        const currentOpacity = orb.opacity + pulse * 0.06;
        const currentRadius = orb.radius + pulse * 8;

        orb.x += orb.drift;
        orb.y += orb.vy;
        if (orb.x < -orb.radius) orb.x = w + orb.radius;
        if (orb.x > w + orb.radius) orb.x = -orb.radius;
        if (orb.y < -orb.radius) {
          orb.y = h + orb.radius;
          orb.x = Math.random() * w;
        }

        const gradient = ctx.createRadialGradient(
          orb.x, orb.y, 0,
          orb.x, orb.y, currentRadius
        );
        gradient.addColorStop(0, `rgba(${orb.color},${currentOpacity})`);
        gradient.addColorStop(0.4, `rgba(${orb.color},${currentOpacity * 0.5})`);
        gradient.addColorStop(1, `rgba(${orb.color},0)`);

        ctx.beginPath();
        ctx.arc(orb.x, orb.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Draw rain streaks
      for (const drop of raindrops) {
        drop.y += drop.speed;
        drop.x += 0.3;

        if (drop.y > h) {
          drop.y = -drop.length;
          drop.x = Math.random() * w;
        }

        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x + 0.5, drop.y + drop.length);
        ctx.strokeStyle = `rgba(200,210,230,${drop.opacity})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      animationId = requestAnimationFrame(draw);
    }

    resize();
    initOrbs();
    initRain();
    draw();

    const handleResize = () => {
      resize();
      initOrbs();
      initRain();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
}
