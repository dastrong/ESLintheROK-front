import React from 'react';
import css from 'styled-jsx/css';

import { useStore } from 'contexts/store';
import SeoWrapper from 'components/SeoWrapper';
import Button from 'components/Button';
import WellDoneSVG from 'components/Svgs/well_done.svg';

const SvgCSS = css.resolve`
  svg {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 50%;
    max-height: 60%;
    z-index: 1;
  }
`;

export default function IndexPage() {
  const { storeDispatch } = useStore();

  return (
    <SeoWrapper title="The Ultimate Teaching Aide">
      <div className="mainpage-container">
        <div className="content_container">
          <h1>ESL in the ROK</h1>
          <p>
            Say “<span>Hello</span>” to your new best friend and{' '}
            <span>boost</span> your teaching toolkit <span>instantly</span>.
          </p>

          <Button
            size="lg"
            color="white"
            bgColor="#6C63FF"
            text="Available Lessons"
            onClick={() =>
              storeDispatch({
                type: 'Open_Data_Modal',
                dataModalName: 'lessons',
              })
            }
          />
          <Button
            inverted
            size="lg"
            color="white"
            bgColor="#FF6584"
            text="Create Lesson"
            style={{ marginLeft: '1rem' }}
            onClick={() =>
              storeDispatch({
                type: 'Open_Data_Modal',
                dataModalName: 'custom',
              })
            }
          />
        </div>

        <WellDoneSVG className={SvgCSS.className} />

        {SvgCSS.styles}
        <style jsx>{`
          .mainpage-container {
            position: relative;
            min-height: calc(100vh - var(--navHeight) - 2rem);
            margin-bottom: 167px;
          }

          .content_container {
            position: absolute;
            top: 5vh;
            left: 10%;
            width: 50%;
          }

          h1 {
            margin: 0 0 1rem;
            font-size: min(8vw, 7rem);
            color: #2c2c2c;
          }

          p {
            margin: 0 0 2rem;
            font-size: min(4vw, 3.5rem);
            line-height: 130%;
            color: #565656;
          }

          span:nth-of-type(1) {
            color: #6c63ff;
          }

          span:nth-of-type(2) {
            color: #ff6584;
          }

          span:nth-of-type(3) {
            text-decoration: underline;
          }
        `}</style>
      </div>
    </SeoWrapper>
  );
}
