import React, { useEffect, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import { toast, Toaster } from 'react-hot-toast';
import { RiSendPlaneFill } from 'react-icons/ri';

import { useStore } from 'contexts/store';
import { useSetter } from 'contexts/setter';
import { apiFetchToken } from 'utils/fetchers';
import useUserSession from 'hooks/useUserSession';

import Button from 'components/Button';
import InlineForm from 'components/InlineForm';
import { PageSubHeading } from 'components/PageHeadings';

type Props = {
  show: boolean;
  setShow: (show: boolean) => void;
  defaultTitle?: string;
  vocabulary: string[];
  expressions: string[];
};

export default function SaveDataScreen({
  show,
  setShow,
  defaultTitle,
  vocabulary,
  expressions,
}: Props) {
  const { session } = useUserSession();

  const { sufficientData } = useSetter();
  const { storeDispatch } = useStore();
  const setData = () => {
    setShow(false);
    setShowTitle(false);
    storeDispatch({ type: 'Set_Data', vocabulary, expressions });
  };

  const [showTitle, setShowTitle] = useState(false);
  const [title, setTitle] = useState(defaultTitle || '');

  useEffect(() => {
    setTitle(defaultTitle || '');
  }, [defaultTitle]);

  const titleContainerSpring = useSpring({
    x: showTitle ? '0%' : '100%',
    opacity: showTitle ? 1 : 0,
  });
  const confirmationContainerSpring = useSpring({
    x: !showTitle ? '0%' : '-100%',
    opacity: !showTitle ? 1 : 0,
  });

  const handleSaveAndSet = async () => {
    // function to send the new data to our API to update it
    await apiFetchToken(
      `/past-lesson`,
      {
        method: 'POST',
        body: JSON.stringify({ title, vocabulary, expressions }),
      },
      session?.accessToken
    );
    storeDispatch({ type: 'Set_Data', vocabulary, expressions });
  };

  return (
    <>
      <Toaster />

      <div
        className="save_container"
        style={{
          opacity: show ? 1 : 0,
          pointerEvents: show ? 'inherit' : 'none',
        }}
      >
        <div>
          <animated.div
            style={{ ...confirmationContainerSpring, position: 'absolute' }}
          >
            <PageSubHeading style={{ marginBottom: 16 }}>
              Do you want to save this lesson to your account?
            </PageSubHeading>
            <div className="button_container">
              <Button
                color="white"
                bgColor="#db2828"
                text="Nope. Just set the data temporarily."
                onClick={setData}
              />
              <Button
                color="white"
                bgColor="#2185d0"
                text="Yes! Save and set it please."
                onClick={() => setShowTitle(true)}
                style={{ marginLeft: 16 }}
              />
            </div>
          </animated.div>
          <animated.div
            style={{ ...titleContainerSpring, position: 'absolute' }}
          >
            <PageSubHeading style={{ marginBottom: 16 }}>
              Before we save it, please give your lesson a title!
            </PageSubHeading>
            <div>
              <InlineForm
                placeholder="Give this lesson a title here"
                value={title}
                onChange={setTitle}
                onSubmit={() =>
                  toast.promise(handleSaveAndSet(), {
                    loading: 'One moment please...',
                    success: <b>Saved and set.</b>,
                    error: err => err,
                  })
                }
                disabled={!title || !sufficientData}
                Icon={RiSendPlaneFill}
                style={{ margin: '0 1rem 0 0' }}
              />
              <Button
                color="white"
                bgColor="orangered"
                text="Cancel"
                onClick={() => {
                  setShow(false);
                  setShowTitle(false);
                }}
                style={{
                  height: 44,
                  boxShadow: '0 0.25rem 0.25rem 0 rgb(34 36 38 / 15%)',
                }}
              />
            </div>
          </animated.div>
        </div>
        <style jsx>{`
          .save_container {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background: linear-gradient(180deg, #fff, var(--siteBgColor), #fff);
            transition: opacity 1s;
          }

          div:not(.save_container) {
            position: relative;
            height: 100%;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
          }
        `}</style>
      </div>
    </>
  );
}
