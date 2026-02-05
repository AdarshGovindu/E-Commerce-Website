const bar = document.getElementById("bar");
const close = document.getElementById("close");
const nav = document.getElementById("navbar");

if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
  });
}

if (close) {
  close.addEventListener("click", () => {
    nav.classList.remove("active");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const products = document.querySelectorAll(".pro");

  products.forEach((product) => {
    product.addEventListener("click", () => {
      const url = product.getAttribute("data-url");
      if (url) {
        window.location.href = url;
      }
    });
  });
});

// Function to add items to cart
function addToCart(id, image, title, price) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const item = { id, image, title, price, quantity: 1 };

  // Check if item is already in the cart
  const existingItemIndex = cart.findIndex((cartItem) => cartItem.id === id);
  if (existingItemIndex > -1) {
    alert("Item already in cart!");
    return;
  }

  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Item added to cart!");
}

// Function to add items to the cart
function addToCart(id, image, title, price) {
  // Retrieve the current cart from local storage or initialize an empty array
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if the item is already in the cart
  const existingItemIndex = cart.findIndex((cartItem) => cartItem.id === id);

  if (existingItemIndex > -1) {
    // If item exists, update its quantity
    cart[existingItemIndex].quantity += 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Item quantity updated in cart!");
  } else {
    // If item does not exist, add it to the cart
    const item = { id, image, title, price, quantity: 1 };
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Item added to cart!");
  }
}

// Function to display cart items
function displayCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartTableBody = document.querySelector("#cart-items");

  // Clear previous cart items
  cartTableBody.innerHTML = "";

  let subtotal = 0;

  cart.forEach((item) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td><a href="#" onclick="removeFromCart('${
        item.id
      }'); return false;"><i class="fa-regular fa-circle-xmark"></i></a></td>
      <td><img src="${item.image}" alt="${item.title}" width="100"></td>
      <td>${item.title}</td>
      <td>$${item.price}</td>
      <td><input type="number" value="${
        item.quantity
      }" min="1" onchange="updateQuantity('${item.id}', this.value)"></td>
      <td>$${(item.price * item.quantity).toFixed(2)}</td>
    `;

    cartTableBody.appendChild(row);
    subtotal += item.price * item.quantity;
  });

  // Update subtotal in the cart
  document.querySelector("#subtotal-details").innerHTML = `
    <tr>
      <td>Cart Subtotal</td>
      <td>$${subtotal.toFixed(2)}</td>
    </tr>
    <tr>
      <td>Shipping</td>
      <td>Free</td>
    </tr>
    <tr>
      <td><strong>Total</strong></td>
      <td><strong>$${subtotal.toFixed(2)}</strong></td>
    </tr>
  `;
}

// Function to update item quantity in the cart
function updateQuantity(id, quantity) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const itemIndex = cart.findIndex((item) => item.id === id);

  if (itemIndex > -1) {
    cart[itemIndex].quantity = parseInt(quantity, 10);
    if (cart[itemIndex].quantity <= 0) {
      // Remove item if quantity is 0 or less
      cart.splice(itemIndex, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart(); // Refresh cart display
  }
}

// Function to remove an item from the cart
function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((item) => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart(); // Refresh cart display
}

// Event listeners for DOM elements
document.addEventListener("DOMContentLoaded", () => {
  const products = document.querySelectorAll(".pro");

  products.forEach((product) => {
    product.addEventListener("click", () => {
      const url = product.getAttribute("data-url");
      if (url) {
        window.location.href = url;
      }
    });
  });

  const bar = document.getElementById("bar");
  const close = document.getElementById("close");
  const nav = document.getElementById("navbar");

  if (bar) {
    bar.addEventListener("click", () => {
      nav.classList.add("active");
    });
  }

  if (close) {
    close.addEventListener("click", () => {
      nav.classList.remove("active");
    });
  }

  // Display cart items when the page loads
  displayCart();
});
