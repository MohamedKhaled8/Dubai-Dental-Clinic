import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import {
  Sparkles,
  Layers,
  RotateCw,
  Info,
  Maximize2,
  Minimize2,
  ShieldCheck,
  Check,
  Eye,
  Activity,
  Award,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";

type AnatomyPart = "crown" | "abutment" | "implant" | "bone";

interface PartInfo {
  id: AnatomyPart;
  name: { ar: string; en: string };
  material: { ar: string; en: string };
  specs: { ar: string; en: string };
  clinicalRole: { ar: string; en: string };
  badge: { ar: string; en: string };
}

const partDetails: Record<AnatomyPart, PartInfo> = {
  crown: {
    id: "crown",
    name: { ar: "التاج الخزفي التجميلي (E.max / Zirconia)", en: "Aesthetic Crown (E.max / Zirconia)" },
    material: { ar: "خزف إيماكس الألماني فائق النقاء", en: "German High-Translucency E.max & Katana Zirconia" },
    specs: { ar: "مقاومة كسر تتجاوز 1200 ميجاباسكال بمحاكاة لضوء المينا", en: "1200+ MPa flexural strength matching natural enamel translucency" },
    clinicalRole: { ar: "يعيد القدرة الكاملة على مضغ الطعام مع تطابق لوني 100% مع باقي الأسنان", en: "Restores full chewing mastication with 100% shade match to adjacent teeth" },
    badge: { ar: "خزف ألماني معتمد", en: "Certified German Ceramic" },
  },
  abutment: {
    id: "abutment",
    name: { ar: "الدعامة الرابطة الدقيقة (Precision Abutment)", en: "Precision Connector Abutment" },
    material: { ar: "تيتانيوم طبي عالي النقاء درجة 5 (Grade 5 Ti)", en: "Medical Grade 5 Titanium / Hybrid Zirconia" },
    specs: { ar: "إحكام ميكانيكي ميكروني يمنع أي تسرب بكتيري داخل السن", en: "Micron-level seal preventing bacterial micro-leakage" },
    clinicalRole: { ar: "الجسر الرابط بين جذر التيتانيوم المزروع داخل العظم والتاج الخزفي الظاهر", en: "Engineered bridge joining the subgingival implant fixture to the coronal crown" },
    badge: { ar: "عزل بكتيري ميكروني", en: "Hermetic Seal" },
  },
  implant: {
    id: "implant",
    name: { ar: "جذر التيتانيوم الحيوي (SLA Titanium Fixture)", en: "Biocompatible Titanium Implant Post" },
    material: { ar: "تيتانيوم حيوي معالج بالرمل والحمض (SLA Active Surface)", en: "Pure biocompatible Titanium with hydrophilic SLA sandblasted surface" },
    specs: { ar: "معدل اندماج عظمي يصل إلى 98.4% وثبات فوري يتجاوز 75 ISQ", en: "98.4% osseointegration success rate with primary stability >75 ISQ" },
    clinicalRole: { ar: "يثبت داخل عظم الفك جراحياً بتوجيه حاسوبي ليعوض جذر السن الطبيعي المفقود لمدى الحياة", en: "Surgically guided into the alveolar bone, replacing the lost tooth root permanently" },
    badge: { ar: "اندماج عظمي 98.4%", en: "98.4% Osseointegration" },
  },
  bone: {
    id: "bone",
    name: { ar: "عظم الفك واللثة المحيطة (Alveolar Bone Support)", en: "Alveolar Bone Foundation & Gingival Seal" },
    material: { ar: "النسيج العظمي الحيوي للفم واللثة الوردية السليمة", en: "Living vascularized bone trabeculae and healthy attached gingiva" },
    specs: { ar: "يحافظ الزرع على كثافة العظم ويمنع انكماش الفك بعد خلع الأسنان", en: "Prevents progressive jawbone resorption and preserves facial contours" },
    clinicalRole: { ar: "قاعدة التثبيت البيولوجية التي تضمن استقرار السن لعشرات السنين دون أي اهتزاز", en: "Biological foundation providing lifetime stability and natural facial fullness" },
    badge: { ar: "حماية عظم الفك", en: "Bone Preservation" },
  },
};

export function RealDental3DViewer() {
  const { lang } = useI18n();
  const isAr = lang === "ar";

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // User Interactive States
  const [isExploded, setIsExploded] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [activePart, setActivePart] = useState<AnatomyPart>("crown");
  const [isDragging, setIsDragging] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<"normal" | "close">("normal");

  // Three.js instances ref
  const threeRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    crownMesh: THREE.Group;
    abutmentMesh: THREE.Group;
    implantMesh: THREE.Group;
    boneMesh: THREE.Group;
    targetExplodedFactor: number;
    currentExplodedFactor: number;
    rotationGroup: THREE.Group;
    isIntersecting: boolean;
    mousePrevX: number;
    mousePrevY: number;
    isPointerDown: boolean;
    animFrameId: number;
  } | null>(null);

  // Initialize WebGL Three.js Scene
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    scene.background = null; // transparent to blend with site alabaster theme

    const width = container.clientWidth || 600;
    const height = Math.min(Math.max(container.clientHeight, 440), 580);

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 5.8);
    camera.lookAt(0, 0, 0);

    // 3. Renderer with clamped pixel ratio for silky 60fps performance
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    // 4. Lighting Rig (Luxury Medical Editorial Aesthetic)
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);

    // Main Key Light (Soft cool medical light)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(4, 6, 5);
    scene.add(keyLight);

    // Fill Light
    const fillLight = new THREE.DirectionalLight(0xf0f4f8, 1.2);
    fillLight.position.set(-4, -1, 3);
    scene.add(fillLight);

    // Warm Champagne Gold Rim Light (#b39062 luxury accent)
    const goldRimLight = new THREE.DirectionalLight(0xdfb776, 2.8);
    goldRimLight.position.set(0, 5, -5);
    scene.add(goldRimLight);

    // Soft Bottom Bounce Light
    const bounceLight = new THREE.DirectionalLight(0xe8edf2, 0.8);
    bounceLight.position.set(0, -5, 2);
    scene.add(bounceLight);

    // 5. Build Procedural Precision 3D Dental Implant Model
    const rotationGroup = new THREE.Group();
    scene.add(rotationGroup);

    // --- A. CROWN GROUP (E.max Ceramic) ---
    const crownGroup = new THREE.Group();
    
    // Tooth crown body (anatomical rounded molar contour)
    const crownMat = new THREE.MeshPhysicalMaterial({
      color: 0xfbf9f5,
      emissive: 0x1a1816,
      roughness: 0.15,
      metalness: 0.05,
      transmission: 0.35, // ceramic translucent depth
      thickness: 1.2,
      ior: 1.52, // realistic porcelain refraction
      clearcoat: 0.85,
      clearcoatRoughness: 0.1,
      reflectivity: 0.6,
    });

    // Molar crown base shape (lathed contour)
    const crownPoints: THREE.Vector2[] = [
      new THREE.Vector2(0.55, -0.4),
      new THREE.Vector2(0.72, -0.2),
      new THREE.Vector2(0.85, 0.25),
      new THREE.Vector2(0.78, 0.6),
      new THREE.Vector2(0.55, 0.72),
      new THREE.Vector2(0.2, 0.68),
      new THREE.Vector2(0.0, 0.62),
    ];
    const crownGeo = new THREE.LatheGeometry(crownPoints, 32);
    // Add natural anatomical occlusal grooves
    const crownMesh = new THREE.Mesh(crownGeo, crownMat);
    crownMesh.castShadow = true;
    crownMesh.scale.set(1.05, 1.1, 0.95);
    crownGroup.add(crownMesh);

    // Crown cusp details
    const cuspMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.1,
      clearcoat: 1.0,
      transmission: 0.2,
    });
    const cusp1 = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 16), cuspMat);
    cusp1.position.set(0.35, 0.7, 0.25);
    cusp1.scale.set(1, 0.6, 1);
    crownGroup.add(cusp1);

    const cusp2 = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 16), cuspMat);
    cusp2.position.set(-0.35, 0.68, 0.25);
    cusp2.scale.set(1, 0.6, 1);
    crownGroup.add(cusp2);

    const cusp3 = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 16), cuspMat);
    cusp3.position.set(0.3, 0.69, -0.25);
    cusp3.scale.set(1, 0.6, 1);
    crownGroup.add(cusp3);

    const cusp4 = new THREE.Mesh(new THREE.SphereGeometry(0.19, 16, 16), cuspMat);
    cusp4.position.set(-0.32, 0.67, -0.25);
    cusp4.scale.set(1, 0.6, 1);
    crownGroup.add(cusp4);

    crownGroup.position.y = 0.5;
    rotationGroup.add(crownGroup);

    // --- B. PRECISION ABUTMENT (Grade 5 Titanium Connector) ---
    const abutmentGroup = new THREE.Group();
    const abutmentMat = new THREE.MeshStandardMaterial({
      color: 0xd6dde3,
      metalness: 0.92,
      roughness: 0.22,
    });

    // Chamfered conical core
    const abutmentCoreGeo = new THREE.CylinderGeometry(0.42, 0.52, 0.45, 32);
    const abutmentCore = new THREE.Mesh(abutmentCoreGeo, abutmentMat);
    abutmentGroup.add(abutmentCore);

    // Abutment collar ring (Gold/Titanium nitride ring)
    const collarMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37, // gold hue collar
      metalness: 0.95,
      roughness: 0.18,
    });
    const collarGeo = new THREE.TorusGeometry(0.48, 0.04, 16, 32);
    collarGeo.rotateX(Math.PI / 2);
    const collar = new THREE.Mesh(collarGeo, collarMat);
    collar.position.y = -0.2;
    abutmentGroup.add(collar);

    abutmentGroup.position.y = -0.15;
    rotationGroup.add(abutmentGroup);

    // --- C. TITANIUM IMPLANT POST (Micro-threaded root) ---
    const implantGroup = new THREE.Group();
    const implantMat = new THREE.MeshStandardMaterial({
      color: 0x93a1af,
      metalness: 0.88,
      roughness: 0.32, // blasted SLA micro-rough surface
    });

    // Main tapered screw cylinder
    const implantCoreGeo = new THREE.CylinderGeometry(0.46, 0.26, 1.4, 32);
    const implantCore = new THREE.Mesh(implantCoreGeo, implantMat);
    implantCore.position.y = -0.7;
    implantGroup.add(implantCore);

    // Micro-threads along root (10 concentric precision ridges)
    const threadMat = new THREE.MeshStandardMaterial({
      color: 0x8291a0,
      metalness: 0.9,
      roughness: 0.28,
    });
    for (let i = 0; i < 9; i++) {
      const radius = 0.47 - i * 0.022;
      const threadGeo = new THREE.TorusGeometry(radius, 0.035, 12, 32);
      threadGeo.rotateX(Math.PI / 2);
      const thread = new THREE.Mesh(threadGeo, threadMat);
      thread.position.y = -0.18 - i * 0.13;
      implantGroup.add(thread);
    }

    // Apical rounded root apex
    const apexGeo = new THREE.SphereGeometry(0.26, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    apexGeo.rotateX(Math.PI);
    const apex = new THREE.Mesh(apexGeo, implantMat);
    apex.position.y = -1.4;
    implantGroup.add(apex);

    implantGroup.position.y = -0.55;
    rotationGroup.add(implantGroup);

    // --- D. ALVEOLAR BONE & GINGIVAL FOUNDATION ---
    const boneGroup = new THREE.Group();

    // Bone ring translucent architectural platform
    const boneMat = new THREE.MeshPhysicalMaterial({
      color: 0xf2ece4,
      roughness: 0.45,
      metalness: 0.05,
      transmission: 0.4,
      thickness: 1.5,
      opacity: 0.85,
      transparent: true,
    });
    const boneRingGeo = new THREE.CylinderGeometry(1.2, 1.35, 1.1, 48, 1, true);
    boneRingGeo.rotateX(Math.PI);
    const boneRing = new THREE.Mesh(boneRingGeo, boneMat);
    boneRing.position.y = -1.4;
    boneGroup.add(boneRing);

    // Base glowing halo ring
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xb39062,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const haloGeo = new THREE.CylinderGeometry(1.36, 1.4, 0.15, 36);
    const halo = new THREE.Mesh(haloGeo, haloMat);
    halo.position.y = -1.95;
    boneGroup.add(halo);

    rotationGroup.add(boneGroup);

    // Position entire rotation group
    rotationGroup.position.y = 0.25;
    rotationGroup.rotation.y = 0.4;
    rotationGroup.rotation.x = 0.08;

    // Store references
    threeRef.current = {
      scene,
      camera,
      renderer,
      crownMesh: crownGroup,
      abutmentMesh: abutmentGroup,
      implantMesh: implantGroup,
      boneMesh: boneGroup,
      targetExplodedFactor: 0,
      currentExplodedFactor: 0,
      rotationGroup,
      isIntersecting: true,
      mousePrevX: 0,
      mousePrevY: 0,
      isPointerDown: false,
      animFrameId: 0,
    };

    // 6. Intersection Observer: Stop render loop when offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        if (!threeRef.current) return;
        const entry = entries[0];
        threeRef.current.isIntersecting = !!entry?.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // 7. Animation Render Loop
    let clock = new THREE.Clock();
    const animate = () => {
      const data = threeRef.current;
      if (!data) return;

      const delta = clock.getDelta();

      if (data.isIntersecting) {
        // Smooth LERP exploded position
        data.currentExplodedFactor +=
          (data.targetExplodedFactor - data.currentExplodedFactor) * Math.min(delta * 7, 0.2);

        const exp = data.currentExplodedFactor;

        // Animate separation
        // Crown moves UP
        data.crownMesh.position.y = 0.5 + exp * 1.0;
        // Abutment moves UP slightly
        data.abutmentMesh.position.y = -0.15 + exp * 0.45;
        // Implant stays anchored
        data.implantMesh.position.y = -0.55 - exp * 0.15;
        // Bone shifts subtly
        data.boneMesh.position.y = -exp * 0.25;

        // Auto rotation
        if (autoRotate && !data.isPointerDown) {
          data.rotationGroup.rotation.y += delta * 0.35;
        }

        data.renderer.render(data.scene, data.camera);
      }

      data.animFrameId = requestAnimationFrame(animate);
    };

    animate();

    // 8. Handle Resize
    const handleResize = () => {
      if (!threeRef.current || !containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = Math.min(Math.max(containerRef.current.clientHeight, 440), 580);
      threeRef.current.camera.aspect = w / h;
      threeRef.current.camera.updateProjectionMatrix();
      threeRef.current.renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      if (threeRef.current) {
        cancelAnimationFrame(threeRef.current.animFrameId);
        threeRef.current.renderer.dispose();
      }
    };
  }, [autoRotate]);

  // Sync Exploded State
  useEffect(() => {
    if (threeRef.current) {
      threeRef.current.targetExplodedFactor = isExploded ? 1 : 0;
    }
  }, [isExploded]);

  // Sync Zoom Level
  useEffect(() => {
    if (threeRef.current) {
      const targetZ = zoomLevel === "close" ? 4.2 : 5.8;
      threeRef.current.camera.position.z = targetZ;
    }
  }, [zoomLevel]);

  // Pointer Drag Interaction
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    if (!threeRef.current) return;
    threeRef.current.isPointerDown = true;
    threeRef.current.mousePrevX = e.clientX;
    threeRef.current.mousePrevY = e.clientY;
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!threeRef.current || !threeRef.current.isPointerDown) return;
    const deltaX = e.clientX - threeRef.current.mousePrevX;
    const deltaY = e.clientY - threeRef.current.mousePrevY;
    threeRef.current.mousePrevX = e.clientX;
    threeRef.current.mousePrevY = e.clientY;

    threeRef.current.rotationGroup.rotation.y += deltaX * 0.008;
    threeRef.current.rotationGroup.rotation.x = Math.max(
      -0.4,
      Math.min(0.5, threeRef.current.rotationGroup.rotation.x + deltaY * 0.005)
    );
  };

  const handlePointerUp = () => {
    if (threeRef.current) {
      threeRef.current.isPointerDown = false;
    }
    setIsDragging(false);
  };

  const currentPartData = partDetails[activePart];

  return (
    <div className="relative overflow-hidden rounded-[2.5rem] border border-[#e6e4dc] bg-gradient-to-b from-[#ffffff] via-[#faf9f6] to-[#f4f2ec] p-6 shadow-xl lg:p-10">
      {/* Top Header Badge */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#e6e4dc] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="eyebrow">
              <Sparkles className="h-3.5 w-3.5 text-[#8c6d46]" />
              {isAr ? "مجسم تفاعلي حقيقي 3D WebGL" : "INTERACTIVE 3D DENTAL ANATOMY"}
            </span>
            <span className="flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              60 FPS
            </span>
          </div>

          <h3 className="mt-2.5 font-display text-2xl font-bold text-[#0f172a] md:text-3xl">
            {isAr
              ? "استكشف تشريح زراعة الأسنان وتيجان E.max بتقنية الأبعاد الثلاثية"
              : "Explore Implant Anatomy & E.max Restoration in True 3D"}
          </h3>
          <p className="mt-1 text-xs text-[#52525b] max-w-2xl">
            {isAr
              ? "اسحب بالماوس أو الإصبع لتدوير السن بزاوية 360 درجة، واضغط على «تفكيك المكونات» لفحص جودة التيتانيوم الطبي والخزف الألماني."
              : "Drag to rotate 360°, toggle exploded anatomy view, and click components to inspect medical titanium & porcelain certification."}
          </p>
        </div>

        {/* Global 3D Mode Toggles */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* Exploded View Button */}
          <button
            onClick={() => setIsExploded(!isExploded)}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all shadow-sm ${
              isExploded
                ? "bg-[#0f172a] text-white shadow-md ring-2 ring-[#b39062]"
                : "border border-[#d5d1c5] bg-white text-[#0f172a] hover:bg-[#f4f2ec]"
            }`}
            aria-pressed={isExploded}
          >
            <Layers className="h-4 w-4 text-[#b39062]" />
            <span>{isAr ? (isExploded ? "إعادة التجميع" : "تفكيك المكونات") : isExploded ? "Assemble" : "Exploded View"}</span>
          </button>

          {/* Auto-Rotate Toggle */}
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`flex h-9 w-9 items-center justify-center rounded-full border border-[#d5d1c5] transition-colors ${
              autoRotate ? "bg-white text-[#0f172a]" : "bg-[#f4f2ec] text-[#52525b]"
            }`}
            title={isAr ? "تبديل الدوران التلقائي" : "Toggle auto-rotation"}
            aria-label="Toggle auto-rotation"
          >
            <RotateCw className={`h-4 w-4 ${autoRotate ? "animate-spin text-[#8c6d46]" : ""}`} style={{ animationDuration: "6s" }} />
          </button>

          {/* Zoom Toggle */}
          <button
            onClick={() => setZoomLevel(zoomLevel === "normal" ? "close" : "normal")}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d5d1c5] bg-white text-[#0f172a] transition-colors hover:bg-[#f4f2ec]"
            title={isAr ? "تقريب / إبعاد" : "Zoom in/out"}
            aria-label="Toggle Zoom"
          >
            {zoomLevel === "normal" ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Main 3D Canvas Area & HUD Inspector */}
      <div className="mt-6 grid items-center gap-8 lg:grid-cols-[1.3fr_1fr]">
        {/* Left: Interactive 3D WebGL Canvas */}
        <div className="relative flex items-center justify-center rounded-3xl border border-[#e6e4dc] bg-gradient-to-b from-[#ffffff] to-[#faf9f6] p-2 shadow-inner overflow-hidden min-h-[380px] md:min-h-[460px]">
          {/* Three.js Canvas */}
          <canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className={`h-full w-full touch-none cursor-grab active:cursor-grabbing select-none ${
              isDragging ? "cursor-grabbing" : ""
            }`}
          />

          {/* 3D Orbit Helper Overlay */}
          <div className="pointer-events-none absolute bottom-4 start-4 flex items-center gap-2 rounded-full border border-[#d5d1c5] bg-white/90 px-3 py-1.5 text-[11px] font-bold text-[#0f172a] shadow-sm backdrop-blur-sm">
            <Eye className="h-3.5 w-3.5 text-[#8c6d46]" />
            <span>{isAr ? "اسحب للتدوير 360°" : "Drag to rotate 360°"}</span>
          </div>

          {/* Quick Hotspot Selectors on Canvas */}
          <div className="absolute top-4 start-4 flex flex-wrap gap-1.5 max-w-[280px]">
            {(["crown", "abutment", "implant", "bone"] as AnatomyPart[]).map((key) => {
              const active = activePart === key;
              return (
                <button
                  key={key}
                  onClick={() => setActivePart(key)}
                  className={`rounded-full px-2.5 py-1 text-[11px] font-bold transition-all shadow-sm ${
                    active
                      ? "bg-[#0f172a] text-white shadow-md ring-1 ring-[#b39062]"
                      : "border border-[#e6e4dc] bg-white/90 text-[#0f172a] hover:bg-white"
                  }`}
                >
                  {isAr
                    ? key === "crown"
                      ? "١. التاج الخزفي"
                      : key === "abutment"
                      ? "٢. الدعامة"
                      : key === "implant"
                      ? "٣. جذر التيتانيوم"
                      : "٤. عظم الفك"
                    : key === "crown"
                    ? "1. Crown"
                    : key === "abutment"
                    ? "2. Abutment"
                    : key === "implant"
                    ? "3. Titanium Root"
                    : "4. Jawbone"}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Clinical Specification HUD */}
        <div className="flex flex-col justify-between rounded-3xl border border-[#e6e4dc] bg-white p-6 md:p-8 shadow-sm">
          <div>
            <div className="flex items-center justify-between border-b border-[#f1efe9] pb-4">
              <span className="flex items-center gap-1.5 rounded-full bg-[#f4f2ec] px-3 py-1 text-xs font-bold text-[#8c6d46]">
                <ShieldCheck className="h-4 w-4" />
                {isAr ? currentPartData.badge.ar : currentPartData.badge.en}
              </span>
              <span className="text-[11px] font-mono text-[#52525b]">ISO 13485 Medical</span>
            </div>

            <h4 className="mt-4 font-display text-xl font-bold text-[#0f172a]">
              {isAr ? currentPartData.name.ar : currentPartData.name.en}
            </h4>

            {/* Spec Cards */}
            <div className="mt-5 space-y-3.5">
              <div className="rounded-2xl border border-[#f1efe9] bg-[#faf9f6] p-4">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#8c6d46]">
                  {isAr ? "الخامة والمعيار الطبي" : "Biomaterial Standard"}
                </p>
                <p className="mt-1 text-xs font-semibold text-[#0f172a]">
                  {isAr ? currentPartData.material.ar : currentPartData.material.en}
                </p>
              </div>

              <div className="rounded-2xl border border-[#f1efe9] bg-[#faf9f6] p-4">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#8c6d46]">
                  {isAr ? "المواصفات الميكانيكية والدقة" : "Mechanical Precision & Rating"}
                </p>
                <p className="mt-1 text-xs text-[#52525b]">
                  {isAr ? currentPartData.specs.ar : currentPartData.specs.en}
                </p>
              </div>

              <div className="rounded-2xl border border-[#f1efe9] bg-[#faf9f6] p-4">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#8c6d46]">
                  {isAr ? "الدور الوظيفي في الفم" : "Functional Clinical Role"}
                </p>
                <p className="mt-1 text-xs text-[#52525b]">
                  {isAr ? currentPartData.clinicalRole.ar : currentPartData.clinicalRole.en}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Doctor Consultation Action */}
          <div className="mt-6 border-t border-[#f1efe9] pt-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-[#0f172a]">
                  {isAr ? "استشارة أخصائي زراعة الأسنان بمركز دبي" : "Consult Dubai Dental Implantologist"}
                </p>
                <p className="text-[11px] text-[#52525b]">
                  {isAr ? "فحص وأشعة ثلاثية الأبعاد CBCT" : "Comprehensive CBCT 3D Scan"}
                </p>
              </div>

              <a
                href="https://wa.me/201022013314?text=مرحباً%20مركز%20دبي%20لطب%20الأسنان،%20أود%20استشارة%20بخصوص%20زراعة%20الأسنان%20والتركيبات"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary py-2.5 px-4 text-xs"
              >
                <span>{isAr ? "حجز استشارة" : "Book Consult"}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
