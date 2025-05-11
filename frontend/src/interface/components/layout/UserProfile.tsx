import { useState } from 'react';
import { 
  Menu, 
  Text, 
  Group, 
  ThemeIcon
} from '@mantine/core';
import { 
  IconLogout, 
  IconUser, 
  IconSettings,
  IconChevronDown
} from '@tabler/icons-react';

export default function UserProfile() {
  const [menuOpened, setMenuOpened] = useState(false);

  return (
    <Menu
      position="bottom-end"
      opened={menuOpened}
      onClose={() => setMenuOpened(false)}
      onOpen={() => setMenuOpened(true)}
      width={200}
      withinPortal
    >
      <Menu.Target>
        <Group 
          gap="sm" // Changement de spacing vers gap
          className="cursor-pointer hover:bg-gray-100 px-3 py-1 rounded-lg"
        >
          <ThemeIcon radius="xl" size="lg" color="blue">
            JD
          </ThemeIcon>
          
          <div className="hidden md:block">
            <Text size="sm" fw={500}>John Doe</Text>
            <Text size="xs" c="dimmed">john@example.com</Text>
          </div>
          
          <IconChevronDown size={16} className="text-gray-500" />
        </Group>
      </Menu.Target>

      <Menu.Dropdown className="shadow-xl">
        <Menu.Label>Compte</Menu.Label>
        <Menu.Item 
          leftSection={<IconUser size={16} />} // Changement de icon vers leftSection
        >
          Profil
        </Menu.Item>
        <Menu.Item 
          leftSection={<IconSettings size={16} />}
        >
          Paramètres
        </Menu.Item>
        
        <Menu.Divider />
        
        <Menu.Item 
          color="red"
          leftSection={<IconLogout size={16} />}
        >
          Déconnexion
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}