import React from 'react';
import Button from 'components/Button';
import Checkbox from 'components/Checkbox';
import Input from 'components/Input';
import Range from 'components/Range';
import TextArea from 'components/TextArea';
import { FaAddressBook } from 'react-icons/fa';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div>
      <p>About Page</p>

      <div>
        <Link href="/contact" passHref>
          <Button
            color="white"
            bgColor="var(--color-blue-400)"
            text="Next Link"
            size="xl"
            as="a"
          />
        </Link>

        <Button
          color="white"
          bgColor="var(--color-blue-400)"
          Icon={FaAddressBook}
          text="Regular Anchor"
          size="xl"
          as="a"
          href="/contact"
        />
        <Button
          color="white"
          bgColor="var(--color-blue-400)"
          Icon={FaAddressBook}
          text="This is an anchor element"
          size="lg"
        />
        <Button
          color="white"
          bgColor="var(--color-blue-400)"
          Icon={FaAddressBook}
          text="This is an link element"
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
        color="gold"
        bgColor="purple"
        Icon={FaAddressBook}
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
