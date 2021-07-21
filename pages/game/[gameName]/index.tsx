import React from 'react';
import { GetStaticPaths, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { convertCaseSnakeToPascal } from 'utils/convertCaseSnakeToPascal';
import { getSingleGameConfig } from 'utils/getSingleGameConfig';
import { getAllGameConfigs } from 'utils/getAllGameConfigs';

export default function GameHomePage({
  image,
  title,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { asPath } = useRouter();

  return (
    <div>
      <Link href={`${asPath}/instructions/teacher`}>
        <a>Teachers</a>
      </Link>

      <Link href={`${asPath}/instructions/student`}>
        <a>Students</a>
      </Link>

      <Link href={`${asPath}/play`}>
        <a>Play</a>
      </Link>

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
      image: gameConfig.image,
      title: gameConfig.title,
    },
  };
};
