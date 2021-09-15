import React, { InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  text?: string;
  children?: React.ReactNode;
};

export default function Switch({ text, children, id, ...rest }: Props) {
  return (
    <label className="toggle" htmlFor={id}>
      <input type="checkbox" className="toggle__input" id={id} {...rest} />
      <span className="toggle-track">
        <span className="toggle-indicator">
          <span className="checkMark">
            <svg
              viewBox="0 0 24 24"
              id="ghq-svg-check"
              role="presentation"
              aria-hidden="true"
            >
              <path d="M9.86 18a1 1 0 01-.73-.32l-4.86-5.17a1.001 1.001 0 011.46-1.37l4.12 4.39 8.41-9.2a1 1 0 111.48 1.34l-9.14 10a1 1 0 01-.73.33h-.01z"></path>
            </svg>
          </span>
        </span>
      </span>

      {text || children}

      <style jsx>{`
        .toggle {
          --light: transparent;
          --mid: #489dca;
          --dark: #489dca;
          --track-border: var(--mid);
          --track-background: var(--light);
          --focus-ring: 0px 0px 0px 2px var(--dark);
          --toggle-indicator-size: 24px;
          --track-height: calc(var(--toggle-indicator-size) + 6px);
          --track-width: calc(var(--toggle-indicator-size) * 2.5);
          --highContrastModeSupport: solid 2px transparent;
          --speed: 0.25s;

          align-items: center;
          border-radius: 100px;
          display: flex;
        }

        .toggle__input {
          clip: rect(0 0 0 0);
          clip-path: inset(50%);
          height: 1px;
          overflow: hidden;
          position: absolute;
          white-space: nowrap;
          width: 1px;
        }
        .toggle__input:not([disabled]):active + .toggle-track,
        .toggle__input:not([disabled]):focus + .toggle-track {
          border: 1px solid transparent;
          box-shadow: var(--focus-ring);
        }

        .toggle__input:disabled + .toggle-track {
          cursor: not-allowed;
          opacity: 0.7;
        }

        .toggle-track {
          background: var(--track-background);
          border: 1px solid var(--track-border);
          border-radius: 100px;
          cursor: pointer;
          display: flex;
          height: var(--track-height);
          margin-right: 12px;
          position: relative;
          width: var(--track-width);
        }

        .toggle-indicator {
          align-items: center;
          background: var(--dark);
          border-radius: var(--toggle-indicator-size);
          bottom: 2px;
          display: flex;
          height: var(--toggle-indicator-size);
          justify-content: center;
          left: 2px;
          outline: var(--highContrastModeSupport);
          position: absolute;
          transition: var(--speed);
          width: var(--toggle-indicator-size);
        }

        .checkMark {
          fill: #fff;
          height: calc(var(--toggle-indicator-size) - 4px);
          width: calc(var(--toggle-indicator-size) - 4px);
          opacity: 0;
          transition: opacity var(--speed) ease-in-out;
        }

        .toggle__input:checked + .toggle-track .toggle-indicator {
          background: var(--dark);
          transform: translateX(calc(var(--track-width) - var(--track-height)));
        }

        .toggle__input:checked + .toggle-track .toggle-indicator .checkMark {
          opacity: 1;
          transition: opacity var(--speed) ease-in-out;
        }

        @media screen and (-ms-high-contrast: active) {
          .toggle-track {
            border-radius: 0;
          }
        }
      `}</style>
    </label>
  );
}
