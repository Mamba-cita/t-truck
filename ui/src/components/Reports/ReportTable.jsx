import React, { useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Button, Menu, MenuItem } from '@material-ui/core';
import FlexBetween from '../FlexBetween';

const ReportTable = ({ title, data }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleViewButtonClick = () => {
    setIsDropdownOpen(false);
  };

  // Ensure data is an array before rendering
  if (!Array.isArray(data)) {
    return null;
  }

  return (
    <div>
      <FlexBetween>
        <Button
          variant="contained"
          color="primary"
          onClick={handleDropdownToggle}
          aria-controls="view-moves-dropdown"
          aria-haspopup="true"
          style={{ marginLeft: '10px' }}
        >
          UnPaid Moves:  {data.length}
        </Button>
        <Menu
          id="view-moves-dropdown"
          anchorEl={isDropdownOpen}
          open={Boolean(isDropdownOpen)}
          onClose={() => setIsDropdownOpen(null)}
        >
          <MenuItem onClick={handleViewButtonClick}>View Moves: {data.length}</MenuItem>
        </Menu>
      </FlexBetween>

      {/* Render the table only when isDropdownOpen is true */}
      {isDropdownOpen && (
        <Table style={{ marginTop: '20px', width: '100%', borderCollapse: 'collapse' }}>
          <TableHead>
            <TableRow>
              <TableCell style={{ backgroundColor: '#f2f2f2', padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Move ID</TableCell>
              <TableCell style={{ backgroundColor: '#f2f2f2', padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Origin</TableCell>
              <TableCell style={{ backgroundColor: '#f2f2f2', padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Destination</TableCell>
              <TableCell style={{ backgroundColor: '#f2f2f2', padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Invoice Date</TableCell>
              <TableCell style={{ backgroundColor: '#f2f2f2', padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Invoice No</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row._id}>
                <TableCell style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>{row.moveId}</TableCell>
                <TableCell style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>{row.origin}</TableCell>
                <TableCell style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>{row.destination}</TableCell>
                <TableCell style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>{row.invoiceDate}</TableCell>
                <TableCell style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>{row.invoiceNo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default ReportTable;
