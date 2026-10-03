import type { Project } from "@/types";

/** Drawn UI mockups so cards look finished before real screenshots exist. */
export function ProjectMockup({ kind }: { kind: Project["mockup"] }) {
  const line = "rgb(var(--line))";
  const cyan = "rgb(var(--cyan))";
  const violet = "rgb(var(--violet))";
  const pulse = "rgb(var(--pulse))";
  const ink = "rgb(var(--ink) / 0.6)";
  return (
    <svg viewBox="0 0 480 300" className="h-full w-full" aria-hidden>
      <rect x="20" y="20" width="440" height="270" rx="14" fill="rgb(var(--bg))" stroke={line} />
      <circle cx="40" cy="38" r="4" fill={line} /><circle cx="54" cy="38" r="4" fill={line} /><circle cx="68" cy="38" r="4" fill={line} />
      {kind === "inventory" && (
        <g>
          <rect x="20" y="56" width="90" height="244" fill="rgb(var(--surface))" />
          {[0, 1, 2, 3, 4].map((i) => <rect key={i} x="34" y={76 + i * 26} width={i === 1 ? 62 : 48} height="8" rx="4" fill={i === 1 ? cyan : line} />)}
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={128 + i * 108} y="72" width="96" height="58" rx="10" fill="rgb(var(--surface))" stroke={line} />
              <rect x={140 + i * 108} y="86" width="30" height="6" rx="3" fill={line} />
              <rect x={140 + i * 108} y="102" width={40 + i * 8} height="14" rx="4" fill={[cyan, violet, pulse][i]} opacity="0.85" />
            </g>
          ))}
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <rect x="128" y={148 + i * 28} width="312" height="22" rx="6" fill={i % 2 ? "transparent" : "rgb(var(--surface))"} />
              <rect x="140" y={155 + i * 28} width="80" height="8" rx="4" fill={ink} opacity="0.5" />
              <rect x="250" y={155 + i * 28} width="50" height="8" rx="4" fill={line} />
              <rect x="380" y={153 + i * 28} width="46" height="12" rx="6" fill={i === 2 ? violet : pulse} opacity="0.7" />
            </g>
          ))}
        </g>
      )}
      {kind === "dashboard" && (
        <g>
          <rect x="40" y="66" width="180" height="22" rx="8" fill="rgb(var(--surface))" stroke={line} />
          <rect x="52" y="74" width="90" height="6" rx="3" fill={cyan} />
          <g transform="translate(110 190)">
            {[[0.55, pulse], [0.25, "rgb(244 112 112)"], [0.2, violet]].reduce<{ acc: number; els: React.ReactElement[] }>((s, [f, c], i) => {
              const a0 = s.acc * Math.PI * 2, a1 = (s.acc + (f as number)) * Math.PI * 2;
              const p = (a: number) => `${58 * Math.cos(a - Math.PI / 2)} ${58 * Math.sin(a - Math.PI / 2)}`;
              s.els.push(<path key={i} d={`M ${p(a0)} A 58 58 0 ${(f as number) > 0.5 ? 1 : 0} 1 ${p(a1)}`} stroke={c as string} strokeWidth="18" fill="none" />);
              s.acc += f as number; return s;
            }, { acc: 0, els: [] }).els}
          </g>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <g key={i}>
              <rect x="210" y={110 + i * 28} width="230" height="22" rx="6" fill={i === 1 ? "rgb(var(--raised))" : "rgb(var(--surface))"} stroke={i === 1 ? cyan : "transparent"} />
              <rect x="222" y={117 + i * 28} width="60" height="8" rx="4" fill={ink} opacity="0.5" />
              <circle cx="420" cy={121 + i * 28} r="5" fill={i === 2 || i === 4 ? "rgb(244 112 112)" : pulse} />
            </g>
          ))}
        </g>
      )}
      {kind === "pipeline" && (
        <g>
          {["Build", "Flash", "Execute", "Analyse", "Report"].map((s, i) => (
            <g key={s}>
              <rect x={42 + i * 84} y="110" width="70" height="44" rx="10" fill="rgb(var(--surface))" stroke={i === 2 ? cyan : line} />
              <circle cx={58 + i * 84} cy="132" r="5" fill={i < 2 ? pulse : i === 2 ? cyan : line} />
              <text x={68 + i * 84} y="136" fontSize="10" fontFamily="monospace" fill={ink}>{s}</text>
              {i < 4 && <line x1={112 + i * 84} y1="132" x2={126 + i * 84} y2="132" stroke={line} strokeWidth="2" />}
            </g>
          ))}
          <rect x="42" y="180" width="406" height="96" rx="10" fill="rgb(var(--surface))" />
          {[0, 1, 2, 3, 4].map((i) => <rect key={i} x="56" y={192 + i * 16} width={[200, 280, 160, 320, 240][i]} height="6" rx="3" fill={i === 3 ? pulse : line} opacity={i === 3 ? 0.8 : 1} />)}
          <polyline points="42,86 120,86 132,70 144,98 156,86 448,86" fill="none" stroke={pulse} strokeWidth="2" opacity="0.7" />
        </g>
      )}
      {kind === "mobile" && (
        <g>
          {[0, 1].map((i) => (
            <g key={i} transform={`translate(${130 + i * 130} ${i ? 70 : 50})`}>
              <rect width="110" height="210" rx="18" fill="rgb(var(--surface))" stroke={line} />
              <rect x="40" y="8" width="30" height="5" rx="2.5" fill={line} />
              <rect x="12" y="24" width="60" height="7" rx="3.5" fill={ink} opacity="0.6" />
              {[0, 1, 2, 3].map((j) => (
                <g key={j} transform={`translate(${12 + (j % 2) * 46} ${42 + Math.floor(j / 2) * 78})`}>
                  <rect width="40" height="54" rx="5" fill={[violet, cyan, pulse, violet][(j + i) % 4]} opacity="0.75" />
                  <rect y="60" width="34" height="5" rx="2.5" fill={line} />
                </g>
              ))}
            </g>
          ))}
        </g>
      )}
      {kind === "anatomy" && (
        <g>
          <rect x="40" y="70" width="180" height="12" rx="6" fill={ink} opacity="0.6" />
          <rect x="40" y="92" width="140" height="12" rx="6" fill={ink} opacity="0.4" />
          <rect x="40" y="124" width="160" height="6" rx="3" fill={line} />
          <rect x="40" y="136" width="130" height="6" rx="3" fill={line} />
          <rect x="40" y="164" width="88" height="26" rx="13" fill={cyan} />
          <g transform="translate(340 180)" fill="none" stroke={violet} strokeOpacity="0.8">
            <ellipse rx="22" ry="26" cy="-92" />
            <path d="M-12 -66 L-50 -40 L-58 30 M12 -66 L50 -40 L58 30 M-14 -66 L-24 40 L-18 100 M14 -66 L24 40 L18 100 M-24 40 L24 40" />
            <ellipse rx="26" ry="40" cy="-20" stroke={cyan} strokeDasharray="3 4" />
            <circle r="6" cx="-6" cy="-32" fill={pulse} stroke="none" />
          </g>
          <circle cx="340" cy="180" r="110" fill="none" stroke={line} strokeDasharray="2 6" />
        </g>
      )}
    </svg>
  );
}
