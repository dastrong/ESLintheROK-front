import React, { CSSProperties, useState } from 'react';
import { default as NextImage } from 'next/image';
import type { ImageProps } from 'next/image';
import { FaExclamationCircle } from 'react-icons/fa';
import { getShimmerDataURL } from 'utils/getShimmerUrl';

export default function Image({
  style,
  ...props
}: ImageProps & { style?: CSSProperties }) {
  const [error, setError] = useState(false);

  let shimmerDataUrl: string;
  if (props.placeholder === 'blur') {
    shimmerDataUrl = getShimmerDataURL(
      Number(props.width),
      Number(props.height)
    );
  }

  return (
    <div className="next_img_container" style={style}>
      <NextImage
        {...props}
        blurDataURL={shimmerDataUrl}
        onError={() => setError(true)}
      />

      {error && (
        <div className="error_container">
          <FaExclamationCircle fill="red" size={16} />
          <p>{props.alt}</p>
        </div>
      )}

      <style jsx global>{`
        .next_img_container span {
          border-radius: inherit;
          line-height: 1;
          display: block !important;
        }
      `}</style>

      <style jsx>{`
        .next_img_container {
          position: relative;
          display: block;
          border-radius: inherit;
          line-height: 1;
        }

        .error_container {
          position: absolute;
          top: 0;
          left: 0;
          text-align: center;
          background: #eee;
          height: 100%;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border-radius: inherit;
          line-height: 1;
        }

        .error_container p {
          margin: 0.5rem 0 0;
          text-align: center;
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
}
