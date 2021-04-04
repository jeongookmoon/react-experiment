import { rowProps } from './types';

export const COLUMNS = [
  {
    Header: 'Id',
    accessor: 'id' as keyof rowProps,
  },
  {
    Header: 'First Name',
    accessor: 'first_name' as keyof rowProps,
  },
  {
    Header: 'Last Name',
    accessor: 'last_name' as keyof rowProps,
  },
  {
    Header: 'Email',
    accessor: 'email' as keyof rowProps,
  },
  {
    Header: 'Gender',
    accessor: 'gender' as keyof rowProps,
  },
  {
    Header: 'IPv4',
    accessor: 'ip_address' as keyof rowProps,
  },
];

export const GROUPED_COLUMNS = [
  {
    Header: 'Id',
    accessor: 'id' as keyof rowProps,
  },
  {
    Header: 'Name',
    columns: [
      {
        Header: 'First Name',
        accessor: 'first_name' as keyof rowProps,
      },
      {
        Header: 'Last Name',
        accessor: 'last_name' as keyof rowProps,
      },
    ],
  },
  {
    Header: 'Personal Info',
    columns: [
      {
        Header: 'Email',
        accessor: 'email' as keyof rowProps,
      },
      {
        Header: 'Gender',
        accessor: 'gender' as keyof rowProps,
      },
      {
        Header: 'IPv4',
        accessor: 'ip_address' as keyof rowProps,
      },
    ],
  },
];
