import React, { useMemo, useState } from 'react';
import { shuffle } from 'lodash';
import { animated, useSprings, to, useSpring } from 'react-spring';
import { arrOfRandoNum, getRandoNum } from 'games/_utils';

export default function SpeedSolverLetters({
  showLetters,
  gameData,
  level,
  isVocab,
  cx,
}: {
  showLetters: boolean;
  gameData: string[];
  level: number;
  isVocab: boolean;
  cx: string;
}) {
  const [isReverse, setReverse] = useState(false);

  const toggleReverse = () => setReverse(state => !state);

  const [durations, largestDur, styles] = useMemo(() => {
    const [durations, largestDur] = __getDurations(level, gameData.length);
    const styles = __getStyles(gameData, level, isVocab);
    return [durations, largestDur, styles];
  }, [gameData, level, isVocab]);

  const containerStyles = useSpring({
    opacity: showLetters ? 1 : 0,
    immediate: true,
  });

  const letterSprings = useSprings(
    gameData.length,
    durations.map(dur => ({
      from: { x: 0 },
      x: 1,
      reverse: isReverse,
      reset: true,
      onRest: dur === largestDur ? toggleReverse : null,
      config: { duration: dur },
    }))
  );

  return (
    <animated.div style={containerStyles}>
      {letterSprings.map((spring, i) => {
        const text = gameData[i];
        const { x, y, r } = styles[i];
        return (
          <animated.div
            key={i + text}
            children={text}
            className={cx}
            style={{
              transform: to(
                [spring.x.to(x), spring.x.to(y), spring.x.to(r)],
                (x, y, r) => `translate(${x}px, ${y}px) rotate(${r}deg)`
              ),
            }}
          />
        );
      })}
    </animated.div>
  );
}

function __getDurations(level: number, count: number): [number[], number] {
  const maxDur = (11 - level) * 1000;
  const minDur = maxDur * 0.85;

  const durations = arrOfRandoNum(maxDur, minDur, count);
  const largestDur = Math.max(...durations);

  return [durations, largestDur];
}

function __getSideValues(isVocab: boolean) {
  const { innerHeight, innerWidth } =
    typeof window !== 'undefined'
      ? window
      : { innerHeight: 1000, innerWidth: 1000 };
  const height = 20; // 20vh
  const divHeight = (height / 100) * innerHeight;
  const multiplier = isVocab ? 1 : 3;
  const left = -(divHeight * multiplier);

  return {
    top: -divHeight,
    right: innerWidth,
    bottom: innerHeight,
    left,
  };
}

function __getBoolean() {
  return getRandoNum(100, 1) > 50;
}

function __getRotation(level: number) {
  const range = [0, 1];

  const minLevel = 6;
  if (level < minLevel) return { range, output: [0, 0] };

  const maxLevel = 10;
  const rotationDeg = 360;
  const maxNumOfRotations = 1.8;
  const denominator = maxLevel - minLevel;

  // higher levels; more rotation potential
  const lvlDiff = (maxLevel - level) / denominator;
  const currentLvlNumOfRotation = Math.abs(maxNumOfRotations - lvlDiff);
  const currentLvlRotationDeg = currentLvlNumOfRotation * rotationDeg;
  const rotate = getRandoNum(currentLvlRotationDeg);
  const rotation = [0, rotate];

  // highest levels can start rotated
  if (level < 9) {
    return { range, output: rotation };
  } else {
    return { range, output: shuffle(rotation) };
  }
}

function __getIncrementer(
  numerator: number,
  arrayLength: number,
  decimalAmt = 3
) {
  return Number((numerator / arrayLength).toFixed(decimalAmt));
}

function __makeWavy(level: number, targetArr: number[]) {
  // only levels 3 and higher get waves added
  if (level < 3) return { range: [0, 1], output: targetArr };

  const multiplier = 3;
  const arrayLength = level * multiplier;
  const emptyArray = Array.from(Array(arrayLength + 1));

  const levelSq = level * level;
  const waveHeight = getRandoNum(levelSq * 1.1, levelSq * 0.2);

  const diffInTargetArr = Math.abs(targetArr[0] - targetArr[1]);
  const min = Math.min(...targetArr);

  const outputIncrementer = __getIncrementer(diffInTargetArr, arrayLength);
  const output = emptyArray.map((_, i) => {
    const base = min + i * outputIncrementer;
    return i % 2 ? base : base + (__getBoolean() ? waveHeight : -waveHeight);
  });

  const rangeIncremeter = __getIncrementer(1, arrayLength);
  const range = emptyArray.map((_, i, arr) => {
    if (arr.length - 1 === i) return 1;
    return i * rangeIncremeter;
  });

  return { range, output };
}

function __getXandY(max: number, start: number, end: number, level: number) {
  // normal = left=>right and up=>down; false = the reverse of either
  const isNormalDirection = __getBoolean();

  const tempOutput = arrOfRandoNum(max, 0, 2);
  const { range, output } = __makeWavy(level, tempOutput);

  const range1 = range;
  const output1 = output;

  const range2 = [0, 1];
  const output2 = isNormalDirection ? [start, end] : [end, start];

  return [
    { range: range1, output: output1 },
    { range: range2, output: output2 },
  ];
}

function __getStyles(gameData: string[], level: number, isVocab: boolean) {
  const { top, right, bottom, left } = __getSideValues(isVocab);

  return gameData.map((_, i) => {
    // toggles back and forth so each axis gets equal lovin'
    const isXAxis = i % 2;

    // x and y styles
    let x, y;
    if (isXAxis) {
      [y, x] = __getXandY(top + bottom, left, right, level);
    } else {
      [x, y] = __getXandY(left + right, top, bottom, level);
    }

    // r styles
    const r = __getRotation(level);

    return {
      x: { range: x.range, output: x.output },
      y: { range: y.range, output: y.output },
      r: { range: r.range, output: r.output },
    };
  });
}
