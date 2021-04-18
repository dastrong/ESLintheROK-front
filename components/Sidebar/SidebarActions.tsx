import React from 'react';
import Link from 'next/link';
import { FaHome, FaTimes, FaBook, FaCogs, FaEdit } from 'react-icons/fa';
import { useStore } from 'contexts/store';

export default function SidebarActions({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { storeDispatch } = useStore();

  return (
    <div>
      <div className="btns btns_top">
        {/* Go to Homepage - link */}
        <Link href="/">
          <a className="btn btn_home">
            <FaHome style={{ fontSize: '1.75rem' }} />
          </a>
        </Link>

        {/* Closes Menu - button */}
        <button className="btn btn_close" onClick={() => setIsOpen(false)}>
          <FaTimes style={{ fontSize: '1.75rem' }} />
        </button>
      </div>

      <div className="btns btns_bottom">
        {/* Opens Lessons Modal - button */}
        <button
          className="btn btn_lessons"
          onClick={() => {
            storeDispatch({ type: 'openDataModal', dataModalName: 'lessons' });
            setIsOpen(false);
          }}
        >
          <FaBook style={{ fontSize: '2rem', marginBottom: '0.2rem' }} />
          Lessons
        </button>

        {/* Opens Custom Lesson Modal - button */}
        <button
          className="btn btn_custom"
          onClick={() => {
            storeDispatch({ type: 'openDataModal', dataModalName: 'custom' });
            setIsOpen(false);
          }}
        >
          <FaCogs style={{ fontSize: '2rem', marginBottom: '0.2rem' }} />
          Custom
        </button>

        {/* Opens Edit Data Modal - button */}
        <button
          className="btn btn_edit"
          onClick={() => {
            storeDispatch({ type: 'openDataModal', dataModalName: 'edit' });
            setIsOpen(false);
          }}
        >
          <FaEdit style={{ fontSize: '2rem', marginBottom: '0.2rem' }} />
          Edit Data
        </button>
      </div>

      <style jsx>{`
        .btn {
          background-color: transparent;
          position: relative;
          display: flex;
          box-shadow: inset 0 0 0 2px hsla(0, 0%, 100%, 0.5);
          color: #eee;
          transition: all 0.15s;
        }

        .btns {
          display: flex;
          justify-content: center;
        }

        .btns_top .btn {
          flex: 1 0 auto;
          padding: 1.1rem;
          justify-content: center;
        }

        .btns_bottom {
          padding: 1rem;
        }

        .btns_bottom .btn {
          flex-direction: column;
          align-items: center;
          font-size: 0.8rem;
          flex: 1;
          padding: 0.65rem 0;
        }

        .btn_home:hover {
          color: var(--color-lightblue);
          box-shadow: inset 0 0 0 2px var(--color-lightblue);
        }

        .btn_close:hover {
          color: var(--color-red);
          box-shadow: inset 0 0 0 2px var(--color-red);
        }

        .btn_lessons {
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
        }
        .btn_lessons:hover {
          color: var(--color-green);
          box-shadow: inset 0 0 0 2px var(--color-green);
        }

        .btn_custom:hover {
          color: var(--color-yellow);
          box-shadow: inset 0 0 0 2px var(--color-yellow);
        }

        .btn_edit {
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;
        }
        .btn_edit:hover {
          color: var(--color-orange);
          box-shadow: inset 0 0 0 2px var(--color-orange);
        }
      `}</style>
    </div>
  );
}
