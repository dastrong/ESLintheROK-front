import React, {
  forwardRef,
  FormEvent,
  ForwardedRef,
  CSSProperties,
} from 'react';
import { FaPlus } from 'react-icons/fa';
import Button from 'components/Button';
import { InputCSS } from 'components/Styles';

type Props = {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  style?: CSSProperties;
};

const InlineForm = forwardRef(
  (
    { placeholder, value, onChange, onSubmit, style }: Props,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <form
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
          onSubmit(value);
        }}
        style={style}
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
          size="sm"
          color="white"
          bgColor="#027E1B"
          style={{
            position: 'absolute',
            right: '4px',
            top: '4px',
            height: '38px',
          }}
          type="submit"
        />

        {InputCSS.styles}
        <style jsx>{`
          form {
            position: relative;
            width: 100%;
            max-width: 325px;
            margin-bottom: 1rem;
          }

          input {
            padding-right: calc(1rem + 44px);
          }
        `}</style>
      </form>
    );
  }
);

export default InlineForm;
