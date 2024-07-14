import React, { useState } from 'react';
import TopBar from '../../components/Topbar/Topbar';
import { Container } from '@mui/system';

interface PageLayoutProps {
  children?: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  const [search, setSearch] = useState(false);
  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      <TopBar setSearch={setSearch} />
      <div className="p-0 m-0 overflow-x-hidden mt-10">
        {/* {search && <SearchPage setSearch={setSearch}></SearchPage>} */}
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
