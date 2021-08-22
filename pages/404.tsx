import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaRegCopy, FaCheck } from 'react-icons/fa';

import SeoWrapper from 'components/SeoWrapper';
import { PageSubHeading } from 'components/PageHeadings';
import Popup from 'components/Popup';
import ErrorSVG from 'components/Svgs/404.svg';

export default function CustomErrorPage() {
  const { asPath } = useRouter();
  const [isCopied, setIsCopied] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  const copyToClipboard = () => {
    setIsCopied(true);
    ref.current.select();
    document.execCommand('copy');
  };

  useEffect(() => {
    let id: NodeJS.Timeout;
    if (isCopied) {
      id = setTimeout(() => setIsCopied(false), 2000);
    }
    return () => clearTimeout(id);
  }, [isCopied]);

  return (
    <SeoWrapper title="404">
      <ErrorSVG
        style={{
          display: 'block',
          width: '80%',
          maxWidth: 700,
          margin: '2rem auto',
        }}
      />
      <PageSubHeading>
        Please copy the following URL <br /> ---{' '}
        <Popup
          visible={isCopied}
          owner={
            <span
              role="button"
              tabIndex={-1}
              onClick={copyToClipboard}
              onKeyDown={copyToClipboard}
            >
              <span>{asPath}</span>
              <input readOnly ref={ref} value={asPath} />
              {isCopied ? <FaCheck color="green" /> : <FaRegCopy />}
            </span>
          }
          addStyles={{ padding: '0 0.5rem' }}
        >
          Copied!
        </Popup>{' '}
        ---
        <br />
        and send it to us{' '}
        <Link href="/contact">
          <a>here</a>
        </Link>{' '}
        to dubug.
        <style jsx>{`
          span {
            display: inline-flex;
            align-items: center;
            cursor: pointer;
            margin: 0.25rem 0;
            font-style: italic;
          }

          span span {
            margin-right: 0.25rem;
          }

          input {
            background: transparent;
            border: none;
            color: inherit;
            padding: 0;
            display: none;
          }

          a {
            color: #6c63ff;
          }
        `}</style>
      </PageSubHeading>
    </SeoWrapper>
  );
}
