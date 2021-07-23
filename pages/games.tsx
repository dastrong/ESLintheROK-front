import React from 'react';
import { InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { FaMusic, FaPaperclip } from 'react-icons/fa';

import { getAllGameConfigs } from 'utils/getAllGameConfigs';
import Image from 'components/Image';
import Button from 'components/Button';

const imageWidth = 260;
const imageHeight = 195;

export default function GamesPage({
  games,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
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
              src={game.image}
              alt={game.title}
              height={imageHeight}
              width={imageWidth}
            />
          </div>

          {/* Info */}
          <div className="info">
            <div className="banner banner_top">{game.dataUsed.join(', ')}</div>
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
            <div className="banner banner_bottom">{game.skills.join(', ')}</div>
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
          height: calc(${imageHeight}px + 1rem + 1rem);
          width: calc(${imageWidth}px + 1rem + 1rem);
          margin: 1rem;
          position: relative;
          border-radius: var(--card-radius);
          overflow: hidden;
        }

        .badge {
          position: absolute;
          height: 3rem;
          width: 3rem;
          z-index: 111;
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
          background-color: #eee;
          padding: 1rem;
          transition: opacity 600ms;
        }

        .card:hover .image {
          opacity: 0;
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
          transition: opacity 250ms;
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
          transition: transform 350ms;
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
