import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import initiateCheckout from '../lib/payments';
import products from '../products.json';

const defaultCat = {
  products: {},
};

export default function Home() {
  const [cart, setCart] = useState(defaultCat);

  const cartItems = Object.keys(cart.products).map(key => {
    const product = products.find(({ id }) => `${id}` === `${key}`);
    return {
      ...cart.products[key],
      pricePerItem: product.price,
    };
  });
  console.log('Home -> cartItems', cartItems);

  const subtotal = cartItems.reduce((acc, { pricePerItem, quantity }) => {
    return acc + pricePerItem * quantity;
  }, 0);
  console.log('Home -> subtotal', subtotal);

  const totalItems = cartItems.reduce((acc, { quantity }) => {
    return acc + quantity;
  }, 0);
  console.log('Home -> totalItems', totalItems);

  const addToCart = ({ id }: any = {}) => {
    setCart(prev => {
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

  const renderProducts = products.map(product => (
    <li key={product.id} className={styles.card}>
      <a key={product.title} href="https://nextjs.org/docs">
        <img
          src={product.imgSrc}
          alt={product.title}
          style={{ maxWidth: '100%' }}
        />
        <p>£{product.price}</p>
        <h3>{product.title}</h3>
        <p>{product.desc}</p>
      </a>
      <p>
        <button
          className={styles.button}
          onClick={() => {
            addToCart({
              id: product.id,
            });
          }}
        >
          Add to Cart
        </button>
      </p>
    </li>
  ));

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Space Jelly Shop</h1>

        <p className={styles.description}>
          The best space jellyfish swag in the universe!
        </p>

        <p className={styles.description}>
          <strong>Items:</strong> {totalItems}
          <br />
          <strong>Total Cost:</strong> £{subtotal}
          <br />
          <button className={styles.button} onClick={checkout}>
            Go to Checkout
          </button>
        </p>

        {/**
         * @lesson-02-todo Exercise 1
         * We want to add products to our app. How can we use the code that
         * already comes with Next.js to get started adding our products?
         *
         * @lesson-02-todo Exercise 2
         * Our product details are important, but it's also important to show
         * some images of our products. Let's import pictures of our products
         * and display those images above our product titles.
         *
         * @lesson-02-todo Exercise 3
         * Using an unordered list typically makes more sense semantically when
         * showing a list of something like in our case, products. Update the
         * grid of products to an unordered list with a list item that wraps
         * each product card.
         */}

        <ul className={styles.grid}>{renderProducts}</ul>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
