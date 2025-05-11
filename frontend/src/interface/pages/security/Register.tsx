import {
  Paper,
  Title,
  PaperProps,
  Divider,
  Stack,
  Grid,
  TextInput,
  PasswordInput,
  Select,
} from "@mantine/core";
import {
  IconAt,
  IconLock,
  IconUser,
  IconPhone,
  IconMapPin,
} from "@tabler/icons-react";
import { CustomForm } from "../../components/custom_form/custom_form";
import { userApi } from "../../../feature/slice/users.slice";
import { useSignupForm } from "../../form/form_login";
import { countries } from "../../components/countries/countries";
import LogoSection from "../../components/custom-logo/LogoSection";

export const SignupPage = (props: PaperProps) => {
  const [register, { isSuccess, isError, error, isLoading }] =
    userApi.useSignupMutation();

  const form = useSignupForm();
  const onSubmit = form.onSubmit((values) => {
    console.log(values);

    register(values).unwrap();
  });

  return (
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
            Création de compte
          </Title>

          <Divider
            label="Remplissez tous les champs obligatoires"
            labelPosition="center"
            my="lg"
          />

          <CustomForm
            onSubmit={onSubmit}
            isSuccess={isSuccess}
            isError={isError}
            isLoading={isLoading}
            error={error}
            successPath=""
            isLoginButton={true}
          >
            <Stack gap="md">
              <Grid>
                <Grid.Col span={6}>
                  <TextInput
                    label="Prénom"
                    placeholder="Jean"
                    leftSection={<IconUser size={16} />}
                    required
                    {...form.getInputProps("firstName")}
                  />
                </Grid.Col>

                <Grid.Col span={6}>
                  <TextInput
                    label="Nom"
                    placeholder="Dupont"
                    leftSection={<IconUser size={16} />}
                    required
                    {...form.getInputProps("lastName")}
                  />
                </Grid.Col>
              </Grid>

              <TextInput
                label="Nom d'utilisateur"
                placeholder="jdupont23"
                leftSection={<IconUser size={16} />}
                required
                {...form.getInputProps("username")}
              />

              <TextInput
                label="Email"
                placeholder="jean.dupont@example.com"
                leftSection={<IconAt size={16} />}
                required
                {...form.getInputProps("email")}
              />

              <TextInput
                label="Téléphone"
                placeholder="+221 77800-00-00"
                leftSection={<IconPhone size={16} />}
                required
                {...form.getInputProps("mobileNumber")}
              />

              <PasswordInput
                label="Mot de passe"
                placeholder="••••••••"
                leftSection={<IconLock size={16} />}
                required
                {...form.getInputProps("password")}
              />

              <Select
                label="Pays"
                placeholder="Sélectionnez un pays"
                data={countries}
                searchable
                required
                leftSection={<IconMapPin size={16} />}
                {...form.getInputProps("country")}
              />

              <Grid>
                <Grid.Col span={8}>
                  <TextInput
                    label="Ville"
                    placeholder="Paris"
                    required
                    {...form.getInputProps("city")}
                  />
                </Grid.Col>
              </Grid>

              <TextInput
                label="Adresse complète"
                placeholder="12 Rue de la Paix, 75001"
                required
                {...form.getInputProps("address")}
              />
            </Stack>
          </CustomForm>
        </Paper>
      </div>
      <LogoSection />
    </div>
  );
};
