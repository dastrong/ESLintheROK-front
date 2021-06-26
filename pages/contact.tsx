import React, { FormEvent, useState } from 'react';
import Button from 'components/Button';
import { InputCSS } from 'components/Styles';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, content }),
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <h1 className="heading">Contact</h1>

      <div className="sub-heading">
        <p>
          I’d love to hear from you. Contact me directly or join an existing
          thread somewhere to chat with other teachers and I.
        </p>
      </div>

      <div className="contact">
        <div className="contact_panel email">
          <h3>Email</h3>
          <p>Contact the developer</p>
          <form onSubmit={handleSubmit}>
            <input
              required
              className={InputCSS.className}
              placeholder="Your name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <input
              required
              className={InputCSS.className}
              placeholder="Your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <textarea
              required
              className={InputCSS.className}
              placeholder="Your question or message here"
              value={content}
              onChange={e => setContent(e.target.value)}
            />
            <Button
              full
              type="submit"
              text="Submit"
              color="white"
              bgColor="green"
            />
          </form>
        </div>
        <div className="contact_panel interactive">
          <h3>Interactive</h3>
          <p>Click or scan a code below to join a conversation</p>
        </div>
      </div>

      {InputCSS.styles}

      <style jsx>{`
        .heading {
          margin: 2rem auto 1.25rem;
          text-align: center;
          color: #414141;
          font-size: 3.5rem;
          font-weight: normal;
        }

        .sub-heading {
          color: #5a5c62;
          font-size: 1.3rem;
          line-height: 150%;
          margin: 0 auto;
          max-width: 600px;
          text-align: center;
        }

        .contact {
          width: 100%;
          max-width: 767px;
          margin: 2rem auto;
          display: flex;
          justify-content: space-between;
        }

        .contact_panel {
          position: relative;
          box-sizing: border-box;
          width: 49%;
          background-color: var(--bgColor);
          padding: var(--padding);
          padding-top: calc(var(--padding) + var(--radius));
          border-radius: var(--radius);
          display: flex;
          flex-direction: column;

          --radius: 10px;
          --padding: 1rem;
        }

        .contact_panel:before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 10px;
          border-top-left-radius: var(--radius);
          border-top-right-radius: var(--radius);
          background-color: var(--accentColor);
        }

        .email {
          --bgColor: rgba(57, 184, 255, 0.1);
          --accentColor: rgba(57, 184, 255, 1);
        }

        .interactive {
          --bgColor: rgba(181, 15, 239, 0.1);
          --accentColor: rgba(181, 15, 239, 1);
        }

        .contact_panel h3 {
          font-size: 1.5rem;
          margin: 0 auto 0.75rem;
        }

        .contact_panel p {
          font-size: 1rem;
          margin: 0 auto 1rem;
          color: #5a5c62;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
