import {
  Mjml,
  MjmlTitle,
  MjmlHead,
  MjmlFont,
  MjmlBody,
  MjmlSection,
  MjmlColumn,
  MjmlImage,
  MjmlText,
  MjmlDivider,
} from 'mjml-react';

export type EmailProps = {
  title: string;
  notice: string;
  children: React.ReactNode;
};

export default function EmailWrapper({ title, notice, children }: EmailProps) {
  return (
    <Mjml>
      <MjmlHead>
        <MjmlTitle>{title}</MjmlTitle>
        <MjmlFont
          name="Comic Neue"
          href="https://fonts.googleapis.com/css2?family=Comic+Neue"
        />
      </MjmlHead>

      <MjmlBody>
        <MjmlSection>
          <MjmlColumn>
            <MjmlImage
              width="75px"
              height="76px"
              href="http://localhost:3000"
              src="https://res.cloudinary.com/dastrong/image/upload/c_scale,q_80,w_75/ESLintheROK/logo.png"
            />

            <MjmlText
              font-family="Comic Neue, cursive"
              align="center"
              font-size="36px"
              color="#565656"
            >
              ESL in the ROK
            </MjmlText>

            <MjmlDivider border-color="#e4b1ec" width="95%" />

            {children}

            <MjmlDivider border-color="#e4b1ec" width="95%" />

            <MjmlText
              font-size="14px"
              font-family="Comic Neue, cursive"
              align="center"
              line-height="21px"
              color="#6c6c6c"
            >
              {notice}
            </MjmlText>
          </MjmlColumn>
        </MjmlSection>
      </MjmlBody>
    </Mjml>
  );
}
