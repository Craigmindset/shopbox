'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState([]);
  const [checkoutForm, setCheckoutForm] = useState({
    name: '',
    email: '',
    address: '',
    card: '',
  });
  const [paymentState, setPaymentState] = useState('idle');

  const cartSummary = useMemo(() => {
    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = itemCount > 0 ? 5000 : 0;
    return {
      itemCount,
      subtotal,
      shipping,
      total: subtotal + shipping,
    };
  }, [cartItems]);

  function removeFromCart(productId, previewImage) {
    setCartItems((current) =>
      current.filter(
        (item) => !(item.id === productId && item.previewImage === previewImage)
      )
    );
  }

  function updateQuantity(productId, previewImage, nextQuantity) {
    if (nextQuantity <= 0) {
      removeFromCart(productId, previewImage);
      return;
    }
    setCartItems((current) =>
      current.map((item) =>
        item.id === productId && item.previewImage === previewImage
          ? { ...item, quantity: nextQuantity }
          : item
      )
    );
  }

  function handleCheckoutChange(event) {
    const { name, value } = event.target;
    setCheckoutForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleCheckout(event) {
    event.preventDefault();
    if (cartSummary.itemCount === 0) {
      return;
    }
    setPaymentState('processing');
    window.setTimeout(() => {
      setPaymentState('complete');
      setCartItems([]);
      setCheckoutForm({ name: '', email: '', address: '', card: '' });
    }, 1200);
  }

  return (
    <main className="min-h-screen bg-black">
      <header className="sticky top-0 z-30 border-b border-[#1a1a1a] bg-black px-6 py-4 lg:px-12">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-white">SHOPBOX</span>
          </Link>
          <div className="rounded-full bg-brandPink px-4 py-2 font-medium text-white">
            Cart {cartSummary.itemCount}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="relative flex min-h-[300px] items-center bg-cover bg-center"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/images/herosection.jpeg')",
        }}
      >
        <div className="w-full px-6 py-16 lg:px-12">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="text-5xl font-bold text-white lg:text-6xl">Checkout</h1>
            <p className="mt-4 text-xl text-brandGray">Complete your order</p>
          </div>
        </div>
      </section>

      <section className="grid gap-0 border-t border-[#1a1a1a] lg:grid-cols-2">
        <div className="border-r border-[#1a1a1a] px-6 py-12 lg:px-12">
          <h3 className="text-3xl font-bold text-white">Cart</h3>
          <div className="mt-8 flex flex-col gap-4">
            {cartItems.length === 0 ? (
              <div className="border border-dashed border-[#1a1a1a] p-8 text-center text-sm text-brandGray">
                Your cart is empty
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={`${item.id}-${item.previewImage}`} className="border border-[#1a1a1a] p-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <img src={item.previewImage} alt={item.name} className="h-24 w-full object-cover sm:w-28" />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h4 className="text-lg font-medium text-white">{item.name}</h4>
                          <p className="text-sm text-brandGray">{item.category}</p>
                        </div>
                        <p className="text-lg font-bold text-brandPink">₦{item.price.toLocaleString()}</p>
                      </div>
                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        <div className="flex items-center border border-[#1a1a1a]">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.previewImage, item.quantity - 1)}
                            className="px-4 py-2 text-white transition hover:bg-white/5"
                          >
                            -
                          </button>
                          <span className="px-4 text-sm text-white">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.previewImage, item.quantity + 1)}
                            className="px-4 py-2 text-white transition hover:bg-white/5"
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id, item.previewImage)}
                          className="border border-red-500/30 px-4 py-2 text-sm text-red-400 transition hover:bg-red-500/10"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-[#0a0a0a] px-6 py-12 lg:px-12">
          <h3 className="text-3xl font-bold text-white">Payment</h3>
          <div className="mt-6 space-y-3 border border-[#1a1a1a] p-6 text-sm text-brandGray">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span>₦{cartSummary.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Shipping</span>
              <span>₦{cartSummary.shipping.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between border-t border-[#1a1a1a] pt-3 text-lg font-bold text-white">
              <span>Total</span>
              <span>₦{cartSummary.total.toLocaleString()}</span>
            </div>
          </div>

          <form className="mt-8 flex flex-col gap-5" onSubmit={handleCheckout}>
            <label className="text-sm text-brandGray">
              Full name
              <input
                required
                name="name"
                value={checkoutForm.name}
                onChange={handleCheckoutChange}
                className="mt-2 w-full border border-[#1a1a1a] bg-black px-4 py-3 text-white outline-none transition focus:border-brandPink"
                placeholder="Your full name"
              />
            </label>
            <label className="text-sm text-brandGray">
              Email
              <input
                required
                type="email"
                name="email"
                value={checkoutForm.email}
                onChange={handleCheckoutChange}
                className="mt-2 w-full border border-[#1a1a1a] bg-black px-4 py-3 text-white outline-none transition focus:border-brandPink"
                placeholder="you@example.com"
              />
            </label>
            <label className="text-sm text-brandGray">
              Delivery address
              <input
                required
                name="address"
                value={checkoutForm.address}
                onChange={handleCheckoutChange}
                className="mt-2 w-full border border-[#1a1a1a] bg-black px-4 py-3 text-white outline-none transition focus:border-brandPink"
                placeholder="Your delivery address"
              />
            </label>
            <label className="text-sm text-brandGray">
              Card number
              <input
                required
                name="card"
                value={checkoutForm.card}
                onChange={handleCheckoutChange}
                className="mt-2 w-full border border-[#1a1a1a] bg-black px-4 py-3 text-white outline-none transition focus:border-brandPink"
                placeholder="4242 4242 4242 4242"
              />
            </label>
            <button
              type="submit"
              disabled={cartSummary.itemCount === 0 || paymentState === 'processing'}
              className="mt-2 bg-brandPink px-6 py-4 font-medium text-white transition hover:bg-brandRed disabled:cursor-not-allowed disabled:opacity-50"
            >
              {paymentState === 'processing' ? 'Processing payment...' : 'Proceed to payment'}
            </button>
          </form>

          {paymentState === 'complete' ? (
            <div className="mt-6 border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-400">
              Payment approved. Your order is confirmed.
            </div>
          ) : null}
        </div>
      </section>

      <footer className="border-t border-[#1a1a1a] px-6 py-12 lg:px-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xl font-bold text-white">SHOPBOX</p>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-brandGray">
              Your one stop for all your sexy toys and pleasure imagination
            </p>
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-brandGray">
            <Link href="/privacy" className="transition hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="transition hover:text-white">
              Terms & Conditions
            </Link>
            <Link href="/refunds" className="transition hover:text-white">
              Refunds Policy
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
