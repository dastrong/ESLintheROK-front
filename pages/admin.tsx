import React from 'react';
// import React, { useState } from 'react';
// import Script from 'next/script';
// import { ImCloudUpload, ImCloudCheck } from 'react-icons/im';
// import toast, { Toaster } from 'react-hot-toast';

import SeoWrapper from 'components/SeoWrapper';
// import Button from 'components/Button';
import { PageHeading, PageSubHeading } from 'components/PageHeadings';

declare global {
  interface Window {
    cloudinary: any;
  }
}

export default function AdminPage() {
  // const [widget, setWidget] = useState(null);
  // const [imgUploaded, setImgUploaded] = useState(false);

  // const grade = Math.floor(Math.random() * 1000);
  // const publisher = 'YBM'.toUpperCase();
  // const author = 'Daniel'.toUpperCase();
  // const bookName = `${grade}_${publisher}_${author}`;

  return (
    <SeoWrapper title="Admin">
      {/* <Toaster /> */}

      <PageHeading>Admin Page</PageHeading>
      {/* <PageSubHeading>
        Please login or request access to continue.
      </PageSubHeading> */}
      <PageSubHeading>Nothing to see here.</PageSubHeading>

      {/* <Button
        rounded
        color="#fff"
        bgColor="#46b8f5"
        text={imgUploaded ? 'Uploaded Image' : 'Upload Image'}
        Icon={imgUploaded ? ImCloudCheck : ImCloudUpload}
        spinner={!widget}
        onClick={() => widget?.open()}
        disabled={!widget || imgUploaded}
      />

      <Button
        rounded
        color="#fff"
        bgColor="#b9b9b9"
        text="Show Toast"
        onClick={() => toast('Hello Toast :)')}
      />

      <Script
        src="https://widget.cloudinary.com/v2.0/global/all.js"
        strategy="afterInteractive"
        onLoad={() =>
          setWidget(
            window.cloudinary.createUploadWidget(
              {
                cloudName: 'dastrong',
                uploadPreset: 'eslintherok-books',
                publicId: bookName,
                sources: ['local'],
                multiple: false,
                maxFiles: 1,
                cropping: true,
                showSkipCropButton: false,
                croppingAspectRatio: 0.77,
              },
              (error, result) => {
                if (error) {
                  window.cloudinary.close();
                  toast.error(error.status);
                }
                if (result.event === 'success') {
                  setImgUploaded(true);
                  toast.success('Image Successfully Uploaded');
                }
              }
            )
          )
        }
      /> */}
    </SeoWrapper>
  );
}
