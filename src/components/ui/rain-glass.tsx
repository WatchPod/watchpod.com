"use client";

import { useEffect, useRef } from "react";

const VERTEX_SHADER = `
  attribute vec2 aPosition;
  attribute vec2 aTexCoord;
  varying vec2 vTexCoord;
  void main() {
    gl_Position = vec4(aPosition, 0.0, 1.0);
    vTexCoord = aTexCoord;
  }
`;

const FRAGMENT_SHADER = `
  #ifdef GL_ES
  precision mediump float;
  #endif

  #define PI2 6.28318530718
  #define PI 3.14159265359
  #define S(a,b,n) smoothstep(a,b,n)

  varying vec2 vTexCoord;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform sampler2D uTexture;

  float N12(vec2 p) {
    p = fract(p * vec2(123.34, 345.45));
    p += dot(p, p + 34.345);
    return fract(p.x * p.y);
  }

  vec3 Layer(vec2 uv0, float t) {
    vec2 asp = vec2(2.0, 1.0);
    vec2 uv1 = uv0 * 3.0 * asp;
    uv1.y += t * 0.25;

    vec2 gv = fract(uv1) - 0.5;
    vec2 id = floor(uv1);

    float n = N12(id);
    t += n * PI2;

    float w = uv0.y * 10.0;
    float x = (n - 0.5) * 0.8;
    x += (0.4 - abs(x)) * sin(3.0 * w) * pow(sin(w), 6.0) * 0.45;
    float y = -sin(t + sin(t + sin(t) * 0.5)) * (0.5 - 0.06);
    y -= (gv.x - x) * (gv.x - x);

    vec2 dropPos = (gv - vec2(x, y)) / asp;
    float drop = S(0.03, 0.02, length(dropPos));

    vec2 trailPos = (gv - vec2(x, t * 0.25)) / asp;
    trailPos.y = (fract(trailPos.y * 8.0) - 0.5) / 8.0;
    float trail = S(0.02, 0.015, length(trailPos));

    float fogTrail = S(-0.05, 0.05, dropPos.y);
    fogTrail *= S(0.5, y, gv.y);
    trail *= fogTrail;
    fogTrail *= S(0.03, 0.015, abs(dropPos.x));

    vec2 off = drop * dropPos + trail * trailPos;
    return vec3(off, fogTrail);
  }

  void main() {
    float dist = 5.0;
    float blurSize = 5.0;
    float t = mod(uTime * 0.03, 7200.0);

    vec2 uv = vTexCoord;

    vec3 drops = Layer(uv, t);
    drops += Layer(uv * 1.25 + 7.54, t);
    drops += Layer(uv * 1.35 + 1.54, t);
    drops += Layer(uv * 1.57 - 7.54, t);

    float blur = blurSize * 7.0 * (1.0 - drops.z);
    blur *= 0.0005;

    vec4 col = vec4(0.0);
    float a = N12(uv) * PI2;
    vec2 rainUv = uv + drops.xy * dist;

    for (int n = 0; n < 32; n++) {
      vec2 off = vec2(sin(a), cos(a)) * blur;
      float d = fract(sin((float(n) + 1.0) * 546.0) * 5424.0);
      d = sqrt(d);
      off *= d;
      col += texture2D(uTexture, rainUv + off);
      a++;
    }

    col /= 32.0;
    gl_FragColor = col;
  }
`;

function createCityTexture(width: number, height: number): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;

  // Dark background gradient
  const bg = ctx.createLinearGradient(0, 0, 0, height);
  bg.addColorStop(0, "#0a0a12");
  bg.addColorStop(0.5, "#0d0d1a");
  bg.addColorStop(1, "#111118");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  const colors = [
    "rgba(255,180,100,",  // amber
    "rgba(255,140,60,",   // orange
    "rgba(248,152,128,",  // coral
    "rgba(255,220,140,",  // yellow
    "rgba(74,111,165,",   // steel blue
    "rgba(100,160,255,",  // blue
    "rgba(255,100,100,",  // red
    "rgba(255,255,220,",  // white
    "rgba(200,130,255,",  // purple
    "rgba(100,255,180,",  // green
    "rgba(255,200,80,",   // taxi
  ];

  // Large blurred bokeh orbs
  for (let i = 0; i < 60; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const r = Math.random() * 120 + 30;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const opacity = Math.random() * 0.3 + 0.05;

    const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0, `${color}${opacity})`);
    grad.addColorStop(0.5, `${color}${opacity * 0.4})`);
    grad.addColorStop(1, `${color}0)`);
    ctx.fillStyle = grad;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }

  // Smaller bright points
  for (let i = 0; i < 80; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const r = Math.random() * 8 + 2;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const opacity = Math.random() * 0.6 + 0.3;

    const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0, `${color}${opacity})`);
    grad.addColorStop(1, `${color}0)`);
    ctx.fillStyle = grad;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }

  return canvas;
}

function compileShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function RainGlass({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: false });
    if (!gl) return;

    let animationId: number;
    let time = 0;

    function resize() {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      gl!.viewport(0, 0, canvas.width, canvas.height);
    }

    // Compile shaders
    const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    // Full-screen quad
    const vertices = new Float32Array([
      -1, -1,  0, 0,
       1, -1,  1, 0,
      -1,  1,  0, 1,
       1,  1,  1, 1,
    ]);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const aPosition = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 16, 0);

    const aTexCoord = gl.getAttribLocation(program, "aTexCoord");
    gl.enableVertexAttribArray(aTexCoord);
    gl.vertexAttribPointer(aTexCoord, 2, gl.FLOAT, false, 16, 8);

    // Uniforms
    const uTime = gl.getUniformLocation(program, "uTime");
    const uResolution = gl.getUniformLocation(program, "uResolution");
    const uTexture = gl.getUniformLocation(program, "uTexture");

    // Create city lights texture
    resize();
    const texCanvas = createCityTexture(canvas.width, canvas.height);
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texCanvas);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.uniform1i(uTexture, 0);

    function draw() {
      if (!canvas || !gl) return;
      time++;

      gl.uniform1f(uTime, time);
      gl.uniform2f(uResolution, canvas.offsetWidth, canvas.offsetHeight);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationId = requestAnimationFrame(draw);
    }

    draw();

    const handleResize = () => {
      resize();
      const newTex = createCityTexture(canvas.width, canvas.height);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, newTex);
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
