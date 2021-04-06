import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { games } from 'utils/games';

export default function GameHomePage({
  image,
  title,
}: {
  image: string;
  title: string;
}) {
  return (
    <div>
      <img src={image} alt={title} />

      <style jsx>{`
        div {
          /*  */
        }
      `}</style>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = games.map(game => ({ params: { gameName: game.path } }));
  return {
    fallback: false,
    paths,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const game = games.find(game => game.path === params.gameName);
  return {
    props: {
      image: game.image,
      title: game.title,
    },
  };
};
