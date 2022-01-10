import nodemailer from 'nodemailer';
import { SendVerificationRequest } from 'next-auth/providers';
import { getVerifyEmail } from 'components/EmailTemplates';

const logger = (code: string, ...message: any[]) =>
  console.error(
    `[next-auth][error][${code.toLowerCase()}]`,
    `\nhttps://next-auth.js.org/errors#${code.toLowerCase()}`,
    ...message
  );

export const sendVerificationRequest: SendVerificationRequest = ({
  identifier: email,
  url,
  token,
  provider,
}) => {
  return new Promise((resolve, reject) => {
    const { server, from } = provider;

    // get formatted emails
    const { html, text } = getVerifyEmail({ url, code: token });

    nodemailer.createTransport(server).sendMail(
      {
        to: email,
        from,
        subject: 'Verification - ESL in the ROK',
        text,
        html,
      },
      error => {
        if (error) {
          logger('SEND_VERIFICATION_EMAIL_ERROR', email, error);
          return reject(new Error('SEND_VERIFICATION_EMAIL_ERROR'));
        }
        return resolve();
      }
    );
  });
};
