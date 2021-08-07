import React, { CSSProperties } from 'react';
import { FaPlus } from 'react-icons/fa';
import { mix } from 'color2k';
import * as Styles from './Block.styles';

type Props = {
  isStatic?: boolean;
  isOpen?: boolean;
  id: number;
  header: string;
  content: JSX.Element;
  color: string;
  handleClick?: (id: string) => void;
};

export default function Block({
  isStatic = false,
  isOpen,
  id,
  header,
  content,
  color: accentColor,
  handleClick,
}: Props) {
  // the background color is a lighter shade of the color given
  const bgColor = mix(accentColor, 'white', 0.85);
  const shadeColor = mix(accentColor, 'white', 0.55);

  const onClick = (e: any) => {
    if (handleClick) handleClick((e.currentTarget as any).id);
  };

  return (
    <div
      className={Styles.BlockCSS.className}
      style={
        {
          '--accentColor': accentColor,
          '--bgColor': bgColor,
          '--shadeColor': shadeColor,
        } as CSSProperties
      }
    >
      <div
        className={Styles.BlockHeaderCSS.className}
        style={{ opacity: isOpen || isStatic ? 1 : 0.75 }}
        id={String(id)}
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyPress={onClick}
      >
        {!isStatic && (
          <FaPlus
            className={Styles.BlockHeaderIconCSS.className}
            style={{ transform: `rotate(${isOpen ? 45 : 0}deg)` }}
          />
        )}
        <h3 className={Styles.BlockHeaderTitleCSS.className}>{header}</h3>
      </div>

      {(isOpen || isStatic) && (
        <div className={Styles.BlockContentCSS.className}>{content}</div>
      )}

      {Styles.BlockCSS.styles}
      {Styles.BlockHeaderCSS.styles}
      {Styles.BlockHeaderIconCSS.styles}
      {Styles.BlockHeaderTitleCSS.styles}
      {Styles.BlockContentCSS.styles}
    </div>
  );
}
