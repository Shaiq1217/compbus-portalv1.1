import React from 'react';
import TopBar from '../../components/Topbar/Topbar';
import { Container } from '@mui/system';

interface PageLayoutProps {
  children?: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      <TopBar />
      <div className="p-0 m-0 overflow-x-hidden">
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
