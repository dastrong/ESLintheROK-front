import React, { HTMLAttributes } from 'react';

type Props = {
  children: React.ReactNode;
};

const PageContent = ({
  children,
  ...rest
}: Props & HTMLAttributes<HTMLDivElement>) => (
  <div {...rest}>
    {children}
    <style jsx>{`
      div {
        margin: 3rem auto 2rem;
        color: #5a5c62;
        font-size: 2vw;
        line-height: 150%;
        width: 70%;
        min-width: 600px;
        max-width: 800px;
      }

      @media screen and (min-width: 1440px) {
        div {
          font-size: 1.8vw;
          max-width: 1100px;
        }
      }

      @media screen and (min-width: 1700px) {
        div {
          font-size: 1.6vw;
          max-width: 1500px;
        }
      }
    `}</style>
  </div>
);

const PageContentHeader = ({
  children,
  ...rest
}: Props & HTMLAttributes<HTMLHeadingElement>) => (
  <h3 {...rest}>
    {children}
    <style jsx>{`
      h3 {
        font-size: 1.6em;
        margin: 3rem 0 1.5rem;
        color: #414141;
        text-decoration-line: underline;
        text-decoration-color: #489dca;
      }
    `}</style>
  </h3>
);

const PageContentText = ({
  children,
  ...rest
}: Props & HTMLAttributes<HTMLParagraphElement>) => (
  <p {...rest}>
    {children}
    <style jsx>{`
      p {
        font-size: 0.9em;
        margin: 1rem 0;
      }
    `}</style>
  </p>
);

const PageContentList = ({
  children,
  isHorizontal,
  ...rest
}: Props & { isHorizontal?: boolean } & HTMLAttributes<HTMLUListElement>) => (
  <ul {...rest}>
    {children}
    <style jsx>{`
      ul {
        font-size: 0.8em;
        margin: 0.5em 0 1em;
        ${isHorizontal &&
        ` list-style-type: none;
          cursor: default;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          padding: 0;
          font-size: 0.9em;
          line-height: 1.5;
        `}
      }
    `}</style>
  </ul>
);

PageContent.Header = PageContentHeader;
PageContent.Text = PageContentText;
PageContent.List = PageContentList;
export default PageContent;
