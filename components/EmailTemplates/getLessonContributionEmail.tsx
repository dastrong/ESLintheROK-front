import { render, MjmlText, MjmlSpacer, MjmlButton } from 'mjml-react';
import EmailWrapper from './EmailWrapper';

type Props = {
  url: string;
  code: string;
};

export default function getLessonContributionEmail({ url, code }: Props) {
  const { html, errors } = render(
    <EmailWrapper
      title="Lesson Contribution - ESL in the ROK"
      notice="If you did not request this email, you can safely ignore it."
    >
      <MjmlText
        font-size="20px"
        font-family="Comic Neue, cursive"
        align="center"
        line-height="30px"
        color="#414141"
      >
        Thanks for offering to make a contribution to our lessons collection!
      </MjmlText>

      <MjmlSpacer height="8px" />

      <MjmlText
        font-size="16px"
        font-family="Comic Neue, cursive"
        align="center"
        line-height="20px"
        color="#414141"
      >
        Use the link or code below to gain access.
      </MjmlText>

      <MjmlSpacer height="4px" />

      <MjmlButton
        href={url}
        target="_blank"
        background-color="#2b7cd0"
        font-size="18px"
        font-family="Comic Neue, cursive"
        border-radius="1000px"
      >
        Get Started
      </MjmlButton>

      <MjmlText
        font-size="36px"
        font-family="Comic Neue, cursive"
        align="center"
        color="#5a5c62"
        letter-spacing="18px"
        padding-left="18px"
        padding-right="0px"
      >
        {code}
      </MjmlText>

      <MjmlSpacer height="8px" />

      <MjmlText
        font-size="16px"
        font-family="Comic Neue, cursive"
        align="center"
        line-height="20px"
        color="#414141"
      >
        If not activated. the code will expire within 24 hours. Once activated,
        you have 28 hours before your access expires.
      </MjmlText>

      <MjmlText
        font-size="16px"
        font-family="Comic Neue, cursive"
        align="center"
        line-height="20px"
        color="#414141"
      >
        If you need more time, contact us to get an extension.
      </MjmlText>
    </EmailWrapper>
  );

  if (errors.length) {
    console.log(errors);
    return;
  }

  const text = `Please use the following code to access and contribute at ESL in the ROK: ${code}`;

  return { html, text };
}
