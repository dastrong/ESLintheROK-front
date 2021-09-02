import React from 'react';
import {
  FaCheck,
  FaPlus,
  FaRegEdit,
  FaSearch,
  FaShareAlt,
  FaTrash,
} from 'react-icons/fa';
import Button from 'components/Button';

export default function PastLessonsContentList() {
  const [checked, setChecked] = React.useState(false);

  return (
    <ul>
      <li>
        <div className="left_side">
          <Button
            size="lg"
            rounded
            Icon={checked ? FaCheck : FaPlus}
            color="white"
            bgColor={checked ? '#1a961a' : '#616161'}
            onClick={() => setChecked(state => !state)}
          />
          <div className="text_container">
            <h3>Sunday, April 11th 2021 at 16:57</h3>
            <div>
              <span>15 Vocabulary</span>
              <span>·</span>
              <span>7 Expressions</span>
            </div>
          </div>
        </div>

        <div>
          <Button
            rounded
            Icon={FaRegEdit}
            color="white"
            bgColor="#EF8D32"
            onClick={() => console.log('Edited')}
            style={{ margin: 4 }}
          />
          <Button
            rounded
            Icon={FaSearch}
            color="white"
            bgColor="#C534EA"
            onClick={() => console.log('Viewed')}
            style={{ margin: 4 }}
          />
          <Button
            rounded
            Icon={FaShareAlt}
            color="white"
            bgColor="#33C7E8"
            onClick={() => console.log('Shared')}
            style={{ margin: 4 }}
          />
          <Button
            rounded
            Icon={FaTrash}
            color="white"
            bgColor="#F03C47"
            onClick={() => console.log('Deleted')}
            style={{ margin: 4 }}
          />
        </div>
      </li>

      <li>
        <div className="left_side">
          <Button
            size="lg"
            rounded
            Icon={checked ? FaCheck : FaPlus}
            color="white"
            bgColor={checked ? '#1a961a' : '#616161'}
            onClick={() => setChecked(state => !state)}
          />
          <div className="text_container">
            <h3>Sunday, April 11th 2021 at 16:57</h3>
            <div>
              <span>15 Vocabulary</span>
              <span>·</span>
              <span>7 Expressions</span>
            </div>
          </div>
        </div>

        <div>
          <Button
            rounded
            Icon={FaRegEdit}
            color="white"
            bgColor="#EF8D32"
            onClick={() => console.log('Edited')}
            style={{ margin: 4 }}
          />
          <Button
            rounded
            Icon={FaSearch}
            color="white"
            bgColor="#C534EA"
            onClick={() => console.log('Viewed')}
            style={{ margin: 4 }}
          />
          <Button
            rounded
            Icon={FaShareAlt}
            color="white"
            bgColor="#33C7E8"
            onClick={() => console.log('Shared')}
            style={{ margin: 4 }}
          />
          <Button
            rounded
            Icon={FaTrash}
            color="white"
            bgColor="#F03C47"
            onClick={() => console.log('Deleted')}
            style={{ margin: 4 }}
          />
        </div>
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
          padding: 0.75rem;
          border-bottom: 1px solid #d6d6d6;
        }

        li:last-child {
          border: none;
        }

        .left_side {
          display: flex;
          align-items: center;
        }

        .text_container {
          margin-left: 1rem;
        }

        .text_container div {
          color: #5e5e5e;
        }

        .text_container h3 {
          margin: 0;
          margin-bottom: 0.5rem;
          font-size: 1.4rem;
          color: #313131;
        }

        .text_container div span {
          font-size: 1.1rem;
        }

        .text_container div span:nth-of-type(2) {
          font-weight: bold;
          margin-inline: 0.75rem;
        }
      `}</style>
    </ul>
  );
}
