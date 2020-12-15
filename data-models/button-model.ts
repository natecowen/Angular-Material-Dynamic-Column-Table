type DataColumnType = 'data' | 'button';

export interface DataTableColumn {
  columnDef: string;
  header: string;
  dataName: (row: any) => {};
  type?: DataColumnType;
  action?: string;
  color?: string;
  click?: (e) => {};
}