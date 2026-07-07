export interface WeightPoint {
  fecha: string;
  peso: number;
}

export function buildWeightChart(pesoLog: WeightPoint[]) {
  const pesos = pesoLog.map((p) => p.peso);
  const minP = Math.min(...pesos) - 1;
  const maxP = Math.max(...pesos) + 1;
  const W = 560;
  const H = 180;
  const pad = 10;

  const pts = pesoLog.map((p, i) => {
    const x = pad + (i * (W - pad * 2)) / Math.max(1, pesoLog.length - 1);
    const y = pad + (H - pad * 2) * (1 - (p.peso - minP) / (maxP - minP));
    return { x, y, ...p };
  });

  const linePath = pts.map((p, i) => (i === 0 ? "M" : "L") + p.x.toFixed(1) + " " + p.y.toFixed(1)).join(" ");
  const areaPath = `${linePath} L${(W - pad).toFixed(1)} ${H - pad} L${pad} ${H - pad} Z`;
  const deltaPeso = pesos.length ? (pesos[pesos.length - 1] - pesos[0]).toFixed(1) : "0.0";

  return { pts, linePath, areaPath, W, H, deltaPeso, pesoUltimo: pesos[pesos.length - 1] };
}
