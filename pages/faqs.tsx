import React from 'react';
import { InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import shuffle from 'lodash.shuffle';

import SeoWrapper from 'components/SeoWrapper';
import Accordion from 'components/Accordion';
import { PageHeading, PageSubHeading } from 'components/PageHeadings';

const panels = [
  {
    header: 'Who is this site for?',
    content: (
      <div>
        <p>
          English public school teachers in South Korea will benefit the most.
        </p>
        <p>
          Although anyone can enter their own material and modify the gameplay
          rules to accommodate classes.
        </p>
      </div>
    ),
  },
  {
    header: 'Are there any fees?',
    content: (
      <div>
        <p>Unlike other websites, this one is completely free to use.</p>
        <p>
          However, if you would like to support me, you can buy me a coffee{' '}
          <a
            href="https://www.buymeacoffee.com/ycqPbFl"
            target="_blank"
            rel="noopener noreferrer"
          >
            here.
          </a>
        </p>
      </div>
    ),
  },
  {
    header: 'How do I use the games?',
    content: (
      <div>
        <p>
          Each game has a teacher and student instructions page with English and
          Korean languages.
        </p>
        <p>
          To view helpful shortcuts: hover your mouse over the top-right (while
          in the game) and an icon will appear. Click it.
        </p>
        <p>Each games plays differently, but most tricks work across games.</p>
      </div>
    ),
  },
  {
    header: 'Did you invent all these games?',
    content: (
      <div>
        <p>Not all of them.</p>
        <p>
          If you know the creator of a game or want credit yourself, contact me.
        </p>
      </div>
    ),
  },
  {
    header: 'Will you be adding more games?',
    content: (
      <div>
        <p>Yes!</p>
        <p>
          There are a couple other games that I'd like to add finding free time
          is hard.
        </p>
      </div>
    ),
  },
  {
    header: 'Will you be adding any bomb games?',
    content: (
      <div>
        <p>Sorry, but no.</p>
        <p>I don't want any copyright issues and those PPTs are great as is.</p>
      </div>
    ),
  },
  {
    header: 'I made a powerpoint game, can you recreate it here?',
    content: (
      <div>
        <p>It depends.</p>
        <p>
          <Link href="/contact">
            <a>Contact</a>
          </Link>{' '}
          me to discuss.
        </p>
      </div>
    ),
  },

  {
    header: 'Why is the lessons data slow to load?',
    content: (
      <div>
        <p>
          One server goes to sleep after 30 minutes, if it's not interacted
          with.
        </p>
        <p>If you are the person to wake it up, it'll take a couple seconds.</p>
        <p>
          In my tests, if it's awake it'll load under 2 seconds. The wake up
          process should take under 10 seconds.
        </p>
      </div>
    ),
  },
  {
    header: 'I lost my data, where did my data go?',
    content: (
      <div>
        <p>
          This site is build differently than other's you might use and that was
          on purpose.
        </p>
        <p>
          If your browser tab refreshed the data you were using will be reset.
        </p>
        <p>
          However, if you click the past lessons button on the{' '}
          <Link href="/">
            <a>home page</a>
          </Link>{' '}
          you can use your data again.
        </p>
      </div>
    ),
  },
  {
    header: "What's that past lessons button for?",
    content: (
      <div>
        <p>By popular request, I've added a way to use your past lessons.</p>
        <p>Whenever you set data, it will save your data to your browser.</p>
        <p>
          If you want to edit one of your lessons, check it, set it, edit it (by
          opening the left side menu and clicking 'Edit Data'), and set it
          again.
        </p>
        <p>
          FYI: you can select two or more past lessons to review different
          lessons too!
        </p>
      </div>
    ),
  },
  {
    header: "Why can't I click the past lessons button?",
    content: (
      <div>
        <p>
          Simply put, there's no data for this site on the browser you're using.
        </p>
        <p>Clearing your browser cache will erase all past lessons.</p>
        <p>
          You can{' '}
          <Link href="/contact">
            <a>contact</a>
          </Link>{' '}
          me, if needed.
        </p>
      </div>
    ),
  },
  {
    header: 'Buy you a coffee?',
    content: (
      <div>
        <p>If you want to, sure.</p>
        <p>
          The site is free to use and will be kept that way, so don't feel like
          you need to.
        </p>
        <p>
          With that said... I like coffee. Coffee is cheap. People can be
          generous.
        </p>
        <p>Any amount is appreciated.</p>
        <p>
          You can donate{' '}
          <a
            href="https://www.buymeacoffee.com/ycqPbFl"
            target="_blank"
            rel="noopener noreferrer"
          >
            here.
          </a>
        </p>
      </div>
    ),
  },
  {
    header: "I have a question that isn't listed above.",
    content: (
      <div>
        <p>
          Head to our{' '}
          <Link href="/contact">
            <a>contact</a>
          </Link>{' '}
          page.
        </p>
        <p>If you have an urgent question, use the Kakao group chat.</p>
      </div>
    ),
  },
];

export default function FaqsPage({
  panelColors,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <SeoWrapper
      title="Frequently Asked Questions"
      description="Have a question, but not sure if it's been asked before? Read through our extensive FAQs to see if it's already been answered."
    >
      <div>
        <div className="heading">
          <PageHeading style={{ marginInline: 0 }}>
            <p className="page_heading_p">Frequently</p>
            <p className="page_heading_p">Asked</p>
            <p className="page_heading_p">Questions</p>
          </PageHeading>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="130"
            viewBox="0 0 22 130"
            fill="none"
            className="heading-separator"
          >
            <path
              d="M12.7912 2C-16.809 17.2737 26.4143 22.4184 12.7912 39.2558C-0.831925 56.0933 -2.34239 58.9302 12.7912 79.4419C27.9248 99.9535 -18.027 99.7442 21 128"
              stroke="url(#paint0_linear)"
              strokeWidth="3"
            />
            <defs>
              <linearGradient
                id="paint0_linear"
                x1="10.7297"
                y1="2"
                x2="11.3269"
                y2="122.573"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#DC1515" stopOpacity="0.64" />
                <stop offset="1" stopColor="#079CF0" stopOpacity="0.52" />
              </linearGradient>
            </defs>
          </svg>

          <PageSubHeading
            style={{
              alignSelf: 'flex-end',
              color: '#565656',
              minWidth: 'auto',
              maxWidth: 'none',
              margin: 0,
            }}
          >
            <p className="page_subheading_p">First time here?</p>
            <p className="page_subheading_p">Experienced user?</p>
          </PageSubHeading>
        </div>

        <PageSubHeading>
          The Q&A below should help you out either way.
          <br />
          If not, feel free to contact me for further assistance.
        </PageSubHeading>

        <Accordion
          allowMultiOpenPanels
          panels={panels.map((panel, i) => ({
            ...panel,
            color: panelColors[i],
          }))}
        />

        <style jsx>{`
          .heading {
            display: flex;
            justify-content: center;
            margin-bottom: 0.5rem;
          }

          .page_heading_p {
            text-align: left;
            margin: 0;
          }

          .page_heading_p:first-letter {
            font-weight: bold;
          }

          .heading-separator {
            align-self: center;
            margin-top: 1rem;
            margin-left: 1.75rem;
            margin-right: 1.75rem;
            transform: rotateY(180deg);
          }

          .page_subheading_p {
            margin: 0;
            font-size: 1.5em;
            line-height: 150%;
          }

          .page_subheading_p:last-child {
            margin: 0.25rem 0 1rem;
          }
        `}</style>
      </div>
    </SeoWrapper>
  );
}

export const getStaticProps = async () => {
  const { colors } = await import('lib/colors');
  const mixedColors = shuffle(colors);
  return {
    props: {
      panelColors: mixedColors.slice(0, panels.length),
    },
  };
};
