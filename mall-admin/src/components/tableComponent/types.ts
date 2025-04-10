export interface TableColumn {
  prop?: string;
  label: string;
  width?: number | string;
  minWidth?: number | string;
  sortable?: boolean;
  fixed?: string | boolean;
  slot?: string;
}

export interface TableProps {
  columns: TableColumn[];
  data: any[];
  loading?: boolean;
}
