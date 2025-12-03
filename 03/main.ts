const doTheThing = (batteryBankSize: number) =>
  Deno.readTextFileSync(Deno.args[0]).trim().split("\n").map(
    (line) => {
      let chars = line.split("").map((number) => Number.parseInt(number));
      const numbers: number[] = [];

      while (numbers.length < batteryBankSize) {
        const next = Math.max(
          ...chars.slice(
            0,
            chars.length - batteryBankSize + numbers.length + 1,
          ),
        );

        numbers.push(next);
        chars = chars.slice(chars.indexOf(next) + 1);
      }

      return Number.parseInt(numbers.map((n) => n.toString()).join(""));
    },
  ).reduce((acc, v) => acc + v, 0);

console.log(`Part 1: ${doTheThing(2)}`);
console.log(`Part 2: ${doTheThing(12)}`);
