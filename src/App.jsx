import { useMemo, useState } from "react";

export default function App() {
  const products = [
    {
      id: 1,
      name: "Women’s Dress",
      category: "Fashion",
      price: 49,
      image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200&auto=format&fit=crop",
      badge: "Best Seller",
    },
    {
      id: 2,
      name: "Handbag",
      category: "Accessories",
      price: 35,
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop",
      badge: "New",
    },
    {
      id: 3,
      name: "Ladies Sandals",
      category: "Footwear",
      price: 28,
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1200&auto=format&fit=crop",
      badge: "Popular",
    },
    {
      id: 4,
      name: "Summer Scarf",
      category: "Accessories",
      price: 18,
      image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=1200&auto=format&fit=crop",
      badge: "Sale",
    },
    {
      id: 5,
      name: "Men’s Shirt",
      category: "Fashion",
      price: 32,
      image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1200&auto=format&fit=crop",
      badge: "Hot",
    },
    {
      id: 6,
      name: "Wallet",
      category: "Accessories",
      price: 22,
      image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1200&auto=format&fit=crop",
      badge: "Value",
    },
  ];

  const categories = ["All", ...new Set(products.map((p) => p.category))];
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState([]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((item) => item.id === product.id);
      if (found) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", color: "#111827", fontFamily: "Arial, sans-serif" }}>
      <header style={{ borderBottom: "1px solid #e5e7eb", background: "#fff", padding: "20px 30px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "1200px", margin: "0 auto" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: "32px" }}>Eman Fashionpoint</h1>
            <p style={{ margin: "6px 0 0", color: "#6b7280" }}>Online fashion shopping website</p>
          </div>
          <div style={{ background: "#f3f4f6", padding: "12px 16px", borderRadius: "16px", fontWeight: "bold" }}>
            Cart: {cartCount} item{cartCount === 1 ? "" : "s"} · ${cartTotal}
          </div>
        </div>
      </header>

      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "30px" }}>
        <div style={{ background: "#fff", borderRadius: "24px", padding: "24px", marginBottom: "30px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
          <p style={{ color: "#6b7280", fontWeight: "bold", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px" }}>Welcome</p>
          <h2 style={{ fontSize: "40px", margin: "0 0 12px" }}>Shop stylish fashion in one place</h2>
          <p style={{ color: "#4b5563", maxWidth: "700px" }}>
            Browse categories, search products, and add items to your cart. This is a starter ecommerce website for Eman Fashionpoint.
          </p>

          <div style={{ display: "flex", gap: "12px", marginTop: "20px", flexWrap: "wrap" }}>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              style={{ padding: "12px 16px", borderRadius: "14px", border: "1px solid #d1d5db", minWidth: "260px" }}
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ padding: "12px 16px", borderRadius: "14px", border: "1px solid #d1d5db", minWidth: "220px" }}
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "30px" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
              <h3 style={{ margin: 0, fontSize: "28px" }}>Products</h3>
              <p style={{ color: "#6b7280" }}>{filtered.length} items found</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
              {filtered.map((product) => (
                <div key={product.id} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "24px", overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
                  <img src={product.image} alt={product.name} style={{ width: "100%", height: "220px", objectFit: "cover" }} />
                  <div style={{ padding: "18px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                      <span style={{ background: "#f3f4f6", padding: "6px 10px", borderRadius: "999px", fontSize: "12px", fontWeight: "bold" }}>{product.badge}</span>
                      <span style={{ fontSize: "12px", color: "#6b7280" }}>{product.category}</span>
                    </div>
                    <h4 style={{ margin: "0 0 12px", fontSize: "22px" }}>{product.name}</h4>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "24px", fontWeight: "bold" }}>${product.price}</span>
                      <button
                        onClick={() => addToCart(product)}
                        style={{ background: "#111827", color: "#fff", border: "none", borderRadius: "14px", padding: "10px 14px", cursor: "pointer" }}
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "24px", padding: "20px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
              <h3 style={{ margin: 0, fontSize: "26px" }}>Your Cart</h3>
              <span style={{ color: "#6b7280" }}>{cartCount} items</span>
            </div>

            {cart.length === 0 ? (
              <p style={{ background: "#f9fafb", padding: "14px", borderRadius: "14px", color: "#6b7280" }}>
                Your cart is empty. Add products to see them here.
              </p>
            ) : (
              <div>
                {cart.map((item) => (
                  <div key={item.id} style={{ border: "1px solid #e5e7eb", borderRadius: "16px", padding: "14px", marginBottom: "14px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <div>
                        <p style={{ margin: 0, fontWeight: "bold" }}>{item.name}</p>
                        <p style={{ margin: "4px 0 0", color: "#6b7280" }}>${item.price} each</p>
                      </div>
                      <p style={{ margin: 0, fontWeight: "bold" }}>${item.price * item.quantity}</p>
                    </div>
                    <div style={{ display: "flex", gap: "10px", alignItems: "center", marginTop: "12px" }}>
                      <button onClick={() => updateQty(item.id, -1)} style={{ padding: "6px 12px", borderRadius: "10px", border: "1px solid #d1d5db", cursor: "pointer" }}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQty(item.id, 1)} style={{ padding: "6px 12px", borderRadius: "10px", border: "1px solid #d1d5db", cursor: "pointer" }}>+</button>
                    </div>
                  </div>
                ))}

                <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: "14px", marginTop: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "22px", fontWeight: "bold", marginBottom: "14px" }}>
                    <span>Total</span>
                    <span>${cartTotal}</span>
                  </div>
                  <button style={{ width: "100%", background: "#111827", color: "#fff", border: "none", padding: "14px", borderRadius: "16px", cursor: "pointer" }}>
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>
    </div>
  );
}
