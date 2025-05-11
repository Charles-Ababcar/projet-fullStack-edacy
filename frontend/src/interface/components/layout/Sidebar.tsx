import { NavLink, ScrollArea } from '@mantine/core';
import { IconChevronsLeft, IconHome } from '@tabler/icons-react';
import { NavLink as RouterNavLink } from 'react-router-dom';

export default function AppSidebar({
  desktopOpened,
  toggleDesktop
}: {
  desktopOpened: boolean;
  toggleDesktop: () => void;
}) {
  return (
    <ScrollArea className="h-full p-4">
      <div className="flex flex-col h-full">
        {/* Contenu principal */}
        <div className="flex-1">
          <NavLink 
            component={RouterNavLink}
            to="/dashboard"
            label="Dashboard"
            leftSection={<IconHome size={20} />}
            className="rounded-lg hover:bg-blue-50 data-[active=true]:bg-blue-100 mb-1"
          />
          {/* Ajouter d'autres liens */}
        </div>

        {/* Section inférieure */}
        <div className="border-t pt-4 mt-4">
          <NavLink 
            label="Réduire le menu"
            leftSection={
              <IconChevronsLeft 
                size={20} 
                className={desktopOpened ? 'rotate-0' : 'rotate-180'}
              />
            }
            onClick={toggleDesktop}
            className="hover:bg-blue-50 rounded-lg"
          />
        </div>
      </div>
    </ScrollArea>
  );
}