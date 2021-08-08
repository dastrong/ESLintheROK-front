import React, { CSSProperties } from 'react';

export default function Content({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div className="modal_content" style={style}>
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
