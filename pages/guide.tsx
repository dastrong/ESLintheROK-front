import React from 'react';
// import Accordion from 'components/Accordion';

export default function UserGuidePage() {
  return (
    <div>
      <h1 className="heading">User Guide</h1>

      <div className="sub-heading">
        <p>
          It can be hard getting used to new things, but this guide will get you
          up and running in no time.
        </p>
      </div>

      {/* <Accordion panels={} /> */}

      <style jsx>{`
        .heading {
          margin: 2rem auto 1.25rem;
          text-align: center;
          color: #414141;
          font-size: 3.5rem;
          font-weight: normal;
        }

        .sub-heading {
          color: #5a5c62;
          font-size: 1.3rem;
          line-height: 150%;
          margin: 0 auto;
          max-width: 600px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
