import { useForm } from "@mantine/form";

export const booksForm =()=> useForm({
    mode:'uncontrolled',
    initialValues: {
      title: '',
      author: '',
      year: '',
      description: '',
      publishDate:'',
    },

    validate: {
      title: (val) => (val.length ==null ? 'Le titre ne doit pas etre null' : null),
      author: (val) => (val.length ==null ? "L'auteur ne doit pas etre null" : null),
      year: (val) => (val.length ==null ? "L'année ne doit pas etre null" : null),
      description: (val) => (val.length ==null ? "La description ne  doit pas etre null" : null),
      publishDate:(val) => (val.length ==null ? 'La date de publication ne doit pas etre null' : null),
    },
  });