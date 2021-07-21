import React from 'react';
import { GetStaticPaths, InferGetStaticPropsType } from 'next';
import { convertCaseSnakeToPascal } from 'utils/convertCaseSnakeToPascal';
import { getAllGameConfigs } from 'utils/getAllGameConfigs';
import { getSingleGameConfig } from 'utils/getSingleGameConfig';

export default function TeacherInstructionsPage({
  instructions,
}: InferGetStaticPropsType<typeof getStaticProps>) {
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
        english: gameConfig.instructions.forTeachers.english,
        korean: gameConfig.instructions.forTeachers.korean,
      },
    },
  };
};
