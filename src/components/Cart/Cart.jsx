import React from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

import CartItem from './CartItem/CartItem';
import useStyles from './styles.js';

const Cart = ({
  cart,
  handleEmptyCart,
  handleRemoveFromCart,
  handleUpdateCartQty,
}) => {
  const classes = useStyles();

  const EmptyCart = () => {
    return (
      <Typography variant="subtitle1">
        You have no items in your shopping cart.
        <Link to="/" className={classes.link}>
          Go back and shop.
        </Link>
      </Typography>
    );
  };

  const FilledCart = () => {
    return (
      <div>
        <Grid container spacing={cart.total_items}>
          {cart.line_items.map((item) => (
            <Grid item xs={12} sm={4} key={item.id}>
              <CartItem
                item={item}
                handleUpdateCartQty={handleUpdateCartQty}
                handleRemoveFromCart={handleRemoveFromCart}
              />
            </Grid>
          ))}
        </Grid>
        <div className={classes.cardDetails}>
          <Typography variant="h4">
            Subtotal: {cart.subtotal.formatted_with_symbol}
          </Typography>
          <div>
            <Button
              className={classes.emptyButton}
              size="large"
              type="button"
              variant="contained"
              color="secondary"
              onClick={handleEmptyCart}
            >
              Empty Cart
            </Button>
            <Button
              component={Link}
              to="/checkout"
              className={classes.checkoutButton}
              size="large"
              type="button"
              variant="contained"
              color="primary"
            >
              Check Out
            </Button>
          </div>
        </div>
      </div>
    );
  };

  if (!cart.line_items) return 'Loading...';

  return (
    <div>
      <Container>
        <div className={classes.toolbar} />
        <Typography className={classes.title} variant="h3" gutterBottom>
          Your Shopping Cart
        </Typography>
        {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
      </Container>
    </div>
  );
};

export default Cart;
