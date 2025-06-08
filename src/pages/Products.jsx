import React, { useEffect } from 'react';
import { Typography, Paper, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../features/products/productSlice';

const Products = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Products List
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Button variant="contained" component={Link} to="/products/add">
          Add New Product
        </Button>
      </Box>

      {status === 'loading' && <Typography>Loading products...</Typography>}
      {status === 'failed' && <Typography color="error">{error}</Typography>}

      {status === 'succeeded' && products.length === 0 && (
        <Typography>No products available.</Typography>
      )}

      {status === 'succeeded' && products.length > 0 && (
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="products table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Brand</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Discount %</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id} hover>
                  <TableCell>{product.title}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>{product.brand}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.discountPercentage}%</TableCell>
                  <TableCell>{product.rating}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      size="small"
                      component={Link}
                      to={`/products/edit/${product.id}`}
                      sx={{ mr: 1 }}
                    >
                      Edit
                    </Button>
                    {/* You can add delete button here if you want */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
};

export default Products;
