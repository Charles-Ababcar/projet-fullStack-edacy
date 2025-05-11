import { useForm } from "@mantine/form";
import { DateInput } from '@mantine/dates';
import { useCreateBookMutation, useUpdateBookMutation } from '../../../feature/slice/book.slice';
import { FC, useEffect } from 'react';
import { Modal, NumberInput, Textarea, TextInput, Button } from '@mantine/core';
interface BookFormModalProps {
  opened: boolean;
  onClose: () => void;
  initialData?: {
    id?: string;
    title?: string;
    author?: string;
    year?: number;
    publishDate?: Date;
    description?: string;
  } | null;
}

export const BookFormModal: FC<BookFormModalProps> = ({ opened, onClose, initialData }) => {
  const form = useForm({
    initialValues: {
      title: initialData?.title || '',
      author: initialData?.author || '',
      year: initialData?.year || new Date().getFullYear(),
      publishDate: initialData?.publishDate ? new Date(initialData.publishDate) : null,
      description: initialData?.description || '',
    },
  });

  const [createBook, { isLoading: isCreating }] = useCreateBookMutation();
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();

  useEffect(() => {
    if (initialData) {
      form.setValues({
        title: initialData.title || '',
        author: initialData.author || '',
        year: initialData.year || new Date().getFullYear(),
        publishDate: initialData.publishDate ? new Date(initialData.publishDate) : null,
        description: initialData.description || '',
      });
    } else {
      form.reset();
    }
  }, [initialData]);

  const handleSubmit = async (values: any) => {
    try {
      if (initialData?.id) {
        await updateBook({ id: initialData.id, ...values }).unwrap();
      } else {
        await createBook(values).unwrap();
      }
      onClose();
    } catch (error) {
      console.error('Erreur lors de la soumission :', error);
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} size="lg" title={initialData ? 'Modifier le livre' : 'Nouveau livre'}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput label="Titre" {...form.getInputProps('title')} />
        <TextInput label="Auteur" {...form.getInputProps('author')} mt="md" />
        
        <NumberInput
          label="Année de publication"
          min={1800}
          max={new Date().getFullYear() + 5}
          {...form.getInputProps('year')}
          mt="md"
        />

        <DateInput
          label="Date exacte de publication"
          valueFormat="DD/MM/YYYY"
          {...form.getInputProps('publishDate')}
          mt="md"
        />

        <Textarea
          label="Description"
          autosize
          minRows={3}
          {...form.getInputProps('description')}
          mt="md"
        />

        <Button type="submit" fullWidth mt="xl" loading={isCreating || isUpdating}>
          {initialData ? 'Mettre à jour' : 'Créer'}
        </Button>
      </form>
    </Modal>
  );
};