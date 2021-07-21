import React from 'react';
import { GetStaticPaths, InferGetStaticPropsType } from 'next';
import { convertCaseSnakeToPascal } from 'utils/convertCaseSnakeToPascal';
import { getSingleGameConfig } from 'utils/getSingleGameConfig';
import { getAllGameConfigs } from 'utils/getAllGameConfigs';

export default function StudentInstructionsPage({
  instructions,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log(instructions);
  return (
    <div>
      Student Instructions
      <style jsx>{`
        div {
          /*  */
        }
      `}</style>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const gameConfigs = await getAllGameConfigs();

  const paths = gameConfigs
    .filter(({ publish }) => publish)
    .map(({ path }) => ({
      params: {
        gameName: path.replace('/game/', ''),
      },
    }));

  return {
    fallback: false,
    paths,
  };
};

export const getStaticProps = async ({
  params,
}: {
  params: { gameName: string };
}) => {
  const gameFileName = convertCaseSnakeToPascal(params.gameName);

  const gameConfig = await getSingleGameConfig(gameFileName);

  return {
    props: {
      instructions: {
        english: gameConfig.instructions.forStudents.english,
        korean: gameConfig.instructions.forStudents.korean,
      },
    },
  };
};
