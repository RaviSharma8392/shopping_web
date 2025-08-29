function generateFullOrderHTML(order, user) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: Arial, sans-serif; margin: 0; padding: 0; color: #111; }
      header { display: flex; align-items: center; padding: 20px; border-bottom: 2px solid #f0c14b; }
      header img { width: 120px; }
      header h1 { margin-left: 20px; font-size: 18px; }
      h2 { font-size: 14px; margin-bottom: 5px; }
      .section { padding: 20px; }
      table { width: 100%; border-collapse: collapse; margin-top: 10px; }
      table th, table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
      table th { background-color: #f0c14b; font-weight: bold; }
      tbody tr:nth-child(even) { background-color: #f9f9f9; }
      .summary { float: right; width: 50%; margin-top: 20px; }
      .summary p { display: flex; justify-content: space-between; margin: 2px 0; }
      footer { text-align: center; padding: 20px; font-size: 10px; color: #555; border-top: 1px solid #ddd; }
    </style>
  </head>
  <body>
    <header>
      <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" />
      <h1>ShopEase Order Summary</h1>
    </header>

    <div class="section">
      <h2>Order Details</h2>
      <p><strong>Order ID:</strong> ${order._id || `ORD-${Date.now()}`}</p>
      <p><strong>Order Date:</strong> ${new Date().toLocaleDateString("en-IN")}</p>
      <p><strong>Payment Method:</strong> ${order.paymentType || "Cash on Delivery"}</p>
    </div>

    <div class="section">
      <h2>Customer Info</h2>
      <p><strong>Name:</strong> ${user.name}</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Phone:</strong> ${user.phone || "N/A"}</p>
      <p><strong>Address:</strong> ${user.address || "N/A"}</p>
    </div>

    <div class="section">
      <h2>Ordered Items</h2>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Unit</th>
            <th>Qty</th>
            <th>Unit Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          ${order.items
            .map(
              (item) => `
              <tr>
                <td>${item.productId?.name || item.name || "Product"}</td>
                <td>${item.unit || "N/A"}</td>
                <td>${item.quantity}</td>
                <td>₹${Number(item.price || 0).toLocaleString("en-IN")}</td>
                <td>₹${Number(item.totalPrice || 0).toLocaleString("en-IN")}</td>
              </tr>`
            )
            .join("")}
        </tbody>
      </table>
    </div>

    <div class="section summary">
      <p><strong>Subtotal:</strong> ₹${Number(order.subtotal || 0).toLocaleString("en-IN")}</p>
      <p><strong>Delivery Fee:</strong> ₹${Number(order.deliveryFee || 0).toLocaleString("en-IN")}</p>
      <p style="font-weight:bold;"><strong>Total:</strong> ₹${Number(order.total || order.totalBill || 0).toLocaleString("en-IN")}</p>
    </div>

    <footer>
      Thank you for shopping with ShopEase!<br>
      For support: support@shopease.com
    </footer>
  </body>
  </html>
  `;
}

module.exports = { generateFullOrderHTML };
