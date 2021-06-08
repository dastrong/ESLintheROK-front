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

type RoundedProps = {
  text?: never;
  rounded: Rounded;
  Icon: Icon;
};

type TextProps = {
  text: Text;
  rounded?: never;
  Icon?: never;
};

type TextWithIconProps = {
  text: Text;
  rounded?: never;
  Icon: Icon;
};

export type Props = (RoundedProps | TextProps | TextWithIconProps) & {
  as?: As;
  color: Color;
  bgColor: BgColor;
  size?: Size;
  spinner?: Spinner;
  className?: string;
};
