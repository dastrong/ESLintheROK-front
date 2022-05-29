# Email Templates

We use [MJML React](https://github.com/wix-incubator/mjml-react) to create styled, dynamic email templates.

## Previewing an Email

You can edit and preview email templates on [MJML's Try It Live](https://mjml.io/try-it-live) page. Take note that this live preview page uses the traditional MJML syntax and NOT the React one that our templates will ultimately use. Luckily their editor has auto-complete for their syntax, so it's easy to transfer between the syntaxes.

## Email Wrapper

To keep email styling consistent, there's an EmailWrapper component that provides a nice starting point. You just need to put the inner parts and declare the `title` and `notice`.

## Starter Template

You may copy and paste this starter template into the live editor mentioned above to get started quickly.

```html
<mjml>
  <mj-head>
    <mj-title>Title</mj-title>
    <mj-font
      name="Comic Neue"
      href="https://fonts.googleapis.com/css2?family=Comic+Neue"
    />
  </mj-head>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-image
          width="75px"
          height="76px"
          href="http://localhost:3000"
          src="https://res.cloudinary.com/dastrong/image/upload/c_scale,q_80,w_75/ESLintheROK/logo.png"
        />

        <mj-text
          font-family="Comic Neue, cursive"
          align="center"
          font-size="36px"
          color="#565656"
        >
          ESL in the ROK
        </mj-text>

        <mj-divider border-color="#e4b1ec" width="95%" />

        <mj-text
          font-size="20px"
          font-family="Comic Neue, cursive"
          align="center"
          line-height="30px"
          color="#414141"
        >
          Larger Text
        </mj-text>

        <mj-spacer height="8px" />

        <mj-text
          font-size="16px"
          font-family="Comic Neue, cursive"
          align="center"
          line-height="20px"
          color="#414141"
        >
          Normal Text
        </mj-text>

        <mj-spacer height="4px" />

        <mj-button
          href="{url}"
          target="_blank"
          background-color="#2b7cd0"
          font-size="18px"
          font-family="Comic Neue, cursive"
          border-radius="1000px"
        >
          Button Text
        </mj-button>

        <mj-text
          font-size="36px"
          font-family="Comic Neue, cursive"
          align="center"
          color="#5a5c62"
          letter-spacing="18px"
          padding-left="18px"
          padding-right="0px"
        >
          Code Text
        </mj-text>

        <mj-spacer height="8px" />

        <mj-text
          font-size="16px"
          font-family="Comic Neue, cursive"
          align="center"
          line-height="20px"
          color="#414141"
        >
          Normal Text
        </mj-text>

        <mj-text
          font-size="16px"
          font-family="Comic Neue, cursive"
          align="center"
          line-height="20px"
          color="#414141"
        >
          Normal Text
        </mj-text>

        <mj-spacer height="8px" />

        <mj-divider border-color="#e4b1ec" width="95%" />

        <mj-text
          font-size="14px"
          font-family="Comic Neue, cursive"
          align="center"
          line-height="21px"
          color="#6c6c6c"
        >
          If you did not request this email, you can safely ignore it.
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
```
