import React, { FormEvent, useState } from 'react';
import Button from 'components/Button';
import { PageHeading, PageSubHeading } from 'components/PageHeadings';
import { InputCSS } from 'components/Styles';
import QrKakao from 'components/Svgs/qr_kakao.svg';
import QrKorshare from 'components/Svgs/qr_korshare.svg';
import QrWaygook from 'components/Svgs/qr_waygook.svg';

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
      <PageHeading>Get In Touch</PageHeading>
      <PageSubHeading>
        I’d love to hear from you. Contact me directly or join an existing
        thread somewhere to chat with other teachers and I.
      </PageSubHeading>

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
              rows={5}
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
          <p>Click/Scan a code below to join a conversation</p>
          <div className="interactive_options">
            {/* KAKAO */}
            <div className="interactive_option">
              <div>
                <h5>KakaoTalk</h5>
                <p>
                  Join our chat room to get a short, quick question answered.
                </p>
              </div>
              <a href="https://open.kakao.com/o/giDzG30?rt=Q" target="_blank">
                <QrKakao
                  style={{ fill: 'purple', height: 110, display: 'block' }}
                />
              </a>
            </div>

            {/* KORSHARE */}
            <div className="interactive_option">
              <div>
                <h5>KorShare.org</h5>
                <p>
                  Newish forum for ESL teachers to share materials and converse.
                </p>
              </div>
              <a
                href="http://korshare.org/index.php?showtopic=2261"
                target="_blank"
              >
                <QrKorshare
                  style={{ fill: '#1060e2', height: 110, display: 'block' }}
                />
              </a>
            </div>

            {/* WAYGOOK */}
            <div className="interactive_option">
              <div>
                <h5>Waygook.org</h5>
                <p>The original ESL forum for ESL teachers in South Korea.</p>
              </div>
              <a
                href="https://www.waygook.org/index.php?topic=114421.0"
                target="_blank"
              >
                <QrWaygook
                  style={{ fill: 'green', height: 110, display: 'block' }}
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {InputCSS.styles}

      <style jsx>{`
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
          width: 47%;
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
          --bgColor: rgb(184, 226, 250);
          --accentColor: rgba(57, 184, 255, 1);
        }

        .interactive {
          --bgColor: rgb(237, 203, 250);
          --accentColor: rgba(181, 15, 239, 1);
        }

        .contact_panel h3 {
          font-size: 1.8rem;
          margin: 0 auto 0.75rem;
        }

        .contact_panel p {
          font-size: 1rem;
          margin: 0 auto 1rem;
          color: #5a5c62;
          text-align: center;
        }

        form {
          width: 100%;
          margin: 1rem auto 0;
        }

        input,
        textarea {
          margin-bottom: 1.5rem;
        }

        .interactive_options {
          margin: 1rem 0 0;
        }

        .interactive_options h5 {
          margin: 0 0 1rem;
          font-size: 1.4rem;
        }

        .interactive_option {
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          text-align: left;
          margin: 1.25rem auto;
        }

        .interactive_option:first-child {
          margin-top: 0;
        }

        .interactive_option:last-child {
          margin-bottom: 0;
        }

        .interactive_option:nth-child(even) {
          flex-direction: row-reverse;
        }

        .interactive_option p {
          margin-bottom: 0;
          text-align: left;
          font-size: 1rem;
        }

        .interactive_option div {
          width: 50%;
        }
      `}</style>
    </div>
  );
}
