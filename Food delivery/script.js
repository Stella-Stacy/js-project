const cartBtn = document.querySelector(".cart-btn");
const cartText = cartBtn.querySelector("span");

const addButtons = document.querySelectorAll(".add-btn");
const favoriteButtons = document.querySelectorAll(".favorite");

const searchBtn = document.querySelector(".search-btn");
const menuBtn = document.querySelector(".menu-btn");

const navLinks = document.querySelector(".nav-links");

const categoryCards = document.querySelectorAll(".category-card");
const foodCards = document.querySelectorAll(".food-card");

const orderButtons = document.querySelectorAll(".btn-primary, .promo-btn");

const subscribeForm = document.querySelector(".subscribe-form");
//Cart

let cart = [];

//Add food to cart

addButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Find the food card containing the button

    const foodCard = button.closest(".food-card");

    // Get information from the card

    const foodName = foodCard.querySelector("h3").textContent;

    const foodPrice = foodCard.querySelector(".food-bottom strong").textContent;

    const foodImage = foodCard.querySelector(".food-image img").src;

    // Convert "$12.99" into 12.99

    const price = parseFloat(foodPrice.replace("$", ""));

    // Check if this food is already in cart

    const existingFood = cart.find((item) => item.name === foodName);

    if (existingFood) {
      // If already exists,
      // increase its quantity

      existingFood.quantity++;
    } else {
      // Otherwise add a new food

      cart.push({
        name: foodName,

        price: price,

        image: foodImage,

        quantity: 1,
      });
    }

    // Update the cart number

    updateCartCount();

    // Show message

    showNotification(`${foodName} added to cart!`);
  });
});

//Update cart count

function updateCartCount() {
  // Add all quantities together

  let totalItems = 0;

  cart.forEach((item) => {
    totalItems += item.quantity;
  });

  // Change the text inside Cart (3)

  cartText.textContent = `Cart (${totalItems})`;
}

//Open cart

cartBtn.addEventListener("click", () => {
  showCart();
});

//Display cart

function showCart() {
  // Create cart overlay

  const cartOverlay = document.createElement("div");

  cartOverlay.classList.add("cart-overlay");

  // Create cart panel

  const cartPanel = document.createElement("div");

  cartPanel.classList.add("cart-panel");

  // Cart heading

  const heading = document.createElement("div");

  heading.classList.add("cart-heading");

  heading.innerHTML = `
        <h2>Your Cart</h2>

        <button class="close-cart">
            <i class="fa-solid fa-xmark"></i>
        </button>
    `;

  cartPanel.appendChild(heading);

  // Check if cart is empty

  if (cart.length === 0) {
    const emptyCart = document.createElement("div");

    emptyCart.classList.add("empty-cart");

    emptyCart.innerHTML = `
            <i class="fa-solid fa-cart-shopping"></i>

            <h3>Your cart is empty</h3>

            <p>Add some delicious food!</p>
        `;

    cartPanel.appendChild(emptyCart);
  } else {
    // Create container

    const cartItems = document.createElement("div");

    cartItems.classList.add("cart-items");

    // Display every food

    cart.forEach((item, index) => {
      const cartItem = document.createElement("div");

      cartItem.classList.add("cart-item");

      cartItem.innerHTML = `

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

                <div class="cart-item-info">

                    <h3>${item.name}</h3>

                    <strong>
                        $${item.price.toFixed(2)}
                    </strong>

                    <div class="quantity-controls">

                        <button
                            class="decrease"
                            data-index="${index}"
                        >
                            -
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            class="increase"
                            data-index="${index}"
                        >
                            +
                        </button>

                    </div>
  </div>

                <button
                    class="remove-item"
                    data-index="${index}"
                >
                    <i class="fa-solid fa-trash"></i>
                </button>

            `;

      cartItems.appendChild(cartItem);
    });

    cartPanel.appendChild(cartItems);

    //Total

    let total = 0;

    cart.forEach((item) => {
      total += item.price * item.quantity;
    });

    const cartTotal = document.createElement("div");

    cartTotal.classList.add("cart-total");

    cartTotal.innerHTML = `

            <div>

                <span>Total</span>

                <strong>
                    $${total.toFixed(2)}
                </strong>

            </div>

            <button class="checkout-btn">
                Proceed to Checkout
            </button>

        `;

    cartPanel.appendChild(cartTotal);
  }

  cartOverlay.appendChild(cartPanel);

  document.body.appendChild(cartOverlay);
  //Close cart

  const closeCart = cartPanel.querySelector(".close-cart");

  closeCart.addEventListener("click", () => {
    cartOverlay.remove();
  });
  //Increase quantity

  const increaseButtons = cartPanel.querySelectorAll(".increase");

  increaseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.dataset.index;

      cart[index].quantity++;

      cartOverlay.remove();

      showCart();

      updateCartCount();
    });
  });

  //Decrease quantity

  const decreaseButtons = cartPanel.querySelectorAll(".decrease");

  decreaseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.dataset.index;

      if (cart[index].quantity > 1) {
        cart[index].quantity--;
      } else {
        cart.splice(index, 1);
      }

      cartOverlay.remove();

      showCart();

      updateCartCount();
    });
  });

  //Remove item

  const removeButtons = cartPanel.querySelectorAll(".remove-item");

  removeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.dataset.index;

      cart.splice(index, 1);

      cartOverlay.remove();

      showCart();

      updateCartCount();
    });
  });
  //checkout

  const checkoutButton = cartPanel.querySelector(".checkout-btn");

  if (checkoutButton) {
    checkoutButton.addEventListener("click", () => {
      if (cart.length === 0) {
        showNotification("Your cart is empty.");

        return;
      }

      showNotification("Checkout coming soon!");
    });
  }
}

//heart btn

favoriteButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const icon = button.querySelector("i");

    // Check whether it is already liked

    if (icon.classList.contains("fa-regular")) {
      // Change outline heart to solid heart

      icon.classList.remove("fa-regular");

      icon.classList.add("fa-solid");

      showNotification("Added to favorites ❤️");
    } else {
      // Change back to outline

      icon.classList.remove("fa-solid");

      icon.classList.add("fa-regular");

      showNotification("Removed from favorites");
    }
  });
});

//search bar

searchBtn.addEventListener("click", () => {
  // Create search input

  const searchInput = document.createElement("input");

  searchInput.classList.add("search-input");

  searchInput.type = "text";

  searchInput.placeholder = "Search for food...";

  // Add input to navbar

  document.querySelector(".nav-container").appendChild(searchInput);

  // Focus it automatically

  searchInput.focus();

  // Search while typing

  searchInput.addEventListener("input", () => {
    const searchValue = searchInput.value.toLowerCase();

    foodCards.forEach((card) => {
      const foodName = card.querySelector("h3").textContent.toLowerCase();

      if (foodName.includes(searchValue)) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  });
});

//Category filtering

categoryCards.forEach((category) => {
  category.addEventListener("click", (event) => {
    event.preventDefault();

    const categoryName = category.querySelector("h3").textContent.toLowerCase();

    // Example category filtering

    foodCards.forEach((food) => {
      const foodName = food.querySelector("h3").textContent.toLowerCase();

      if (categoryName === "pizza" && foodName.includes("pizza")) {
        food.style.display = "";
      } else if (categoryName === "burgers" && foodName.includes("burger")) {
        food.style.display = "";
      } else if (categoryName === "chicken" && foodName.includes("chicken")) {
        food.style.display = "";
      } else if (categoryName === "sides") {
        food.style.display = "none";
      } else if (categoryName === "drinks") {
        food.style.display = "none";
      } else if (categoryName === "desserts") {
        food.style.display = "none";
      } else {
        food.style.display = "";
      }
    });

    // Scroll down to foods

    document.querySelector(".popular-section").scrollIntoView({
      behavior: "smooth",
    });

    showNotification(`${categoryName} selected`);
  });
});

//order now btn

orderButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();

    // Scroll to popular foods

    document.querySelector(".popular-section").scrollIntoView({
      behavior: "smooth",
    });

    showNotification("Choose something delicious!");
  });
});
//subscript form

subscribeForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const emailInput = subscribeForm.querySelector("input");

  const email = emailInput.value.trim();

  // Check whether email is empty

  if (email === "") {
    showNotification("Please enter your email.");

    return;
  }

  // Basic email validation

  if (!email.includes("@") || !email.includes(".")) {
    showNotification("Please enter a valid email.");

    return;
  }

  showNotification("Successfully subscribed! 🎉");

  // Clear input

  emailInput.value = "";
});

//,obile menu active
menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("mobile-active");
});

// Close menu when a link is clicked

const navigationLinks = document.querySelectorAll(".nav-links a");

navigationLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("mobile-active");
  });
});

//Notification

function showNotification(message) {
  // Remove old notification

  const oldNotification = document.querySelector(".notification");

  if (oldNotification) {
    oldNotification.remove();
  }

  // Create notification

  const notification = document.createElement("div");

  notification.classList.add("notification");

  notification.textContent = message;

  document.body.appendChild(notification);

  // Show it

  setTimeout(() => {
    notification.classList.add("show");
  }, 10);

  // Remove after 3 seconds

  setTimeout(() => {
    notification.classList.remove("show");

    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

updateCartCount();
