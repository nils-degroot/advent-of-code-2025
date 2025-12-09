const coords = Deno.readTextFileSync(Deno.args[0]).trim().split("\n").map((
  line,
) => line.split(",").map((num) => Number.parseInt(num)));

const box = (l: number[], r: number[]) => ({
  xmin: Math.min(l[0], r[0]),
  xmax: Math.max(l[0], r[0]),
  ymin: Math.min(l[1], r[1]),
  ymax: Math.max(l[1], r[1]),
});

const area = (l: number[], r: number[]) =>
  (Math.abs(l[0] - r[0]) + 1) *
  (Math.abs(l[1] - r[1]) + 1);

const p1 = () => {
  const out = [];

  for (let i = 0; i < coords.length; i++) {
    for (let j = i; j < coords.length; j++) {
      if (i === j) {
        continue;
      }

      out.push(area(coords[i], coords[j]));
    }
  }

  return Math.max(...out);
};

console.log(`Part 1: ${p1()}`);

const p2 = () => {
  const rects = [];

  for (let i = 0; i < coords.length; i++) {
    for (let j = i; j < coords.length; j++) {
      if (i === j) {
        continue;
      }

      rects.push({
        l: coords[i],
        r: coords[j],
        area: area(coords[i], coords[j]),
      });
    }
  }

  coords.push(coords[0]);
  let result = 0;

  for (const rect of rects) {
    const b = box(rect.l, rect.r);

    if (rect.area <= result) {
      continue;
    }

    let valid = true;

    for (let i = 1; i < coords.length; i++) {
      const l = box(coords[i - 1], coords[i]);

      if (
        l.xmin === l.xmax && (l.xmin > b.xmin && l.xmax < b.xmax) &&
        !(l.ymax <= b.ymin || l.ymin >= b.ymax)
      ) {
        valid = false;
        break;
      }

      if (
        l.ymin === l.ymax && (l.ymin > b.ymin && l.ymax < b.ymax) &&
        !(l.xmax <= b.xmin || l.xmin >= b.xmax)
      ) {
        valid = false;
        break;
      }
    }

    if (valid) {
      result = rect.area;
    }
  }

  return result;
};

console.log(`Part 2: ${p2()}`);
