import React, { useEffect, useRef } from "react";

function Background() {
  const canvasRef = useRef(null);
  const animationRef = useRef(0);
  const starsRef = useRef([]);
  const brightStarsRef = useRef([]);
  const shootingStarsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let cssWidth = window.innerWidth;
    let cssHeight = window.innerHeight;
    let dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    function applyCanvasSize() {
      cssWidth = window.innerWidth;
      cssHeight = window.innerHeight;
      canvas.width = Math.floor(cssWidth * dpr);
      canvas.height = Math.floor(cssHeight * dpr);
      canvas.style.width = cssWidth + "px";
      canvas.style.height = cssHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    applyCanvasSize();

    const starSpeedBase = 0.08;
    let resizeTimeout;
    let lastTime = performance.now();

    function createStars() {
      const numStars = Math.min(1500, Math.floor((cssWidth * cssHeight) / 3500));
      const stars = [];
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * cssWidth,
          y: Math.random() * cssHeight,
          z: Math.random() * 1 + 0.2,
          radius: Math.random() * 1.2 + 0.3,
          vx: (Math.random() - 0.5) * starSpeedBase,
          vy: (Math.random() - 0.5) * starSpeedBase,
          phase: Math.random() * Math.PI * 2,
        });
      }

      const brightStars = [];
      for (let i = 0; i < 8; i++) {
        brightStars.push({
          x: Math.random() * cssWidth,
          y: Math.random() * cssHeight * 0.6,
          radius: 3 + Math.random() * 2,
          phase: Math.random() * Math.PI * 2,
        });
      }

      starsRef.current = stars;
      brightStarsRef.current = brightStars;
    }

    function spawnShootingStar() {
      if (Math.random() < 0.008) {
        shootingStarsRef.current.push({
          x: Math.random() * cssWidth,
          y: Math.random() * cssHeight * 0.5,
          length: 90 + Math.random() * 50,
          speed: 9 + Math.random() * 4,
          life: 0,
        });
      }
    }

    function resize() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
        applyCanvasSize();
        createStars();
      }, 100);
    }

    function drawMoon() {
      const moonX = cssWidth * 0.8;
      const moonY = cssHeight * 0.25;
      const moonRadius = Math.min(cssWidth, cssHeight) * 0.08;

      const halo = ctx.createRadialGradient(
        moonX,
        moonY,
        moonRadius * 0.5,
        moonX,
        moonY,
        moonRadius * 1.8
      );
      halo.addColorStop(0, "rgba(255,255,200,0.25)");
      halo.addColorStop(1, "rgba(255,255,200,0)");
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonRadius * 1.8, 0, Math.PI * 2);
      ctx.fill();

      const gradient = ctx.createRadialGradient(
        moonX - moonRadius * 0.3,
        moonY - moonRadius * 0.3,
        moonRadius * 0.2,
        moonX,
        moonY,
        moonRadius
      );
      gradient.addColorStop(0, "#fffde7");
      gradient.addColorStop(1, "#f0f0d0");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
      ctx.fill();
    }

    function step() {
      const now = performance.now();
      const deltaMs = Math.min(50, now - lastTime);
      lastTime = now;
      const delta = deltaMs / (1000 / 60);

      const skyGradient = ctx.createLinearGradient(0, 0, 0, cssHeight);
      skyGradient.addColorStop(0, "#020410");
      skyGradient.addColorStop(1, "#000000");
      ctx.fillStyle = skyGradient;
      ctx.fillRect(0, 0, cssWidth, cssHeight);

      drawMoon();

      const stars = starsRef.current;
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        const speedScale = (0.3 + star.z * 1.7) * delta;
        star.x += star.vx * speedScale * 3;
        star.y += star.vy * speedScale * 3;

        if (star.x < -2) star.x = cssWidth + 2;
        if (star.x > cssWidth + 2) star.x = -2;
        if (star.y < -2) star.y = cssHeight + 2;
        if (star.y > cssHeight + 2) star.y = -2;

        const twinkle = 0.5 + 0.5 * Math.sin(now / 700 + star.phase);
        const alpha = 0.3 + star.z * 0.6 * twinkle;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius * (0.7 + star.z * 0.6), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fill();
      }

      const brightStars = brightStarsRef.current;
      for (let i = 0; i < brightStars.length; i++) {
        const star = brightStars[i];
        const glow = 0.5 + 0.5 * Math.sin(now / 1500 + star.phase);
        ctx.shadowColor = "rgba(255,255,255,0.8)";
        ctx.shadowBlur = 10 * glow;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius * (1 + glow * 0.2), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${0.8 + glow * 0.2})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      spawnShootingStar();
      shootingStarsRef.current = shootingStarsRef.current.filter(star => {
        star.x += star.speed;
        star.y += star.speed * 0.3;
        star.life += 1;

        const tailAlpha = 1 - star.life / 60;
        ctx.strokeStyle = `rgba(255,255,255,${tailAlpha})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(star.x - star.length, star.y - star.length * 0.3);
        ctx.stroke();

        return star.life < 60;
      });

      animationRef.current = requestAnimationFrame(step);
    }

    createStars();
    window.addEventListener("resize", resize);
    animationRef.current = requestAnimationFrame(step);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
    />
  );
}

export default Background;
