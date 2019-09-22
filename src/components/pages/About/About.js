import React from "react";
import PageHeader from "@Reusable/PageHeader";
import TextLink from "@Reusable/TextLink";
import StyledContainer from "@Reusable/StyledContainer";
import useDocumentTitle from "hooks/useDocumentTitle";

export default function About() {
  useDocumentTitle("About - ESL in the ROK");

  return (
    <>
      <PageHeader icon="user" text="Learn more about us" color="blue" />
      <StyledContainer cx="about">
        <h1>The Site</h1>
        <p>I was created to assist public school English teachers in Korea.</p>
        <p>
          I'm responsive, adjustable and loaded with helpful shortcuts to improve your
          experience. I'm far superior to my powerpoint counterpart (you won't experience
          any blue screen of death with me either).
        </p>
        <p>And I'm completely free-to-use!</p>
        <p>
          If you have any questions, head over to my
          <TextLink path="faq" text=" FAQs." />
        </p>
        <h1>The Creator</h1>
        <p>Hey, I'm Daniel.</p>
        <p>Currently, I work at two public elementary schools for the GOE in Changwon.</p>
        <p>
          For the last year or so, I've been learning how to program and this site is my
          latest creation. It took me nearly four months of nights and weekends to produce
          a site that I was confident could and would be utilized around Korea.
        </p>
        <p>
          If there are any developers out there that want to help improve site features or
          create new games, <TextLink path="contact" text=" contact " />
          me to discuss.
        </p>
      </StyledContainer>
    </>
  );
}
