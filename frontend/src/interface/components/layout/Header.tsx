import { Group, ActionIcon, Text } from '@mantine/core';
import { IconMenu2, IconX } from '@tabler/icons-react';
import UserProfile from './UserProfile';

export default function AppHeader({ 
  mobileOpened,
  toggleMobile
}: { 
  mobileOpened: boolean;
  toggleMobile: () => void;
}) {
  return (
    <Group justify="space-between" className="h-full px-4 md:px-6">
      <Group gap="sm">
        <ActionIcon
          size="lg"
          onClick={toggleMobile}
          className="md:hidden"
          variant="transparent"
        >
          {mobileOpened ? <IconX size={24} /> : <IconMenu2 size={24} />}
        </ActionIcon>
        <Text size="xl" fw={700} className="text-primary truncate">
          Book Manager
        </Text>
      </Group>

      <UserProfile />
    </Group>
  );
}