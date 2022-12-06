import { createReadStream } from "fs";
import { split, mapSync } from "event-stream";

/*
  Read file line by line
*/
export const readFile = ({
  filePath,
  onLine,
  onError,
  onEnd,
}: {
  filePath: string;
  onLine: (line: string) => void;
  onError?: (err: string) => void;
  onEnd?: () => void;
}) => {
  var s = createReadStream(filePath)
    .pipe(split())
    .pipe(
      mapSync(function (line: string) {
        //pause the readstream
        s.pause();
        onLine(line);
        s.resume();
      })
        .on("error", function (err: any) {
          if (onError) onError(err);
        })
        .on("end", function () {
          if (onEnd) onEnd();
        })
    );
};


