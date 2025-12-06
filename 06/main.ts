const raw = Deno.readTextFileSync(Deno.args[0]).trim().split("\n");

const input = raw.map((
  line,
) => line.trim().split(" ").filter((part) => part.trim()));

const transposed = input[0].map((_, idx) => input.map((line) => line[idx]));

const p1 = () =>
  transposed.map(
    (values) =>
      eval(
        values.slice(0, values.length - 1).join(
          values[values.length - 1],
        ),
      ),
  ).reduce((acc, v) => acc + v, 0);

console.log(`Part 1: ${p1()}`);

const p2 = () => {
  // Figure out in how large chunks need to be
  const chunkSizes = transposed.map((nums) =>
    Math.max(...nums.slice(0, nums.length - 1).map((num) => num.length))
  );

  // Read the input by chunks
  const parsed = raw.map((line) => {
    const parts = [];
    let taken = 0;

    for (const toTake of chunkSizes) {
      parts.push(line.slice(taken, taken + toTake));
      taken += toTake + 1;
    }

    return parts;
  });

  return parsed[0].map((_, idx) => parsed.map((line) => line[idx])).map(
    (parts) => {
      const nums = parts.slice(0, parts.length - 1);

      // Transpose numbers
      const t = nums[0].split("").map((_, idx) =>
        nums.map((n) => n[idx]).join("")
      ).join(parts[parts.length - 1]);

      return eval(t);
    },
  ).reduce((acc, v) => acc + v, 0);
};

console.log(`Part 2: ${p2()}`);
