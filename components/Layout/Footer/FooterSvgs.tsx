import React from 'react';

export default function FooterSvgs({ maxWidth }: { maxWidth: number }) {
  return (
    <>
      <svg
        className="blob_left"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 400"
      >
        <path fill="transparent" d="M0 0h1000v400H0z" />
        <path
          d="M213.24 239c72.1 25.6 174.7 24.7 202.6 64.3 27.9 39.5-18.7 119.5-28.8 206.2-10.1 86.8 16.5 180.4-19.2 218.3-35.6 37.9-133.4 20.2-206.4 3.3-72.9-16.9-121-32.9-184.4-34.3-63.5-1.3-142.3 11.9-230.5-10.8-88.1-22.7-185.5-81.4-169.4-140.5 16.1-59.1 145.9-118.8 193.6-212.8 47.7-94 13.4-222.4 47.5-265.3 34.1-42.9 136.7-.4 208.8 46.9 72.2 47.2 114 99.2 186.2 124.7"
          fill="#e4b1ec"
        />
      </svg>
      <svg
        className="blob_right"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 400"
      >
        <path fill="transparent" d="M0 0h1000v400H0z" />
        <path
          style={{ transform: 'translate(-1rem, 2rem)' }}
          d="M1272.06 183.75c56.3 33.7 99.9 89.4 120.8 150.9 20.8 61.5 18.9 128.8 2.7 189.2-16.2 60.4-46.7 113.9-90.1 146.1-43.5 32.2-100 43.1-151.9 48.7-51.9 5.6-99.2 5.9-164.5 12.1-65.3 6.3-148.7 18.4-235.8-7.6-87.2-26.1-178.1-90.4-158.7-152.4 19.4-61.9 149.2-121.6 195.3-218.1 46.1-96.5 8.5-230 42.6-273.7 34.1-43.8 139.9 2.2 227.2 30.9 87.3 28.7 156.2 40.3 212.4 73.9"
          fill="#e4b1ec"
        />
      </svg>

      <style jsx>{`
        svg {
          position: absolute;
          bottom: 0;
          max-width: ${maxWidth}px;
          pointer-events: none;
        }

        .blob_left {
          left: 0;
        }

        .blob_right {
          right: 0;
        }
      `}</style>
    </>
  );
}
