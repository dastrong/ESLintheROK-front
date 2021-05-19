import React, { cloneElement } from 'react';
import classNames from 'classnames';
import { usePopperTooltip, Config } from 'react-popper-tooltip';

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
  } = usePopperTooltip({ ...popupConfig });

  return (
    <>
      {cloneElement(owner, { ref: setTriggerRef })}

      {!hideTooltip && visible && (
        <div
          ref={setTooltipRef}
          className="tooltip-container"
          {...getTooltipProps({
            className: classNames('tooltip-container', {
              [tooltipContainerCx]: tooltipContainerCx,
            }),
          })}
        >
          <div
            className="tooltip-arrow"
            {...getArrowProps({
              className: classNames('tooltip-arrow', {
                [tooltipArrowCx]: tooltipArrowCx,
              }),
            })}
          />
          {content || children}
        </div>
      )}

      <style jsx>{`
        .tooltip-container {
          --tooltipBackground: #fff;
          --tooltipBorder: #d4d4d5;

          background-color: var(--tooltipBackground);
          border: 1px solid var(--tooltipBorder);
          display: flex;
          flex-direction: column;
          padding: 0.4rem;
          transition: opacity 0.3s;
          z-index: 9999;

          padding: 0.833em 1em;
          font-size: 0.9rem;
          font-weight: 400;
          font-style: normal;
          color: rgba(0, 0, 0, 0.87);
          border-radius: 0.3rem;
          box-shadow: 0 2px 4px 0 rgb(34 36 38 / 12%),
            0 2px 10px 0 rgb(34 36 38 / 15%);
        }

        .tooltip-container[data-popper-interactive='false'] {
          pointer-events: none;
        }

        .tooltip-arrow {
          height: 1rem;
          position: absolute;
          width: 1rem;
          pointer-events: none;
        }

        .tooltip-arrow::before {
          border-style: solid;
          content: '';
          display: block;
          height: 0;
          margin: auto;
          width: 0;
        }

        .tooltip-arrow::after {
          border-style: solid;
          content: '';
          display: block;
          height: 0;
          margin: auto;
          position: absolute;
          width: 0;
        }

        .tooltip-container[data-popper-placement*='bottom'] .tooltip-arrow {
          left: 0;
          margin-top: -0.4rem;
          top: 0;
        }

        .tooltip-container[data-popper-placement*='bottom']
          .tooltip-arrow::before {
          border-color: transparent transparent var(--tooltipBorder) transparent;
          border-width: 0 0.5rem 0.4rem 0.5rem;
          position: absolute;
          top: -1px;
        }

        .tooltip-container[data-popper-placement*='bottom']
          .tooltip-arrow::after {
          border-color: transparent transparent var(--tooltipBackground)
            transparent;
          border-width: 0 0.5rem 0.4rem 0.5rem;
        }

        .tooltip-container[data-popper-placement*='top'] .tooltip-arrow {
          bottom: 0;
          left: 0;
          margin-bottom: -1rem;
        }

        .tooltip-container[data-popper-placement*='top']
          .tooltip-arrow::before {
          border-color: var(--tooltipBorder) transparent transparent transparent;
          border-width: 0.4rem 0.5rem 0 0.5rem;
          position: absolute;
          top: 1px;
        }

        .tooltip-container[data-popper-placement*='top'] .tooltip-arrow::after {
          border-color: var(--tooltipBackground) transparent transparent
            transparent;
          border-width: 0.4rem 0.5rem 0 0.5rem;
        }

        .tooltip-container[data-popper-placement*='right'] .tooltip-arrow {
          left: 0;
          margin-left: -0.7rem;
        }

        .tooltip-container[data-popper-placement*='right']
          .tooltip-arrow::before {
          border-color: transparent var(--tooltipBorder) transparent transparent;
          border-width: 0.5rem 0.4rem 0.5rem 0;
        }

        .tooltip-container[data-popper-placement*='right']
          .tooltip-arrow::after {
          border-color: transparent var(--tooltipBackground) transparent
            transparent;
          border-width: 0.5rem 0.4rem 0.5rem 0;
          left: 6px;
          top: 0;
        }

        .tooltip-container[data-popper-placement*='left'] .tooltip-arrow {
          margin-right: -0.7rem;
          right: 0;
        }

        .tooltip-container[data-popper-placement*='left']
          .tooltip-arrow::before {
          border-color: transparent transparent transparent var(--tooltipBorder);
          border-width: 0.5rem 0 0.5rem 0.4em;
        }

        .tooltip-container[data-popper-placement*='left']
          .tooltip-arrow::after {
          border-color: transparent transparent transparent
            var(--tooltipBackground);
          border-width: 0.5rem 0 0.5rem 0.4em;
          left: 3px;
          top: 0;
        }
      `}</style>
    </>
  );
}
