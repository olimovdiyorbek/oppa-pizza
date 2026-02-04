// 1. MAHSULOTLAR BAZASI
const products = [
    // Pitsalar
    { id: 1, category: 'pizza', name: 'Oppa Pizza', price: 75000, img: 'pizza1.jpg' },
    { id: 2, category: 'pizza', name: 'Margarita', price: 60000, img: 'pizza2.jpg' },
    { id: 3, category: 'pizza', name: 'Pepperoni', price: 70000, img: 'pizza3.jpg' },
    { id: 4, category: 'pizza', name: 'Go\'shtli', price: 85000, img: 'pizza4.jpg' },
    { id: 5, category: 'pizza', name: 'Qo\'ziqorinli', price: 65000, img: 'pizza5.jpg' },
    { id: 6, category: 'pizza', name: 'Meksika', price: 72000, img: 'pizza6.jpg' },
    { id: 7, category: 'pizza', name: 'Tovuqli', price: 68000, img: 'pizza7.jpg' },
    { id: 8, category: 'pizza', name: 'Assorti', price: 90000, img: 'pizza8.jpg' },

    // Taomlar
    { id: 9, category: 'food', name: 'Klab Sendvich', price: 35000, img: 'food1.jpg' },
    { id: 10, category: 'food', name: 'Fri kartoshkasi', price: 15000, img: 'food2.jpg' },
    { id: 11, category: 'food', name: 'Burger', price: 30000, img: 'food3.jpg' },
    { id: 12, category: 'food', name: 'Hot-dog', price: 18000, img: 'food4.jpg' },
    { id: 13, category: 'food', name: 'Naggetslar', price: 25000, img: 'food5.jpg' },
    { id: 14, category: 'food', name: 'Sezar Salat', price: 28000, img: 'food6.jpg' },
    { id: 15, category: 'food', name: 'Lavash', price: 26000, img: 'food7.jpg' },
    { id: 16, category: 'food', name: 'Steyk', price: 55000, img: 'food8.jpg' },

    // Desertlar
    { id: 17, category: 'dessert', name: 'Chizkeyk', price: 25000, img: 'dessert1.jpg' },
    { id: 18, category: 'dessert', name: 'Tiramisu', price: 30000, img: 'dessert2.jpg' },
    { id: 19, category: 'dessert', name: 'Muzqaymoq', price: 12000, img: 'dessert3.jpg' },
    { id: 20, category: 'dessert', name: 'Brauni', price: 22000, img: 'dessert4.jpg' },
    { id: 21, category: 'dessert', name: 'Pahlava', price: 15000, img: 'dessert5.jpg' },
    { id: 22, category: 'dessert', name: 'Meva assorti', price: 40000, img: 'dessert6.jpg' },
    { id: 23, category: 'dessert', name: 'Donut', price: 10000, img: 'dessert7.jpg' },
    { id: 24, category: 'dessert', name: 'Vafli', price: 20000, img: 'dessert8.jpg' },

    // Ichimliklar
    { id: 25, category: 'drinks', name: 'Coca-Cola 1.5L', price: 12000, img: 'drink1.jpg' },
    { id: 26, category: 'drinks', name: 'Fanta 1.5L', price: 12000, img: 'drink2.jpg' },
    { id: 27, category: 'drinks', name: 'Sprite 1.5L', price: 12000, img: 'drink3.jpg' },
    { id: 28, category: 'drinks', name: 'Olma sharbati', price: 15000, img: 'drink4.jpg' },
    { id: 29, category: 'drinks', name: 'Qora choy', price: 5000, img: 'drink5.jpg' },
    { id: 30, category: 'drinks', name: 'Kofe Latte', price: 18000, img: 'drink6.jpg' },
    { id: 31, category: 'drinks', name: 'Mineral suv', price: 4000, img: 'drink7.jpg' },
    { id: 32, category: 'drinks', name: 'Limonad', price: 20000, img: 'drink8.jpg' }
];

// 2. HOLATNI BOSHQARISH (LocalStorage bilan)
let cart = JSON.parse(localStorage.getItem('oppa_cart')) || [];

// Sahifa yuklanganda ishlidigan qism
window.onload = () => {
    // Avvalgi foydalanuvchi ma'lumotlarini tiklash
    if(localStorage.getItem('user_name')) document.getElementById('user-name').value = localStorage.getItem('user_name');
    if(localStorage.getItem('user_phone')) document.getElementById('user-phone').value = localStorage.getItem('user_phone');
    if(localStorage.getItem('user_address')) {
        const addr = localStorage.getItem('user_address');
        document.getElementById('user-address').value = addr;
        document.getElementById('display-address').innerText = addr;
    }

    updateCartBadge();
    const firstBtn = document.querySelector('.cat-btn');
    if (firstBtn) filterCategory('pizza', firstBtn);
};

// 3. KATEGORIYANI FILTRLASH
function filterCategory(cat, element) {
    document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active'));
    element.classList.add('active');

    const list = document.getElementById('pizza-list');
    list.innerHTML = ''; 

    const filtered = products.filter(p => p.category === cat);
    
    filtered.forEach(p => {
        const placeholder = `https://via.placeholder.com/300?text=${p.name}`;
        list.innerHTML += `
            <div class="pizza-card">
                <img src="assets/imgs/${p.img}" onerror="this.src='${placeholder}'">
                <div class="pizza-info">
                    <h3>${p.name}</h3>
                    <div class="pizza-footer">
                        <span class="price">${p.price.toLocaleString()} so'm</span>
                        <button class="add-btn" onclick="addToCart(${p.id})">+</button>
                    </div>
                </div>
            </div>`;
    });
}

// 4. SAVAT BILAN ISHLASH
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    syncStorage();
}

function syncStorage() {
    localStorage.setItem('oppa_cart', JSON.stringify(cart));
    updateCartBadge();
}

function updateCartBadge() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.querySelector('.badge');
    if (badge) badge.innerText = totalCount;
}

function openCart() {
    document.getElementById('cart-modal').style.display = "block";
    renderCart();
}

function renderCart() {
    const list = document.getElementById('cart-items-list');
    const totalEl = document.getElementById('cart-total-price');
    list.innerHTML = "";
    
    let totalSum = 0;

    if (cart.length === 0) {
        list.innerHTML = `
            <div style="text-align:center; padding: 40px 0;">
                <p style="font-size: 50px;">🛒</p>
                <p style="color: #888;">Savat hozircha bo'sh</p>
            </div>`;
        totalEl.innerText = "0 so'm";
        return;
    }

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalSum += itemTotal;
        list.innerHTML += `
            <div class="cart-item-row">
                <div class="item-info">
                    <strong>${item.name}</strong>
                    <span>${item.price.toLocaleString()} so'm</span>
                </div>
                <div class="qty-controls">
                    <button onclick="changeQty(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQty(${item.id}, 1)">+</button>
                </div>
                <div class="item-total-price">
                    ${itemTotal.toLocaleString()} so'm
                </div>
            </div>`;
    });
    
    totalEl.innerText = `${totalSum.toLocaleString()} so'm`;
}

function changeQty(id, delta) {
    const item = cart.find(p => p.id === id);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            cart = cart.filter(p => p.id !== id);
        }
    }
    syncStorage();
    renderCart();
}

function closeCart() {
    document.getElementById('cart-modal').style.display = "none";
}

// 5. TELEGRAM INTEGRATSIYASI VA BUYURTMA
async function finishOrder() {
    const BOT_TOKEN = "7547192306:AAH5mI5V6qO-mIeU8_pXoHj6j5-9v5w5y5E"; // O'zingizning Tokeningizni qo'ying
    const CHAT_ID = "123456789"; // O'zingizning ID'ingizni qo'ying

    const name = document.getElementById('user-name').value;
    const phone = document.getElementById('user-phone').value;
    const address = document.getElementById('user-address').value;
    const payMethod = document.querySelector('input[name="pay"]:checked').value;

    if (cart.length === 0) return alert("Savat bo'sh!");
    if (!name || !phone || !address) return alert("Iltimos, barcha ma'lumotlarni to'ldiring!");

    // Ma'lumotlarni saqlab qolish
    localStorage.setItem('user_name', name);
    localStorage.setItem('user_phone', phone);
    localStorage.setItem('user_address', address);
    document.getElementById('display-address').innerText = address;

    let orderDetails = cart.map((item, i) => `${i+1}. ${item.name} (${item.quantity} dona)`).join('\n');
    let totalSum = cart.reduce((s, item) => s + (item.price * item.quantity), 0);

    const message = `
🚀 *YANGI BUYURTMA!*
━━━━━━━━━━━━━━
👤 *Mijoz:* ${name}
📞 *Tel:* ${phone}
📍 *Manzil:* ${address}
💳 *To'lov:* ${payMethod === 'Cash' ? 'Naqd' : 'Karta'}
━━━━━━━━━━━━━━
📦 *Mahsulotlar:*
${orderDetails}
━━━━━━━━━━━━━━
💰 *JAMI:* ${totalSum.toLocaleString()} so'm
    `;

    try {
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'Markdown'
            })
        });

        if (response.ok) {
            alert("Rahmat! Buyurtmangiz qabul qilindi.");
            cart = [];
            syncStorage();
            closeCart();
        } else {
            alert("Xatolik! Bot sozlamalarini tekshiring.");
        }
    } catch (error) {
        alert("Internet aloqasini tekshiring!");
    }
}