import React from 'react';
import SidebarGameListItem from './SidebarGameListItem';
import { games } from '../../../utils/games';

export default function SidebarGameList() {
  return (
    <ul>
      {games.map(({ Icon, title, path }) => (
        <SidebarGameListItem key={path} Icon={Icon} title={title} path={path} />
      ))}

      <style jsx>{`
        ul {
          padding: 0;
          margin: 0;
        }

        ul:hover .icon {
          transform: scale(1.1);
        }
      `}</style>
    </ul>
  );
}
