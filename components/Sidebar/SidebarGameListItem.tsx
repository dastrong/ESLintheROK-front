import React from 'react';
import Link from 'next/link';
import { IconType } from 'react-icons';

export default function SidebarGameListItem({
  Icon,
  title,
  path,
}: {
  Icon: IconType;
  title: string;
  path: string;
}) {
  return (
    <li>
      <Link href={path}>
        <a>
          <Icon
            className="icon"
            style={{ fontSize: '1.6rem', marginBottom: '7px' }}
          />
          {title}
        </a>
      </Link>

      <style jsx>{`
        li {
          display: block;
          text-align: left;
          position: relative;
          border-top: 1px solid hsla(0, 0%, 100%, 0.08);
          box-sizing: border-box;
        }

        li:last-child {
          /* when you hover over a link the preview url pops ... */
          /* ... up along the bottom left this will hide that */
          margin-bottom: 20px;
          border-bottom: 1px solid hsla(0, 0%, 100%, 0.08);
        }

        a {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #fff;
          padding: 1rem;
          text-decoration: none;
        }

        .icon {
          font-size: 1.6rem;
          margin-bottom: 7px;
          transition: transform 0.25s;
        }

        li:hover .icon {
          transform: scale(1.2) translateY(-1px);
        }
      `}</style>
    </li>
  );
}
