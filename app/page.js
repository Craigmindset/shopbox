'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

const womenProducts = [
  createProduct(
    'w1',
    'Velvet Pulse Wand',
    'Women',
    45000,
    '/images/8cd8acbf-f34c-4911-9707-77f79b8ff291.avif',
    'Premium silicone wand with whisper-quiet motor and USB-C fast charging. Ergonomic design for maximum comfort and pleasure.'
  ),
  createProduct(
    'w2',
    'Luna Curve Massager',
    'Women',
    38000,
    '/images/8f521f3abbfb4ec8a676373efdd1b7fa-goods.avif',
    'Flexible ergonomic massager with water-ready design. Perfect curve for targeted stimulation and ultimate satisfaction.'
  ),
  createProduct(
    'w3',
    'Satin Whisper Set',
    'Women',
    32000,
    '/images/16a6a80b7728431dafed0775fc435cc5-goods.avif',
    'Dual-piece luxury set with travel pouch. Easy-touch controls and body-safe materials for worry-free pleasure.'
  ),
  createProduct(
    'w4',
    'Aura Glow Egg',
    'Women',
    29000,
    '/images/75cc54ed2500489bbc78cd042f83e496-goods.avif',
    'Compact remote-enabled egg with discrete profile. Multiple intensity modes for versatile pleasure experiences.'
  ),
  createProduct(
    'w5',
    'Bloom Kiss Bullet',
    'Women',
    25000,
    '/images/80a6f41b-b4a0-412b-bee3-defc4ba71e5a.avif',
    'Pocket-sized bullet with 10 pulse modes. Satin grip for comfortable handling and discreet enjoyment anywhere.'
  ),
  createProduct(
    'w6',
    'Ember Motion Duo',
    'Women',
    48000,
    '/images/444b4cdb-fa89-4442-9c93-72c15b49e971.avif',
    'Paired stimulation device with magnetic charging. Premium silicone construction for luxurious dual pleasure.'
  ),
];

const menProducts = [
  createProduct(
    'm1',
    'Titan Pulse Sleeve',
    'Men',
    47000,
    '/images/18650da9-5997-4878-8c67-a7b5212a5dd8.avif',
    'Premium textured sleeve with rechargeable core. One-touch cleaning system for easy maintenance and hygiene.'
  ),
  createProduct(
    'm2',
    'Forge Rhythm Ring',
    'Men',
    28000,
    '/images/a58a0d5d-5659-44f5-bf09-f83aacc332fb.avif',
    'Stretch comfort ring with 8 speed levels. Couples ready design for enhanced shared experiences.'
  ),
  createProduct(
    'm3',
    'Noir Grip Stroker',
    'Men',
    38000,
    '/images/d15f779ea84030a379c680ca0086452a_1776329853175.avif',
    'Pressure-control stroker with soft-touch interior. Travel lock feature ensures discreet transport.'
  ),
  createProduct(
    'm4',
    'Peak Heat Plug',
    'Men',
    31000,
    '/images/f0fe9cca-82ea-44d4-9939-2c53e295cfef.avif',
    'Weighted plug with secure flare. Body-safe silicone construction for comfortable extended wear.'
  ),
  createProduct(
    'm5',
    'Rogue Glide Pump',
    'Men',
    44000,
    '/images/8cd8acbf-f34c-4911-9707-77f79b8ff291.avif',
    'Manual precision pump with comfort sleeve edge. Lightweight body for easy handling and control.'
  ),
  createProduct(
    'm6',
    'Voltage Trigger Kit',
    'Men',
    55000,
    '/images/8f521f3abbfb4ec8a676373efdd1b7fa-goods.avif',
    'Complete multi-part kit with storage dock. Extended runtime battery for uninterrupted pleasure sessions.'
  ),
];

const allProducts = [...womenProducts, ...menProducts];

export default function HomePage() {
  const [cartItems, setCartItems] = useState([]);
  const [productModal, setProductModal] = useState(null);
  const [cartModal, setCartModal] = useState(false);
  const [modalQuantity, setModalQuantity] = useState(1);

  const cartSummary = useMemo(() => {
    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = itemCount > 0 ? 5000 : 0;
    return { itemCount, subtotal, shipping, total: subtotal + shipping };
  }, [cartItems]);

  function openProductModal(product) {
    setProductModal(product);
    setModalQuantity(1);
  }

  function closeProductModal() {
    setProductModal(null);
    setModalQuantity(1);
  }

  function handleModalAddToCart() {
    if (productModal) {
      setCartItems((current) => {
        const existing = current.find((item) => item.id === productModal.id);
        if (existing) {
          return current.map((item) =>
            item.id === productModal.id ? { ...item, quantity: item.quantity + modalQuantity } : item
          );
        }
        return [
          ...current,
          {
            id: productModal.id,
            name: productModal.name,
            category: productModal.category,
            price: productModal.price,
            image: productModal.image,
            quantity: modalQuantity,
          },
        ];
      });
      closeProductModal();
    }
  }

  function removeFromCart(productId) {
    setCartItems((current) => current.filter((item) => item.id !== productId));
  }

  function updateQuantity(productId, nextQuantity) {
    if (nextQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((current) =>
      current.map((item) => (item.id === productId ? { ...item, quantity: nextQuantity } : item))
    );
  }

  return (
    <main className="page-shell min-h-screen">
      <div className="flex w-full flex-col">
        <header className="sticky top-0 z-30 flex flex-wrap items-center justify-between gap-4 border-b border-[#1a1a1a] bg-black px-6 py-4 lg:px-12">
          <div>
            <h1 className="text-2xl font-bold text-white">SHOPBOX</h1>
          </div>
          <nav className="flex items-center gap-3 text-sm text-white/80">
            <a href="#women" className="rounded-full px-3 py-2 transition hover:bg-white/10">
              Women
            </a>
            <a href="#men" className="rounded-full px-3 py-2 transition hover:bg-white/10">
              Men
            </a>
            <button
              onClick={() => setCartModal(true)}
              className="rounded-full bg-brandPink px-4 py-2 font-medium text-white transition hover:bg-brandRed"
            >
              Cart {cartSummary.itemCount}
            </button>
          </nav>
        </header>

        {/* Hero Section */}
        <section
          className="relative flex min-h-[500px] items-center bg-cover bg-center lg:min-h-[600px]"
          style={{
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/images/herosection.jpeg')",
          }}
        >
          <div className="w-full px-6 py-20 lg:px-12">
            <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
              <div className="flex flex-col justify-center">
                <h2 className="text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl">
                  Everything in a Box\!
                </h2>
                <p className="mt-6 text-xl leading-relaxed text-brandGray sm:text-2xl">
                  Your one stop for all your sexy toys and pleasure imagination
                </p>
                <div className="mt-10">
                  <a
                    href="#women"
                    className="inline-block bg-brandPink px-10 py-4 text-lg font-medium text-white transition hover:bg-brandRed"
                  >
                    Shop Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ProductSection
          id="women"
          title="Women"
          products={womenProducts}
          onProductClick={openProductModal}
        />

        {/* Simple Banner */}
        <section className="border-y border-[#1a1a1a] bg-black px-6 py-20 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <h3 className="text-5xl font-bold text-white sm:text-6xl lg:text-7xl">
              let go sexy
            </h3>
            <div className="mt-10">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-brandPink px-10 py-4 text-lg font-medium text-white transition hover:bg-brandRed"
              >
                Follow Me
              </a>
            </div>
          </div>
        </section>

        <ProductSection
          id="men"
          title="Men"
          products={menProducts}
          onProductClick={openProductModal}
        />

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
      </div>

      {/* Cart Modal */}
      {cartModal && (
        <div className="modal-overlay" onClick={() => setCartModal(false)}>
          <div
            className="w-full max-w-2xl overflow-hidden border border-[#1a1a1a] bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border-b border-[#1a1a1a] px-6 py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white">Shopping Cart</h3>
                <button
                  onClick={() => setCartModal(false)}
                  className="text-2xl text-white hover:text-brandPink"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="max-h-[400px] overflow-y-auto px-6 py-6">
              {cartItems.length === 0 ? (
                <div className="border border-dashed border-[#1a1a1a] p-8 text-center text-sm text-brandGray">
                  Your cart is empty
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 border-b border-[#1a1a1a] pb-4">
                      <img src={item.image} alt={item.name} className="h-20 w-20 object-cover" />
                      <div className="flex-1">
                        <h4 className="font-medium text-white">{item.name}</h4>
                        <p className="text-sm text-brandGray">{item.category}</p>
                        <p className="mt-1 font-bold text-brandPink">₦{item.price.toLocaleString()}</p>
                        <div className="mt-2 flex items-center gap-3">
                          <div className="flex items-center border border-[#1a1a1a]">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-3 py-1 text-white transition hover:bg-white/5"
                            >
                              -
                            </button>
                            <span className="px-3 text-sm text-white">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-3 py-1 text-white transition hover:bg-white/5"
                            >
                              +
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="text-sm text-red-400 transition hover:text-red-300"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {cartItems.length > 0 && (
              <div className="border-t border-[#1a1a1a] bg-[#0a0a0a] px-6 py-6">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-brandGray">
                    <span>Subtotal</span>
                    <span>₦{cartSummary.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-brandGray">
                    <span>Shipping</span>
                    <span>₦{cartSummary.shipping.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-t border-[#1a1a1a] pt-2 text-lg font-bold text-white">
                    <span>Total</span>
                    <span>₦{cartSummary.total.toLocaleString()}</span>
                  </div>
                </div>
                <Link
                  href="/checkout"
                  className="mt-6 block w-full bg-brandPink px-6 py-4 text-center font-medium text-white transition hover:bg-brandRed"
                >
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Product Modal */}
      {productModal && (
        <div className="modal-overlay" onClick={closeProductModal}>
          <div
            className="w-full max-w-4xl overflow-hidden border border-[#1a1a1a] bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid gap-0 lg:grid-cols-2">
              <div className="border-b border-[#1a1a1a] lg:border-b-0 lg:border-r">
                <img
                  src={productModal.image}
                  alt={productModal.name}
                  className="h-full w-full object-cover lg:h-[600px]"
                />
              </div>
              <div className="p-8 lg:p-12">
                <button
                  onClick={closeProductModal}
                  className="mb-4 text-2xl text-white hover:text-brandPink"
                >
                  ×
                </button>
                <p className="text-xs uppercase tracking-widest text-brandGray">
                  {productModal.category}
                </p>
                <h3 className="mt-2 text-3xl font-bold text-white">{productModal.name}</h3>
                <p className="mt-2 text-2xl font-bold text-brandPink">₦{productModal.price.toLocaleString()}</p>
                <p className="mt-6 leading-relaxed text-brandGray">{productModal.description}</p>

                <div className="mt-8">
                  <label className="text-sm text-brandGray">
                    Quantity
                    <div className="mt-2 flex items-center border border-[#1a1a1a]">
                      <button
                        type="button"
                        onClick={() => setModalQuantity(Math.max(1, modalQuantity - 1))}
                        className="px-6 py-3 text-white transition hover:bg-white/5"
                      >
                        -
                      </button>
                      <span className="flex-1 text-center text-white">{modalQuantity}</span>
                      <button
                        type="button"
                        onClick={() => setModalQuantity(modalQuantity + 1)}
                        className="px-6 py-3 text-white transition hover:bg-white/5"
                      >
                        +
                      </button>
                    </div>
                  </label>
                </div>

                <button
                  onClick={handleModalAddToCart}
                  className="mt-8 w-full bg-brandPink px-6 py-4 font-medium text-white transition hover:bg-brandRed"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function ProductSection({ id, title, products, onProductClick }) {
  return (
    <section id={id} className="border-b border-[#1a1a1a] px-6 py-12 lg:px-12">
      <div className="mb-8">
        <h3 className="text-3xl font-bold text-white sm:text-4xl">{title}</h3>
      </div>
      <div className="product-grid mx-auto max-w-7xl">
        {products.map((product) => (
          <article key={product.id} className="card-panel group">
            <button
              type="button"
              onClick={() => onProductClick(product)}
              className="block w-full overflow-hidden border border-[#1a1a1a]"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-80 w-full object-cover transition duration-300 group-hover:opacity-80"
              />
            </button>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs uppercase tracking-widest text-brandGray">{product.category}</p>
                  <h4 className="mt-1 text-lg font-bold text-white">{product.name}</h4>
                </div>
                <span className="text-lg font-bold text-brandPink">₦{product.price.toLocaleString()}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function PolicyPage({ title, sections }) {
  return (
    <main className="page-shell min-h-screen">
      {/* Hero Section */}
      <section
        className="relative flex min-h-[300px] items-center bg-cover bg-center"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/images/herosection.jpeg')",
        }}
      >
        <div className="w-full px-6 py-16 lg:px-12">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="text-5xl font-bold text-white lg:text-6xl">{title}</h1>
            <p className="mt-4 text-xl text-brandGray">SHOPBOX Policy</p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-12 lg:px-12">
        <div className="border border-[#1a1a1a] bg-[#0a0a0a] p-8 sm:p-12">
          <Link href="/" className="text-sm text-brandGray transition hover:text-white">
            ← Back to home
          </Link>
          <h2 className="mt-8 text-3xl font-bold text-white">{title}</h2>
          <div className="mt-8 space-y-8">
            {sections.map((section, index) => (
              <div key={index}>
                <h3 className="text-xl font-bold text-white">{section.heading}</h3>
                <p className="mt-3 text-base leading-relaxed text-brandGray">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

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

function createProduct(id, name, category, price, imagePath, description) {
  return {
    id,
    name,
    category,
    price,
    image: imagePath,
    description,
  };
}

export function PrivacyPage() {
  return (
    <PolicyPage
      title="Privacy Policy"
      sections={[
        {
          heading: "Information Collection",
          content: "At SHOPBOX, we understand the sensitive nature of adult wellness products. We collect only essential information necessary to process your order and deliver products discreetly. This includes your name, delivery address, email, and payment information. All data is encrypted and stored securely. We never share, sell, or rent your personal information to third parties for marketing purposes."
        },
        {
          heading: "Discreet Shopping Experience",
          content: "Your privacy is our priority. All orders are packaged in plain, unmarked boxes with no indication of contents or company branding. Billing statements will show a discrete transaction name. We do not store your browsing history or track your product preferences beyond your current session unless you create an account and opt-in to save preferences."
        },
        {
          heading: "Data Security",
          content: "We employ industry-standard SSL encryption for all transactions. Your payment information is processed through secure, PCI-compliant payment gateways and is never stored on our servers. We regularly update our security measures and conduct audits to ensure your information remains protected."
        },
        {
          heading: "Cookies and Tracking",
          content: "Our website uses essential cookies to maintain your shopping cart and ensure proper functionality. We do not use tracking cookies or share data with advertising networks. You can disable cookies in your browser settings, though this may affect your shopping experience."
        },
        {
          heading: "Your Rights",
          content: "You have the right to access, correct, or delete your personal information at any time. You can also request a copy of all data we hold about you. To exercise these rights or if you have any privacy concerns, please contact our customer service team. We will respond to all requests within 30 days."
        }
      ]}
    />
  );
}

export function TermsPage() {
  return (
    <PolicyPage
      title="Terms & Conditions"
      sections={[
        {
          heading: "Age Verification",
          content: "By accessing and using SHOPBOX, you confirm that you are at least 18 years of age or the age of majority in your jurisdiction. Adult wellness products are intended for mature audiences only. We reserve the right to verify age and refuse service to anyone who cannot provide proof of legal age."
        },
        {
          heading: "Product Information",
          content: "All products sold on SHOPBOX are accurately described to the best of our ability. Product images are for illustrative purposes and actual items may vary slightly in appearance. We guarantee that all products are made from body-safe materials and meet international safety standards. Please read product descriptions carefully before purchasing."
        },
        {
          heading: "Pricing and Payment",
          content: "All prices are listed in Nigerian Naira (₦) and include applicable taxes. We reserve the right to modify prices at any time without prior notice. Payment is required in full at the time of purchase. We accept major credit cards, debit cards, and secure online payment methods. All transactions are processed through encrypted, secure channels."
        },
        {
          heading: "Shipping and Delivery",
          content: "We offer discreet shipping throughout Nigeria. Standard shipping takes 3-7 business days, while express delivery is available for major cities. All packages are shipped in plain, unmarked boxes to protect your privacy. Shipping costs are calculated at checkout based on your location and order weight."
        },
        {
          heading: "User Conduct",
          content: "Users agree to use SHOPBOX for lawful purposes only. You are responsible for maintaining the confidentiality of your account information. Any fraudulent, abusive, or illegal activity may result in termination of your account and may be reported to law enforcement authorities."
        },
        {
          heading: "Limitation of Liability",
          content: "SHOPBOX is not liable for any indirect, incidental, or consequential damages arising from the use of our products or website. Our maximum liability is limited to the purchase price of the product. We recommend consulting with a healthcare professional before using any wellness products if you have medical concerns."
        }
      ]}
    />
  );
}

export function RefundsPage() {
  return (
    <PolicyPage
      title="Refunds Policy"
      sections={[
        {
          heading: "Return Eligibility",
          content: "Due to the intimate nature of our products, we maintain strict hygiene and safety standards. Unopened products in their original packaging may be returned within 14 days of delivery for a full refund. Once a product seal is broken, it cannot be returned or exchanged unless it arrived damaged or defective. This policy protects the health and safety of all our customers."
        },
        {
          heading: "Damaged or Defective Items",
          content: "If you receive a damaged or defective product, please contact us within 48 hours of delivery with photos of the item and packaging. We will arrange for a replacement or full refund, including return shipping costs. Our quality control team inspects all products before shipping, but we understand issues can occur during transit."
        },
        {
          heading: "How to Initiate a Return",
          content: "To start a return, contact our customer service team with your order number and reason for return. We will provide you with a return authorization number and shipping instructions. Returns without authorization will not be accepted. Please use discreet packaging when returning items and ensure they are properly sealed in their original packaging."
        },
        {
          heading: "Refund Processing",
          content: "Once we receive and inspect your returned item, we will process your refund within 5-7 business days. Refunds are issued to the original payment method used for purchase. Please note that it may take an additional 3-5 business days for the refund to appear in your account, depending on your bank or card issuer."
        },
        {
          heading: "Non-Returnable Items",
          content: "For health and safety reasons, the following items cannot be returned: opened intimate products, lubricants and creams with broken seals, lingerie and intimate apparel, and clearance or final sale items. These restrictions are clearly marked on product pages before purchase."
        },
        {
          heading: "Exchange Policy",
          content: "We offer exchanges on unopened products within 14 days of delivery. If you wish to exchange an item for a different product or size, contact our customer service team. Exchanges are subject to product availability. If the new item costs more, you will need to pay the difference. If it costs less, we will refund the difference to your original payment method."
        }
      ]}
    />
  );
}
