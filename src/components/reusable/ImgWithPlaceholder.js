import React, { useState } from "react";
import { Image, Placeholder } from "semantic-ui-react";
import "./ImgWithPlaceholder.css";

export default function ImgWithPlaceHolder(props) {
  const [isLoading, toggle] = useState(true);

  return (
    <>
      <Image {...props} hidden={isLoading} onLoad={() => toggle(false)} />
      {isLoading && (
        <Placeholder className="img-placeholder">
          <Placeholder.Image rectangular />
        </Placeholder>
      )}
    </>
  );
}
