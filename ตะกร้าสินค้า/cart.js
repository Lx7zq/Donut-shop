const cart = {};

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.getAttribute('data-product-id');
        const price = parseFloat(button.getAttribute('data-price'));
        if (!cart[productId]) {
            cart[productId] = { quantity: 1, price: price };
        } else {
            cart[productId].quantity++;
        }
        updateCartDisplay();
    });
});
function updateCartDisplay() {
  const cartElement = document.getElementById("cart");
  cartElement.innerHTML = "";

  let totalPrice = 0;
  for (const productId in cart) {
    const item = cart[productId];
    const itemTotalPrice = item.quantity * item.price;
    totalPrice += itemTotalPrice;
    const productElement = document.createElement("p");
    productElement.textContent = `Product ${productId}: ${item.quantity} x $${item.price} = $${itemTotalPrice}`;
    cartElement.appendChild(productElement);
  }

  if (Object.keys(cart).length === 0) {
    cartElement.innerHTML = "<p>No items in cart.</p>";
  } else {
    const totalPriceElement = document.createElement("p");
    totalPriceElement.textContent = `Total Price: $${totalPrice}`;
    cartElement.appendChild(totalPriceElement);
  }

}
// เพิ่ม event listener สำหรับปุ่มยืนยันในใบเสร็จ
const confirmButton = document.getElementById('confirmButton');
confirmButton.addEventListener('click', () => {
    // สร้างเนื้อหาของใบเสร็จ
    let invoiceContent = '<h2>Invoice</h2>';
    invoiceContent += '<h3>Products:</h3>';

    // เพิ่มรายการสินค้าลงในใบเสร็จ
    for (const productId in cart) {
        const item = cart[productId];
        const itemTotalPrice = item.quantity * item.price;
        invoiceContent += `<p>Product ${productId}: ${item.quantity} x $${item.price} = $${itemTotalPrice}</p>`;
    }

    // เพิ่มราคารวมลงในใบเสร็จ
    const totalPrice = calculateTotalPrice();
    invoiceContent += `<p>Total Price: $${totalPrice}</p>`;

    // แสดงใบเสร็จในหน้าเว็บ
    const invoiceContainer = document.getElementById('invoiceContainer');
    invoiceContainer.innerHTML = invoiceContent;
});
