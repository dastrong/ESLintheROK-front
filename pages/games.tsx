import React from 'react';
import { InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { getAllGameConfigs } from 'utils/getAllGameConfigs';

export default function GamesPage({
  games,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <p>Games Page</p>

      {games.map(game => (
        <Link href={game.path} key={game.path}>
          <a>{game.title}</a>
        </Link>
      ))}
      <style jsx>{``}</style>
    </div>
  );
}

export const getStaticProps = async () => {
  const gameConfigs = await getAllGameConfigs();

  const publishedGames = gameConfigs.filter(({ publish }) => publish);

  return {
    props: {
      games: publishedGames,
    },
  };
};
