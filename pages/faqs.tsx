import Accordion from 'components/Accordion';
import Link from 'next/link';
import React from 'react';

const panels = [
  {
    header: 'What is this site?',
    content: (
      <p>
        For starters, read about us{' '}
        <Link href="/about">
          <a>here</a>
        </Link>
        .
      </p>
    ),
  },

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

export default function FaqsPage() {
  return (
    <div>
      <p>FAQs Page</p>

      <Accordion panels={panels} />
      <style jsx>{``}</style>
    </div>
  );
}
