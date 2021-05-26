import React from 'react';
import Button from 'components/Button';
import Checkbox from 'components/Checkbox';
import Input from 'components/Input';
import Range from 'components/Range';
import TextArea from 'components/TextArea';
import { FaAddressBook } from 'react-icons/fa';

export default function AboutPage() {
  return (
    <div>
      <p>About Page</p>

      <div>
        <Button
          color="white"
          bgColor="var(--color-blue-400)"
          Icon={FaAddressBook}
          text="Address Book Button"
          size="xl"
        />
        <Button
          color="white"
          bgColor="var(--color-blue-400)"
          Icon={FaAddressBook}
          text="Address Book Button"
          size="lg"
        />
        <Button
          color="white"
          bgColor="var(--color-blue-400)"
          Icon={FaAddressBook}
          text="Address Book Button"
          size="md"
          spinner
        />
        <Button
          color="white"
          bgColor="var(--color-blue-400)"
          Icon={FaAddressBook}
          text="Address Book Button"
          size="sm"
        />
        <Button
          color="white"
          bgColor="var(--color-blue-400)"
          Icon={FaAddressBook}
          text="Address Book Button"
          size="xs"
        />
      </div>

      <div>
        <Button
          rounded
          color="white"
          bgColor="var(--color-blue-400)"
          Icon={FaAddressBook}
          size="xl"
        />
        <Button
          rounded
          color="white"
          bgColor="var(--color-blue-400)"
          Icon={FaAddressBook}
          size="lg"
          spinner
        />
        <Button
          rounded
          color="white"
          bgColor="var(--color-blue-400)"
          Icon={FaAddressBook}
          size="md"
        />
        <Button
          rounded
          color="white"
          bgColor="var(--color-blue-400)"
          Icon={FaAddressBook}
          size="sm"
        />
        <Button
          rounded
          color="white"
          bgColor="var(--color-blue-400)"
          Icon={FaAddressBook}
          size="xs"
        />
      </div>

      <Button
        color="black"
        bgColor="yellow"
        // icon={<FaAddressBook />}
        text="Address Book Button"
      />

      <Checkbox />
      <Input />
      <Range min={0} max={100} />
      <TextArea defaultValue="Hey" />

      <style jsx>{``}</style>
    </div>
  );
}
