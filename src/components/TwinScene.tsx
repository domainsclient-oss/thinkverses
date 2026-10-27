// Isometric wireframe of a small plant: the "digital twin" drawn over the physical photo.
// Geometry is projected here at render time, so shapes stay consistent if the layout changes.

const S = 30; // px per grid unit
const OX = 360;
const OY = 120;
const COS = 0.866;

type P = [number, number];

function iso(x: number, y: number, z = 0): P {
  return [OX + (x - y) * COS * S, OY + (x + y) * 0.5 * S - z * S];
}

const pts = (list: P[]) => list.map((p) => p.map((n) => n.toFixed(1)).join(",")).join(" ");

function Box({ x, y, w, d, h, accent = false }: { x: number; y: number; w: number; d: number; h: number; accent?: boolean }) {
  const top = [iso(x, y, h), iso(x + w, y, h), iso(x + w, y + d, h), iso(x, y + d, h)];
  const right = [iso(x + w, y, 0), iso(x + w, y + d, 0), iso(x + w, y + d, h), iso(x + w, y, h)];
  const left = [iso(x, y + d, 0), iso(x + w, y + d, 0), iso(x + w, y + d, h), iso(x, y + d, h)];
  const stroke = accent ? "#7c5cff" : "#ffffff";
  return (
    <g stroke={stroke} strokeWidth="1.2" strokeLinejoin="round">
      <polygon points={pts(top)} fill={accent ? "rgba(124,92,255,0.18)" : "rgba(255, 255, 255,0.14)"} />
      <polygon points={pts(right)} fill="rgba(255, 255, 255,0.06)" />
      <polygon points={pts(left)} fill="rgba(58,102,255,0.1)" />
    </g>
  );
}

function Tank({ cx, cy, r, h, bands = 3 }: { cx: number; cy: number; r: number; h: number; bands?: number }) {
  const rx = r * 1.2247 * S;
  const ry = r * 0.7071 * S;
  const [bx, by] = iso(cx, cy, 0);
  const [, ty] = iso(cx, cy, h);
  return (
    <g stroke="#ffffff" strokeWidth="1.2" fill="none">
      <path d={`M${bx - rx},${by} L${bx - rx},${ty} M${bx + rx},${by} L${bx + rx},${ty}`} />
      <ellipse cx={bx} cy={by} rx={rx} ry={ry} strokeOpacity="0.45" />
      {Array.from({ length: bands }, (_, i) => {
        const yy = by - ((i + 1) * (by - ty)) / (bands + 1);
        return <path key={i} d={`M${bx - rx},${yy} A${rx},${ry} 0 0 0 ${bx + rx},${yy}`} strokeOpacity="0.35" />;
      })}
      <ellipse cx={bx} cy={ty} rx={rx} ry={ry} fill="rgba(255, 255, 255,0.16)" />
    </g>
  );
}

function Node({ at, d = 0, color = "#ffffff" }: { at: P; d?: number; color?: string }) {
  return (
    <g>
      <circle cx={at[0]} cy={at[1]} r="7" fill="none" stroke={color} strokeWidth="1.5" className="pulse" style={{ "--d": `${d}ms` } as React.CSSProperties} />
      <circle cx={at[0]} cy={at[1]} r="4" fill={color} />
      <circle cx={at[0]} cy={at[1]} r="9" fill="none" stroke={color} strokeOpacity="0.35" />
    </g>
  );
}

export function TwinScene({ className = "" }: { className?: string }) {
  const grid: React.ReactNode[] = [];
  for (let i = 0; i <= 10; i++) {
    const [a1, a2] = [iso(i, 0), iso(i, 10)];
    const [b1, b2] = [iso(0, i), iso(10, i)];
    grid.push(<line key={`a${i}`} x1={a1[0]} y1={a1[1]} x2={a2[0]} y2={a2[1]} />);
    grid.push(<line key={`b${i}`} x1={b1[0]} y1={b1[1]} x2={b2[0]} y2={b2[1]} />);
  }

  const pipe = pts([iso(3.6, 1.8, 1.5), iso(5.2, 1.8, 1.5), iso(5.2, 1.8, 2.2), iso(6.4, 1.8, 2.2)]);
  const pipe2 = pts([iso(7.2, 2.6, 0.9), iso(7.2, 5.4, 0.9), iso(6, 5.4, 0.9), iso(6, 6.4, 0.6)]);
  const arm = pts([iso(3.2, 8.2, 0.5), iso(3.2, 8.2, 2.4), iso(4.6, 7.4, 3.1), iso(5.4, 6.9, 1.7)]);
  const flow = pts([iso(1.2, 6.9, 0.62), iso(8.6, 6.9, 0.62)]);

  return (
    <svg viewBox="0 0 720 560" className={className} role="img" aria-label="Wireframe digital twin of an industrial plant with live sensor points">
      <defs>
        <radialGradient id="twin-glow" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="360" cy="280" rx="340" ry="220" fill="url(#twin-glow)" />

      <g stroke="#ffffff" strokeOpacity="0.16" strokeWidth="1">{grid}</g>
      <polygon points={pts([iso(0, 0), iso(10, 0), iso(10, 10), iso(0, 10)])} fill="none" stroke="#ffffff" strokeOpacity="0.5" />

      <g className="twin-draw">
        <Box x={0.8} y={0.8} w={2.8} d={2.4} h={2.6} />
        <Box x={1.2} y={1.3} w={1.2} d={1} h={3.4} />
        <Tank cx={7} cy={1.9} r={0.95} h={3.2} />
        <Tank cx={8.6} cy={3.6} r={0.75} h={2.4} bands={2} />
        <Box x={1.2} y={6.4} w={7.4} d={1} h={0.6} />
        <Box x={4.4} y={6.5} w={0.8} d={0.8} h={1.3} accent />
        <Box x={6.6} y={6.5} w={0.8} d={0.8} h={1.3} accent />
        <polyline points={pipe} fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points={pipe2} fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points={arm} fill="none" stroke="#7c5cff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      <polyline points={pipe} fill="none" stroke="#e8fbff" strokeWidth="1.4" strokeDasharray="4 16" className="twin-flow" />
      <polyline points={pipe2} fill="none" stroke="#e8fbff" strokeWidth="1.4" strokeDasharray="4 16" className="twin-flow" />
      <polyline points={flow} fill="none" stroke="#7c5cff" strokeWidth="1.4" strokeDasharray="4 16" className="twin-flow" />

      <Node at={iso(7, 1.9, 3.2)} />
      <Node at={iso(2.2, 2, 2.6)} d={700} />
      <Node at={iso(4.6, 7.4, 3.1)} d={1400} color="#7c5cff" />
      <Node at={iso(8.6, 3.6, 2.4)} d={2100} />
    </svg>
  );
}
