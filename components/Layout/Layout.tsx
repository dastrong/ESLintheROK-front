import React from 'react';
import Sidebar from './Sidebar';
import Nav from './Nav';
import Content from './Content';

// children will be whatever page you're rendering
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <Nav />
      <Content>{children}</Content>
    </>
  );
}
