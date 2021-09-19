import React, { ForwardedRef, forwardRef } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Skeleton from 'components/Skeleton';

type Props = {
  showPlaceholders: boolean;
  list: string[];
  editListItem: (index: number) => void;
  removeListItem: (index: number) => void;
};

const DataScreenList = forwardRef(
  (
    { showPlaceholders, list, editListItem, removeListItem }: Props,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div className="list" ref={ref}>
        {list.map((text, i) => (
          <div className="item_container" key={text + i}>
            <div className="list_item">
              <span className="list_item_text">
                {showPlaceholders ? (
                  <Skeleton
                    count={1}
                    width={20 + Math.floor(Math.random() * 100)}
                  />
                ) : (
                  text || <span style={{ color: 'red' }}>_blank_</span>
                )}
              </span>
              <div className="list_item_icons">
                <FaEdit
                  style={{ color: '#0094FF', marginRight: '0.25rem' }}
                  onClick={() => editListItem(i)}
                />
                <FaTrash
                  style={{ color: '#EF3D3D' }}
                  onClick={() => removeListItem(i)}
                />
              </div>
            </div>
          </div>
        ))}

        <style jsx>{`
          .list {
            overflow-y: auto;
            overflow-x: hidden;
            width: 100%;
          }

          .item_container {
            position: relative;
          }

          .item_container:not(:nth-of-type(1)):before {
            content: '';
            position: absolute;
            top: -0.25rem;
            height: 1px;
            width: 70%;
            left: 15%;
            margin: 0 auto;
            background-color: rgba(34, 36, 38, 0.15);
          }

          .list_item {
            position: relative;
            text-align: center;
            width: calc(100% - 2.25rem);
            margin: 0.25rem auto;
            padding: 0.75rem;
            transition: all 0.25s;
          }

          .list_item_text {
            cursor: default;
            text-align: center;
            line-height: 120%;
            color: #4e4e4e;
          }

          .list_item_icons {
            font-size: 1rem;
            cursor: pointer;
            display: inline-block;
            position: absolute;
            width: 2.25rem;
            opacity: 0;
            transform: translateX(-1.25rem);
            transition: all 0.25s;
          }

          /* HOVER CSS */
          .list_item:hover {
            transform: translateX(-1.5rem);
          }
          .list_item:hover .list_item_text {
            opacity: 0.7;
          }
          .list_item:hover .list_item_icons {
            opacity: 1;
            transform: translateX(1rem);
          }
        `}</style>
      </div>
    );
  }
);

export default DataScreenList;
