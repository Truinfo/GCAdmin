import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import axios from 'axios';

import { format } from 'date-fns';
const InventoryList = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');
  useEffect(() => {
    const fetchInventoryItems = async () => {
      try {
        const serviceCenterId = localStorage.getItem('ServiceCenterId');

        if (!serviceCenterId) {
          console.error('ServiceCenterId is not available.');
          return;
        }

        const response = await axios.get(`https://gocarsmithbackend.onrender.com/api/admin/inventoryByServiceCenter/${serviceCenterId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { items, totalQuantity } = response.data;
        setItems(items);
      } catch (error) {
        console.error('Error fetching inventory items:', error);
        setError('Failed to retrieve inventory items');
      }
    };

    fetchInventoryItems();
  }, []); // Ensure the effect runs only once on mount


  const getStockDetailsStyle = (stockCount) => {
    if (stockCount === 0) {
      return { backgroundColor: 'red', fontWeight: '500', fontSize: '15px', color: "white" };
    } else if (stockCount <= 10) {
      return { backgroundColor: 'red', fontWeight: '500', fontSize: '15px', color: "white" };
    } else {
      return { backgroundColor: 'green', fontWeight: '500', fontSize: '15px', color: "white" };
    }
  };

  const getStockDetailsText = (stockCount) => {
    if (stockCount === 0) {
      return 'Out of stock';
    } else if (stockCount <= 10) {
      return 'Low stock';
    } else {
      return 'In stock';
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Inventory List
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Inventory ID</TableCell>
              <TableCell>Inventory Name</TableCell>
              <TableCell>Last Issued Date</TableCell>
              <TableCell>ExpiryDate</TableCell>
              <TableCell>Stock Count</TableCell>
              <TableCell>Stock Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item._id}</TableCell>
                <TableCell>{item.itemName}</TableCell>
                <TableCell>{format(new Date(item.purchaseDate), 'yyyy-MM-dd')}</TableCell>
                <TableCell>{format(new Date(item.ExpiryDate), 'yyyy-MM-dd')}</TableCell>
                <TableCell>{item.quantityInStock}</TableCell>
                <TableCell>
                  <Chip
                    label={getStockDetailsText(item.quantityInStock)}
                    style={getStockDetailsStyle(item.quantityInStock)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default InventoryList;
