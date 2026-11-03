
// --- CART SYSTEM --- //
function addToCart(button) {
  const card = button.closest(".card");
  const name = card.querySelector("h4").innerText.trim();
  const priceText = card.querySelector(".price").innerText.trim();
  const price = parseFloat(priceText.replace(/[^\d.]/g, ""));
  const img = card.querySelector("img").src;
  const quantity = parseInt(card.querySelector(".quantity").value);

  let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ name, price, img, quantity });
  }

  localStorage.setItem("cartItems", JSON.stringify(cart));
  updateCartBadge();
  alert(`${name} (${quantity}) added to cart.`);
}

// --- Update badge --- //
function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.getElementById("cartBadge");
  if (badge) badge.textContent = count;
}

// --- Quantity control --- //
document.addEventListener("click", e => {
  if (e.target.classList.contains("increase")) {
    const input = e.target.parentElement.querySelector(".quantity");
    input.value = parseInt(input.value) + 1;
  } else if (e.target.classList.contains("decrease")) {
    const input = e.target.parentElement.querySelector(".quantity");
    if (parseInt(input.value) > 1) input.value = parseInt(input.value) - 1;
  }
});

// --- CART PANEL --- //
document.body.insertAdjacentHTML("beforeend", `
  <div class="cart" id="cartPanel" style="
    position:fixed; top:0; right:-400px; width:350px; height:100%; 
    background:white; box-shadow:-2px 0 10px rgba(0,0,0,0.2);
    padding:20px; overflow-y:auto; transition:0.4s; z-index:9999;">
    <h3>Your Cart</h3>
    <div id="cartItemsContainer"></div>
    <div class="cart-footer" id="cartFooter"></div>
    <button id="checkout-btn" style="
      background:#2563eb; color:#fff; border:none; border-radius:6px; 
      padding:10px 15px; cursor:pointer; margin-top:10px;">Proceed to Checkout</button>
    <button id="close-cart" style="
      background:#ccc; border:none; border-radius:6px; padding:8px 12px; 
      margin-top:10px; cursor:pointer;">Close Cart</button>
  </div>
`);

function openCart() {
  const cartPanel = document.getElementById("cartPanel");
  const itemsContainer = document.getElementById("cartItemsContainer");
  const footer = document.getElementById("cartFooter");
  const cart = JSON.parse(localStorage.getItem("cartItems")) || [];

  if (cart.length === 0) {
    itemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    footer.innerHTML = "";
  } else {
    let total = 0;
    itemsContainer.innerHTML = cart.map((item, index) => {
      total += item.price * item.quantity;
      return `
        <div style="display:flex; align-items:center; margin-bottom:10px; gap:10px;">
          <img src="${item.img}" width="50" height="50" style="border-radius:6px; object-fit:cover;">
          <div style="flex:1">
            <strong>${item.name}</strong><br>
            <small>${item.quantity} × KSh ${item.price.toLocaleString()}</small>
          </div>
          <button onclick="removeFromCart(${index})" style="background:#ef4444; border:none; color:#fff; border-radius:6px; padding:4px 8px; cursor:pointer;">✕</button>
        </div>
      `;
    }).join("");
    footer.innerHTML = `<p><strong>Total: KSh ${total.toLocaleString()}</strong></p>`;
  }

  cartPanel.style.right = "0";
}

function closeCart() {
  document.getElementById("cartPanel").style.right = "-400px";
}

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cartItems", JSON.stringify(cart));
  updateCartBadge();
  openCart();
}

// --- Checkout Redirect --- //
document.addEventListener("click", e => {
  if (e.target.id === "checkout-btn") {
    window.location.href = "checkout.html";
  } else if (e.target.id === "close-cart") {
    closeCart();
  }
});

document.addEventListener("DOMContentLoaded", updateCartBadge);
