import React from 'react';
// import Accordion from 'components/Accordion';

type Props = {
  panels: [];
};

export default function ChangelogPage({ panels }: Props) {
  return (
    <div>
      <h1 className="heading">Changelog</h1>

      <div className="sub-heading">
        <p>
          All notable changes, updated and additions to this site will be
          documented below.
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
