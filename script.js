
// FOOD MENU
const foodItems = [

    {
        id: 1,
        name: "Classic Burger",
        category: "Burger",
        price: 149,
        emoji: "🍔",
        description: "Juicy burger with fresh vegetables and cheese."
    },

    {
        id: 2,
        name: "Cheese Burger",
        category: "Burger",
        price: 179,
        emoji: "🍔",
        description: "Loaded with delicious melted cheese."
    },

    {
        id: 3,
        name: "Margherita Pizza",
        category: "Pizza",
        price: 199,
        emoji: "🍕",
        description: "Classic pizza with cheese and tomato."
    },

    {
        id: 4,
        name: "Farmhouse Pizza",
        category: "Pizza",
        price: 249,
        emoji: "🍕",
        description: "Fresh vegetables with extra cheese."
    },

    {
        id: 5,
        name: "Cold Coffee",
        category: "Drinks",
        price: 99,
        emoji: "🥤",
        description: "Refreshing chilled coffee."
    },

    {
        id: 6,
        name: "Fresh Lemonade",
        category: "Drinks",
        price: 69,
        emoji: "🍋",
        description: "Fresh and refreshing lemon drink."
    },

    {
        id: 7,
        name: "Chocolate Cake",
        category: "Dessert",
        price: 129,
        emoji: "🍰",
        description: "Rich and delicious chocolate cake."
    },

    {
        id: 8,
        name: "Ice Cream",
        category: "Dessert",
        price: 89,
        emoji: "🍨",
        description: "Creamy vanilla ice cream."
    },

    {
        id: 9,
        name: "French Fries",
        category: "Burger",
        price: 79,
        emoji: "🍟",
        description: "Crispy golden potato fries."
    }

];

// CART
let cart = [];

let selectedCategory = "All";


// DISPLAY FOOD
function displayFood(items) {

    const foodGrid = document.getElementById("foodGrid");

    foodGrid.innerHTML = "";

    if (items.length === 0) {

        foodGrid.innerHTML =
            '<p class="no-results">No food items found. Try another search.</p>';

        return;
    }

    items.forEach(function(food) {

        foodGrid.innerHTML += `

            <div class="food-card">

                <div class="food-image">
                    ${food.emoji}
                </div>

                <div class="food-details">

                    <h3>${food.name}</h3>

                    <p>${food.description}</p>

                    <div class="food-bottom">

                        <span class="price">
                            ₹${food.price}
                        </span>

                        <button
                            class="add-button"
                            onclick="addToCart(${food.id})">
                            + Add
                        </button>

                    </div>

                </div>

            </div>

        `;

    });

}


// ADD FOOD TO CART
function addToCart(id) {

    const existingItem = cart.find(function(item) {
        return item.id === id;
    });

    if (existingItem) {

        existingItem.quantity++;

    } else {

        const food = foodItems.find(function(item) {
            return item.id === id;
        });

        cart.push({
            ...food,
            quantity: 1
        });

    }

    updateCart();

}


// UPDATE CART
function updateCart() {

    const cartItems = document.getElementById("cartItems");

    cartItems.innerHTML = "";

    let subtotal = 0;

    let totalQuantity = 0;

    if (cart.length === 0) {

        cartItems.innerHTML =
            '<p class="empty-cart">Your cart is empty. Add something delicious!</p>';

    }

    cart.forEach(function(item) {

        subtotal += item.price * item.quantity;

        totalQuantity += item.quantity;

        cartItems.innerHTML += `

            <div class="cart-item">

                <div>
                    <h4>${item.emoji} ${item.name}</h4>
                    <small>₹${item.price} each</small>
                </div>

                <div class="quantity">

                    <button onclick="changeQuantity(${item.id}, -1)">
                        -
                    </button>

                    <span>${item.quantity}</span>

                    <button onclick="changeQuantity(${item.id}, 1)">
                        +
                    </button>

                </div>

                <strong>₹${item.price * item.quantity}</strong>

                <button
                    class="remove-button"
                    onclick="removeItem(${item.id})">
                    Remove
                </button>

            </div>

        `;

    });

    const deliveryFee = subtotal > 0 ? 40 : 0;

    const total = subtotal + deliveryFee;

    document.getElementById("cartCount").textContent =
        totalQuantity;

    document.getElementById("subtotal").textContent =
        "₹" + subtotal;

    document.getElementById("delivery").textContent =
        "₹" + deliveryFee;

    document.getElementById("total").textContent =
        "₹" + total;

    document.getElementById("checkoutBtn").disabled =
        cart.length === 0;

}


// CHANGE QUANTITY
function changeQuantity(id, change) {

    const item = cart.find(function(food) {
        return food.id === id;
    });

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {

        removeItem(id);

        return;

    }

    updateCart();

}


// REMOVE ITEM
function removeItem(id) {

    cart = cart.filter(function(item) {
        return item.id !== id;
    });

    updateCart();

}


// SEARCH FOOD
function searchFood() {

    const searchValue = document
        .getElementById("searchInput")
        .value
        .toLowerCase()
        .trim();

    const filteredFood = foodItems.filter(function(food) {

        const matchesSearch =
            food.name.toLowerCase().includes(searchValue) ||
            food.description.toLowerCase().includes(searchValue);

        const matchesCategory =
            selectedCategory === "All" ||
            food.category === selectedCategory;

        return matchesSearch && matchesCategory;

    });

    displayFood(filteredFood);

}


// CATEGORY FILTER
document.querySelectorAll(".category").forEach(function(button) {

    button.addEventListener("click", function() {

        document.querySelectorAll(".category").forEach(function(btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        selectedCategory = button.dataset.category;

        searchFood();

    });

});


// SEARCH WHILE TYPING
document.getElementById("searchInput").addEventListener(
    "input",
    searchFood
);


// SCROLL TO CART
function scrollToCart() {

    document.getElementById("cart").scrollIntoView({
        behavior: "smooth"
    });

}


// CHECKOUT
function openCheckout() {

    if (cart.length === 0) return;

    document.getElementById("checkout").hidden = false;

    document.getElementById("checkout").scrollIntoView({
        behavior: "smooth"
    });

}


// CANCEL CHECKOUT
function closeCheckout() {

    document.getElementById("checkout").hidden = true;

}


// PLACE ORDER
document.getElementById("checkoutForm").addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        if (cart.length === 0) return;

        const name = document
            .getElementById("customerName").value.trim();

        const total = cart.reduce(function(sum, item) {
            return sum + item.price * item.quantity;
        }, 0) + 40;

        document.getElementById("orderMessage").textContent =
            "Thank you, " + name + "! Your order has been received.";

        document.getElementById("orderTotal").textContent =
            "Your total bill is ₹" + total + ".";

        document.getElementById("checkout").hidden = true;

        document.getElementById("confirmation").hidden = false;

        document.getElementById("confirmation").scrollIntoView({
            behavior: "smooth"
        });

    }
);


// START A NEW ORDER
function newOrder() {

    cart = [];

    updateCart();

    document.getElementById("checkoutForm").reset();

    document.getElementById("confirmation").hidden = true;

    document.getElementById("menu").scrollIntoView({
        behavior: "smooth"
    });

}


// INITIALIZE WEBSITE
displayFood(foodItems);

updateCart();
