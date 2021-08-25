import React from 'react';
import Link from 'next/link';
import SeoWrapper from 'components/SeoWrapper';
import { PageHeading, PageSubHeading } from 'components/PageHeadings';
import PageContent from 'components/PageContent';

export default function ContributePage() {
  return (
    <SeoWrapper
      title="Contribute"
      description="There's no better way to feel included in a community than by contributing to it. Look around and find something that you feel comfortable doing."
    >
      <div>
        <PageHeading>Contribute</PageHeading>
        <PageSubHeading>
          Want to contribute something to the community? Upload your book's
          data, learn to code to your very own game or get your creative juices
          flowing by designing a brand new game.
        </PageSubHeading>

        <PageContent>
          <PageContent.Header id="teacher">Teachers</PageContent.Header>
          <PageContent.Text>
            If you're a teacher, you most likely have a textbook to follow.
            Please consider spending a little bit of your time now to upload
            your book data, so you and others can use it quickly.{' '}
            <Link href="/contact">
              <a>Contact me</a>
            </Link>{' '}
            now to get started.
          </PageContent.Text>

          <PageContent.Header id="designer">Designers</PageContent.Header>
          <PageContent.Text>
            Designing (good) games can be long process, but it can be very
            rewarding when it's all complete. We use Figma to work and
            collaborate in to simplify the entire process. If you're interested
            in designing something, please{' '}
            <Link href="/contact">
              <a>contact me</a>
            </Link>{' '}
            to be added to our Figma team.
          </PageContent.Text>
          <PageContent.List>
            <li>
              Figma Game Cover Images -{' '}
              <a href="https://www.figma.com/file/vbFvLGCLPnwo00NyPhHK0U/Game-Cover-Photos?node-id=0%3A1">
                Link
              </a>
            </li>
            <li>
              Figma Game Designs- <a>No Link Currently</a>
            </li>
          </PageContent.List>

          <PageContent.Header id="developer">Developers</PageContent.Header>
          <PageContent.Text>
            While maintaining a production website there's always something to
            work on. You can visit our GitHub repo to view current issues or
            create one of your own. Feel free to{' '}
            <Link href="/contact">
              <a>contact me</a>
            </Link>{' '}
            directly to start a discussion too.
          </PageContent.Text>
          <PageContent.List>
            <li>
              GitHub Repo -{' '}
              <a href="https://github.com/dastrong/ESLintheROK-front">Link</a>
            </li>
            <li>
              GitHub Issues -{' '}
              <a href="https://github.com/dastrong/ESLintheROK-front/issues">
                Link
              </a>
            </li>
          </PageContent.List>
        </PageContent>
      </div>
    </SeoWrapper>
  );
}
