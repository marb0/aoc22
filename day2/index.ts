import { readFile } from "../shared/utils";

(async function () {
  let totalScore = 0;
  let totalScoreDesired = 0;

  const scoreMap = {
    'X': 1, // Rock
    'Y': 2, // Paper
    'Z': 3, // Scissors
    'win': 6,
    'loss': 0,
    'draw': 3
  };

  const getOutcome = (opponent: 'A' | 'B' | 'C', mine: 'X' | 'Y' | 'Z') => {
    if (opponent === 'A') {
      if (mine === 'X'){
        return 'draw';
      } else if (mine === 'Y') {
        return 'win';
      } else {
        return 'loss'
      }
    } else if (opponent === 'B') {
      if (mine === 'X'){
        return 'loss';
      } else if (mine === 'Y') {
        return 'draw';
      } else {
        return 'win'
      }
    } else {
      if (mine === 'X'){
        return 'win';
      } else if (mine === 'Y') {
        return 'loss';
      } else {
        return 'draw'
      }
    }
  }

  const getMoveByDesiredOutcome = (opponent: 'A' | 'B' | 'C', outcome: 'X' | 'Y' | 'Z') => {
    if (opponent === 'A') { // opponent chooses rock
      if (outcome === 'X') // lose, needs scissor
        return 'Z';
      else if (outcome === 'Y') // draw, needs rock
        return 'X';
      else //win, need paper
        return 'Y';
    } else if (opponent === 'B') { // opponent chooses paper
      if (outcome === 'X') // lose, needs rock
        return 'X';
      else if (outcome === 'Y') // draw, needs paper
        return 'Y';
      else //win, need scissor
        return 'Z';
    } else { // opponent chooses scissor
      if (outcome === 'X') // lose, needs paper
        return 'Y';
      else if (outcome === 'Y') // draw, needs scissor
        return 'Z';
      else //win, need rock
        return 'X';
    }
  }

  const scoreRound = (opponent: 'A' | 'B' | 'C', mine: 'X' | 'Y' | 'Z') => {
    //console.log(`${opponent} ${mine} ${scoreMap[mine]} ${scoreMap[getOutcome(opponent, mine)]} ${getOutcome(opponent, mine)}`)
    return scoreMap[mine] + scoreMap[getOutcome(opponent, mine)];
  };

  const handleLine = (line: string) => {
    if (line !== "") {
      const [opponent, mine] = line.split(' ');
      const myDesiredMove = getMoveByDesiredOutcome(opponent as 'A' | 'B' | 'C', mine as 'X' | 'Y' | 'Z');
      totalScore = totalScore + scoreRound(opponent as 'A' | 'B' | 'C', mine as 'X' | 'Y' | 'Z');
      totalScoreDesired = totalScoreDesired + scoreRound(opponent as 'A' | 'B' | 'C', myDesiredMove);
    }
  }

  readFile({
    filePath: "day2/input.txt",
    onLine: (line) => {
      handleLine(line);
    },
    onEnd: () => {
      handleLine("");
      console.log("Day 1 Answer: ", totalScore);
      console.log("Day 2 Answer: ", totalScoreDesired);

    },
  });
})();
