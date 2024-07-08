import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import {
  useTable,
  useSortBy,
  useFilters,
  useGlobalFilter,
  usePagination
} from 'react-table';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  TextField,
  Button
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

const DynamicTable = () => {
  const [tableData, setTableData] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [filterInput, setFilterInput] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/https://demo-cs.blr1.cdn.digitaloceanspaces.com/test/hdfc.json');
        const dataArray = response.data;
        setTableData(dataArray);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const data = useMemo(() => tableData, [tableData]);

  const columns = useMemo(() => [
    {
      Header: 'Date',
      accessor: 'Date',
    },
    {
      Header: 'Open Price',
      accessor: 'Open Price',
    },
    {
      Header: 'High Price',
      accessor: 'High Price',
    },
    {
      Header: 'Low Price',
      accessor: 'Low Price',
    },
    {
      Header: 'Close Price',
      accessor: 'Close Price',
    },
    {
      Header: 'Total Traded Quantity',
      accessor: 'Total Traded Quantity',
    },
    {
      Header: 'Turnover ₹',
      accessor: 'Turnover ₹',
    },
    {
      Header: 'Actions',
      Cell: ({ row }) => (
        <div>
          {editingRow === row.index ? (
            <>
              <IconButton onClick={() => saveRow(row.index)}>
                <SaveIcon />
              </IconButton>
              <IconButton onClick={() => setEditingRow(null)}>
                <CancelIcon />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton onClick={() => setEditingRow(row.index)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => deleteRow(row.index)}>
                <DeleteIcon />
              </IconButton>
            </>
          )}
        </div>
      )
    }
  ], [editingRow]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    state: { pageIndex, globalFilter, pageSize }
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
      autoResetPage: false
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const handleFilterChange = (e) => {
    const value = e.target.value || '';
    setGlobalFilter(value);
    setFilterInput(value);
  };

  const saveRow = (index) => {
    setEditingRow(null);
  };

  const deleteRow = (index) => {
    const newData = [...tableData];
    newData.splice(index, 1);
    setTableData(newData);
  };

  return (
    <div style={{ backgroundColor: darkMode ? '#333' : '#fff', color: darkMode ? '#fff' : '#000', minHeight: '100vh', padding: '20px' }}>
      <Button onClick={() => setDarkMode(prevMode => !prevMode)} style={{ marginBottom: '20px' }}>
         {darkMode ? 'Light' : 'Dark'} Mode
      </Button>
      <TextField
        value={filterInput}
        onChange={handleFilterChange}
        placeholder={'Search...'}
        style={{ marginBottom: '10px', backgroundColor: darkMode ? '#555' : '#fff', color: darkMode ? '#fff' : '#000' }}
      />
      <TableContainer component={Paper} style={{ backgroundColor: darkMode ? '#555' : '#fff' }}>
        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map(headerGroup => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <TableCell {...column.getHeaderProps(column.getSortByToggleProps())} style={{ color: darkMode ? '#fff' : '#000' }}>
                    {column.render('Header')}
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map(row => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <TableCell {...cell.getCellProps()} style={{ color: darkMode ? '#fff' : '#000' }}>
                        {editingRow === row.index ? (
                          <TextField
                            value={cell.value}
                            onChange={(e) => {
                              const newData = [...tableData];
                              newData[row.index][cell.column.id] = e.target.value;
                              setTableData(newData);
                            }}
                            style={{ backgroundColor: darkMode ? '#555' : '#fff', color: darkMode ? '#fff' : '#000' }}
                          />
                        ) : (
                          cell.render('Cell')
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={rows.length}
        rowsPerPage={pageSize}
        page={pageIndex}
        onPageChange={(event, newPage) => gotoPage(newPage)}
        onRowsPerPageChange={(event) => {
          setPageSize(Number(event.target.value));
        }}
        nextIconButtonProps={{ disabled: !canNextPage }}
        backIconButtonProps={{ disabled: !canPreviousPage }}
        rowsPerPageOptions={[10, 20, 30]}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </Button>
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <Button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default DynamicTable;
