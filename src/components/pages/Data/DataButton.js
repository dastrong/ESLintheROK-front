import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

const DataButton = ({
  isAPI, isGameReady, isDataReady, dataChanged, sendData, postData, vocabulary, expressions, chapter, title
}) => (
  isAPI 
    ? <Button
        fluid
        className='submit-data-btn'
        disabled={!isDataReady}
        onClick={()=> postData({ vocabulary, expressions, chapter, title })}
        color='green'
        content={
          !isDataReady 
            ? 'Please complete all the fields marked with red.'
            : "Thanks! Submit lesson."
        }
      />
    : <Button
        fluid
        className='submit-data-btn'
        disabled={!isDataReady}
        as={!isGameReady || dataChanged ? 'button' : Link}
        onClick={sendData}
        to={{
          pathname: "/games",
          state: { pageTransition:'slideUp' }
        }}
        color={!isDataReady || dataChanged || !isGameReady ? 'blue' : 'green'}
        content={
          !isDataReady ? "Please enter more vocabulary or expressions"
            : dataChanged ? "Ready? Set your data again, please."
              : !isGameReady ? 'Finished editing? Set your data!'
                : "Success! Go to game selections screen."
        }
      />
)

export default DataButton;