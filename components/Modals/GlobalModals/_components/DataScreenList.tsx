import React, { ForwardedRef, forwardRef } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Skeleton from 'components/Skeleton';

type Props = {
  showPlaceholders: boolean;
  disableHover: boolean;
  list: string[];
  editListItem: (index: number) => void;
  removeListItem: (index: number) => void;
};

const randomWidths = Array(9)
  .fill('')
  .map(() => 60 + Math.floor(Math.random() * 100));

const DataScreenList = forwardRef(
  (
    {
      showPlaceholders,
      disableHover,
      list,
      editListItem,
      removeListItem,
    }: Props,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const disabled = showPlaceholders || disableHover;

    return (
      <div className="list" ref={ref}>
        {(list.length || !showPlaceholders
          ? list
          : randomWidths.map(String)
        ).map((text, i) => (
          <div className="item_container" key={text + i}>
            <div className="list_item">
              <span className="list_item_text">
                {showPlaceholders ? (
                  <Skeleton
                    count={1}
                    width={randomWidths[i % randomWidths.length]}
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
        `}</style>

        <style jsx>{`
          /* HOVER CSS */
          .list_item:hover {
            transform: translateX(${disabled ? 0 : '-1.5rem'});
          }
          .list_item:hover .list_item_text {
            opacity: ${disabled ? 1 : 0.7};
          }
          .list_item:hover .list_item_icons {
            opacity: ${disabled ? 0 : 1};
            transform: translateX(${disabled ? 0 : '1rem'});
          }
        `}</style>
      </div>
    );
  }
);

export default DataScreenList;
