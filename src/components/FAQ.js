import React from "react";
import { Accordion } from "semantic-ui-react";
import PageHeader from "./reusable/PageHeader";
import TextLink from "./reusable/TextLink";
import useDocumentTitle from "../hooks/useDocumentTitle";
import "./_Info.css";

export default function FAQ() {
  useDocumentTitle("FAQ - ESL in the ROK");

  return (
    <>
      <PageHeader icon="question" text="View frequently asked questions" color="blue" />
      <div className="page-container">
        <div className="content-info">
          <Accordion defaultActiveIndex={0} panels={panels} />
        </div>
      </div>
    </>
  );
}

const panels = [
  {
    key: "What-is-this-site",
    title: "What is this site?",
    content: {
      key: "What-is-this-site-content",
      content: (
        <p>
          For starters, read about us <TextLink path="about" text=" here" />.
        </p>
      ),
    },
  },
  {
    key: "question-that-isn't-listed-below",
    title: "I have a question that isn't listed below.",
    content: {
      key: "question-that-isn't-listed-below-content",
      content: (
        <div>
          <p>
            Head to our <TextLink path="contact" text=" contact " />
            page.
          </p>
          <p>If you have an urgent question, use the Kakao group chat.</p>
        </div>
      ),
    },
  },
  {
    key: "Who-is-this-site-for",
    title: "Who is this site for?",
    content: {
      key: "Who-is-this-site-for-content",
      content: (
        <div>
          <p>English public school teachers in South Korea will benefit the most.</p>
          <p>
            Although anyone can enter their own material and modify the gameplay rules to
            accommodate classes.
          </p>
        </div>
      ),
    },
  },
  {
    key: "Are-there-any-fees",
    title: "Are there any fees?",
    content: {
      key: "Are-there-any-fees-content",
      content: (
        <div>
          <p>Unlike other websites, this one is completely free to use.</p>
          <p>
            However, if you would like to support me, you can buy me a coffee{" "}
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
  },
  {
    key: "Did-you-invent-all-these-games",
    title: "Did you invent all these games?",
    content: {
      key: "Did-you-invent-all-these-games-content",
      content: (
        <div>
          <p>Not all of them.</p>
          <p>If you know the creator of a game or want credit yourself, contact me.</p>
        </div>
      ),
    },
  },
  {
    key: "Will-you-be-adding-more-games",
    title: "Will you be adding more games?",
    content: {
      key: "Will-you-be-adding-more-games-content",
      content: (
        <div>
          <p>Yes!</p>
          <p>
            There are a couple other games that I'd like to add finding free time is hard.
          </p>
        </div>
      ),
    },
  },
  {
    key: "Will-you-be-adding-any-bomb-games",
    title: "Will you be adding any bomb games?",
    content: {
      key: "Will-you-be-adding-any-bomb-games-content",
      content: (
        <div>
          <p>Sorry, but no.</p>
          <p>I don't want any copyright issues and those PPTs are great as is.</p>
        </div>
      ),
    },
  },
  {
    key: "made-a-powerpoint-game",
    title: "I made a powerpoint game, can you recreate it here?",
    content: {
      key: "made-a-powerpoint-game-content",
      content: (
        <div>
          <p>It depends.</p>
          <p>
            <TextLink path="contact" text="Contact " />
            me to discuss.
          </p>
        </div>
      ),
    },
  },
  {
    key: "How-do-I-use-the-games",
    title: "How do I use the games?",
    content: {
      key: "How-do-I-use-the-games-content",
      content: (
        <div>
          <p>
            Each game has a teacher and student instructions page with English and Korean
            languages.
          </p>
          <p>
            To view helpful shortcuts: hover your mouse over the top-right (while in the
            game) and an icon will appear. Click it.
          </p>
          <p>Each games plays differently, but most tricks work across games.</p>
        </div>
      ),
    },
  },
  {
    key: "lessons-data-slow-to-load",
    title: "Why is the lessons data slow to load?",
    content: {
      key: "lessons-data-slow-to-load-content",
      content: (
        <div>
          <p>One server goes to sleep after 30 minutes, if it's not interacted with.</p>
          <p>If you are the person to wake it up, it'll take a couple seconds.</p>
          <p>
            In my tests, if it's awake it'll load under 2 seconds. The wake up process
            should take under 10 seconds.
          </p>
        </div>
      ),
    },
  },
  {
    key: "where-did-my-data-go",
    title: "I lost my data, where did my data go?",
    content: {
      key: "where-did-my-data-go-content",
      content: (
        <div>
          <p>
            This site is build differently than other's you might use and that was on
            purpose.
          </p>
          <p>If your browser tab refreshed the data you were using will be reset.</p>
          <p>
            However, if you click the past lessons button on the
            <TextLink path="" text=" home page " />
            you can use your data again.
          </p>
        </div>
      ),
    },
  },
  {
    key: "past-lessons",
    title: "What's that past lessons button for?",
    content: {
      key: "past-lessons-content",
      content: (
        <div>
          <p>By popular request, I've added a way to use your past lessons.</p>
          <p>Whenever you set data, it will save your data to your browser.</p>
          <p>
            If you want to edit one of your lessons, check it, set it, edit it (by opening
            the left side menu and clicking 'Edit Data'), and set it again.
          </p>
          <p>
            FYI: you can select two or more past lessons to review different lessons too!
          </p>
        </div>
      ),
    },
  },
  {
    key: "past-lessons-not-clickable",
    title: "Why can't I click the past lessons button?",
    content: {
      key: "past-lessons-not-clickable-content",
      content: (
        <div>
          <p>Simply put, there's no data for this site on the browser you're using.</p>
          <p>Clearing your browser cache will erase all past lessons.</p>
          <p>
            You can <TextLink path="contact" text=" contact " />
            me, if needed.
          </p>
        </div>
      ),
    },
  },
  {
    key: "buy-me-a-coffee",
    title: "Buy you a coffee?",
    content: {
      key: "buy-me-a-coffee-content",
      content: (
        <div>
          <p>If you want to, sure.</p>
          <p>
            The site is free to use and will be kept that way, so don't feel like you need
            to.
          </p>
          <p>With that said... I like coffee. Coffee is cheap. People can be generous.</p>
          <p>Any amount is appreciated.</p>
          <p>
            You can donate{" "}
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
  },
];
