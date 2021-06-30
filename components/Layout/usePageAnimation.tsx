import React from 'react';
import { useTransition } from 'react-spring';

// const fadeInOut = {
//   from: {
//     opacity: 0,
//   } as any,
//   enter: {
//     opacity: 1,
//   } as any,
//   leave: {
//     position: 'absolute',
//     opacity: 0,
//     top: 0,
//     left: 0,
//   } as any,
//   config: {
//     duration: 25000,
//   },
// };

export default function usePageAnimation(
  child: React.ReactNode,
  isNavVisible: boolean
) {
  return useTransition(child, {
    from: {
      opacity: 0,
      // marginTop: `${isNavVisible ? 86 : 0}px`,
    } as any,
    enter: {
      opacity: 1,
      // marginTop: `${isNavVisible ? 86 : 0}px`,
    } as any,
    leave: {
      position: 'absolute',
      opacity: 0,
      top: 0,
      left: 0,
    } as any,
    config: {
      duration: 125,
    },
  });
}

// ============================== //
// ===== CURRENT ANIMATIONS ===== //
// ============================== //

// USING BACK AND FORWARD BUTTONS
// up to down

// FROM SIDEBAR
// right to left

// FROM HOME/RANDOM LINKS
// down to up

// FROM GAME PAGE to INSTRUCTIONS (student)
// right to left

// FROM GAME PAGE to INSTRUCTIONS (teacher)
// left to right

// FROM INSTRUCTIONS (student) to GAME PAGE
// left to right

// FROM INSTRUCTIONS (teacher) to GAME PAGE
// right to left

// TO PLAY GAME
// down to up

// const leftToRight = {
//   from: {
//     transform: 'translateX(-100%)',
//     opacity: 0,
//   } as any,
//   enter: {
//     transform: 'translateX(0%)',
//     opacity: 1,
//   } as any,
//   leave: {
//     transform: 'translateX(100%)',
//     position: 'absolute',
//     opacity: 0,
//   } as any,
//   config: {
//     duration: 1000,
//   },
// };
