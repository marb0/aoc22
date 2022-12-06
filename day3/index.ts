import FillBuffer from "../shared/buffer";
import { readFile } from "../shared/utils";

(async function () {
  let sum = 0;
  let badgeSum = 0;

  const getCompartments = (rucksack: string) => {
    const middle = rucksack.length / 2;
    return [new Set(rucksack.substring(0, middle)), new Set(rucksack.substring(middle, rucksack.length))]
  }
  const intersect = (c1: Set<string>, c2: Set<string>) => {
    return new Set([...c1].filter(i => c2.has(i)));
  }

  const getPriority = (char: string) => {
    if (char == char.toLowerCase()) {
      return char.charCodeAt(0) - 96;
    } else {
      return char.charCodeAt(0) - 38;
    }
  };

  const buffer = new FillBuffer(3, (lines : string[]) => {
    const badgeSet = intersect(intersect(new Set(lines[0]), new Set(lines[1])), new Set(lines[2]));
    const badge = [...badgeSet][0];
    const priority = getPriority(badge);
    badgeSum += priority;
  });

  const handleLine = (line: string) => {
    if (line !== "") {
      buffer.add(line);

      const [c1, c2] = getCompartments(line);
      const common = [...intersect(c1, c2)][0];
      const priority = getPriority(common);
      //console.log(`${common} ${priority}`);
      sum += priority;
    }
  }

  readFile({
    filePath: "day3/input.txt",
    onLine: (line) => {
      handleLine(line);
    },
    onEnd: () => {
      handleLine("");
      console.log("Day 3 Answer 1: ", sum);
      console.log("Day 3 Answer 2: ", badgeSum);
    },
  });
})();
