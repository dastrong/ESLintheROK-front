import React from 'react';
import { GetStaticPaths, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import router, { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { FaArrowLeft, FaArrowRight, FaPlay } from 'react-icons/fa';

import Button from 'components/Button';
import Block from 'components/Block';
import Image from 'components/Image';
import Popup from 'components/Popup';
import { PageHeading } from 'components/PageHeadings';

import { convertCaseSnakeToPascal } from 'utils/convertCaseSnakeToPascal';
import { getSingleGameConfig } from 'utils/getSingleGameConfig';
import { getAllGameConfigs } from 'utils/getAllGameConfigs';
import { getGameImgUrl } from 'utils/getGameImgUrl';
import { useStore } from 'contexts/store';

const GameInstructionsModal = dynamic(
  () => import('components/Modal(s)/GameInstructionsModal')
);

const gameNotes = [
  'As a teacher, you should take the time to read both sets of  instructions before rushing to play',
  'If it’s your first time playing a game',
  'I suggest playing the games according to the instructions during their first time, afterwards adjust to suite your students, class needs and teaching style',
  'The student instructions are written as simple as possible, so you can read them with your students.',
  'Once they understand prior to their first time playing.',
];

export default function GameHomePage({
  title,
  image,
  instructions,
  warnings,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { asPath, query } = useRouter();
  const { isDataReady } = useStore();

  const imgUrl = getGameImgUrl(title);

  const openInstructionModal = (version: 'teacher' | 'student') => {
    router.push(`?instructions=${version}&language=english`, undefined, {
      shallow: true,
    });
  };

  return (
    <div className="container">
      <PageHeading>{title}</PageHeading>

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

        <Popup
          hideTooltip={isDataReady}
          content="Please choose/create some lesson data first"
          owner={
            <div style={{ margin: '0 1rem', display: 'inline-block' }}>
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
                  disabled={!isDataReady}
                />
              </Link>
            </div>
          }
        />

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

      <div className="image">
        <Image
          isTransparent
          src={imgUrl}
          alt={title}
          height={image.height * 3}
          width={image.width * 3}
        />
      </div>

      {!!warnings.length && (
        <Block isStatic id="game_warnings" color="#ff4500" header="Warnings:">
          <ul style={{ paddingLeft: 30, margin: '1rem 0' }}>
            {warnings.map(warning => (
              <li key={warning.slice(0, 15)}>{warning}</li>
            ))}
          </ul>
        </Block>
      )}

      <Block isStatic id="game_notes" color="#01918d" header="Please Note:">
        <ul style={{ paddingLeft: 30, margin: '1rem 0' }}>
          {gameNotes.map(note => (
            <li key={note.slice(0, 15)}>{note}</li>
          ))}
        </ul>
      </Block>

      {['teacher', 'student'].includes(query.instructions as string) && (
        <GameInstructionsModal
          isOpen
          gameImgUrl={imgUrl}
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

        .image {
          width: 70%;
          padding: 1.25rem 1rem 2rem;
        }

        .button_container {
          margin: 1rem auto 2rem;
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
      warnings: gameConfig.warnings,
    },
  };
};
