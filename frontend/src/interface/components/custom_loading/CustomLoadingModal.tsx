import { Modal, Loader, Text } from "@mantine/core";
import logo from "../../../assets/images/logo_splash.jpg";

export const CustomLoadingModal = ({ opened }: { opened: boolean }) => (
  <Modal
    opened={opened}
    onClose={() => {}}
    withCloseButton={false}
    centered
    size="xs"
    radius="lg"
    classNames={{
      content: "max-w-[200px] max-h-[150px] border-[3px] border-custom-blue shadow-xs",
      body: "bg-transparent p-0",
      overlay: "backdrop-blur-sm bg-black/30"
    }}
  >
    <div className="flex flex-col items-center justify-center h-full space-y-2">
      <div className="absolute inset-0 border-4 border-custom-blue/20 rounded-xl animate-pulse" />

      <img 
        src={logo} 
        alt="Logo"
        className="w-16 h-16 mb-4 animate-pulse border-2 border-custom-blue rounded-full"
      />

      <Loader 
        size="xs" 
        className="text-custom-blue"
        type="dots"
      />
      <Text className="text-gray-700 mt-4 animate-pulse border-b-2 border-custom-blue pb-1">
        Chargement en cours...
      </Text>
    </div>
  </Modal>
);