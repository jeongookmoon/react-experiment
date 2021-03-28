export interface IColumn {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  ip_address: string;
}

export const COLUMNS = [
  {
    Header: 'Id',
    accessor: 'id' as keyof IColumn,
  },
  {
    Header: 'First Name',
    accessor: 'first_name' as keyof IColumn,
  },
  {
    Header: 'Last Name',
    accessor: 'last_name' as keyof IColumn,
  },
  {
    Header: 'Email',
    accessor: 'email' as keyof IColumn,
  },
  {
    Header: 'Gender',
    accessor: 'gender' as keyof IColumn,
  },
  {
    Header: 'IPv4',
    accessor: 'ip_address' as keyof IColumn,
  },
];

export const GROUPED_COLUMNS = [
  {
    Header: 'Id',
    accessor: 'id' as keyof IColumn,
  },
  {
    Header: 'Name',
    columns: [
      {
        Header: 'First Name',
        accessor: 'first_name' as keyof IColumn,
      },
      {
        Header: 'Last Name',
        accessor: 'last_name' as keyof IColumn,
      },
    ],
  },
  {
    Header: 'Personal Info',
    columns: [
      {
        Header: 'Email',
        accessor: 'email' as keyof IColumn,
      },
      {
        Header: 'Gender',
        accessor: 'gender' as keyof IColumn,
      },
      {
        Header: 'IPv4',
        accessor: 'ip_address' as keyof IColumn,
      },
    ],
  },
];
