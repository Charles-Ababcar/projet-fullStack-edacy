import {
  NavLink,
  Text,
  ThemeIcon,
  Modal,
  Button,
  Accordion,
  Tooltip,
  Box,
  UnstyledButton,
} from "@mantine/core";
import {
  IconDashboard,
  IconSettings,
  IconLogout,
  IconChevronLeft,
  IconBook2,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { BookPath } from "../../../routes/books.router";
import { authApi } from "../../../feature/slice/auth.slice";


const navItems = [
  { label: "Dashboard", icon: IconDashboard, href: "/public" },
  {
    icon: IconBook2,
    label: "Livres",
    href: "/books",
    links: [
      { label: "Crée livre ", link: BookPath.CREATE },
      { label: "Liste des livres", link: BookPath.LIST },
    ],
  },
  { icon: IconSettings, label: "Paramètres", href: "/settings" },
];

interface NavbarProps {
  compact?: boolean;
  onToggleCompact?: () => void;
}

export const Navbar = ({ compact = false, onToggleCompact }: NavbarProps) => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [openedAccordions, setOpenedAccordions] = useState<
    Record<string, boolean>
  >({});
 const [logout, ] = authApi.useLogoutMutation();
  const handleLogout = () => {
    logout
    setShowLogoutModal(false);
    navigate("/");
  };

  const toggleAccordion = (label: string) => {
    setOpenedAccordions((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <Box
      className={`h-full flex flex-col bg-white border-r border-gray-200 shadow-sm transition-all duration-300 ${
        compact ? "w-[80px]" : "w-[280px]"
      }`}
    >
      <div
        className={`flex items-center p-4 ${
          compact ? "justify-center" : "px-6"
        }`}
      >
        <ThemeIcon
          radius="lg"
          size="xl"
          color="blue"
          variant="light"
          className="border border-blue-100"
        >
          <IconDashboard size={22} stroke={1.8} />
        </ThemeIcon>
        {!compact && (
          <Text className="ml-3 text-blue-800 font-bold text-xl">
            Gestion Boutique
          </Text>
        )}
      </div>

      {/* Bouton de réduction */}
      {!compact && (
        <UnstyledButton
          onClick={onToggleCompact}
          className="absolute top-4 right-2 p-1 rounded hover:bg-gray-100"
        >
          <IconChevronLeft size={18} />
        </UnstyledButton>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-2 py-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          if (item.links) {
            return compact ? (
              <Tooltip key={item.label} label={item.label} position="right">
                <div>
                  <NavLink
                    leftSection={<item.icon size={20} stroke={1.8} />}
                    className="rounded-lg"
                    onClick={() => toggleAccordion(item.label)}
                  />
                  {openedAccordions[item.label] && (
                    <div className="ml-2">
                      {item.links.map((subLink) => (
                        <Tooltip
                          key={subLink.label}
                          label={subLink.label}
                          position="right"
                        >
                          <NavLink
                            href={subLink.link}
                            leftSection={
                              <div className="w-4 h-4 border-l-2 border-b-2 border-gray-300 ml-2 mb-1" />
                            }
                            className="pl-2"
                          />
                        </Tooltip>
                      ))}
                    </div>
                  )}
                </div>
              </Tooltip>
            ) : (
              <Accordion key={item.label} variant="contained">
                <Accordion.Item value={item.label}>
                  <Accordion.Control>
                    <div className="flex items-center space-x-2">
                      <item.icon size={20} stroke={1.8} />
                      <Text size="sm" className="font-medium">
                        {item.label}
                      </Text>
                    </div>
                  </Accordion.Control>
                  <Accordion.Panel>
                    {item.links.map((subLink) => (
                      <NavLink
                        key={subLink.label}
                        href={subLink.link}
                        label={
                          <Text size="sm" className="font-medium">
                            {subLink.label}
                          </Text>
                        }
                        className="pl-8 text-blue-600 hover:bg-blue-100 hover:text-blue-500"
                      />
                    ))}
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion>
            );
          }

          return compact ? (
            <Tooltip key={item.label} label={item.label} position="right">
              <NavLink
                href={item.href}
                leftSection={<item.icon size={20} stroke={1.8} />}
                className="rounded-lg"
              />
            </Tooltip>
          ) : (
            <NavLink
              key={item.label}
              href={item.href}
              label={
                <Text size="sm" className="font-medium">
                  {item.label}
                </Text>
              }
              leftSection={<item.icon size={20} stroke={1.8} />}
              className="rounded-lg text-blue-600 hover:bg-blue-100 hover:text-blue-500"
              variant="subtle"
            />
          );
        })}
      </nav>

      {/* Bouton Déconnexion */}
      <div className="px-2 py-4 border-t border-gray-100">
        {compact ? (
          <Tooltip label="Déconnexion" position="right">
            <Button
              color="red"
              onClick={() => setShowLogoutModal(true)}
              variant="filled"
              radius="md"
              p={0}
              className="w-10 h-10 flex items-center justify-center"
            >
              <IconLogout size={15} stroke={1.8} />
            </Button>
          </Tooltip>
        ) : (
          <Button
            color="red"
            leftSection={<IconLogout size={20} stroke={1.8} />}
            onClick={() => setShowLogoutModal(true)}
            variant="outline"
            radius="md"
            
          >
            Déconnexion
          </Button>
        )}
      </div>

      {/* Popup confirmation déconnexion */}
      <Modal
        opened={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        title="Confirmer la déconnexion"
        centered
      >
        <Text>Voulez-vous vraiment vous déconnecter ?</Text>
        <div className="flex justify-end mt-4 gap-2">
          <Button variant="outline" onClick={() => setShowLogoutModal(false)} radius="md">
            Annuler
          </Button>
          <Button
            color="red"
            onClick={handleLogout}
            variant="filled"
            radius="md"
          >
            Déconnexion
          </Button>
        </div>
      </Modal>
    </Box>
  );
};
