const input = Deno.readTextFileSync(Deno.args[0]).trim();
const ids = input.split(",")
  .map((range) => range.split("-"))
  .flatMap(([head, tail]) => {
    const h = Number.parseInt(head);
    const t = Number.parseInt(tail);
    return [...Array(t - h + 1).keys().map((idx) => h + idx)];
  });

const part1 = ids
  .filter((value) => {
    const str = value.toString();
    return str.slice(0, str.length / 2) === str.slice(str.length / 2);
  })
  .reduce((lhs, rhs) => lhs + rhs, 0);

console.log(`Part 1: ${part1}`);

const part2 = ids
  .filter((id) => {
    const str = id.toString();

    for (let length = 1; length < str.length; length++) {
      // Check if the pattern can be repeated length times
      if (str.length % length !== 0) continue;

      const subs = [
        ...Array(str.length / length).keys().map((idx) =>
          str.slice(idx * length, idx * length + length)
        ),
      ];

      let valid = true;
      for (const entry of subs) {
        if (entry !== subs[0]) {
          valid = false;
          break;
        }
      }

      if (!valid) continue;
      return true;
    }

    return false;
  })
  .reduce((acc, id) => acc + id, 0);

console.log(`Part 2: ${part2}`);
