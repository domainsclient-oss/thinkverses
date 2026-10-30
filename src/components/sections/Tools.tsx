import Image, { type StaticImageData } from "next/image";
import { Reveal } from "../Reveal";
import rosLogo from "../../../public/Tools/1.webp";
import tensorflowLogo from "../../../public/Tools/2.webp";
import pythonLogo from "../../../public/Tools/3.webp";
import awsLogo from "../../../public/Tools/4.webp";
import isaacLogo from "../../../public/Tools/5.webp";

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
    text: "Scalable cloud for data ingestion, storage and hosting live twins.",
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

const industries = [
  "Manufacturing",
  "Water and power utilities",
  "Controlled-environment agriculture",
];

function LogoTile({
  tool,
  className = "",
}: {
  tool: Tool;
  className?: string;
}) {
  return (
    <span
      className={`grid place-items-center rounded-2xl bg-white ring-1 ring-line ${className}`}
    >
      <Image
        src={tool.logo}
        alt={`${tool.name} logo`}
        className="h-auto w-[90px]"
      />
    </span>
  );
}

// Orbit of logos around the Thinkverses core; purely decorative.
function ToolOrbit() {
  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[26rem]"
      aria-hidden="true"
    >
      <div className="absolute inset-0 rounded-full border border-dashed border-line" />
      <div className="absolute inset-[18%] rounded-full border border-line" />
      <div className="absolute inset-[36%] rounded-full bg-gradient-to-br from-ink/20 via-volt/15 to-[#0056a7]/25 blur-2xl" />
      <div className="absolute inset-[38%] grid place-items-center rounded-full bg-ink text-center text-white shadow-[0_20px_50px_-20px_rgba(10,22,48,0.7)]">
        <span className="px-2 font-display text-[0.8rem] font-bold leading-tight [font-stretch:115%] sm:text-sm">
          Thinkverses
          <span className="block text-[0.65rem] font-medium text-cyan">
            Core
          </span>
        </span>
      </div>
      <div className="spin-slow absolute inset-0">
        {tools.map((t, i) => {
          const angle = (i / tools.length) * 2 * Math.PI - Math.PI / 2;
          const x = 50 + 50 * Math.cos(angle);
          const y = 50 + 50 * Math.sin(angle);
          return (
            <span
              key={t.name}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <span className="spin-slow block [animation-direction:reverse]">
                <LogoTile
                  tool={t}
                  className="h-14 w-24 shadow-[0_12px_30px_-14px_rgba(10,22,48,0.4)]"
                />
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

export function Tools() {
  return (
    <section
      id="tools"
      className="relative overflow-hidden bg-white py-24 sm:py-32"
    >
      <div
        className="absolute inset-0 bg-blueprint-light [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
        aria-hidden="true"
      />
      <div
        className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-ink/5 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="absolute -left-40 bottom-10 h-96 w-96 rounded-full bg-violet/10 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-deep/30 bg-cyan-deep/5 px-3.5 py-1.5 text-sm font-medium text-cyan-deep">
              <span
                className="h-1.5 w-1.5 rounded-full bg-cyan-deep"
                aria-hidden="true"
              />
              Technology stack
            </p>
            <h2 className="display h-section">Our Integrated Tools</h2>
            <p className="lede mt-6 text-slate">
              We build on proven, industry-standard platforms for robotics, AI
              and cloud, so every Digital Twin and robotics solution is
              reliable, scalable and ready to grow with your operations.
            </p>
            <div className="mt-12 hidden lg:block">
              <ToolOrbit />
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <ul className="grid gap-4 sm:grid-cols-6">
              {tools.map((t, i) => (
                <Reveal
                  as="li"
                  key={t.name}
                  delay={i * 90}
                  className={`group list-none ${t.span}`}
                >
                  <div className="h-full rounded-[24px] bg-gradient-to-br from-line to-line p-px transition-all duration-500 group-hover:-translate-y-1 group-hover:from-ink group-hover:to-[#0056a7] group-hover:shadow-[0_30px_60px_-30px_rgba(10,22,48,0.4)]">
                    <div className="relative flex h-full flex-col overflow-hidden rounded-[23px] bg-white p-6 sm:p-7">
                      <div
                        className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-ink/0 blur-2xl transition-colors duration-500 group-hover:bg-ink/10"
                        aria-hidden="true"
                      />
                      <div className="relative flex items-start justify-between gap-4">
                        <LogoTile
                          tool={t}
                          className="h-16 w-28 transition-transform duration-500 group-hover:scale-105"
                        />
                        <span className="font-display text-sm font-bold text-line transition-colors duration-500 group-hover:text-cyan-deep">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <p className="relative mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-deep">
                        {t.category}
                      </p>
                      <h3 className="relative mt-1.5 font-display text-xl font-bold [font-stretch:110%]">
                        {t.name}
                      </h3>
                      <p className="relative mt-2 text-[0.95rem] leading-relaxed text-slate">
                        {t.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
            <Reveal className="mt-6 flex flex-wrap items-center gap-2.5">
              <p className="mr-1 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-deep">
                Industries we work with
              </p>
              {industries.map((name) => (
                <span
                  key={name}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-sm font-medium text-ink"
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-cyan-deep"
                    aria-hidden="true"
                  />
                  {name}
                </span>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
