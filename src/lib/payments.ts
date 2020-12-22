import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY);

const initiateCheckout = async ({ lineItems } = {}) => {
  const stripe = await stripePromise;

  await stripe.redirectToCheckout({
    mode: 'payment',
    lineItems,
    // on success return to page from stripe with CHECKOUT_SESSION_IDs
    successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
    // on cancel return to page from stripe
    cancelUrl: window.location.origin,
  });
  console.log('Checkout');
};

export default initiateCheckout;
