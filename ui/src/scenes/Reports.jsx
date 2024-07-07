import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Container, Grid, Paper, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getMoves } from '../features/transport/moveSlice';
import { DataGrid } from '@mui/x-data-grid';
import * as xlsx from 'xlsx';
import FlexBetween from '../components/FlexBetween';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

const Reports = () => {
  const dispatch = useDispatch();
  const moves = useSelector((state) => state.moves.moves.map((move, index) => ({ ...move, id: index })));
  const loading = useSelector((state) => state.moves.loading);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    customer: '',
    transporter: '',
    origin: '',
    destination: '',
    loadingDate: '',
    offloadingDate: '',
    status: '',
  });
  React.useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);
  useEffect(() => {
    dispatch(getMoves(filters));
  }, [dispatch, filters]);


  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleDownload = () => {
    const csvData = moves.map(move => Object.values(move).join(',')).join('\n');
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'moves.csv';
    link.click();
  };

  const exportToExcel = () => {
    // Define header template
    const headerTemplate = [
      { label: 'Company Name', key: 'companyName' },
      { label: 'Address', key: 'address' },
      { label: 'Phone Number', key: 'phoneNumber' },
      { label: 'Email', key: 'email' },
      { label: 'KRA PIN', key: 'kraPin' },
      // Add more fields as needed
    ];

    // Map moves data to match header template
    const data = moves.map(move => {
      const row = {};
      headerTemplate.forEach(item => {
        row[item.label] = move[item.key];
      });
      return row;
    });

    // Convert data to Excel worksheet
    const worksheet = xlsx.utils.json_to_sheet(data, { header: headerTemplate.map(item => item.label) });

    // Set column widths
    worksheet['!cols'] = [{ wch: 30 }, { wch: 30 }, { wch: 30 }, { wch: 30 }, { wch: 30 }];

    // Create workbook object
    const workbook = { Sheets: { 'Sheet1': worksheet }, SheetNames: ['Sheet1'] };

    // Convert workbook to Excel file
    const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Create download link and trigger download
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'moves.xlsx';
    link.click();
  };



  const handleApplyFilters = () => {
    dispatch(getMoves(filters));
  };

  const columns = [
    { field: "truck", headerName: "Truck", flex: 1 },
    { field: "origin", headerName: "Origin", flex: 1 },
    { field: "destination", headerName: "Destination", flex: 1 },
    { field: "container_number", headerName: "Container Number", flex: 1 },
    { field: "dep_des", headerName: "Offloaded Date", flex: 1 },
    { field: "cargo_rate", headerName: "Rate", flex: 1 },
    { field: "cargo_rate_type", headerName: "Rate Type", flex: 1 },
    { field: "invoice_no", headerName: "Invoice No", flex: 1 },
    { field: "Status", headerName: "Stage", flex: 1 },
    { field: "invoiced", headerName: "Invoiced Date", flex: 1 }
  ];

  return (
     <Container maxWidth="xl">
      <Header title="OverView" />
      <p>You are on the reports page {user && user.name}</p>

      <Paper style={{ padding: '10px', marginBottom: '20px' }}>
        <Typography variant="h6" gutterBottom>Filter Moves</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <TextField fullWidth label="Customer" name="customer" value={filters.customer} onChange={handleFilterChange} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField fullWidth label="Transporter" name="transporter" value={filters.transporter} onChange={handleFilterChange} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField fullWidth label="Origin" name="origin" value={filters.origin} onChange={handleFilterChange} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField fullWidth label="Destination" name="destination" value={filters.destination} onChange={handleFilterChange} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField fullWidth type="date" label="Loading Date" name="loadingDate" value={filters.loadingDate} onChange={handleFilterChange} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField fullWidth type="date" label="Offloading Date" name="offloadingDate" value={filters.offloadingDate} onChange={handleFilterChange} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField fullWidth label="Status" name="status" value={filters.status} onChange={handleFilterChange} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button variant="contained" color="primary" onClick={handleApplyFilters}>Apply Filters</Button>
          </Grid>
        </Grid>
      </Paper>
      <Paper style={{ padding: '20px', marginBottom: '20px' }}>
        <FlexBetween>
          <Button variant="contained" color="primary" onClick={handleDownload} style={{ marginRight: '10px' }}>Download as CSV</Button>
          <Button variant="contained" color="primary" onClick={exportToExcel}>Download as Excel</Button>
        </FlexBetween>
      </Paper>
      <Paper style={{ padding: '20px' }}>
        <Typography variant="h6" gutterBottom>Moves</Typography>
        {loading ? <CircularProgress /> : (
          <Box style={{ height: 400, width: '100%' }}>
            <DataGrid rows={moves} columns={columns} />
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Reports;
