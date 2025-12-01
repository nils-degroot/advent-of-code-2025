let position = 50;
let part1 = 0;
let part2 = 0;

Deno.readTextFileSync(Deno.args[0]).split("\n").filter((line) => line !== "")
  .forEach((line) => {
    const delta = Number.parseInt(
      `${line.startsWith("L") ? "-" : ""}${line.slice(1)}`,
    );

    part2 += Math.floor(Math.abs(delta) / 100);
    if (
      position === 0 || position + delta % 100 < 0 ||
      position + delta % 100 > 100
    ) {
      part2++;
    }

    position = (position + delta) % 100;
    while (position < 0) {
      position += 100;
    }

    if (position === 0) {
      part1++;
    }
  });

console.log(`Part 1: ${part1}`);
console.log(`Part 2: ${part2}`);
