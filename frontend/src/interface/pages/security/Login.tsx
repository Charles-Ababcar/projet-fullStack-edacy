import {
  Paper,
  Title,
  PaperProps,
  Divider,
  Stack,
  TextInput,
  PasswordInput,Text,
  Anchor
} from "@mantine/core";
import { CustomForm } from "../../components/custom_form/custom_form";
import { IconAt, IconLock } from "@tabler/icons-react";
import { CustomLoadingModal } from "../../components/custom_loading/CustomLoadingModal";
import { authApi } from "../../../feature/slice/auth.slice";
import { loginForm } from "../../form/form_login";
import LogoSection from "../../components/custom-logo/LogoSection";
import { useNavigate } from "react-router-dom";
export const LoginPage = (props: PaperProps) => {
  const navigate = useNavigate();
  const [login, { isSuccess, isError, error, isLoading}] =
    authApi.useLoginMutation();
    
  const form = loginForm();
  const onSubmit = form.onSubmit((values) => {
    console.log(values);
    
    login(values).unwrap();
});

  return (
    <>
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">

      <Paper
        radius="md"
        p="xl"
        className="mx-auto my-auto w-[500px]"
        withBorder
        {...props}
      >
         <Title order={2} className="text-center mb-4">
          Connexion
        </Title> 
  

        <Divider c="dimmed" className="text-center mb-8"
          label="Entrez vos identifiants pour accéder au dashboard"
          labelPosition="center"
          my="lg"
        />

        <CustomForm
          onSubmit={(onSubmit)}
          isSuccess={isSuccess}
          isError={isError}
          isLoading={isLoading}
          error={error}
          successPath="/public"
          isLoginButton={true} 
        >
          <Stack>
          <CustomLoadingModal opened={isLoading} /> 
            <TextInput
              required
              label="Email"
              placeholder="abababcarchales@gmail.com"
              leftSection={<IconAt size={16} />}
              {...form.getInputProps("email")}
              radius="md"
              size="md"
                variant="filled"
            />

            <PasswordInput
              required
              label="Mot de passe"
              placeholder="Votre mot de passe"
              leftSection={<IconLock size={16} />}
              {...form.getInputProps("password")}
              radius="md"
              size="md"
              variant="filled"
            />
          </Stack>
  

        </CustomForm>

        <Text ta="center" mt="md">
        Pas encore de compte ?{' '}
        <Anchor component="button" onClick={() => navigate('/signup')}>
          Créer un compte
        </Anchor>
      </Text>
        
      </Paper>

      </div>
        <LogoSection />
    
    </div>
    </>
  );
};
