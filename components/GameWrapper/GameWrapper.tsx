import React, { useState } from 'react';
import { FaKeyboard } from 'react-icons/fa';

import SeoWrapper from 'components/SeoWrapper';
import FontLoader from 'components/FontLoader';
import Button from 'components/Button';
import Popup from 'components/Popup';
import { GameSEOProps, GameKeyCut } from 'games/types';
import * as Styles from './GameWrapper.styles';

type GameProps = GameSEOProps & { keyCuts: GameKeyCut[] };
type Props = GameProps & { children: React.ReactNode };

export default function GameWrapper({
  children,
  title,
  description,
  keyCuts,
}: Props) {
  const [showTips, setShowTips] = useState(false);

  return (
    <SeoWrapper title={title} description={description}>
      <FontLoader />
      <Popup
        interactive
        visible={showTips}
        onVisibleChange={state => setShowTips(state)}
        trigger="click"
        placement="top"
        owner={
          <Button
            rounded
            size="xl"
            color="white"
            bgColor="limegreen"
            Icon={FaKeyboard}
            className={Styles.ButtonCSS.className}
            style={showTips ? { opacity: 1 } : {}}
          />
        }
      >
        <div className={Styles.TipsContainer.className}>
          <h3 className={Styles.TipsHeader.className}>
            {title}
            <br />
            Hot Keys/Shortcuts
          </h3>
          <ul className={Styles.TipsListContainer.className}>
            {keyCuts.map(({ key, description }) => (
              <li key={description} className={Styles.TipsListItem.className}>
                <span style={{ fontWeight: 'bold' }}>{key.join('/')}</span>
                <br />
                {description}
              </li>
            ))}
          </ul>
        </div>
      </Popup>

      {children}

      {Styles.ButtonCSS.styles}
      {Styles.TipsContainer.styles}
      {Styles.TipsHeader.styles}
      {Styles.TipsListContainer.styles}
      {Styles.TipsListItem.styles}
    </SeoWrapper>
  );
}
