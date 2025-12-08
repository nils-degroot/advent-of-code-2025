const distance = (
  l: { x: number; y: number; z: number },
  r: { x: number; y: number; z: number },
) => ((l.x - r.x) ** 2) + ((l.y - r.y) ** 2) + ((l.z - r.z) ** 2);

const coords = Deno.readTextFileSync(Deno.args[0]).trim().split("\n").map(
  (line) => {
    const [x, y, z] = line.split(",").map((num) => Number.parseInt(num));
    return { x, y, z };
  },
);

const distances: { distance: number; lhs: number; rhs: number }[] = [];

for (let i = 0; i < coords.length; i++) {
  for (let j = i; j < coords.length; j++) {
    if (i === j) {
      continue;
    }

    distances.push({
      distance: distance(coords[i], coords[j]),
      lhs: i,
      rhs: j,
    });
  }
}

distances.sort((l, r) => l.distance - r.distance);

const p1 = () => {
  const connected: Set<number> = new Set([]);
  const cirquits: Set<number>[] = [];

  for (const { lhs, rhs } of distances.slice(0, 10)) {
    if (cirquits.find((c) => c.has(lhs) && c.has(rhs)) !== undefined) {
      // Both in same cirquit
      continue;
    }

    if (connected.has(lhs) && connected.has(rhs)) {
      // Merge cirquits
      const idx = cirquits.findIndex((r) => r.has(rhs))!;
      for (const entry of cirquits.find((r) => r.has(rhs))!) {
        cirquits.find((l) => l.has(lhs))!.add(entry);
      }
      cirquits.splice(idx, 1);
      continue;
    }

    if (connected.has(lhs)) {
      // Connect rhs to the cirquit of lhs
      cirquits.find((cirq) => cirq.has(lhs))!.add(rhs);
      connected.add(rhs);
      continue;
    }

    if (connected.has(rhs)) {
      // Connect lhs to the cirquit of rhs
      cirquits.find((cirq) => cirq.has(rhs))!.add(lhs);
      connected.add(lhs);
      continue;
    }

    // Create a new cirquit
    cirquits.push(new Set([lhs, rhs]));
    connected.add(lhs);
    connected.add(rhs);
  }

  return cirquits.map((c) => c.size).sort((l, r) => r - l).slice(0, 3)
    .reduce((acc, v) => acc * v, 1);
};

console.log(
  `Part 1: ${p1()}`,
);

const p2 = () => {
  const connected: Set<number> = new Set([]);

  for (const { lhs, rhs } of distances) {
    if (
      connected.size === coords.length - 1 &&
      (!connected.has(lhs) || !connected.has(rhs))
    ) {
      return coords[lhs].x * coords[rhs].x;
    }

    connected.add(lhs);
    connected.add(rhs);
  }
};

console.log(`Part 2: ${p2()}`);
