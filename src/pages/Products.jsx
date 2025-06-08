import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  fetchProducts,
  deleteProduct,
} from '../features/products/productSlice';

import {
  Table, TableBody, TableCell, TableHead, TableRow, Button, Typography, Box,
} from '@mui/material';

const Products = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>

      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/products/add"
        sx={{ mb: 2 }}
      >
        Add New Product
      </Button>

      {status === 'loading' && <Typography>Loading...</Typography>}
      {status === 'failed' && <Typography color="error">{error}</Typography>}

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Brand</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {products.map((prod) => (
            <TableRow key={prod.id}>
              <TableCell>{prod.title}</TableCell>
              <TableCell>{prod.brand}</TableCell>
              <TableCell>${prod.price}</TableCell>
              <TableCell>{prod.category}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  size="small"
                  component={Link}
                  to={`/products/${prod.id}`}
                >
                  Edit
                </Button>

                <Button
                  variant="outlined"
                  size="small"
                  color="error"
                  sx={{ ml: 1 }}
                  onClick={() => handleDelete(prod.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default Products;
