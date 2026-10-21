import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Sparkles, Eye } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function PearlCrown3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const { lang } = useI18n();
  const isAr = lang === "ar";

  useEffect(() => {
    // Check reduced motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReducedMotion(true);
      return;
    }

    // Check WebGL availability
    try {
      const testCanvas = document.createElement("canvas");
      const gl = testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl");
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // --- THREE.JS SCENE SETUP ---
    const scene = new THREE.Scene();
    scene.background = null;

    let width = container.clientWidth || 500;
    let height = container.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 5.2);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    // --- LIGHTING RIG ---
    // Ambient soft studio light
    const ambientLight = new THREE.AmbientLight(0xf6f1e7, 1.6);
    scene.add(ambientLight);

    // Key studio light (Porcelain highlight)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(3, 4, 4);
    scene.add(keyLight);

    // Warm Brass Rim Light (#C2A06A)
    const brassRimLight = new THREE.DirectionalLight(0xc2a06a, 3.2);
    brassRimLight.position.set(-4, 3, -3);
    scene.add(brassRimLight);

    // Fill Cool Light (Deep Pine bounce #16372F)
    const fillLight = new THREE.PointLight(0xe0ebe4, 1.2, 10);
    fillLight.position.set(0, -3, 2);
    scene.add(fillLight);

    // --- PROCEDURAL PEARL CROWN OBJECT ---
    const crownRoot = new THREE.Group();
    scene.add(crownRoot);

    // Pearl Physical Material (Subtle iridescence, clearcoat, soft warm ivory)
    const pearlMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xfbf9f4, // porcelain ivory
      emissive: 0x221a10, // subtle inner warm glow
      roughness: 0.14,
      metalness: 0.08,
      clearcoat: 0.95,
      clearcoatRoughness: 0.08,
      transmission: 0.28, // translucent depth
      thickness: 1.4,
      ior: 1.54, // pearl / ceramic optical index
      reflectivity: 0.75,
    });

    // Anatomical Crown Contours (Lathe curve)
    const lathePoints: THREE.Vector2[] = [
      new THREE.Vector2(0.38, -0.7),
      new THREE.Vector2(0.58, -0.45),
      new THREE.Vector2(0.78, -0.05),
      new THREE.Vector2(0.86, 0.35),
      new THREE.Vector2(0.78, 0.72),
      new THREE.Vector2(0.55, 0.88),
      new THREE.Vector2(0.22, 0.82),
      new THREE.Vector2(0.0, 0.78),
    ];
    const crownGeo = new THREE.LatheGeometry(lathePoints, 48);
    const crownMesh = new THREE.Mesh(crownGeo, pearlMaterial);
    crownMesh.castShadow = true;
    crownMesh.scale.set(1.05, 1.15, 0.98);
    crownRoot.add(crownMesh);

    // Subtle Cusp Curvatures
    const cuspMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.1,
      clearcoat: 1.0,
      transmission: 0.2,
    });
    const cusps = [
      { x: 0.34, y: 0.85, z: 0.24, s: 0.24 },
      { x: -0.34, y: 0.84, z: 0.24, s: 0.22 },
      { x: 0.32, y: 0.84, z: -0.24, s: 0.23 },
      { x: -0.32, y: 0.83, z: -0.24, s: 0.21 },
    ];
    cusps.forEach((c) => {
      const mesh = new THREE.Mesh(new THREE.SphereGeometry(c.s, 24, 24), cuspMaterial);
      mesh.position.set(c.x, c.y, c.z);
      mesh.scale.set(1, 0.55, 1);
      crownRoot.add(mesh);
    });

    // Elegant Brass Base Halo Ring
    const haloGeo = new THREE.TorusGeometry(0.95, 0.02, 16, 64);
    haloGeo.rotateX(Math.PI / 2);
    const haloMat = new THREE.MeshStandardMaterial({
      color: 0xc2a06a,
      metalness: 0.9,
      roughness: 0.2,
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    haloMesh.position.y = -0.7;
    crownRoot.add(haloMesh);

    // Contact shadow beneath
    const shadowGeo = new THREE.PlaneGeometry(2.4, 2.4);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x0e1f1c,
      transparent: true,
      opacity: 0.12,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.1;
    crownRoot.add(shadowMesh);

    // --- ~150 INSTANCED BRASS LIGHT PARTICLES ---
    const particleCount = 140;
    const particleGeo = new THREE.SphereGeometry(0.022, 10, 10);
    const particleMat = new THREE.MeshStandardMaterial({
      color: 0xc2a06a,
      emissive: 0xc2a06a,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.9,
    });
    const instancedParticles = new THREE.InstancedMesh(particleGeo, particleMat, particleCount);

    const dummy = new THREE.Object3D();
    const particleData: { radius: number; speed: number; angle: number; y: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      const r = 1.2 + Math.random() * 1.3;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 2.2;
      particleData.push({
        radius: r,
        speed: 0.2 + Math.random() * 0.4,
        angle,
        y,
      });

      dummy.position.set(Math.cos(angle) * r, y, Math.sin(angle) * r);
      const scale = 0.5 + Math.random() * 0.8;
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      instancedParticles.setMatrixAt(i, dummy.matrix);
    }
    crownRoot.add(instancedParticles);

    // --- INTERACTIVE MOUSE PARALLAX & SCROLL ---
    let targetRotationX = 0.08;
    let targetRotationY = 0.3;
    let currentRotationX = 0.08;
    let currentRotationY = 0.3;
    let isIntersecting = true;
    let scrollProgress = 0;

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0]!.clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0]!.clientY : e.clientY;

      const normX = ((clientX - rect.left) / rect.width) * 2 - 1;
      const normY = ((clientY - rect.top) / rect.height) * 2 - 1;

      targetRotationY = normX * 0.6 + 0.3;
      targetRotationX = -normY * 0.4 + 0.08;
    };

    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("touchmove", handlePointerMove);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = container.clientHeight || 600;
      scrollProgress = Math.min(Math.max(scrollY / heroHeight, 0), 1.5);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // IntersectionObserver to pause loop offscreen (100% CPU/GPU savings)
    const observer = new IntersectionObserver(
      (entries) => {
        isIntersecting = !!entries[0]?.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // --- ANIMATION LOOP ---
    const clock = new THREE.Clock();
    let animId = 0;

    const animate = () => {
      if (isIntersecting) {
        const delta = clock.getDelta();
        const elapsed = clock.getElapsedTime();

        // Smooth breathing floating motion
        crownRoot.position.y = Math.sin(elapsed * 1.5) * 0.08 - scrollProgress * 0.8;
        crownRoot.scale.setScalar(Math.max(0.7, 1 - scrollProgress * 0.25));

        // Smooth rotation damping
        currentRotationX += (targetRotationX - currentRotationX) * 0.05;
        currentRotationY += (targetRotationY - currentRotationY) * 0.05;

        // Auto slow idle spin
        crownRoot.rotation.x = currentRotationX;
        crownRoot.rotation.y = currentRotationY + elapsed * 0.15 + scrollProgress * 1.2;

        // Update brass particles
        for (let i = 0; i < particleCount; i++) {
        const p = particleData[i];
          if (!p) continue;
          p.angle += p.speed * delta * 0.6;
          const currentY = p.y + Math.sin(elapsed * 2 + i) * 0.05;
          dummy.position.set(Math.cos(p.angle) * p.radius, currentY, Math.sin(p.angle) * p.radius);
          dummy.updateMatrix();
          instancedParticles.setMatrixAt(i, dummy.matrix);
        }
        instancedParticles.instanceMatrix.needsUpdate = true;

        renderer.render(scene, camera);
      }
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, [reducedMotion]);

  // Graceful 2D Fallback for reduced motion or non-WebGL devices
  if (!hasWebGL || reducedMotion) {
    return (
      <div className="relative flex aspect-square w-full max-w-[440px] items-center justify-center rounded-[3rem] border border-[#c2a06a]/30 bg-gradient-to-br from-[#fbf9f4] via-[#f6f1e7] to-[#e8e2d4] p-8 shadow-xl">
        <div className="relative flex h-56 w-56 items-center justify-center rounded-full bg-gradient-to-tr from-[#fbf9f4] to-[#f6f1e7] shadow-inner ring-4 ring-[#c2a06a]/20">
          <div className="flex h-36 w-36 items-center justify-center rounded-[2.5rem] bg-[#0e1f1c] text-[#c2a06a] shadow-2xl">
            <Sparkles className="h-16 w-16 text-[#c2a06a]" />
          </div>
        </div>
        <span className="absolute bottom-6 rounded-full border border-[#c2a06a]/30 bg-white/80 px-4 py-1 text-xs font-bold text-[#0e1f1c] shadow-xs">
          {isAr ? "الابتسامة اللؤلؤية — مركز دبي لطب الأسنان" : "The Pearl Crown — Dubai Dental Clinic"}
        </span>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative flex h-[380px] w-full items-center justify-center sm:h-[460px] lg:h-[540px]"
      aria-label="3D Interactive Pearl Crown Model"
    >
      <canvas ref={canvasRef} className="h-full w-full touch-none select-none" />

      {/* Interactive Helper Cue */}
      <div className="pointer-events-none absolute bottom-3 start-4 flex items-center gap-2 rounded-full border border-[#c2a06a]/30 bg-[#fbf9f4]/80 px-3.5 py-1.5 text-[11px] font-bold text-[#0e1f1c] shadow-xs backdrop-blur-sm">
        <Eye className="h-3.5 w-3.5 text-[#c2a06a]" />
        <span>{isAr ? "مجسم تفاعلي حي ثلاثي الأبعاد" : "Interactive Living 3D"}</span>
      </div>
    </div>
  );
}
