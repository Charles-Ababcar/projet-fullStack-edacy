import {
  Avatar,
  Group,
  UnstyledButton,
  Menu,
  Text,
  Divider,
} from "@mantine/core";
import { IconChevronDown, IconUser, IconLogout } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { authApi } from "../../../feature/slice/auth.slice";

export const Header = () => {
  const navigate = useNavigate();
  const { data: profile } = authApi.useGetMeQuery("");
  const [logout, ] = authApi.useLogoutMutation();
  const [opened, setOpened] = useState(false);

  const profileName = profile?.data?.displayName;

  const handleLogout = async () => {
    await logout('');
    navigate("/");
  };

  return (
    <Group justify="space-between" className="w-full">
      <h1 className="text-xl font-semibold text-gray-800">Tableau de bord</h1>

      <Menu
        position="bottom-end"
        width={200}
        opened={opened}
        onChange={setOpened}
        withinPortal
      >
        <Menu.Target>
          <UnstyledButton className="hover:bg-gray-100 rounded-full p-1 transition-colors">
            <Group gap={8}>
              <Avatar
                src="https://example.com/avatar.jpg"
                size={32}
                radius="xl"
                className="border-2 border-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">
                {profileName}
              </span>
              <IconChevronDown size={16} className="text-gray-500" />
            </Group>
          </UnstyledButton>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>
            <Group gap="xs">
              <IconUser size={16} />
              <Text size="sm">Mon compte</Text>
            </Group>
          </Menu.Label>


          <Divider my="xs" />
          <Menu.Item
            color="red"
            leftSection={<IconLogout size={16} />}
            onClick={handleLogout}
          >
            Déconnexion
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
};
