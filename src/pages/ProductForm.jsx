import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from '@mui/material';
import {
  addProduct,
  updateProduct,
  fetchProducts,
} from '../features/products/productSlice';

const ProductForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { products, status } = useSelector((state) => state.products);
  const [initialValues, setInitialValues] = useState({
    title: '',
    description: '',
    price: '',
    discountPercentage: '',
    rating: '',
    stock: '',
    brand: '',
    category: '',
  });

  const isEdit = !!id;

  useEffect(() => {
    if (isEdit && products.length === 0) {
      dispatch(fetchProducts());
    } else if (isEdit && products.length > 0) {
      const product = products.find((p) => p.id === parseInt(id));
      if (product) {
        setInitialValues({
          title: product.title,
          description: product.description,
          price: product.price.toString(),
          discountPercentage: product.discountPercentage.toString(),
          rating: product.rating.toString(),
          stock: product.stock.toString(),
          brand: product.brand,
          category: product.category,
        });
      } else {
        // If product not found, redirect back to products
        navigate('/products');
      }
    }
  }, [id, products, isEdit, dispatch, navigate]);

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required('Product title is required')
      .max(100, 'Title must be at most 100 characters'),
    description: Yup.string()
      .required('Description is required')
      .min(10, 'Description must be at least 10 characters'),
    price: Yup.number()
      .required('Price is required')
      .positive('Price must be positive')
      .max(10000, 'Price must be less than $10,000'),
    discountPercentage: Yup.number()
      .min(0, 'Discount cannot be negative')
      .max(100, 'Discount cannot exceed 100%'),
    rating: Yup.number()
      .min(0, 'Rating must be at least 0')
      .max(5, 'Rating cannot exceed 5'),
    stock: Yup.number()
      .required('Stock quantity is required')
      .integer('Stock must be a whole number')
      .min(0, 'Stock cannot be negative'),
    brand: Yup.string().required('Brand is required'),
    category: Yup.string().required('Category is required'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    const productData = {
      ...values,
      price: parseFloat(values.price),
      discountPercentage: parseFloat(values.discountPercentage),
      rating: parseFloat(values.rating),
      stock: parseInt(values.stock),
    };

    if (isEdit) {
      dispatch(updateProduct({ id, product: productData }))
        .unwrap()
        .then(() => {
          navigate('/products');
        })
        .finally(() => {
          setSubmitting(false);
        });
    } else {
      dispatch(addProduct(productData))
        .unwrap()
        .then(() => {
          navigate('/products');
        })
        .finally(() => {
          setSubmitting(false);
        });
    }
  };

  return (
    <Box
      sx={{
        width: '60%',
        margin: 'auto',
        p: 3,
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h4" gutterBottom>
        {isEdit ? 'Edit Product' : 'Add Product'}
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                component={TextField}
                name="title"
                label="Title"
                fullWidth
                margin="normal"
              />
              <Field
                component={TextField}
                name="description"
                label="Description"
                fullWidth
                margin="normal"
                multiline
                rows={4}
              />
              <Field
                component={TextField}
                name="price"
                label="Price"
                type="number"
                fullWidth
                margin="normal"
              />
              <Field
                component={TextField}
                name="discountPercentage"
                label="Discount Percentage"
                type="number"
                fullWidth
                margin="normal"
              />
              <Field
                component={TextField}
                name="rating"
                label="Rating (0-5)"
                type="number"
                fullWidth
                margin="normal"
              />
              <Field
                component={TextField}
                name="stock"
                label="Stock"
                type="number"
                fullWidth
                margin="normal"
              />
              <Field
                component={TextField}
                name="brand"
                label="Brand"
                fullWidth
                margin="normal"
              />
              <Field
                component={TextField}
                name="category"
                label="Category"
                fullWidth
                margin="normal"
              />
              <Box sx={{ mt: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting || status === 'loading'}
                  startIcon={
                    isSubmitting || status === 'loading' ? (
                      <CircularProgress size={20} />
                    ) : null
                  }
                >
                  {isEdit ? 'Update' : 'Add'} Product
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{ ml: 2 }}
                  onClick={() => navigate('/products')}
                >
                  Cancel
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default ProductForm;
