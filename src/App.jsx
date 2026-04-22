import "./App.css";
import { useMemo, useState } from "react";

export default function App() {
  const products = [
    {
      id: 1,
      name: "Women's Dress",
      category: "Fashion",
      price: 49,
      image:
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200&auto=format&fit=crop",
      badge: "Best Seller",
    },
    {
      id: 2,
      name: "Handbag",
      category: "Accessories",
      price: 35,
      image:
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop",
      badge: "New",
    },
    {
      id: 3,
      name: "Ladies Sandals",
      category: "Footwear",
      price: 28,
      image:
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1200&auto=format&fit=crop",
      badge: "Popular",
    },
    {
      id: 4,
      name: "Summer Scarf",
      category: "Accessories",
      price: 18,
      image:
        "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=1200&auto=format&fit=crop",
      badge: "Sale",
    },
    {
      id: 5,
      name: "Classic Heels",
      category: "Footwear",
      price: 42,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop",
      badge: "Trending",
    },
    {
      id: 6,
      name: "Elegant Watch",
      category: "Accessories",
      price: 55,
      image:
        "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1200&auto=format&fit=crop",
      badge: "Luxury",
    },
  ];

  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateQty = (id, change) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  return (
    <div className="app">
      <div className="top-bar">
        Free delivery on orders over $50 | New arrivals every week
      </div>

      <header className="navbar">
        <h2 className="logo">Eman Fashionpoint</h2>
        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#shop">Shop</a>
          <a href="#sale">Sale</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero" id="home">
        <div className="hero-text">
          <p className="hero-tag">New Collection</p>
          <h1>Style That Speaks for You</h1>
          <p>
            Discover trendy and elegant fashion designed to make every moment
            beautiful.
          </p>
          <div className="hero-buttons">
            <button>Shop Now</button>
            <button className="secondary-btn">View Collection</button>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200&auto=format&fit=crop"
            alt="Fashion hero"
          />
        </div>
      </section>

      <section className="sale-section" id="sale">
        <p>Special Offer</p>
        <h2>Up to 40% Off This Week</h2>
        <span>
          Refresh your wardrobe with stylish fashion at amazing prices.
        </span>
        <button>Shop Sale</button>
      </section>

      <section className="products-section" id="shop">
        <div className="section-heading">
          <h2>Featured Products</h2>
          <p>Explore our handpicked styles</p>
        </div>

        <div className="product-grid">
          {products.map((item) => (
            <div className="product-card" key={item.id}>
              <div className="product-image-box">
                <img src={item.image} alt={item.name} />
                <span className="badge">{item.badge}</span>
              </div>

              <div className="product-info">
                <p className="category">{item.category}</p>
                <h3>{item.name}</h3>
                <p className="price">${item.price}</p>

                <div className="product-actions">
                  <button onClick={() => addToCart(item)}>Add to Cart</button>
                  <a
                    href={`https://wa.me/1234567890?text=Hi, I want to order ${item.name}`}
                    target="_blank"
                    rel="noreferrer"
                    className="whatsapp-link"
                  >
                    WhatsApp Order
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cart-section">
        <h2>Your Cart</h2>

        {cart.length === 0 ? (
          <p className="empty-cart">Your cart is empty.</p>
        ) : (
          <div className="cart-list">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />

                <div className="cart-details">
                  <h4>{item.name}</h4>
                  <p>${item.price} each</p>
                  <p>
                    <strong>Total: ${item.price * item.quantity}</strong>
                  </p>

                  <div className="qty-buttons">
                    <button onClick={() => updateQty(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQty(item.id, 1)}>+</button>
                  </div>
                </div>
              </div>
            ))}

            <div className="cart-summary">
              <h3>Grand Total: ${cartTotal}</h3>
            </div>
          </div>
        )}
      </section>

      <section className="why-us">
        <h2>Why Choose Us</h2>
        <div className="why-grid">
          <div className="why-card">Premium Quality</div>
          <div className="why-card">Fast Delivery</div>
          <div className="why-card">Easy Ordering</div>
          <div className="why-card">Customer Support</div>
        </div>
      </section>

      <footer className="footer" id="contact">
        <h3>Eman Fashionpoint</h3>
        <p>Trendy fashion for every occasion.</p>
        <p>Contact us for stylish collections and easy ordering.</p>
      </footer>

      <a
        href="https://wa.me/1234567890?text=Hi, I want to know more about your products"
        className="floating-whatsapp"
        target="_blank"
        rel="noreferrer"
      >
        WhatsApp
      </a>
    </div>
  );
}