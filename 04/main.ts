const neighborMatrix = [
  { x: -1, y: -1 },
  { x: -1, y: 0 },
  { x: -1, y: 1 },
  { x: 0, y: -1 },
  { x: 0, y: 1 },
  { x: 1, y: -1 },
  { x: 1, y: 0 },
  { x: 1, y: 1 },
];

// Pad out input to avoid boundaries
let input = Deno.readTextFileSync(Deno.args[0]).trim().split("\n").map(
  (line) => [
    ".",
    ...line.split(""),
    ".",
  ],
);

input = [
  [...Array(input[0].length).keys().map((_v) => ".")],
  ...input,
  [...Array(input[0].length).keys().map((_v) => ".")],
];

const papers = input.map((line, x) =>
  line.map((char, y) => ({ char, x, y })).filter(({ char }) => char === "@")
).flat();

const part1 = papers.filter(({ x, y }) =>
  neighborMatrix.filter((entry) => input[x + entry.x][y + entry.y] === "@")
    .length < 4
);

console.log(`Part 1: ${part1.length}`);

let totalRemoved = 0;

while (true) {
  const papers = input.map((line, x) =>
    line.map((char, y) => ({ char, x, y })).filter(({ char }) => char === "@")
  ).flat();

  const removable = papers.filter(({ x, y }) =>
    neighborMatrix.filter((entry) => input[x + entry.x][y + entry.y] === "@")
      .length < 4
  );

  if (removable.length === 0) {
    break;
  }

  totalRemoved += removable.length;
  removable.forEach(({ x, y }) => input[x][y] = ".");
}

console.log(`Part 2: ${totalRemoved}`);
