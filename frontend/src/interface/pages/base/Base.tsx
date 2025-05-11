import { AppShell, Burger, Flex, em } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Outlet } from 'react-router-dom';
import { Header } from '../../components/header/header';
import { useState } from 'react';
import { Navbar } from '../../components/navbar/navbar';

export const Base = () => {
  const [opened, { toggle }] = useDisclosure();
  const [navbarWidth, setNavbarWidth] = useState(280);
  const isMobile = useMediaQuery(`(max-width: ${em(768)})`);

  const toggleNavbarWidth = () => {
    if (isMobile) {
      toggle();
      return;
    }
    setNavbarWidth(navbarWidth === 80 ? 280 : 80);
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: navbarWidth,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
      className="bg-gray-50"
      transitionDuration={300}
      transitionTimingFunction="ease-in-out"
    >
      <AppShell.Header className="border-0 shadow-sm">
        <Flex align="center" h="100%" px="md">
          <Burger
            opened={opened}
            onClick={toggleNavbarWidth}
            size="sm"
            className="mr-4"
          />
          <Header />
        </Flex>
      </AppShell.Header>

      <AppShell.Navbar className="bg-blue-600 p-4 transition-all duration-300 overflow-hidden">
        <Navbar compact={navbarWidth === 80} />
      </AppShell.Navbar>

      <AppShell.Main className="min-h-[calc(100vh-60px)] transition-all duration-300">
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};