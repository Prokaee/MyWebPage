interface Bucket {
  month: string;
  income: number; // 0..1
  expense: number; // 0..1
}

/** Dependency-freies SVG-Balkendiagramm (Einnahmen vs. Ausgaben je Monat). */
export default function Chart({ data }: { data: Bucket[] }) {
  const W = 320;
  const H = 128;
  const baseY = 100;
  const maxH = 92;
  const groupW = W / Math.max(1, data.length);
  const barW = 13;
  const gap = 6;

  return (
    <div className="chart">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Einnahmen und Ausgaben je Monat">
        {/* Basislinie */}
        <line x1="0" y1={baseY} x2={W} y2={baseY} stroke="var(--color-border)" strokeWidth="1" />
        {data.map((b, i) => {
          const cx = i * groupW + groupW / 2;
          const incH = Math.max(b.income > 0 ? 3 : 0, b.income * maxH);
          const expH = Math.max(b.expense > 0 ? 3 : 0, b.expense * maxH);
          return (
            <g key={i}>
              <rect
                className="chart__bar"
                x={cx - barW - gap / 2}
                y={baseY - incH}
                width={barW}
                height={incH}
                rx="4"
                fill="var(--color-income)"
                style={{ animationDelay: `${i * 70}ms` }}
              />
              <rect
                className="chart__bar"
                x={cx + gap / 2}
                y={baseY - expH}
                width={barW}
                height={expH}
                rx="4"
                fill="var(--color-expense)"
                style={{ animationDelay: `${i * 70 + 35}ms` }}
              />
              <text className="chart__axis" x={cx} y={baseY + 18} textAnchor="middle">
                {b.month}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
