import React, { CSSProperties } from 'react';
import classNames from 'classnames';

export default function Content({
  children,
  style,
  className,
}: {
  children: React.ReactNode;
  style?: CSSProperties;
  className?: string;
}) {
  const cx = classNames('modal_content', { [className]: className });
  return (
    <div className={cx} style={style}>
      {children}

      <style jsx>{`
        .modal_content {
          padding: 1rem;
          border-bottom: 1px solid rgba(34, 36, 38, 0.15);
        }
      `}</style>
    </div>
  );
}
