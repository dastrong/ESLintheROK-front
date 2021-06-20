import React from 'react';
import { FaAddressBook } from 'react-icons/fa';

import { useTheme } from 'contexts/theme';
import Button from 'components/Button';
import Checkbox from 'components/Checkbox';
import Range from 'components/Range';
import { InputCSS } from 'components/Styles';

export default function AboutPage() {
  const { theme } = useTheme();

  console.log(InputCSS);
  return (
    <div>
      <p>About Page</p>

      <div>
        <p>DISABLED BUTTONS</p>
        <Button
          color="white"
          bgColor={theme.colors.blue}
          text="Next Link"
          size="md"
          disabled
        />
        <Button
          color="white"
          bgColor={theme.colors.red}
          Icon={FaAddressBook}
          text="Regular Anchor"
          size="md"
          disabled
        />
        <Button
          color="white"
          bgColor={theme.colors.blue}
          Icon={FaAddressBook}
          text="This is an anchor element"
          size="md"
          disabled
        />
        <Button
          color="white"
          bgColor="purple"
          Icon={FaAddressBook}
          text="This is an link element"
          size="md"
          disabled
          spinner
        />
        <Button
          color="black"
          bgColor="orange"
          Icon={FaAddressBook}
          text="Address Book Button"
          size="md"
          disabled
        />
        <Button
          color="white"
          bgColor="red"
          Icon={FaAddressBook}
          text="Address Book Button"
          size="md"
          disabled
        />
      </div>

      <div>
        <p>NOT DISABLED BUTTONS</p>
        <Button
          color="white"
          bgColor={theme.colors.blue}
          text="Next Link"
          size="md"
        />
        <Button
          color="white"
          bgColor={theme.colors.red}
          Icon={FaAddressBook}
          text="Regular Anchor"
          size="md"
        />
        <Button
          color="white"
          bgColor={theme.colors.blue}
          Icon={FaAddressBook}
          text="This is an anchor element"
          size="md"
        />
        <Button
          color="white"
          bgColor="purple"
          Icon={FaAddressBook}
          text="This is an link element"
          size="md"
          spinner
        />
        <Button
          color="black"
          bgColor="orange"
          Icon={FaAddressBook}
          text="Address Book Button"
          size="md"
        />
        <Button
          color="white"
          bgColor="red"
          Icon={FaAddressBook}
          text="Address Book Button"
          size="md"
        />
      </div>

      <div>
        <Button
          rounded
          color="white"
          bgColor="blue"
          Icon={FaAddressBook}
          size="xl"
        />
        <Button
          rounded
          color="white"
          bgColor="blue"
          Icon={FaAddressBook}
          size="lg"
          spinner
        />
        <Button
          rounded
          color="white"
          bgColor="blue"
          Icon={FaAddressBook}
          size="md"
        />
        <Button
          rounded
          color="white"
          bgColor="blue"
          Icon={FaAddressBook}
          size="sm"
        />
        <Button
          rounded
          color="white"
          bgColor="blue"
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
      <Range min={0} max={100} />

      <input className={InputCSS.className} placeholder="I'm an input" />
      <textarea className={InputCSS.className} placeholder="I'm a textarea" />

      {InputCSS.styles}
    </div>
  );
}
