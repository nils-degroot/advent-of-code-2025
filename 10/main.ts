import { ascend, BinaryHeap } from "jsr:@std/data-structures@1.0.9";

const p1Path = (
  desired: string,
  schematics: number[][],
) => {
  const initState = Array(desired.length).fill(".").join("");

  const ans: Record<string, number> = {};
  ans[initState] = 0;

  const prio = new BinaryHeap<{ cost: number; state: string }>((l, r) =>
    ascend(l.cost, r.cost)
  );
  prio.push({
    cost: 0,
    state: initState,
  });

  while (prio.peek()) {
    const { cost, state } = prio.pop()!;

    if (state === desired) {
      return cost;
    }

    for (const schem of schematics) {
      const newState = state.split("").map((c, idx) =>
        schem.includes(idx) ? (c === "#" ? "." : "#") : c
      ).join("");

      if (
        ans[newState] === undefined || ans[newState] > cost
      ) {
        prio.push({ state: newState, cost: cost + 1 });
        ans[newState] = cost + 1;
      }
    }
  }

  return Infinity;
};

const input = Deno.readTextFileSync(Deno.args[0]).trim().split("\n").map(
  (line) => {
    const parts = line.split(" ");

    const lights = parts[0].replace("[", "").replace("]", "");

    const wireSchematics = parts.slice(1, parts.length - 1).map((s) =>
      s.replace("(", "").replace(")", "").split(",").map((num) =>
        Number.parseInt(num)
      )
    );

    const requirements = parts[parts.length - 1].replace("{", "").replace(
      "}",
      "",
    ).split(",").map((num) => Number.parseInt(num));

    return { lights, wireSchematics, requirements };
  },
);

const p1 = input.reduce(
  (acc, { lights, wireSchematics }) => acc + p1Path(lights, wireSchematics),
  0,
);

console.log(`Part 1: ${p1}`);
