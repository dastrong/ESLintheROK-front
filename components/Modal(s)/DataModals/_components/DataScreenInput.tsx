import React, { forwardRef, FormEvent, ForwardedRef } from 'react';
import { FaPlus } from 'react-icons/fa';
import Button from 'components/Button';
import { InputCSS } from 'components/Styles';

type Props = {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
};

const DataScreenInput = forwardRef(
  (
    { placeholder, value, onChange, onSubmit }: Props,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <form
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
          onSubmit(value);
        }}
      >
        <input
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          className={InputCSS.className}
          ref={ref}
        />
        <Button
          Icon={FaPlus}
          color="white"
          bgColor="#027E1B"
          style={{ position: 'absolute', right: 0, height: 'inherit' }}
          text=""
          type="submit"
        />

        {InputCSS.styles}
        <style jsx>{`
          form {
            height: 40px;
            position: relative;
            width: 100%;
            max-width: 300px;
            margin-bottom: 1rem;
          }

          input {
            margin-bottom: 1rem;
            width: 100%;
            font-size: 0.9rem;
            height: inherit;
            border-radius: 0.5rem;
            box-shadow: 0px 4px 4px 0px #dbd8d8;
            padding-right: calc(1rem + 48px);
          }
        `}</style>
      </form>
    );
  }
);

export default DataScreenInput;
