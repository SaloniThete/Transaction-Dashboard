import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

const TransactionsTable = ({ search, setSearch, fetchNext, fetchPrev, page, totalPages }) => {
  const [selectedMonth, setSelectedMonth] = useState('March');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPagesState, setTotalPagesState] = useState(0);  // State for total pages

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };


  
  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/transactions/combined-data', {
          params: {
            month: selectedMonth,
            search: search,
            page: page,
            perPage: 10,
          },
        });

        const { transactions, totalPages } = response.data;
console.log('response---------->',response.data)
        setTransactions(transactions); // Set transactions data
        setTotalPagesState(totalPages); // Set the total pages
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError('Error fetching data');
      }
    };

    fetchTransactions();
  }, [selectedMonth, search, page]);

  return (
    <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#f3f8fc', marginLeft: 60 }}>
      <h2 style={{ marginBottom: '16px', color: '#333' }}>Transaction Dashboard</h2>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <TextField
          label="Search transaction"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ bgcolor: '#ffd966', borderRadius: 1, flex: 1, mr: 1 }}
        />

        <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Month</InputLabel>
          <Select
            value={selectedMonth}
            onChange={handleMonthChange}
            label="Month"
            sx={{ bgcolor: '#ffd966', borderRadius: 1 }}
          >
            <MenuItem value="January">January</MenuItem>
            <MenuItem value="February">February</MenuItem>
            <MenuItem value="March">March</MenuItem>
            <MenuItem value="April">April</MenuItem>
            <MenuItem value="May">May</MenuItem>
            <MenuItem value="June">June</MenuItem>
            <MenuItem value="July">July</MenuItem>
            <MenuItem value="August">August</MenuItem>
            <MenuItem value="September">September</MenuItem>
            <MenuItem value="October">October</MenuItem>
            <MenuItem value="November">November</MenuItem>
            <MenuItem value="December">December</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Loading or Error Handling */}
      {loading && <CircularProgress />}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Displaying the transactions in a table */}
      <TableContainer component={Paper} sx={{ bgcolor: '#ffd966', borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Sold</TableCell>
              <TableCell>Image</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {transactions.map((t) => (
              <TableRow key={t.id}>
                <TableCell>{t.id}</TableCell>
                <TableCell>{t.title}</TableCell>
                <TableCell>{t.description}</TableCell>
                <TableCell>${t.price}</TableCell>
                <TableCell>{t.category}</TableCell>
                <TableCell>{t.sold ? 'Yes' : 'No'}</TableCell>
                <TableCell><img src={t.image} alt="item" style={{ width: '50px', height: '50px' }} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Controls */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
        <Button
          onClick={fetchPrev}
          variant="outlined"
          sx={{ mx: 1, textTransform: 'none' }}
          disabled={page === 1}
        >
          Previous
        </Button>
        <span>Page {page} / {totalPagesState}</span>
        <Button
          onClick={fetchNext}
          variant="outlined"
          sx={{ mx: 1, textTransform: 'none' }}
          disabled={page === totalPagesState}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default TransactionsTable;
