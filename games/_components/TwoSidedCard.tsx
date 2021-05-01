/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { forwardRef } from 'react';
import FitText from 'components/FitText';
import classNames from 'classnames';

type TwoSidedCardProps = {
  textFront: string;
  textBack: any;
  colorFront: string;
  colorBack: string;
  handleClick: (e: any) => void;
  width: string;
  height?: string;
  id: any;
  flipY?: boolean;
  flipX?: boolean;
  slideOut?: boolean;
  cardClass?: string;
  fitTextClass?: string;
};

const TwoSidedCard = forwardRef<HTMLSpanElement, TwoSidedCardProps>(
  (
    {
      textFront,
      textBack,
      colorFront,
      colorBack,
      handleClick,
      width,
      height,
      id,
      flipX,
      flipY,
      slideOut,
      cardClass,
      fitTextClass,
    },
    ref
  ) => {
    const cx = classNames('two-sided-card', {
      [cardClass]: flipX || flipY || slideOut,
    });

    return (
      <div className={cx} id={id} onClick={handleClick}>
        {/* FRONT SIDE */}
        <div className="two-sided-card_front">
          <FitText ref={ref} text={textFront} cx={fitTextClass} />
        </div>

        {/* BACK SIDE */}
        <div className="two-sided-card_back">{textBack}</div>

        <style jsx>{`
          div {
            font-size: 8vw;
            color: #fff;
            text-shadow: 2px 2px 1px black;
            transform-style: preserve-3d;
            height: 100%;
            width: 100%;
            user-select: none;
            display: inline-block;
            position: relative;
          }

          .two-sided-card {
            width: ${width};
            height: ${height};
            flex: ${slideOut === undefined ? '' : slideOut ? 0 : 1};
            transform: rotateX(${flipX && '180deg'});
            transform: rotateY(${flipY && '180deg'});
          }

          .two-sided-card_front,
          .two-sided-card_back {
            overflow: hidden;
            backface-visibility: hidden;
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .two-sided-card_front {
            background-color: ${colorFront};
            cursor: pointer;
          }

          .two-sided-card_back {
            background-color: ${colorBack};
            cursor: default;
            transform: rotateY(180deg);
          }
        `}</style>
      </div>
    );
  }
);

export default TwoSidedCard;
