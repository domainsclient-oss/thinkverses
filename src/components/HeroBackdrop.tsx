// Layered, slow-moving background for the hero. Each layer drifts at its own speed to create depth;
// all motion is CSS transforms and is disabled for visitors who prefer reduced motion.

type Node = { x: number; y: number; r: number; d: number };

// Deterministic pseudo-random so server and client render identical markup.
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function makeNetwork(
  seed: number,
  count: number,
  rMin: number,
  rMax: number,
  link: number,
) {
  const rand = rng(seed);
  const nodes: Node[] = Array.from({ length: count }, () => ({
    x: 380 + rand() * 1100,
    y: rand() * 900,
    r: rMin + rand() * (rMax - rMin),
    d: rand() * 6,
  }));
  const edges: [Node, Node][] = [];
  nodes.forEach((a, i) =>
    nodes.slice(i + 1).forEach((b) => {
      if (Math.hypot(a.x - b.x, a.y - b.y) < link) edges.push([a, b]);
    }),
  );
  return { nodes, edges };
}

const far = makeNetwork(7, 38, 1.2, 2.2, 170);
const near = makeNetwork(19, 16, 2.4, 3.8, 260);

function Network({
  net,
  tone,
  pulses,
}: {
  net: ReturnType<typeof makeNetwork>;
  tone: string;
  pulses: boolean;
}) {
  return (
    <svg
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
    >
      <g stroke={tone} strokeOpacity="0.16" strokeWidth="1">
        {net.edges.map(([a, b], i) => (
          <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} />
        ))}
      </g>
      {pulses && (
        <g fill="none" stroke={tone} strokeWidth="1.4" strokeLinecap="round">
          {net.edges
            .filter((_, i) => i % 3 === 0)
            .map(([a, b], i) => (
              <path
                key={i}
                d={`M${a.x} ${a.y}L${b.x} ${b.y}`}
                strokeDasharray="2 46"
                strokeOpacity="0.55"
                className="hero-pulse"
                style={{
                  animationDuration: `${7 + (i % 4) * 2.5}s`,
                  animationDelay: `${-i * 1.3}s`,
                }}
              />
            ))}
        </g>
      )}
      <g fill={tone}>
        {net.nodes.map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={n.r}
            className="hero-twinkle"
            style={{
              animationDelay: `${-n.d}s`,
              animationDuration: `${5 + (i % 5)}s`,
            }}
          />
        ))}
      </g>
    </svg>
  );
}

export function HeroBackdrop({ minimal = false }: { minimal?: boolean }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-20 overflow-hidden"
      aria-hidden="true"
    >
      {/* 1 · Aurora: slowest, deepest layer */}
      <div className="hero-drift-a absolute -left-[15%] top-[10%] h-[42rem] w-[42rem] rounded-full bg-volt/25 blur-[150px]" />
      <div className="hero-drift-b absolute right-[-10%] top-[-20%] h-[38rem] w-[38rem] rounded-full bg-violet/20 blur-[150px]" />
      <div className="hero-drift-c absolute bottom-[-25%] left-[35%] h-[34rem] w-[34rem] rounded-full bg-cyan/12 blur-[140px]" />

      {!minimal && (
        <>
          {/* 2 · Blueprint grid, panning seamlessly by one tile */}
          <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_40%_45%,black,transparent_78%)]">
            <div className="hero-grid-pan absolute -inset-12 bg-blueprint" />
          </div>

          {/* 3 + 4 · Network layers, kept clear of the text column */}
          <div className="absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_85%)] lg:opacity-100 lg:[mask-image:linear-gradient(to_right,transparent_22%,black_60%)]">
            <div className="hero-float-slow absolute -inset-[4%]">
              <Network net={far} tone="#7fa0ff" pulses={false} />
            </div>
            <div className="hero-float-fast absolute -inset-[6%]">
              <Network net={near} tone="#1fc8e8" pulses />
            </div>
          </div>
        </>
      )}

      {/* 5 · Fine dust rising very slowly */}
      <div className="absolute inset-0 overflow-hidden opacity-70">
        <div className="hero-dust absolute inset-x-0 -bottom-[220px] top-0 bg-[radial-gradient(rgba(169,182,204,0.35)_1px,transparent_1.5px),radial-gradient(rgba(31,200,232,0.3)_1px,transparent_1.5px)] [background-position:0_0,110px_70px] [background-size:220px_220px,220px_220px]" />
      </div>

      {/* Readability scrim behind the copy */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-transparent to-ink/60 lg:bg-gradient-to-r lg:from-ink/80 lg:via-ink/30 lg:to-transparent" />
    </div>
  );
}
