const input = Deno.readTextFileSync(Deno.args[0]).trim().split("\n").map((
  row,
) => row.split(""));

let splitCount = 0;
const init = input[0].indexOf("S");
const ys = new Set([init]);

for (const line of input) {
  for (const y of ys) {
    if (line[y] === "^") {
      ys.add(y - 1);
      ys.add(y + 1);
      ys.delete(y);

      splitCount++;
    }
  }
}

console.log(`Part 1: ${splitCount}`);

const answers: Record<string, number> = {};

const possibleRoutes = (x: number, y: number): number => {
  for (const [idx, line] of input.slice(x).entries()) {
    if (line[y] === "^") {
      const lhsFormat = `${x + idx},${y - 1}`;
      const lhs = answers[lhsFormat] ?? possibleRoutes(x + idx, y - 1);
      answers[lhsFormat] = lhs;

      const rhsFormat = `${x + idx},${y + 1}`;
      const rhs = answers[rhsFormat] ?? possibleRoutes(x + idx, y + 1);
      answers[rhsFormat] = rhs;

      return lhs + rhs;
    }
  }

  return 1;
};

console.log(`Part 2: ${possibleRoutes(0, init)}`);
