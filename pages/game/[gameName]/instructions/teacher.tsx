import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { games } from 'utils/games';

export default function TeacherInstructionsPage({
  instructions,
}: {
  instructions: {
    korean: string[];
    english: string[];
  };
}) {
  console.log(instructions);
  return (
    <div>
      Teacher Instructions
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
      instructions: {
        korean: game.instructions.forTeachers.korean,
        english: game.instructions.forTeachers.english,
      },
    },
  };
};
