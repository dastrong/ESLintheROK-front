import React, { Fragment } from 'react';
import { InferGetStaticPropsType } from 'next';
import Link from 'next/link';

import Block from 'components/Block';
import Popup from 'components/Popup';
import { PageHeading, PageSubHeading } from 'components/PageHeadings';
import UserCharacter from 'components/Svgs/UserCharacter';
import { getDonations } from 'utils/getDonations';

type Donation = {
  name: string;
  coffeesBought: number;
  note: string | null;
  email: string;
};

type Tier = {
  colorCode: string;
  donations: Omit<Donation, 'email'>[];
};

export default function AcknownledgementsPage({
  tieredDonations,
  lessonContributors,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <PageHeading>Acknowledgements</PageHeading>
      <PageSubHeading>
        This page is dedicated to the people that have contributed and to the
        tools that make this site or a feature feasible.
      </PageSubHeading>

      <Block isStatic header="Please Note:" id="notice" color="#01918d">
        <p>
          As this page is a new addition (2021), it’s completely possible that
          I’ve forgotten to pass credit to someone or something. If you feel
          that you’re due credit and should be listed below, or you are listed
          and want to be removed, please{' '}
          <Link href="/contact">
            <a>contact me</a>
          </Link>
          .
        </p>
      </Block>

      <div className="credits_container">
        <h3 id="site_design">Site Design</h3>
        <p>
          Even though the majority of the current design (2021) is custom, the
          following deserve credit.
        </p>
        <ul>
          <li>The main globe logo was downloaded from Vecteezy</li>
          <li>
            The wavey top navigation bar and the blobs in the footer were built
            and downloaded from Haikei
          </li>
          <li>
            The image on the homepage and the lesson's modal were downloaded
            from unDraw
          </li>
        </ul>

        <h3 id="lesson_materials">Lesson Materials</h3>
        <p>
          A big perk of this site is being able to provide users with their
          desired lesson's vocabulary and expressions. Entering this data is
          tedious work that the following individuals have helped contribute to.
        </p>
        <ul className="horizontal_list">
          {lessonContributors.map((name, i) => (
            <Fragment key={name + i}>
              {!!i && <span style={{ marginInline: '0.5rem' }}>·</span>}
              <li>{name}</li>
            </Fragment>
          ))}
        </ul>

        <h3 id="donations">Donations</h3>
        <p>
          Even though ESL in the ROK is free-to-use, the following individuals
          have been gracious enough to donate and keep me motivated to
          continuing improving the site.
        </p>
        {Object.keys(tieredDonations).map(tier => {
          const { colorCode, donations }: Tier = tieredDonations[tier];

          const isGold = tier === 'gold';
          const isSilver = tier === 'silver';
          const isBronze = tier === 'bronze';

          const x = isGold ? 75 : isSilver ? 65 : 55;
          const fontSize = isGold ? '1.3em' : isSilver ? '1.15em' : '1em';

          return (
            <div className="donation_container" key={tier}>
              <Popup
                hideArrow
                placement="bottom"
                content={
                  isGold ? '5+ Coffees' : isSilver ? '2-4 Coffees' : '1 Coffee'
                }
                addStyles={{
                  padding: '0px 8px',
                  backgroundColor: colorCode,
                  border: 'none',
                  color: isBronze ? '#fff' : 'inherit',
                }}
                owner={
                  <div
                    className="donations_icon"
                    style={{
                      height: x,
                      width: x,
                      boxShadow: `inset 0px 0px 12px 12px ${colorCode}, 0px 0px 6px #1FB7B0`,
                    }}
                  >
                    <UserCharacter colorHat={colorCode} />
                  </div>
                }
              />
              <ul className="horizontal_list">
                {donations.map(({ name, note }, i) => {
                  const listItem = (
                    <li className="donations_text" style={{ fontSize }}>
                      {name || 'Anonymous'}
                    </li>
                  );
                  return (
                    <Fragment key={name + i}>
                      {!!i && (
                        <span style={{ marginInline: '0.5rem', fontSize }}>
                          ·
                        </span>
                      )}
                      {note ? (
                        <Popup
                          placement="auto"
                          content={note}
                          owner={listItem}
                          addStyles={{
                            maxWidth: 300,
                            padding: 8,
                            textAlign: 'center',
                          }}
                        />
                      ) : (
                        listItem
                      )}
                    </Fragment>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .credits_container {
          margin: 3rem auto 2rem;
          color: #5a5c62;
          font-size: 2vw;
          line-height: 150%;
          width: 70%;
          min-width: 600px;
          max-width: 800px;
        }

        h3 {
          font-size: 1.6em;
          margin: 3rem 0 1.5rem;
          color: #414141;
        }

        p {
          font-size: 0.9em;
          margin: 1rem 0;
        }

        ul {
          font-size: 0.8em;
          margin: 0.5em 0 1em;
        }

        .donation_container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 1rem 0;
        }

        .donation_container:nth-of-type(1) {
          margin-top: 1.5rem;
        }

        .donations_icon {
          background-color: #01918d;
          display: flex;
          justify-items: center;
          padding: 0.75rem;
          border-radius: 100%;
        }

        .horizontal_list {
          list-style-type: none;
          cursor: default;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          padding: 0;
          font-size: 0.9em;
          line-height: 1.5;
        }

        .donations_text {
          text-transform: capitalize;
        }

        @media screen and (min-width: 1440px) {
          .credits_container {
            font-size: 1.8vw;
            max-width: 1100px;
          }
        }

        @media screen and (min-width: 1700px) {
          .credits_container {
            font-size: 1.6vw;
            max-width: 1500px;
          }
        }
      `}</style>
    </div>
  );
}

export const getStaticProps = async () => {
  const { lessonContributors } = await import('lib/contributors');

  const supporterUrl = '/supporters';
  const subscriptionUrl = '/subscriptions';

  const supporterResults = await getDonations(supporterUrl);
  const supporterDonations: Donation[] = supporterResults.map(
    ({
      supporter_name,
      payer_name,
      support_coffees,
      support_note,
      payer_email,
    }) => ({
      name: (supporter_name || payer_name)?.split(' ')[0],
      coffeesBought: support_coffees,
      note: support_note,
      email: payer_email,
    })
  );

  const monthDiff = (dateFrom: Date, dateTo: Date) => {
    return (
      dateTo.getMonth() -
      dateFrom.getMonth() +
      12 * (dateTo.getFullYear() - dateFrom.getFullYear())
    );
  };

  const subscriptionResults = await getDonations(subscriptionUrl);
  const subscriptionDonations: Donation[] = subscriptionResults.map(
    ({
      payer_name,
      subscription_coffee_num,
      subscription_created_on,
      subscription_updated_on,
      payer_email,
    }) => ({
      name: payer_name.split(' ')[0],
      coffeesBought:
        subscription_coffee_num *
        monthDiff(
          new Date(subscription_created_on),
          new Date(subscription_updated_on)
        ),
      note: null,
      email: payer_email,
    })
  );

  // combined supporters/subscriptions and duplicates and remove emails
  const combinedDonations = [...supporterDonations, ...subscriptionDonations]
    .reduce((acc, cVal) => {
      const index = acc.findIndex(dono => dono.email === cVal.email);
      if (index === -1) {
        acc.push(cVal);
      } else {
        acc[index].coffeesBought += cVal.coffeesBought;
      }
      return acc;
    }, [] as Donation[])
    .map(({ name, note, coffeesBought }) => ({ name, note, coffeesBought }))
    .reduce(
      (acc, cVal) => {
        if (cVal.coffeesBought === 1) acc.bronze.donations.push(cVal);
        else if (cVal.coffeesBought < 5) acc.silver.donations.push(cVal);
        else acc.gold.donations.push(cVal);
        return acc;
      },
      {
        gold: { colorCode: '#FEE101', donations: [] } as Tier,
        silver: { colorCode: '#A7A7AD', donations: [] } as Tier,
        bronze: { colorCode: '#A77044', donations: [] } as Tier,
      }
    );

  return {
    props: {
      tieredDonations: combinedDonations,
      lessonContributors,
    },
    revalidate: 300, // 5 minutes
  };
};
