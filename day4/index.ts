import FillBuffer from "../shared/buffer";
import { readFile } from "../shared/utils";

(async function () {
  let numCompletelyOverlapping = 0;
  let numPartialOverlapping = 0;

  const overlaps = (range1: string, range2: string) => {
    const [range1left, range1Right] = range1.split('-').map(r => parseInt(r, 10));
    const [range2left, range2Right] = range2.split('-').map(r => parseInt(r, 10));
    if (range1left <= range2left && range1Right >= range2Right) {
      return 'complete';
    } else if (range2left <= range1left && range2Right >= range1Right) {
      return 'complete';

    } else if ((range1left >= range2left && range1left <= range2Right) || (range1Right >= range2left && range1Right <= range2Right)) {
      return 'partial';
    } else if ((range2left >= range1left && range2left <= range1Right) || (range2Right >= range1left && range2Right <= range1Right)) {
      return 'partial'
    }
    return false;
  }

  const handleLine = (line: string) => {
    if (line !== "") {
      const [range1, range2] = line.split(',');
      const overlap = overlaps(range1, range2);
      numCompletelyOverlapping += overlap === 'complete' ? 1 : 0;
      console.log(`${line} ${overlap}`)
      numPartialOverlapping += (overlap === 'partial' || overlap === 'complete') ? 1 : 0;
    }
  }

  readFile({
    filePath: "day4/input.txt",
    onLine: (line) => {
      handleLine(line);
    },
    onEnd: () => {
      handleLine("");
      console.log("Day 4 Answer 1: ", numCompletelyOverlapping);
      console.log("Day 4 Answer 2: ", numPartialOverlapping);
    },
  });
})();
