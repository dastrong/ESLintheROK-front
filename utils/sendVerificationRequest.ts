import nodemailer from 'nodemailer';
import { SendVerificationRequest } from 'next-auth/providers';
import logger from 'next-auth/dist/lib/logger';
import { getVerifyEmail } from 'components/EmailTemplates';

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
          logger.error('SEND_VERIFICATION_EMAIL_ERROR', email, error);
          return reject(
            new Error(
              logger.error('SEND_VERIFICATION_EMAIL_ERROR', email, error)
            )
          );
        }
        return resolve();
      }
    );
  });
};
