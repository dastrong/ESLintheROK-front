import { useState, useEffect } from "react";

export default function useProgress(isAPI, vocabulary, expressions, chapter, title) {
  const [{ percent, color }, setState] = useState({ percent: 0, color: "red" });

  useEffect(() => {
    function getPercent() {
      const max = isAPI ? 25 : 50;
      const v = (vocabulary.length / 9) * max;
      const e = (expressions.length / 6) * max;
      return Math.min(v, max) + Math.min(e, max) + (chapter ? 25 : 0) + (title ? 25 : 0);
    }
    const percent = getPercent();
    const color = getColor(percent);
    setState({ percent, color });
  }, [isAPI, vocabulary, expressions, chapter, title]);

  function getColor(percent) {
    return percent < 20
      ? "red"
      : percent < 40
      ? "orange"
      : percent < 60
      ? "yellow"
      : percent < 80
      ? "teal"
      : percent < 100
      ? "blue"
      : "green";
  }

  return { percent, color };
}
