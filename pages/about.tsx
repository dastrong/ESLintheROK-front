import React from 'react';
import Button from 'components/Button';
import Checkbox from 'components/Checkbox';
import Input from 'components/Input';
import Range from 'components/Range';
import TextArea from 'components/TextArea';

export default function AboutPage() {
  return (
    <div>
      <p>About Page</p>

      <Button textColor="white" bgColor="var(--color-blue-400)" />
      <Button textColor="white" bgColor="yellow" />
      <Checkbox />
      <Input />
      <Range min={0} max={100} />
      <TextArea defaultValue="Hey" />

      <style jsx>{``}</style>
    </div>
  );
}
