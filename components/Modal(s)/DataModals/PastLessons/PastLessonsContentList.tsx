import React from 'react';
import { FaCheck, FaPlus, FaTrashAlt } from 'react-icons/fa';
import Button from 'components/Button';

export default function PastLessonsContentList() {
  const [checked, setChecked] = React.useState(false);

  return (
    <ul>
      <li>
        <Button
          size="md"
          rounded
          Icon={checked ? FaCheck : FaPlus}
          color="white"
          bgColor={checked ? '#1a961a' : '#2185d0'}
          onClick={() => setChecked(state => !state)}
        />
        <div></div>
        <Button
          size="sm"
          rounded
          Icon={FaTrashAlt}
          color="white"
          bgColor="#db2828"
          onClick={() => console.log('Deleted')}
        />
      </li>

      <style jsx>{`
        ul {
          list-style-type: none;
          padding-left: 0;
          margin: 0;
        }

        li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem 0;
          border-bottom: 1px solid purple;
        }
      `}</style>
    </ul>
  );
}
