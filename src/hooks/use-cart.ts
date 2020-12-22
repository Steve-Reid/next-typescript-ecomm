import { useState } from 'react';
import initiateCheckout from '../lib/payments';
import products from '../products.json';

const defaultCat = {
  products: {},
};

const useCart = () => {
  const [cart, updateCart] = useState(defaultCat);

  const cartItems = Object.keys(cart.products).map(key => {
    const product = products.find(({ id }) => `${id}` === `${key}`);
    return {
      ...cart.products[key],
      pricePerItem: product.price,
    };
  });

  const subtotal = cartItems.reduce((acc, { pricePerItem, quantity }) => {
    return acc + pricePerItem * quantity;
  }, 0);

  const totalItems = cartItems.reduce((acc, { quantity }) => {
    return acc + quantity;
  }, 0);

  const addToCart = ({ id }: any = {}) => {
    updateCart(prev => {
      const cartState = { ...prev };

      if (cartState?.products[id]) {
        cartState.products[id].quantity += 1;
      } else {
        cartState.products[id] = {
          id,
          quantity: 1,
        };
      }

      return cartState;
    });
  };

  const checkout = () => {
    initiateCheckout({
      lineItems: cartItems.map(item => {
        return {
          price: item.id,
          quantity: item.quantity,
        };
      }),
    });
  };
  return {
    cart,
    updateCart,
    subtotal,
    totalItems,
    addToCart,
    checkout,
  };
};

export default useCart;
