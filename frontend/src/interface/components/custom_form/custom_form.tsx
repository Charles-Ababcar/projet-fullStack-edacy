import { FC, FormEventHandler, ReactNode, useEffect, useRef } from 'react'
import { Navigate } from 'react-router-dom';
import { Button, Center,  Stack, Text, ThemeIcon, Title, Flex } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconExclamationCircle, IconRosetteDiscountCheck, IconArrowRight } from '@tabler/icons-react';
import { getWsMessage } from '../../../feature/slice/error_transformer';

type CustomFormProps = {
  children?: ReactNode;
  title?: string;
  successMessage?: string;
  error?: unknown;
  confirmeBefore?: boolean;
  subTitle?: string;
  validationText?: string;
  nextText?: string;
  btnClassName?: string;
  isLoading?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
  successPath?: string;
  confirmationMessage?: string;
  onFinish?: () => void;
  onSubmit: FormEventHandler<HTMLFormElement> | undefined;
  isLoginButton?: boolean; 
};

export const CustomForm: FC<CustomFormProps> = ({ 
  children,
  onSubmit,
  title,
  isSuccess,
  isError,
  error,
  successPath, 
  successMessage,
  confirmeBefore = false,
  confirmationMessage,
  validationText,
  nextText,
  btnClassName,
  isLoginButton = false // Valeur par défaut false
}) => {
  const firstButtonRef = useRef<HTMLButtonElement>(null);

  const alertModal = (props: { type: 'error' | 'success'; title: string; message: string }) => {
    return modals.open({
      centered: true,
      withCloseButton: false,
      padding: "lg",
      radius: "md",
      size: "xs",
      styles: {
        content: { maxWidth: 400, width: '90%' },
      },
      title: (
        <Center my="sm">
          <ThemeIcon
            radius="xl"
            size="lg"
            color={props.type === 'success' ? 'green' : 'red'}
            variant="light"
          >
            {props.type === 'success' ? (
              <IconRosetteDiscountCheck size={30} />
            ) : (
              <IconExclamationCircle size={30} />
            )}
          </ThemeIcon>
        </Center>
      ),
      children: (
        <Stack align="center" mt="sm">
          <Title order={4} ta="center">{props.title}</Title>
          <Text size="sm" c="dimmed" ta="center">
            {props.message}
          </Text>
          <Button
            size="sm"
            fullWidth
            color={props.type === 'success' ? 'blue' : 'red'}
            onClick={() => modals.closeAll()}
          >
            OK
          </Button>
        </Stack>
      ),
    });
  };

  const onSuccess = () => alertModal({type: 'success', title: "Réussi", message: successMessage || "Opération effectuée avec succès"});
  const onFailed = () => alertModal({type: 'error', title: "Échec", message: getWsMessage(error)});

  useEffect(() => {
    if (isSuccess === true) onSuccess();
  }, [isSuccess]);

  useEffect(() => {
    if (isError === true) onFailed();
  }, [isError]);

  const renderSubmitButton = () => {
    if (confirmeBefore) {
      return (
        <Button
          type="button"
          onClick={() => modals.openConfirmModal({
            title: 'Confirmation',
            children: <Text size="sm">{confirmationMessage || 'Êtes-vous sûr de vouloir continuer ?'}</Text>,
            labels: { confirm: 'Confirmer', cancel: 'Annuler' },
            onConfirm: () => firstButtonRef.current?.click(),
          })}
           className={`${btnClassName} bg-custom-blue hover:bg-custom-blue/90 transition-colors`}
          // loading={isLoading}
          fullWidth
        >
          {nextText || 'Suivant'}
        
        </Button>
      );
    }

    return (
      <Button
        type="submit"
        className={btnClassName}
        // loading={isLoading}
        fullWidth
        rightSection={isLoginButton ? <IconArrowRight size={18} /> : null}
        variant={isLoginButton ? 'filled' : 'default'}
        color={isLoginButton ? 'blue' : 'blue'}
        size={isLoginButton ? 'md' : 'sm'}
      >
        {validationText || (isLoginButton ? 'Se connecter' : 'Valider')}
      </Button>
    );
  };

  return (
    <div className={btnClassName ? "" : "flex flex-col text-left divide-y divide-gray-500/30 gap-y-2"}>
      {isSuccess && successPath && <Navigate to={successPath} />}
      
      {title && <Title order={3} children={title} />}
      
      <form
        action=""
        className={btnClassName ? "" : "flex flex-col gap-y-4 pt-10"}
        onSubmit={onSubmit}
      >
        {children}
        
        <Flex justify="flex-end" mt="md">
          {renderSubmitButton()}
        </Flex>
        
        <button hidden type="submit" ref={firstButtonRef} />
      </form>
    </div>
  );
};