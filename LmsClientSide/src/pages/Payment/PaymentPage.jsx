import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import axios from 'axios';
import './PaymentPage.css'; // Import custom CSS for styling

const stripePromise = loadStripe('pk_test_51PekZOJzq6GPnvu3Z6EYwGUL0zicrGbCglndDk8AmjuR4P3KthnnziCGhk3dpuiLQrXZ0qWOPyIo6tgkNMlRPWtH00kdrtwcE5'); // Replace with your Stripe public key

function PaymentPage() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) {
      return; // Stripe.js has not yet loaded.
    }

    const cardElement = elements.getElement(CardElement);

    // Create a Payment Method
    const { error: cardError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (cardError) {
      setError(cardError.message);
      setLoading(false);
      return;
    }

    // Log the generated paymentMethodId to the console
    console.log('Generated Payment Method ID:', paymentMethod.id);

    // Retrieve the Beaker token
    const beakerToken = localStorage.getItem('jwtToken'); // Example of getting the token from local storage
    console.log(beakerToken);

    // Send the Payment Method ID and Beaker token to your server
    try {
      const response = await axios.post(
        'https://localhost:7032/api/Fee/ProcessPayment/5ce7342d-727a-43ad-8226-08dd30e02c4b',
        {
          paymentMethodId: paymentMethod.id, // Include paymentMethodId
        },
        {
          headers: {
            Authorization: `Bearer ${beakerToken}`, // Include the token in the headers
            "Content-Type": "application/json",
          },
        }
      );

      const { clientSecret } = response.data;

      // Confirm the payment
      const { error: stripeError } = await stripe.confirmCardPayment(clientSecret);
      if (stripeError) {
        setError(stripeError.message);
      } else {
        alert('Payment successful!');
      }
    } catch (error) {
      setError('Payment failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to generate a payment method ID for testing
  const handleGeneratePaymentMethodId = async () => {
    if (!stripe || !elements) {
      console.error('Stripe.js has not yet loaded.');
      return;
    }

    const cardElement = elements.getElement(CardElement);

    // Create a Payment Method using the card details from CardElement
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error('Error generating payment method:', error);
    } else {
      console.log('Generated Payment Method ID for testing:', paymentMethod.id);
    }
  };

  return (
    <div className="payment-page">
      <h1>Checkout</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handlePayment} className="payment-form">
        <div className="card-element-container">
          <CardElement className="card-element" />
        </div>
        <button type="submit" disabled={loading || !stripe} className="pay-button">
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
      <button onClick={handleGeneratePaymentMethodId} className="generate-button">Generate Payment Method ID</button>
    </div>
  );
}

export default function WrappedPaymentPage() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentPage />
    </Elements>
  );
} 