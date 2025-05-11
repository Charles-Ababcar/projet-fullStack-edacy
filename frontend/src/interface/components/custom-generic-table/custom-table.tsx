import {
  Table as MantineTable,
  Pagination,
  Text,
  Box,
  Group,
  Select,
  LoadingOverlay,
  ScrollArea,
  ActionIcon,
  Menu,
  Checkbox,
  Table,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconChevronDown,
  IconChevronUp,
  IconDotsVertical,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";
import { useState } from "react";

interface ColumnConfig<T> {
  header: string;
  key: keyof T | string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
  align?: "left" | "center" | "right";
}

interface GenericTableProps<T> {
  data: T[];
  columns: ColumnConfig<T>[];
  loading?: boolean;
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  onSort?: (sortBy: string, sortDirection: "asc" | "desc") => void;
  onRowClick?: (item: T) => void;
  rowActions?: (item: T) => React.ReactNode;
  selectable?: boolean;
  selectedItems?: string[];
  onSelectItems?: (ids: string[]) => void;
  idKey?: keyof T;
  emptyState?: React.ReactNode;
  className?: string;
  compact?: boolean;
}

export function GenericTable<T>({
  data,
  columns,
  loading = false,
  totalItems,
  currentPage,
  itemsPerPage = 10,
  onPageChange,
  onItemsPerPageChange,
  onSort,
  onRowClick,
  rowActions,
  selectable = false,
  selectedItems = [],
  onSelectItems,
  idKey = "id" as keyof T,
  emptyState,
  className = "",
  compact = false,
}: GenericTableProps<T>) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (key: string) => {
    if (!onSort) return;

    if (sortBy === key) {
      const newDirection = sortDirection === "asc" ? "desc" : "asc";
      setSortDirection(newDirection);
      onSort(key, newDirection);
    } else {
      setSortBy(key);
      setSortDirection("asc");
      onSort(key, "asc");
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (!onSelectItems) return;
    onSelectItems(checked ? data.map((item) => String(item[idKey])) : []);
  };

  const handleSelectItem = (id: string, checked: boolean) => {
    if (!onSelectItems) return;
    onSelectItems(
      checked
        ? [...selectedItems, id]
        : selectedItems.filter((itemId) => itemId !== id)
    );
  };

  const renderHeaderCell = (column: ColumnConfig<T>) => {
    const isSorted = sortBy === column.key;
    const SortIcon = isSorted
      ? sortDirection === "asc"
        ? IconChevronUp
        : IconChevronDown
      : null;

    return (
      <Group
        gap="xs"
        className={`${column.sortable ? "cursor-pointer" : ""}`}
        onClick={() =>
          column.sortable &&
          column.key !== "actions" &&
          handleSort(column.key as string)
        }
      >
        <Text size={compact ? "xs" : "sm"} fw={isSorted ? 600 : 500}>
          {column.header}
        </Text>
        {isSorted && SortIcon && <SortIcon size={14} />}
      </Group>
    );
  };

  const renderCellContent = (item: T, column: ColumnConfig<T>) => {
    if (column.render) {
      return column.render(item);
    }

    if (column.key === "actions" && rowActions) {
      return rowActions(item);
    }

    return (
      <Text size={compact ? "xs" : "sm"} truncate>
        {String(item[column.key as keyof T])}
      </Text>
    );
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <Box
      className={`relative rounded border border-gray-200 bg-white ${className}`}
    >
      <LoadingOverlay visible={loading} />

      <ScrollArea>
        <MantineTable
          striped
          highlightOnHover={!!onRowClick}
          className="min-w-full"
          verticalSpacing={compact ? "xs" : "sm"}
          horizontalSpacing={compact ? "xs" : "md"}
          fs={compact ? "xs" : "sm"}
        >
          <Table.Thead>
            <Table.Tr className="bg-gray-50">
              {selectable && (
                <Table.Th style={{ width: 32 }}>
                  <Checkbox
                    size={compact ? "xs" : "sm"}
                    checked={selectedItems.length === data.length && data.length > 0}
                    indeterminate={selectedItems.length > 0 && selectedItems.length < data.length}
                    onChange={(e) => handleSelectAll(e.currentTarget.checked)}
                  />
                </Table.Th>
              )}
              {columns.map((column) => (
                <Table.Th
                  key={column.header}
                  className={`${column.width || ""} ${
                    column.align === "center" ? "text-center" : ""
                  } ${column.align === "right" ? "text-right" : ""}`}
                >
                  {renderHeaderCell(column)}
                </Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <Table.Tr
                  key={String(item[idKey])}
                  className={`${onRowClick ? "cursor-pointer hover:bg-gray-50" : ""}`}
                  onClick={() => onRowClick?.(item)}
                >
                  {selectable && (
                    <Table.Td onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        size={compact ? "xs" : "sm"}
                        checked={selectedItems.includes(String(item[idKey]))}
                        onChange={(e) =>
                          handleSelectItem(String(item[idKey]), e.currentTarget.checked)
                        }
                      />
                    </Table.Td>
                  )}
                  {columns.map((column) => (
                    <Table.Td
                      key={`${String(item[idKey])}-${column.key?.toString()}`}
                      className={`${
                        column.align === "center" ? "text-center" : ""
                      } ${column.align === "right" ? "text-right" : ""}`}
                    >
                      {renderCellContent(item, column)}
                    </Table.Td>
                  ))}
                </Table.Tr>
              ))
            ) : (
              <Table.Tr>
                <Table.Td colSpan={columns.length + (selectable ? 1 : 0)} className="py-8 text-center">
                  {emptyState || (
                    <Text size="sm" c="dimmed">
                      Aucune donnée disponible
                    </Text>
                  )}
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </MantineTable>
      </ScrollArea>

      {totalItems > 0 && (
        <Group
          justify="space-between"
          className={`px-3 ${compact ? "py-1" : "py-2"} border-t border-gray-200`}
        >
          {!isMobile && (
            <Text size={compact ? "xs" : "sm"} c="dimmed">
              {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, totalItems)} sur {totalItems}
            </Text>
          )}

          <Group gap={compact ? "xs" : "sm"}>
            {onItemsPerPageChange && (
              <Select
                size={compact ? "xs" : "sm"}
                value={itemsPerPage.toString()}
                onChange={(value) => onItemsPerPageChange(Number(value))}
                data={[5, 10, 20, 50].map((opt) => ({
                  value: opt.toString(),
                  label: `${opt}/page`,
                }))}
                className={`${compact ? "w-24" : "w-32"}`}
              />
            )}

            <Pagination
              size={compact ? "xs" : "sm"}
              value={currentPage}
              onChange={onPageChange}
              total={totalPages}
              siblings={isMobile ? 0 : 1}
              boundaries={isMobile ? 0 : 1}
            />
          </Group>
        </Group>
      )}
    </Box>
  );
}

export const DefaultRowActions = <T extends { id: string }>({
  item,
  onEdit,
  onDelete,
  compact = false,
}: {
  item: T;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  compact?: boolean;
}) => {
  return (
    <Menu position="bottom-end" withinPortal>
      <Menu.Target>
        <ActionIcon variant="subtle" color="gray" size={compact ? "sm" : "md"}>
          <IconDotsVertical size={compact ? 16 : 18} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        {onEdit && (
          <Menu.Item
            leftSection={<IconEdit size={compact ? 14 : 16} />}
            onClick={() => onEdit(item)}
          >
            Modifier
          </Menu.Item>
        )}
        {onDelete && (
          <Menu.Item
            color="red"
            leftSection={<IconTrash size={compact ? 14 : 16} />}
            onClick={() => onDelete(item)}
          >
            Supprimer
          </Menu.Item>
        )}
      </Menu.Dropdown>
    </Menu>
  );
};