import Image, { type StaticImageData } from "next/image";
import { Reveal } from "../Reveal";
import rosLogo from "../../../public/Tools/1.webp";
import tensorflowLogo from "../../../public/Tools/2.webp";
import pythonLogo from "../../../public/Tools/3.webp";
import awsLogo from "../../../public/Tools/4.webp";
import isaacLogo from "../../../public/Tools/5.webp";
import manufacturingImg from "../../../public/images/manufacturing.jpg";
import energyImg from "../../../public/images/energy.jpg";

type Tool = {
  name: string;
  category: string;
  text: string;
  logo: StaticImageData;
  span: string;
};

const tools: Tool[] = [
  {
    name: "ROS",
    category: "Robotics middleware",
    text: "Open-source framework for robot software, drivers, perception and motion control.",
    logo: rosLogo,
    span: "sm:col-span-3",
  },
  {
    name: "TensorFlow",
    category: "Machine learning",
    text: "Training and serving the models behind forecasting and anomaly detection.",
    logo: tensorflowLogo,
    span: "sm:col-span-3",
  },
  {
    name: "Python",
    category: "Data & AI engineering",
    text: "Data pipelines, analytics and integration across the whole stack.",
    logo: pythonLogo,
    span: "sm:col-span-2",
  },
  {
    name: "AWS",
    category: "Cloud infrastructure",
    text: "Scalable cloud for data ingestion, storage and hosting the live Digital Twin.",
    logo: awsLogo,
    span: "sm:col-span-2",
  },
  {
    name: "NVIDIA Isaac",
    category: "Robotics simulation",
    text: "GPU-accelerated simulation and AI to train and test robots virtually.",
    logo: isaacLogo,
    span: "sm:col-span-2",
  },
];

const industries = ["Manufacturing", "Water and power utilities", "Controlled-environment agriculture"];

function LogoTile({ tool, className = "" }: { tool: Tool; className?: string }) {
  return (
    <span className={`grid place-items-center rounded-2xl bg-white ring-1 ring-line ${className}`}>
      <Image src={tool.logo} alt={`${tool.name} logo`} className="h-auto w-[90px]" />
    </span>
  );
}

// Orbit of logos around the Thinkverses core; purely decorative.
function ToolOrbit() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[26rem]" aria-hidden="true">
      <div className="absolute inset-0 rounded-full border border-dashed border-cyan-deep/25" />
      <div className="absolute inset-[18%] rounded-full border border-line" />
      <div className="absolute inset-[34%] rounded-full bg-gradient-to-br from-volt/30 via-cyan/25 to-[#1f3a72]/30 glow-soft" />
      <div className="absolute inset-[38%] grid place-items-center rounded-full bg-ink text-center text-white shadow-[0_20px_50px_-20px_rgba(5,8,15,0.8),0_0_0_6px_rgba(47,107,255,0.08)]">
        <span className="px-2 font-display text-[0.8rem] font-bold leading-tight [font-stretch:115%] sm:text-sm">
          Thinkverses
          <span className="block text-[0.65rem] font-medium text-cyan">Core</span>
        </span>
      </div>
      <div className="spin-slow absolute inset-0">
        {tools.map((t, i) => {
          const angle = (i / tools.length) * 2 * Math.PI - Math.PI / 2;
          const x = 50 + 50 * Math.cos(angle);
          const y = 50 + 50 * Math.sin(angle);
          return (
            <span key={t.name} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${x}%`, top: `${y}%` }}>
              <span className="spin-slow block [animation-direction:reverse]">
                <LogoTile tool={t} className="h-14 w-24 shadow-[0_12px_30px_-14px_rgba(5,8,15,0.45)]" />
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

/* Grow racks under LED light, drawn rather than photographed */
function AgricultureVisual() {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="cea-bg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#120a2e" />
          <stop offset="1" stopColor="#050812" />
        </linearGradient>
        <linearGradient id="cea-led" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#d06bff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#d06bff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#cea-bg)" />
      {[0, 1, 2, 3].map((row) => (
        <g key={row} transform={`translate(0 ${30 + row * 66})`}>
          <rect x="20" y="0" width="360" height="5" rx="2" fill="#ff7bd5" opacity="0.9" />
          <rect x="20" y="5" width="360" height="44" fill="url(#cea-led)" />
          <rect x="20" y="50" width="360" height="6" fill="#1b2340" />
          {Array.from({ length: 18 }, (_, i) => (
            <g key={i} transform={`translate(${30 + i * 20} 50)`}>
              <path d={`M0 0 C -6 -10, -2 -18, 0 -${14 + ((i + row) % 3) * 4} C 2 -18, 6 -10, 0 0`} fill="#4fd17a" opacity="0.9" />
              <path d="M0 0 C 6 -6, 10 -8, 12 -6" stroke="#3fb768" strokeWidth="2" fill="none" />
            </g>
          ))}
        </g>
      ))}
      <rect x="0" y="0" width="400" height="300" fill="url(#cea-bg)" opacity="0.15" />
    </svg>
  );
}

const panels = [
  { image: manufacturingImg as StaticImageData | null, tone: "from-volt/30" },
  { image: energyImg as StaticImageData | null, tone: "from-cyan/25" },
  { image: null, tone: "from-[#b06bff]/25" },
];

export function Tools() {
  return (
    <section id="tools" className="relative overflow-hidden bg-paper py-24 sm:py-32">
      <div className="absolute inset-0 bg-blueprint-light [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" aria-hidden="true" />
      <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-volt/10 glow-soft" aria-hidden="true" />
      <div className="absolute -left-40 bottom-10 h-96 w-96 rounded-full bg-cyan/15 glow-soft" aria-hidden="true" />

      <div className="relative mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <h2 className="display h-section text-ink">Our Integrated Tools</h2>
            <p className="lede mt-6 text-slate">
              We build on proven, industry-standard platforms for robotics, AI and cloud, so every Digital Twin and
              robotics solution is reliable, scalable and ready to grow with your operations.
            </p>
            <div className="mt-12 hidden lg:block">
              <ToolOrbit />
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <ul className="grid gap-4 sm:grid-cols-6">
              {tools.map((t, i) => (
                <Reveal as="li" key={t.name} delay={i * 90} className={`group list-none ${t.span}`}>
                  <div className="h-full rounded-[24px] bg-gradient-to-br from-line to-white p-px transition-all duration-500 group-hover:-translate-y-1 group-hover:from-cyan group-hover:to-volt group-hover:shadow-[0_30px_60px_-30px_rgba(47,107,255,0.45)]">
                    <div className="relative flex h-full flex-col overflow-hidden rounded-[23px] bg-white p-6 sm:p-7">
                      <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-cyan/0 glow-soft transition-colors duration-500 group-hover:bg-cyan/20" aria-hidden="true" />
                      <div className="relative flex items-start justify-between gap-4">
                        <LogoTile tool={t} className="h-16 w-28 transition-transform duration-500 group-hover:scale-105" />
                        <span className="mono text-sm font-bold text-line transition-colors duration-500 group-hover:text-cyan-deep">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <p className="relative mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-deep">{t.category}</p>
                      <h3 className="relative mt-1.5 font-display text-xl font-bold text-ink [font-stretch:110%]">{t.name}</h3>
                      <p className="relative mt-2 text-[0.95rem] leading-relaxed text-slate">{t.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>

        {/* Industries we work with: three distinct environments */}
        <Reveal className="mt-20">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-deep">Industries we work with</p>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {industries.map((name, i) => {
              const p = panels[i];
              return (
                <li key={name} className="group relative isolate flex aspect-[4/3] items-end overflow-hidden rounded-[26px] p-6 text-white shadow-[0_40px_80px_-40px_rgba(5,8,15,0.6)] sm:p-7 md:aspect-[3/4] lg:aspect-[4/5]">
                  {p.image ? (
                    <Image src={p.image} alt="" fill placeholder="blur" sizes="(min-width: 768px) 33vw, 100vw" className="zoom-img -z-10 object-cover" />
                  ) : (
                    <div className="zoom-img absolute inset-0 -z-10">
                      <AgricultureVisual />
                    </div>
                  )}
                  <div className={`absolute inset-0 -z-10 bg-gradient-to-t ${p.tone} via-transparent to-transparent mix-blend-screen`} aria-hidden="true" />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#03060d] via-[#03060d]/40 to-transparent" aria-hidden="true" />
                  <div className="absolute inset-0 -z-10 bg-scanlines opacity-30" aria-hidden="true" />
                  <span className="hud-corners pointer-events-none absolute inset-3 rounded-[20px] opacity-60" aria-hidden="true" />
                  <span className="display text-[clamp(1.5rem,1.2rem+1vw,2.1rem)] leading-[1.05]">{name}</span>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
