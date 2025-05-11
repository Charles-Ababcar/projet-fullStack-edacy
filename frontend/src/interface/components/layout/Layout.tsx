import { AppShell, AppShellHeader, AppShellNavbar, AppShellMain } from '@mantine/core';
import Header from './Header';
import Sidebar from './Sidebar';
import { useState } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileOpened, setMobileOpened] = useState(false);
  const [desktopOpened, setDesktopOpened] = useState(true);

  return (
    <AppShell
      header={{ height: { base: 60, md: 70 } }}
      navbar={{
        width: { base: 200, md: 300 },
        breakpoint: 'md',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened }
      }}
      padding="md"
    >
      <AppShellHeader className="border-0 shadow-sm">
        <Header 
          mobileOpened={mobileOpened}
          toggleMobile={() => setMobileOpened((o) => !o)}
        />
      </AppShellHeader>

      <AppShellNavbar className="border-r-0 shadow-lg transition-all duration-300">
        <Sidebar 
          desktopOpened={desktopOpened}
          toggleDesktop={() => setDesktopOpened((o) => !o)}
        />
      </AppShellNavbar>

      <AppShellMain className="overflow-x-hidden">
        <div className="max-w-screen-2xl mx-auto p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </AppShellMain>
    </AppShell>
  );
}