// Cart data storage
let cart = JSON.parse(localStorage.getItem('coffeeCart')) || [];

// Coffee products data
const coffeeProducts = [
    { id: 'coffee-1', name: 'Americano', description: 'A popular coffee drink made by adding hot water to espresso, creating a larger, milder coffee similar to drip coffee but with espresso\'s distinct flavor.', price: 35.40, image: 'img/Americano.jpeg', type: 'coffee' },
    { id: 'coffee-2', name: 'Espresso', description: 'A concentrated coffee made by forcing hot water under high pressure through finely-ground coffee beans.', price: 23.15, image: 'img/espresso.jpeg', type: 'coffee' },
    { id: 'coffee-3', name: 'Latte', description: 'An espresso-based coffee drink of Italian origin that consists of one or more shots of espresso, a large amount of steamed milk, and a thin, final layer of frothed milk (microfoam) on top.', price: 19.99, image: 'img/latte.jpeg', type: 'coffee' },
    { id: 'coffee-4', name: 'Flat White', description: 'A strong, espresso-based coffee with velvety, microfoamed milk, originating from Australia/New Zealand.', price: 8.20, image: 'img/flat_white.jpeg', type: 'coffee' },
    { id: 'coffee-5', name: 'Cortado', description: 'A Spanish espresso drink made by "cutting" espresso with an equal amount of warm, steamed milk.', price: 16.50, image: 'img/cortado.jpeg', type: 'coffee' },
    { id: 'coffee-6', name: 'Cappuccino', description: 'An Italian espresso-based coffee drink traditionally made with equal parts espresso, steamed milk, and milk foam.', price: 7.90, image: 'img/cappucinno.jpeg', type: 'coffee' },
    { id: 'coffee-7', name: 'Caffé au Lait', description: 'A classic French coffee drink meaning "coffee with milk," traditionally made with equal parts strong brewed coffee.', price: 9.99, image: 'img/cafe_au_lait.jpeg', type: 'coffee' },
    { id: 'coffee-8', name: 'Caffè Mocha', description: 'A rich, chocolate-flavored coffee drink made with espresso, steamed milk, and chocolate syrup or cocoa powder.', price: 10.00, image: 'img/caffe_mocha.jpeg', type: 'coffee' },
    { id: 'coffee-9', name: 'Caffe Macchiato', description: 'A classic Italian coffee made with a shot of espresso "stained" or "marked" with a small dollop of foamed or steamed milk.', price: 35.00, image: 'img/caffe_macchiato.jpeg', type: 'coffee' }
];

// Brewing equipment data
const equipmentProducts = [
    { id: 'equip-1', name: 'Milk Frother', description: 'Used to create silky microfoam for lattes, cappuccinos, and flat whites. Adds café-quality texture to milk-based drinks.', price: 130.00, image: 'img/brew_equip0.jpeg', type: 'equipment' },
    { id: 'equip-2', name: 'Aeropress', description: 'A fast, portable brewer that uses immersion and gentle pressure to produce a smooth, low-acidity cup.', price: 140.00, image: 'img/brew_equip1.jpeg', type: 'equipment' },
    { id: 'equip-3', name: 'Espresso Machine', description: 'A high-pressure machine that forces hot water through finely ground coffee to create an intense, concentrated shot.', price: 78.00, image: 'img/brew_equip2.jpeg', type: 'equipment' },
    { id: 'equip-4', name: 'Philips 3200 Series Fully Automatic Espresso Machine', description: 'A fully automatic espresso maker with an intuitive touch display.', price: 120.00, image: 'img/brew_equip3.jpeg', type: 'equipment' },
    { id: 'equip-5', name: 'Brew Maker', description: 'A device that slowly brews coffee in cold water for 12–24 hours, producing a smooth, sweet, and low-acidity drink.', price: 100.00, image: 'img/brew_equip4.jpeg', type: 'equipment' },
    { id: 'equip-6', name: 'Moka Pot', description: 'A stovetop coffee maker that brews strong, rich coffee using steam pressure.', price: 299.00, image: 'img/brew_equip5.jpeg', type: 'equipment' }
];

// Combine all products
const allProducts = [...coffeeProducts, ...equipmentProducts];

// Update cart badge
function updateCartBadge() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    let badge = document.querySelector('.cart-badge');
    
    if (!badge && totalItems > 0) {
        const cartLink = document.querySelector('a[href="cart_page.html"]') || document.querySelector('a[href*="cart"]');
        if (cartLink) {
            badge = document.createElement('span');
            badge.className = 'cart-badge';
            cartLink.parentElement.style.position = 'relative';
            cartLink.parentElement.appendChild(badge);
        }
    }
    
    if (badge) {
        badge.textContent = totalItems;
        badge.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

// Add to cart function
function addToCart(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    localStorage.setItem('coffeeCart', JSON.stringify(cart));
    updateCartBadge();
    
    // Show notification
    showNotification(`${product.name} added to cart!`);
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #6d4c41 0%, #4e342e 100%);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-family: 'Poppins', sans-serif;
    `;
    notification.innerHTML = `<i class="fa-solid fa-check-circle"></i> ${message}`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Remove from cart
function removeFromCart(productId) {
    console.log('Removing product:', productId);
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex > -1) {
        const removedItem = cart[itemIndex];
        cart.splice(itemIndex, 1);
        localStorage.setItem('coffeeCart', JSON.stringify(cart));
        updateCartBadge();
        renderCart();
        showNotification(`${removedItem.name} removed from cart`);
    } else {
        console.error('Item not found:', productId);
    }
}

// Update quantity
function updateQuantity(productId, change) {
    console.log('Updating quantity for:', productId, 'Change:', change);
    const item = cart.find(item => item.id === productId);
    if (!item) {
        console.error('Item not found:', productId);
        return;
    }
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        localStorage.setItem('coffeeCart', JSON.stringify(cart));
        updateCartBadge();
        renderCart();
    }
}


function renderCart() {
    const cartContent = document.getElementById('cart-content');
    
    if (!cartContent) return; // Only run on cart page
    
    if (cart.length === 0) {
        cartContent.innerHTML = `
            <div class="empty-cart">
                <i class="fa-solid fa-cart-shopping"></i>
                <h2>Your cart is empty</h2>
                <p>Add some delicious coffee or brewing equipment to get started!</p>
                <a href="index.html" class="continue-shopping">
                    <i class="fa-solid fa-arrow-left"></i> Continue Shopping
                </a>
            </div>
        `;
        return;
    }
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;
    
    cartContent.innerHTML = `
        <div class="cart-container">
            <div class="cart-items">
                ${cart.map(item => {
                    const itemId = String(item.id);
                    return `
                    <div class="cart-item" data-item-id="${itemId}">
                        <div class="cart-item-image">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="cart-item-details">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-description">${item.description}</div>
                            <div class="cart-item-price">${item.price.toFixed(2)} each</div>
                            <span class="item-type-badge">${item.type === 'coffee' ? '☕ Coffee' :}</span>
                        </div>
                        <div class="cart-item-actions">
                            <div class="quantity-controls">
                                <button class="quantity-btn" onclick="updateQuantity('${itemId}', -1)" type="button">
                                    <i class="fa-solid fa-minus"></i>
                                </button>
                                <span class="quantity-display">${item.quantity}</span>
                                <button class="quantity-btn" onclick="updateQuantity('${itemId}', 1)" type="button">
                                    <i class="fa-solid fa-plus"></i>
                                </button>
                            </div>
                            <div class="item-subtotal">
                                Subtotal: ${(item.price * item.quantity).toFixed(2)}
                            </div>
                            <button class="remove-btn" onclick="removeFromCart('${itemId}')" type="button">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `}).join('')}
            </div>
            
            <div class="cart-summary">
                <h2>Order Summary</h2>
                <div class="summary-row">
                    <span>Items (${cart.reduce((sum, item) => sum + item.quantity, 0)}):</span>
                    <span>${cart.reduce((sum, item) => sum + item.quantity, 0)} items</span>
                </div>
                <div class="summary-row">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <div class="summary-row">
                    <span>Tax (10%):</span>
                    <span>${tax.toFixed(2)}</span>
                </div>
                <div class="summary-row total">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                </div>
                <button class="checkout-btn" onclick="checkout()" type="button">
                    <i class="fa-solid fa-lock"></i> Proceed to Checkout
                </button>
                <a href="index.html" class="continue-shopping" style="display: block; text-align: center; margin-top: 1rem; color: #6d4c41; text-decoration: none; font-weight: 600;">
                    <i class="fa-solid fa-arrow-left"></i> Continue Shopping
                </a>
            </div>
        </div>
    `;
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 1.1;
    alert(`Thank you for your order!\n\nTotal: $${total.toFixed(2)}\n\nThis is a demo checkout.`);
    
}


document.addEventListener('DOMContentLoaded', function() {
    updateCartBadge();
    
    const coffeeButtons = document.querySelectorAll('.coffe_cart button');
    coffeeButtons.forEach((button, index) => {
        button.onclick = function(e) {
            e.preventDefault();
            addToCart(`coffee-${index + 1}`);
        };
    });
    
    const equipButtons = document.querySelectorAll('.equip_cart button');
    equipButtons.forEach((button, index) => {
        button.onclick = function(e) {
            e.preventDefault();
            addToCart(`equip-${index + 1}`);
        };
    });
    
    renderCart();
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .item-type-badge {
        display: inline-block;
        padding: 0.3rem 0.8rem;
        border-radius: 20px;
        font-size: 0.85rem;
        font-weight: 600;
        margin-top: 0.5rem;
        background: linear-gradient(135deg, #f5f0e8 0%, #e8dcc8 100%);
        color: #6d4c41;
    }
    
    .item-subtotal {
        font-size: 1.1rem;
        font-weight: 600;
        color: #6d4c41;
        margin: 0.5rem 0;
    }
`;

(function() {
    const popup = document.getElementById('welcomePopup');
    const closeBtn = document.getElementById('closePopup');
    const skipBtn = document.getElementById('skipPopup');
    const signupForm = document.getElementById('signupForm');
    
    // Check if user has seen the popup before
    const hasSeenPopup = localStorage.getItem('hasSeenWelcomePopup');
    
    // Show popup only on first visit (after 1 second delay)
    if (!hasSeenPopup) {
        setTimeout(() => {
            popup.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }, 1000);
    }
    
    // Function to close popup
    function closePopup() {
        popup.classList.add('hidden');
        document.body.style.overflow = 'auto'; // Re-enable scrolling
        localStorage.setItem('hasSeenWelcomePopup', 'true');
    }
    
    // Close button click
    if (closeBtn) {
        closeBtn.addEventListener('click', closePopup);
    }
    
    // Skip button click
    if (skipBtn) {
        skipBtn.addEventListener('click', closePopup);
    }
    
    // Close on overlay click (outside modal)
    if (popup) {
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                closePopup();
            }
        });
    }
    
    // Handle form submission
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            
            // Save signup info (in a real app, you'd send this to a server)
            localStorage.setItem('userSignup', JSON.stringify({
                name: name,
                email: email,
                discount: '15%',
                signupDate: new Date().toISOString()
            }));
            
            // Show success message
            const modalBody = document.querySelector('.popup-body');
            modalBody.innerHTML = `
                <div style="text-align: center; padding: 2rem 0;">
                    <i class="fa-solid fa-circle-check" style="font-size: 4rem; color: #4caf50; margin-bottom: 1rem;"></i>
                    <h3 style="color: #3e2723; font-family: 'Playfair Display', serif; font-size: 1.8rem; margin-bottom: 1rem;">
                        Welcome, ${name}! 🎉
                    </h3>
                    <p style="color: #5d4037; font-size: 1.1rem; margin-bottom: 1rem;">
                        Your <strong>15% discount code</strong> is:
                    </p>
                    <div style="background: linear-gradient(135deg, #6d4c41 0%, #4e342e 100%); color: white; padding: 1rem 2rem; border-radius: 10px; font-size: 1.5rem; font-weight: 700; letter-spacing: 2px; display: inline-block; margin-bottom: 1rem;">
                        WELCOME15
                    </div>
                    <p style="color: #5d4037; font-size: 0.9rem;">
                        Check your email for confirmation and use this code at checkout!
                    </p>
                </div>
            `;
            
            // Show notification
            showNotification(`🎉 Welcome ${name}! Your discount code is WELCOME15`);
            
            // Close popup after 5 seconds
            setTimeout(() => {
                closePopup();
            }, 10000);
        });
    }
    
    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !popup.classList.contains('hidden')) {
            closePopup();
        }
    });
})();

// Optional: Function to reset popup (for testing)
function resetWelcomePopup() {
    localStorage.removeItem('hasSeenWelcomePopup');
    localStorage.removeItem('userSignup');
    location.reload();
}

document.head.appendChild(style);

