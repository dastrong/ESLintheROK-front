import React from 'react';
import { GetStaticPaths, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import router, { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { FaArrowLeft, FaArrowRight, FaPlay } from 'react-icons/fa';

import Button from 'components/Button';
import Accordion from 'components/Accordion';
import { convertCaseSnakeToPascal } from 'utils/convertCaseSnakeToPascal';
import { getSingleGameConfig } from 'utils/getSingleGameConfig';
import { getAllGameConfigs } from 'utils/getAllGameConfigs';

const GameInstructionsModal = dynamic(
  () => import('components/Modal(s)/GameInstructionsModal')
);

export default function GameHomePage({
  title,
  image,
  instructions,
  warnings,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { asPath, query } = useRouter();

  const openInstructionModal = (version: 'teacher' | 'student') => {
    router.push(`?instructions=${version}&language=english`, undefined, {
      shallow: true,
    });
  };

  return (
    <div className="container">
      <h1 className="heading">{title}</h1>

      <img src={image} alt={title} />

      <div className="button_container">
        <Button
          rounded
          size="xl"
          color="#565656"
          bgColor="#F8F8F8"
          text="Teacher Instructions"
          Icon={FaArrowLeft}
          iconPosition="left"
          onClick={() => openInstructionModal('teacher')}
        />

        <Link href={`${asPath}/play`} passHref>
          <Button
            rounded
            size="xl"
            as="a"
            color="#565656"
            bgColor="#97D492"
            text="Play"
            Icon={FaPlay}
            iconPosition="right"
            style={{ margin: '0 1rem' }}
          />
        </Link>

        <Button
          rounded
          size="xl"
          color="#565656"
          bgColor="#F8F8F8"
          text="Student Instructions"
          Icon={FaArrowRight}
          iconPosition="right"
          onClick={() => openInstructionModal('student')}
        />
      </div>

      <Accordion panels={warnings} />

      {['teacher', 'student'].includes(query.instructions as string) && (
        <GameInstructionsModal
          isOpen={true}
          instructions={
            query.instructions === 'student'
              ? instructions.forStudents
              : instructions.forTeachers
          }
        />
      )}

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .heading {
          margin: 2rem auto 1.25rem;
          text-align: center;
          color: #414141;
          font-size: 3.5rem;
          font-weight: normal;
        }

        img {
          width: 50%;
        }

        .button_container {
          margin: 0 auto;
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
      title: gameConfig.title,
      image: gameConfig.image,
      instructions: gameConfig.instructions,
      warnings: [],
    },
  };
};
