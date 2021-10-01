import React, { useState } from 'react';
import { FaKeyboard } from 'react-icons/fa';

import Button from 'components/Button';
import Popup from 'components/Popup';
import { GameKeyCut } from 'games/types';
import * as Styles from './GameWrapper.styles';

type Props = {
  title: string;
  keyCuts: GameKeyCut[];
};

export default function GameWrapperTips({ title, keyCuts }: Props) {
  const [showTips, setShowTips] = useState(false);

  return (
    <>
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

      {Styles.ButtonCSS.styles}
      {Styles.TipsContainer.styles}
      {Styles.TipsHeader.styles}
      {Styles.TipsListContainer.styles}
      {Styles.TipsListItem.styles}
    </>
  );
}
