import React from 'react';
import { InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { FaMusic, FaPaperclip } from 'react-icons/fa';

import SeoWrapper from 'components/SeoWrapper';
import Image from 'components/Image';
import Button from 'components/Button';
import { getAllGameConfigs } from 'utils/getAllGameConfigs';
import { getGameImgUrl } from 'utils/getCloudUrls';

export default function GamesPage({
  games,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <SeoWrapper
      title="Games"
      description={`${games.length} fun and dynamic plug and play games to use during your lessons.`}
    >
      <div className="container">
        {games.map(game => (
          <div className="card" key={game.path}>
            {/* Badges */}
            {game.hasAudio && (
              <div className="badge badge_audio">
                <FaMusic />
              </div>
            )}
            {game.attachURL && (
              <a
                className="badge badge_attach"
                href={game.attachURL}
                target="_blank"
              >
                <FaPaperclip />
              </a>
            )}

            {/* Image */}
            <div className="image">
              <Image
                isTransparent
                src={getGameImgUrl(game.title)}
                alt={game.title}
                height={game.image.height}
                width={game.image.width}
                style={{ padding: '1rem' }}
              />
            </div>

            {/* Info */}
            <div className="info">
              <div className="banner banner_top">
                {game.dataUsed.join(', ')}
              </div>
              <div className="content">
                <h2>{game.title}</h2>
                <p className="description">{game.description}</p>
                <Link href={game.path} passHref>
                  <Button
                    as="a"
                    color="white"
                    bgColor="#01918d"
                    text="View More"
                  />
                </Link>
              </div>
              <div className="banner banner_bottom">
                {game.skills.join(', ')}
              </div>
            </div>
          </div>
        ))}

        <style jsx>{`
          .container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
          }

          .card {
            --card-radius: 1rem;
            height: calc(195px + 1rem + 1rem);
            width: calc(260px + 1rem + 1rem);
            margin: 1rem;
            position: relative;
            border-radius: var(--card-radius);
            overflow: hidden;
            box-shadow: -8px 8px 16px #a1a1a1, 8px -8px 16px #ffffff;
          }

          .badge {
            position: absolute;
            height: 3rem;
            width: 3rem;
            z-index: 1;
            color: white;
          }

          .badge_audio {
            top: 0;
            left: 0;
            background-color: #257fd4;
            box-shadow: -1px 1px 3px #1864ab inset;
            border-bottom-right-radius: 100%;
            padding-top: 0.7rem;
            padding-left: 0.7rem;
            text-align: left;
          }

          .badge_attach {
            top: 0;
            right: 0;
            background-color: #e67a12;
            box-shadow: 1px -1px 3px #c1660e inset;
            border-bottom-left-radius: 100%;
            padding-top: 0.7rem;
            padding-right: 0.7rem;
            text-align: right;
          }

          .image {
            display: flex;
            justify-content: center;
            width: 100%;
            height: 100%;
            background-color: #eee;
            transition: all 250ms;
          }

          .card:hover .image {
            opacity: 0;
            transform: scaleY(0.1);
          }

          .info {
            position: absolute;
            top: 0;
            left: 0;
            background-color: #eee;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            opacity: 0;
            transition: opacity 350ms;
          }

          .card:hover .info {
            opacity: 1;
          }

          .banner {
            height: 3rem;
            padding: 1rem;
            text-align: center;
            background-color: #ddd;
            font-size: 0.8rem;
            transition: transform 300ms;
          }

          .banner_top {
            transform: translateY(-100%);
          }

          .banner_bottom {
            transform: translateY(100%);
          }

          .card:hover .banner {
            transform: translateY(0%);
          }

          .content {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .content h2,
          .content p {
            margin: 0 0 0.5rem;
          }
        `}</style>
      </div>
    </SeoWrapper>
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
