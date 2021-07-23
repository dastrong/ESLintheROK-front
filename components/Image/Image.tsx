import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { FaExclamationCircle } from 'react-icons/fa';
import Skeleton from 'components/Skeleton';

type Props = {
  delay?: number;
  height?: number;
  width?: number;
  isTransparent?: boolean;
};

export default function Image({
  src,
  alt,
  height,
  width,
  delay = 200,
  isTransparent = false,
  ...rest
}: Props & React.ImgHTMLAttributes<HTMLImageElement>) {
  const [loading, setLoading] = useState(!delay);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0 });

  useEffect(() => {
    let id: NodeJS.Timeout;
    if (delay && !loading && !loaded) {
      id = setTimeout(() => setLoading(true), delay);
    }
    return () => clearTimeout(id);
  }, [loaded]);

  return (
    <div ref={ref}>
      {loading && !loaded && (
        <Skeleton
          addStyle={{
            height: '100%',
            width: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        />
      )}

      {inView && src && (
        <img
          {...rest}
          src={src}
          alt={alt}
          onLoad={() => {
            setLoaded(true);
          }}
          onError={() => {
            setLoading(false);
            setError(true);
          }}
        />
      )}

      {error && !loaded && (
        <div>
          <FaExclamationCircle fill="red" size={16} />
          <p>{alt}</p>
        </div>
      )}

      <style jsx>{`
        div {
          position: relative;
          height: ${height}px;
          width: ${width}px;
          background-color: ${isTransparent ? 'transparent' : '#eee'};
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }

        img {
          object-fit: cover;
          max-width: 100%;
          opacity: ${loaded ? 1 : 0};
          transition: opacity 250ms ease-in-out;
          color: transparent;
        }

        p {
          margin: 0.5rem 0 0;
          text-align: center;
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
}
