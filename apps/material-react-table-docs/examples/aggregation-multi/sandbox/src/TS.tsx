import { useMemo } from 'react';
import { Box } from '@mui/material';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { data, type Person } from './makeData';

const localeStringOptions = {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
} as const;

const Example = () => {
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        header: 'First Name',
        accessorKey: 'firstName',
      },
      {
        header: 'Last Name',
        accessorKey: 'lastName',
      },
      {
        header: 'Gender',
        accessorKey: 'gender',
      },
      {
        header: 'State',
        accessorKey: 'state',
      },
      {
        header: 'Salary',
        accessorKey: 'salary',
        aggregationFn: ['count', 'mean', 'median', 'min', 'max'],
        //required to render an aggregated cell, show the average salary in the group
        AggregatedCell: ({ cell }) => (
          <>
            Count:{' '}
            <Box sx={{ color: 'success.main', fontWeight: 'bold' }}>
              {cell.getValue<Array<number>>()?.[0]}
            </Box>
            Average:{' '}
            <Box sx={{ color: 'success.main', fontWeight: 'bold' }}>
              {cell
                .getValue<Array<number>>()?.[1]
                ?.toLocaleString?.('en-US', localeStringOptions)}
            </Box>
            Median:{' '}
            <Box sx={{ color: 'success.main', fontWeight: 'bold' }}>
              {cell
                .getValue<Array<number>>()?.[2]
                ?.toLocaleString?.('en-US', localeStringOptions)}
            </Box>
            Min:{' '}
            <Box sx={{ color: 'success.main', fontWeight: 'bold' }}>
              {cell
                .getValue<Array<number>>()?.[3]
                ?.toLocaleString?.('en-US', localeStringOptions)}
            </Box>
            Max:{' '}
            <Box sx={{ color: 'success.main', fontWeight: 'bold' }}>
              {cell
                .getValue<Array<number>>()?.[4]
                ?.toLocaleString?.('en-US', localeStringOptions)}
            </Box>
          </>
        ),
        //customize normal cell render on normal non-aggregated rows
        Cell: ({ cell }) => (
          <>
            {cell
              .getValue<number>()
              ?.toLocaleString?.('en-US', localeStringOptions)}
          </>
        ),
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableGrouping: true,
    enableStickyHeader: true,
    initialState: {
      density: 'compact',
      expanded: true, //expand all groups by default
      grouping: ['state'], //an array of columns to group by by default (can be multiple)
      pagination: { pageIndex: 0, pageSize: 20 },
      sorting: [{ id: 'state', desc: false }], //sort by state by default
    },
    muiToolbarAlertBannerChipProps: { color: 'primary' },
    muiTableContainerProps: { sx: { maxHeight: 700 } },
  });

  return <MaterialReactTable table={table} />;
};

export default Example;
