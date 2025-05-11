import {  useState } from 'react';
import { Button, Group, Text, Title } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { GenericTable, DefaultRowActions } from '../../components/custom-generic-table/custom-table';
import { bookApi, useDeleteBookMutation } from '../../../feature/slice/book.slice';
import { useNavigate } from 'react-router-dom';
import { ErrorPage } from '../error/ErrorPage';
import { BookFormModal } from './create_books';



export const BooksList = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { data: books = [], isLoading, error } = bookApi.useGetBooksQuery({
    page: currentPage,
    limit: itemsPerPage
  });

  const bookList = Array.isArray(books) ? books : books.data || [];
  const totalItems = Array.isArray(books) ? books.length : books.total || 0;

  const [deleteBook] = useDeleteBookMutation();
  const [modalOpened, setModalOpened] = useState(false);
  const [editingBook, setEditingBook] = useState<{
    id?: string;
    title?: string;
    author?: string;
    year?: number;
    publishDate?: Date;
    description?: string;
  } | null>(null);

  const handleCreateBook = () => {
    setEditingBook(null);
    setModalOpened(true);
  };

  const handleEditBook = (book: any) => {
    setEditingBook(book);
    setModalOpened(true);
  };

  const handleDeleteBook = async (book: any) => {
    await deleteBook(book.id);
  };

  const columns = [
    { header: 'Titre', key: 'title', render: (book: any) => <Text>{book.title}</Text> },
    { header: 'Auteur', key: 'author', render: (book: any) => <Text>{book.author}</Text> },
    { header: 'Année', key: 'year', render: (book: any) => <Text>{book.year}</Text> },
    { header: 'Description', key: 'description', render: (book: any) => <Text lineClamp={2}>{book.description}</Text> },
    {
      header: 'Date de publication',
      key: 'publishDate',
      render: (book: any) => (
        <Text>
          {book.publishDate ? new Date(book.publishDate).toLocaleDateString('fr-FR') : '—'}
        </Text>
      ),
    },
    {
      header: 'Actions',
      key: 'actions',
      render: (book: any) => (
        <DefaultRowActions item={book} onEdit={handleEditBook} onDelete={handleDeleteBook} />
      ),
    },
  ];
  

  if (error) {
    return (
      <ErrorPage 
        title="Erreur de chargement"
        message="Impossible de charger la liste des livres"
        onRetry={() => navigate('/books')}
      />
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <Group justify="space-between" mb="sm">
        <Title order={3}>Livres</Title>
        <Button onClick={handleCreateBook} leftSection={<IconPlus size={16} />} size="sm">
          Ajouter
        </Button>
      </Group>

      <GenericTable
        data={bookList}
        columns={columns}
        loading={isLoading}
        idKey="id"
        totalItems={totalItems}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setItemsPerPage}
        selectable={false}
      />

      <BookFormModal 
        opened={modalOpened} 
        onClose={() => setModalOpened(false)} 
        initialData={editingBook} 
      />
    </div>
  );
};
