// this component is lightly edited for this project from here: https://github.com/dvtng/react-loading-skeleton
// my reasoning was that it's a simple implementation and I didn't want to unnecessarily load emotion into this project
import React, { CSSProperties, FunctionComponent } from 'react';
import css from 'styled-jsx/css';

const SkeletonCSS = css.resolve`
  span {
    background-color: var(--baseColor);
    background-image: linear-gradient(
      90deg,
      var(--baseColor),
      var(--highlightColor),
      var(--baseColor)
    );
    background-size: 200px 100%;
    background-repeat: no-repeat;
    border-radius: var(--borderRadius);
    display: inline-block;
    line-height: inherit;
    width: 100%;
    animation: skelKeyFrame 1200ms ease-in-out infinite;
  }

  @keyframes skelKeyFrame {
    0% {
      background-position: -200px 0;
    }
    100% {
      background-position: calc(200px + 100%) 0;
    }
  }
`;

type Props = {
  count?: number;
  wrapper?: FunctionComponent;
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
  circle?: boolean;
  rounded?: boolean;
  addStyle?: CSSProperties;
  baseColor?: string;
  highlightColor?: string;
};

export default function Skeleton({
  count,
  width,
  height,
  wrapper: Wrapper,
  borderRadius,
  circle,
  rounded,
  addStyle,
  baseColor,
  highlightColor,
}: Props) {
  const elements: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  >[] = [];

  for (let i = 0; i < count; i++) {
    const style: CSSProperties = {};

    if (width !== null) {
      style.width = width;
    }

    if (height !== null) {
      style.height = height;
    }

    if (width !== null && height !== null && circle) {
      style.borderRadius = '50%';
    }

    if (rounded) {
      style.borderRadius = '1111px';
    }

    elements.push(
      <span
        key={i}
        className={SkeletonCSS.className}
        style={{
          ...addStyle,
          ...style,
        }}
      >
        &zwnj;
      </span>
    );
  }

  return (
    <span>
      {Wrapper
        ? elements.map((element, i) => (
            <Wrapper key={i}>
              {element}
              &zwnj;
            </Wrapper>
          ))
        : elements}

      {SkeletonCSS.styles}
      <style jsx>{`
        span {
          --baseColor: ${baseColor};
          --highlightColor: ${highlightColor};
          --borderRadius: ${borderRadius};
        }
      `}</style>
    </span>
  );
}

Skeleton.defaultProps = {
  count: 1,
  width: null,
  height: null,
  wrapper: null,
  circle: false,
  rounded: false,
  borderRadius: '4px',
  addStyle: {},
  baseColor: '#eee',
  highlightColor: '#f5f5f5',
};
