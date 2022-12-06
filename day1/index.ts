import { readFile } from "../shared/utils";

(async function () {
  const calories : number[] = [];
  let current = 0;

  const handleLine = (line: string) => {
    if (line === "") {
      // Next line new elf
      calories.push(current);
      current = 0;
    } else {
      current += parseInt(line, 10);
    }
  }

  readFile({
    filePath: "day1/input.txt",
    onLine: (line) => {
      handleLine(line);
    },
    onEnd: () => {
      handleLine("");
      calories.sort((a, b) => b - a);
      console.log("Day 1 Answer: ", calories[0]);
      console.log("Day 2 Answer: ", calories[0] + calories[1] + calories[2]);
    },
  });
})();
