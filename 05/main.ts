const input = Deno.readTextFileSync(Deno.args[0]).trim().split("\n\n");

const fresh = input[0].split("\n").map((line) => {
  const parts = line.split("-");
  const start = Number.parseInt(parts[0]);
  const end = Number.parseInt(parts[1]);

  return [start, end];
});

fresh.sort((lhs, rhs) => rhs[0] - lhs[0]);

console.log(`Part 1: ${
  input[1].split("\n").map((line) => Number.parseInt(line))
    .filter((id) => fresh.some(([start, end]) => id >= start && id <= end))
    .length
}`);

const bounds = [];
let check = fresh[0];

for (const [start, end] of fresh.slice(1)) {
  if (check[0] >= start && check[0] <= end) {
    check = [start, Math.max(end, check[1])];
  } else {
    bounds.push(check);
    check = [start, end];
  }
}

console.log(
  `Part 2: ${
    [...bounds, check].reduce((acc, [start, end]) => acc + (end - start) + 1, 0)
  }`,
);
