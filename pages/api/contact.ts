import { NextApiHandler } from 'next';
import sgMail, { MailDataRequired } from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const ContactRoute: NextApiHandler<{ message: string }> = async (req, res) => {
  const { name, email, content } = req.body;

  const msg: MailDataRequired = {
    to: process.env.EMAIL,
    replyTo: email,
    // the from email needs to be addressed once I switch over to Vercel hosting
    // it should show up as contact@eslintherok.com
    from: email,
    subject: `Inquiry from ${name} - ESL in the ROK`,
    text: content,
    html: `<p>${content}</p>`,
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ message: 'Email sent' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export default ContactRoute;
