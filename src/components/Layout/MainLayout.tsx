
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
