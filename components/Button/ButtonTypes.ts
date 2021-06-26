import { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import { IconType } from 'react-icons/lib';

export type ButtonEl = ButtonHTMLAttributes<HTMLButtonElement>;
export type AnchorEl = AnchorHTMLAttributes<HTMLAnchorElement>;

type As = 'button' | 'a';
type BgColor = string;
type Color = string;
type Icon = IconType;
type Rounded = boolean;
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type Spinner = boolean;
type Text = string;
type Full = boolean;

type IconOnlyRoundedProps = {
  text?: never;
  rounded: Rounded;
  Icon: Icon;
};

type TextOnlyProps = {
  text: Text;
  rounded?: Rounded;
  Icon?: never;
};

type IconTextProps = {
  text?: Text;
  rounded?: Rounded;
  Icon?: Icon;
};

export type Props = (IconOnlyRoundedProps | TextOnlyProps | IconTextProps) & {
  as?: As;
  color: Color;
  bgColor: BgColor;
  size?: Size;
  spinner?: Spinner;
  className?: string;
  full?: Full;
};
