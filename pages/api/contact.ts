import { NextApiHandler } from 'next';
import sgMail, { MailDataRequired } from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const ContactRoute: NextApiHandler<{ message: string }> = async (req, res) => {
  const { name, email, content } = req.body;

  const msg: MailDataRequired = {
    to: process.env.EMAIL_INBOX,
    replyTo: email,
    from: process.env.EMAIL_FROM,
    subject: `Inquiry from ${name} - ESL in the ROK`,
    text: content,
    html: `<p>${content}</p>`,
  };

  try {
    if (!name) throw new Error('Name is Required');
    if (!email) throw new Error('Email is Required');
    if (!content) throw new Error('Content is Required');
    await sgMail.send(msg);
    res.status(200).json({ message: 'Email sent.' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export default ContactRoute;
