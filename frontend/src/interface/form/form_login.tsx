import { useForm } from "@mantine/form";
export const useSignupForm = () => useForm({
  mode: 'uncontrolled',
  initialValues: {
    username: '',
    firstName: '',
    lastName: '',
    mobileNumber: '',
    email: '',
    city: '',
    country: '',
    address: '',
    password: '',
  },

  validate: {
    username: (val) => 
      val.length < 3 ? 'Le pseudo doit contenir au moins 3 caractères' : null,
    firstName: (val) => 
      val.trim().length < 2 ? 'Le prénom est obligatoire' : null,
    lastName: (val) => 
      val.trim().length < 2 ? 'Le nom est obligatoire' : null,
    email: (val) => 
      /^\S+@\S+$/.test(val) ? null : 'Email invalide',
    mobileNumber: (val) => 
      val.length < 8 ?  'Le Numéro invalide' : null,
    password: (val) => 
      val.length < 8 ? '8 caractères minimum' : null,
    city: (val) => 
      val.trim().length < 2 ? 'Ville requise' : null,
    country: (val) => 
      val.trim().length < 2 ? 'Pays requis' : null,
    address: (val) => 
      val.trim().length < 5 ? 'Adresse complète requise' : null
  },
});
export const loginForm =()=> useForm({
    mode:'uncontrolled',
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : val.length<9?'L\'email de passe doit comporter au moins 8 caractères': 'Invalid email'),
      password: (val) => (val.length ==null ? 'Le mot de passe ne doit pas etre null' : null),
    },
  });

  export const emailForm =()=> useForm({
    mode:'uncontrolled',
    initialValues: {
      email: '',
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : val.length<9?'L\'email de passe doit comporter au moins 8 caractères': 'Invalid email'),
    },
  });

  export const definePasswordForm = () => useForm({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
  
    validate: {
      password: (value: string) => (value.length <= 0 ? 'Mot de password requis' : null),
      confirmPassword: (value, values) => value === values.password ? null : 'Les mots de passe ne correspondent pas',
    },
  });