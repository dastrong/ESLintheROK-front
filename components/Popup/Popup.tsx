import React, { cloneElement, CSSProperties } from 'react';
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
  hideArrow,
  placement = 'bottom',
  addStyles = {},
  ...popupConfig
}: Content & {
  tooltipContainerCx?: string;
  tooltipArrowCx?: string;
  owner: JSX.Element;
  hideTooltip?: boolean;
  hideArrow?: boolean;
  addStyles?: CSSProperties;
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
  const containerProps = getTooltipProps({
    className: containerCX,
    style: addStyles,
  });
  const finalPlacement = containerProps['data-popper-placement'];

  const arrowCX = classNames(
    'tooltip-arrow',
    tooltipArrowCx,
    Styles.ArrowCSS.className,
    { [Styles.ArrowBottomCSS.className]: finalPlacement === 'bottom' },
    { [Styles.ArrowTopCSS.className]: finalPlacement === 'top' },
    { [Styles.ArrowRightCSS.className]: finalPlacement === 'right' },
    { [Styles.ArrowLeftCSS.className]: finalPlacement === 'left' },
    { [Styles.ArrowHideCSS.className]: hideArrow }
  );

  return (
    <>
      {cloneElement(owner, { ref: setTriggerRef })}

      {!hideTooltip && visible && (
        <div ref={setTooltipRef} {...containerProps}>
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
      {Styles.ArrowHideCSS.styles}
    </>
  );
}
