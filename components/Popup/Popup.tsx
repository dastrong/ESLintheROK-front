import React, { cloneElement } from 'react';
import classNames from 'classnames';
import { usePopperTooltip, Config } from 'react-popper-tooltip';
import * as Styles from './Popup.styles';

type Content =
  | {
      content?: never;
      children: React.ReactNode;
    }
  | {
      content: string;
      children?: never;
    };

export default function Popup({
  children,
  content,
  tooltipContainerCx,
  tooltipArrowCx,
  owner,
  hideTooltip,
  placement = 'bottom',
  ...popupConfig
}: Content & {
  tooltipContainerCx?: string;
  tooltipArrowCx?: string;
  owner: JSX.Element;
  hideTooltip?: boolean;
} & Config) {
  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip({ ...popupConfig, placement });

  // determine and create the correct classNames
  const containerCX = classNames(
    'tooltip-container',
    tooltipContainerCx,
    Styles.ContainerCSS.className
  );
  const arrowCX = classNames(
    'tooltip-arrow',
    tooltipArrowCx,
    Styles.ArrowCSS.className,
    { [Styles.ArrowBottomCSS.className]: placement?.includes('bottom') },
    { [Styles.ArrowTopCSS.className]: placement?.includes('top') },
    { [Styles.ArrowRightCSS.className]: placement?.includes('right') },
    { [Styles.ArrowLeftCSS.className]: placement?.includes('left') }
  );

  return (
    <>
      {cloneElement(owner, { ref: setTriggerRef })}

      {!hideTooltip && visible && (
        <div
          ref={setTooltipRef}
          {...getTooltipProps({ className: containerCX })}
        >
          <div {...getArrowProps({ className: arrowCX })} />
          {content || children}
        </div>
      )}

      {Styles.ContainerCSS.styles}
      {Styles.ArrowCSS.styles}
      {Styles.ArrowTopCSS.styles}
      {Styles.ArrowBottomCSS.styles}
      {Styles.ArrowRightCSS.styles}
      {Styles.ArrowLeftCSS.styles}
    </>
  );
}
