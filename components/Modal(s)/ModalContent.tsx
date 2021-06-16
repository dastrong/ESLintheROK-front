import React from 'react';

export default function Content({ children }: { children: React.ReactNode }) {
  return (
    <div className="modal_content">
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
