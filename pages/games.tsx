import React, { useState } from 'react';
import { InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { FaMusic, FaPaperclip } from 'react-icons/fa';
import { RiFileGifLine } from 'react-icons/ri';

import SeoWrapper from 'components/SeoWrapper';
import { PageHeading, PageSubHeading } from 'components/PageHeadings';
import Image from 'components/Image';
import Button from 'components/Button';
import Carousel from 'components/Carousel';
import { getAllGameConfigs } from 'utils/getAllGameConfigs';
import { getGameImgUrl } from 'utils/getCloudUrls';

type Order = 'Ascending' | 'Descending';
type Filter =
  | 'All'
  | 'Vocabulary'
  | 'Expressions'
  | 'Listening'
  | 'Speaking'
  | 'Reading'
  | 'Writing';

const sortTabs: { text: Order; id: Order; position: number }[] = [
  { text: 'Ascending', id: 'Ascending', position: 1 },
  { text: 'Descending', id: 'Descending', position: 2 },
];

const filterTabs: { text: Filter; id: Filter; position: number }[] = [
  { text: 'All', id: 'All', position: 0 },
  { text: 'Vocabulary', id: 'Vocabulary', position: 3 },
  { text: 'Expressions', id: 'Expressions', position: 4 },
  { text: 'Listening', id: 'Listening', position: 5 },
  { text: 'Speaking', id: 'Speaking', position: 6 },
  { text: 'Reading', id: 'Reading', position: 7 },
  { text: 'Writing', id: 'Writing', position: 8 },
];

export default function GamesPage({
  games,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [order, setOrder] = useState<Order>('Ascending');
  const [filters, setFilters] = useState<Filter[]>(['All']);

  const handleCarouselClick = (id: Filter | Order) => {
    // check if a sort button was clicked, if not it was a filter button
    if (sortTabs.some(sortTab => sortTab.id.includes(id))) {
      setOrder(id as Order);
    } else {
      setFilters(state => {
        // if user clicks All, reset state to show all
        if (id === 'All') return ['All'];
        // if user clicks on an active tab, make it inactive
        if (state.includes(id as Filter)) {
          const newState = state.filter(x => x !== id);
          // if there's now nothing active, make All active again
          return newState.length ? newState : ['All'];
        }
        // otherwise just add the new item to state and remove All if it's there
        return [...state.filter(x => x !== 'All'), id as Filter];
      });
    }
  };

  // combine and modify the tabs, so the carousel can show them correctly
  const activeCarouselTabs = [order, ...filters];
  const carouselTabs = [...sortTabs, ...filterTabs].sort(
    (a, b) => a.position - b.position
  );

  return (
    <SeoWrapper
      title="Games"
      description={`${games.length} fun and dynamic plug and play games to use during your lessons.`}
    >
      <PageHeading>Games</PageHeading>
      <PageSubHeading style={{ marginBottom: 16 }}>
        {games.length} fun and dynamic plug and play games to use during your
        classes. Use the filters to help find a game targeted for your students
        and type of class.
      </PageSubHeading>
      <PageSubHeading style={{ minWidth: 500, maxWidth: 767 }}>
        <Carousel
          toggleable
          width="100%"
          items={carouselTabs}
          buttonSize="xs"
          itemColorScale={['#027c7a', '#5d08d8', '#027c7a']}
          handleClick={handleCarouselClick}
          numOfItemsToShow={5}
          numOfItemsToSlide={5}
          activeItem={activeCarouselTabs}
        />
      </PageSubHeading>

      <div className="container">
        {games
          // filter out games depending on the active filters
          .filter(game => {
            // if All is active, show everything
            if (filters.includes('All')) return true;
            // combine all the game details into one array for comparision
            const gameDetails: Exclude<Filter, 'All'>[] = [
              ...game.dataUsed,
              ...game.skills,
            ];
            // check that this game contains every active filter
            return filters.every(filter =>
              gameDetails.includes(filter as Exclude<Filter, 'All'>)
            );
          })
          // sort the games according to the title
          .sort((a, b) =>
            order === 'Ascending'
              ? a.title.localeCompare(b.title)
              : b.title.localeCompare(a.title)
          )
          // now render the game cards
          .map(game => (
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
              {game.usesGifs ||
                (true && (
                  <div className="badge badge_gif">
                    <RiFileGifLine style={{ fontSize: '1.3rem' }} />
                  </div>
                ))}

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
            margin: 0 auto;
            width: 90%;
            min-width: 767px;
            max-width: 2000px;
            font-size: var(--container-text);

            --container-text: 1rem;
            --card-height: 195px;
            --card-radius: 1rem;
            --card-margin: 1rem;
            --banner-height: 3rem;
            --banner-text: 0.8em;
          }

          @media screen and (min-width: 1500px) {
            .container {
              --container-text: 1.1rem;
              --card-height: 220px;
              --card-radius: 1rem;
              --card-margin: 1.25rem;
              --banner-height: 3.25rem;
              --banner-text: 0.9em;
            }
          }

          @media screen and (min-width: 2000px) {
            .container {
              --container-text: 1.2rem;
              --card-height: 250px;
              --card-radius: 1rem;
              --card-margin: 1.5rem;
              --banner-height: 3.5rem;
              --banner-text: 1em;
            }
          }

          .card {
            height: calc(var(--card-height) + var(--card-radius) * 2);
            margin: var(--card-margin);
            position: relative;
            border-radius: var(--card-radius);
            overflow: hidden;
            box-shadow: 0 0 5px #a1a1a1;
            aspect-ratio: 1.8;
          }

          .badge {
            position: absolute;
            height: calc(var(--banner-height) - 3px);
            width: calc(var(--banner-height) - 3px);
            z-index: 1;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .badge_audio {
            top: 0;
            left: 0;
            background-color: #257fd4f2;
            box-shadow: -1px 1px 3px 1px #1864ab;
            border-bottom-right-radius: 100%;
            padding-bottom: 0.4rem;
            padding-right: 0.4rem;
          }

          .badge_attach {
            top: 0;
            right: 0;
            background-color: #18ac0bf2;
            box-shadow: 1px -1px 3px 1px #108506;
            border-bottom-left-radius: 100%;
            padding-bottom: 0.4rem;
            padding-left: 0.4rem;
          }

          .badge_gif {
            bottom: 0;
            left: 0;
            background-color: #e67a12f2;
            box-shadow: 1px -1px 3px 1px #c1660e;
            border-top-right-radius: 100%;
            padding-top: 0.4rem;
            padding-right: 0.4rem;
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
            height: var(--banner-height);
            font-size: var(--banner-text);
            line-height: var(--banner-height);
            text-align: center;
            background-color: #ddd;
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

          .content h2 {
            margin: 0 0 0.5rem;
          }
          .content p {
            margin: 0 0 0.75rem;
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
