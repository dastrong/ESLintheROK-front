import { render, MjmlText, MjmlSpacer, MjmlButton } from 'mjml-react';
import EmailWrapper from './EmailWrapper';

type Props = {
  url: string;
  code: string;
};

export default function getVerifyEmail({ url, code }: Props): {
  html: string;
  text: string;
} {
  const { html, errors } = render(
    <EmailWrapper
      title="Verification - ESL in the ROK"
      notice="If you did not request this email, you can safely ignore it."
    >
      <MjmlText
        font-size="20px"
        font-family="Comic Neue, cursive"
        align="center"
        line-height="30px"
        color="#414141"
      >
        Please complete the verification below to access your account
      </MjmlText>

      <MjmlSpacer height="8px" />

      <MjmlButton
        href={url}
        target="_blank"
        background-color="#2b7cd0"
        font-size="18px"
        font-family="Comic Neue, cursive"
        border-radius="1000px"
      >
        Sign In Now
      </MjmlButton>

      <MjmlText
        font-size="16px"
        font-family="Comic Neue, cursive"
        align="center"
        color="#5e5d5d"
        line-height="32px"
      >
        Or use the code below to verify
      </MjmlText>

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
    </EmailWrapper>
  );

  if (errors.length) {
    console.log(errors);
    return;
  }

  const text = `Please enter the following code to complete your login at ESL in the ROK: ${code}`;

  return { html, text };
}
