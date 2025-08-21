import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { Navigation } from '../navigation/Navigation';

export const Layout: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <Navigation />
      <main className="container mx-auto px-4 py-6 flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};