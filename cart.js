// 1. MAHSULOTLAR BAZASI
const products = [
    { id: 1, category: 'pizza', name: 'Margarita pitsa kattasi', price: 75000, img: 'pizza1.jpg' },
    { id: 2, category: 'pizza', name: 'Margarita pitsa', price: 60000, img: 'pizza2.jpg' },
    { id: 3, category: 'pizza', name: 'Pitsa Regina', price: 70000, img: 'pizza3.jpg' },
    { id: 4, category: 'pizza', name: 'Pomidorli pitsa kattasi', price: 85000, img: 'pizza4.jpg' },
    { id: 5, category: 'pizza', name: 'Qo\'ziqorinli pitsa', price: 65000, img: 'pizza5.jpg' },
    { id: 6, category: 'pizza', name: 'Pomidorli pitsa', price: 72000, img: 'pizza6.jpg' },
    { id: 7, category: 'pizza', name: 'Tovuqli pitsa', price: 68000, img: 'pizza7.jpg' },
    { id: 8, category: 'pizza', name: 'Qalbasali pitsa', price: 90000, img: 'pizza8.jpg' },
    { id: 9, category: 'food', name: 'Burger', price: 35000, img: 'food-1.jpg' },
    { id: 10, category: 'food', name: 'Lavash', price: 25000, img: 'food-2.jpg' },
    { id: 11, category: 'food', name: 'Non kabob', price: 17000, img: 'food-3.jpg' },
    { id: 12, category: 'food', name: 'Free', price: 12000, img: 'food-4.jpg' },
    { id: 13, category: 'food', name: 'Osh', price: 70000, img: 'food-5.jpg' },
    { id: 14, category: 'food', name: 'Go\'sht shashlik', price: 20000, img: 'food-6.jpg' },
    { id: 15, category: 'food', name: 'Ijjon shashlik', price: 12000, img: 'food-7.jpg' },
    { id: 16, category: 'food', name: 'Hod-dog', price: 15000, img: 'food-8.jpg' },
    { id: 17, category: 'dessert', name: 'CHizli desert', price: 57000, img: 'dessert-1.jpg' },
    { id: 18, category: 'dessert', name: 'San sebastian', price: 70000, img: 'dessert-2.jpg' },
    { id: 19, category: 'dessert', name: 'Karamelli muzqaymoqli desert', price: 70000, img: 'dessert-3.jpg' },
    { id: 20, category: 'dessert', name: 'San sebastian-2', price: 70000, img: 'dessert-4.jpg' },
    { id: 21, category: 'dessert', name: 'Qulupnayli Bingsu', price: 77000, img: 'dessert-5.jpg' },
    { id: 22, category: 'dessert', name: 'Tiramisu', price: 60000, img: 'dessert-6.jpg' },
    { id: 23, category: 'dessert', name: 'shokoladli cupcake', price: 23000, img: 'dessert-7.jpg' },
    { id: 24, category: 'dessert', name: 'Belgiya vaflisi', price: 20000, img: 'dessert-8.jpg' },
    { id: 25, category: 'drinks', name: 'Mohitto 0.5L', price: 12000, img: 'drink-1.jpg' },
    { id: 26, category: 'drinks', name: 'Coca-cola 0.5L', price: 12000, img: 'drink-2.jpg' },
    { id: 27, category: 'drinks', name: 'Pepsi 0.5L', price: 12000, img: 'drink-3.jpg' },
    { id: 28, category: 'drinks', name: 'Fanta o.5L', price: 12000, img: 'drink-4.jpg' },
    { id: 29, category: 'drinks', name: 'Sprite 0.5L', price: 12000, img: 'drink-5.jpg' },
    { id: 30, category: 'drinks', name: 'Adrinalin 0.5L', price: 18000, img: 'drink-6.jpg' },
    { id: 31, category: 'drinks', name: 'Read bull 0.5L', price: 16000, img: 'drink-7.jpg' },
    { id: 32, category: 'drinks', name: 'Dinay 0.5L', price: 15000, img: 'drink-8.jpg' }
];

let cart = JSON.parse(localStorage.getItem('oppa_cart')) || [];

window.onload = () => {
    updateCartBadge();
    const firstBtn = document.querySelector('.cat-btn');
    if (firstBtn) filterCategory('pizza', firstBtn);
    // Agar admin panel bo'lsa yuklash
    if (document.getElementById('admin-orders-list')) renderAdminOrders();
};

// 3. QIDIRUV VA FILTRLASH
window.filterCategory = function(cat, element) {
    document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active'));
    if (element) element.classList.add('active');
    const filtered = products.filter(p => p.category === cat);
    renderProducts(filtered);
}

window.searchProducts = function() {
    const query = document.getElementById('product-search').value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(query));
    renderProducts(filtered);
}

function renderProducts(productsList) {
    const list = document.getElementById('pizza-list');
    list.innerHTML = '';
    if (productsList.length === 0) {
        list.innerHTML = '<p style="text-align:center; width:100%; grid-column: 1/3; padding: 20px;">Hech narsa topilmadi 😕</p>';
        return;
    }
    productsList.forEach(p => {
        const placeholder = `https://via.placeholder.com/300?text=${p.name}`;
        const savedRating = localStorage.getItem(`rating_${p.id}`) || 5;
        list.innerHTML += `
            <div class="pizza-card">
                <img src="assets/imgs/${p.img}" onerror="this.src='${placeholder}'">
                <div class="pizza-info">
                    <div class="rating-box" id="rating-stars-${p.id}">
                        ${generateStars(p.id, savedRating)}
                    </div>
                    <h3>${p.name}</h3>
                    <div class="pizza-footer">
                        <span class="price">${p.price.toLocaleString()} so'm</span>
                        <button class="add-btn" onclick="addToCart(${p.id})">+</button>
                    </div>
                </div>
            </div>`;
    });
}

function generateStars(productId, rating) {
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
        starsHtml += `<span onclick="setRating(${productId}, ${i})" 
                      style="cursor:pointer; color: ${i <= rating ? '#f1c40f' : '#ccc'}; font-size: 18px;">★</span>`;
    }
    return starsHtml + ` <small style="color:#888;">${rating}.0</small>`;
}

window.setRating = function(productId, value) {
    localStorage.setItem(`rating_${productId}`, value);
    const starBox = document.getElementById(`rating-stars-${productId}`);
    if (starBox) starBox.innerHTML = generateStars(productId, value);
    alert("Baholaganingiz uchun rahmat! ⭐");
}

// 4. SAVAT BILAN ISHLASH
window.addToCart = function(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    if (product.category === 'pizza') {
        const hasDrink = cart.some(item => item.category === 'drinks');
        if (!hasDrink) {
            setTimeout(() => {
                if (confirm("Pitsa bilan muzdek Pepsi ham olasizmi? 🥤")) {
                    addToCart(27);
                    renderCart();
                }
            }, 500);
        }
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

window.openCart = function() {
    document.getElementById('cart-modal').style.display = "block";
    renderCart();
}

function renderCart() {
    const list = document.getElementById('cart-items-list');
    const totalEl = document.getElementById('cart-total-price');
    if (!list || !totalEl) return;
    list.innerHTML = "";
    let totalSum = 0;
    if (cart.length === 0) {
        list.innerHTML = `<div style="text-align:center; padding: 40px 0;"><p style="font-size: 50px;">🛒</p><p style="color: #888;">Savat hozircha bo'sh</p></div>`;
        totalEl.innerText = "0 so'm";
        return;
    }

    // Savatda progres ko'rsatish (Oxirgi kiritilgan raqam bo'yicha)
    const lastPhone = localStorage.getItem('last_customer_phone') || "";
    let currentBalance = lastPhone ? (parseInt(localStorage.getItem(`pizzas_balance_${lastPhone}`)) || 0) : 0;
    const progressPercent = (currentBalance / 5) * 100;

    list.innerHTML += `
        <div class="promo-progress-container" style="padding: 10px; background: #fff9e6; border-radius: 8px; margin-bottom: 15px; border: 1px dashed #f1c40f;">
            <p style="font-size: 12px; margin-bottom: 5px;">🎁 <b>Mijoz balansi (${lastPhone}):</b> ${currentBalance}/5 ta</p>
            <div style="width: 100%; height: 8px; background: #eee; border-radius: 4px; overflow: hidden;">
                <div style="width: ${progressPercent}%; height: 100%; background: #2ecc71; transition: 0.3s;"></div>
            </div>
        </div>`;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalSum += itemTotal;
        list.innerHTML += `
            <div class="cart-item-row">
                <div class="item-info"><strong>${item.name}</strong><span>${item.price.toLocaleString()} so'm</span></div>
                <div class="qty-controls">
                    <button onclick="changeQty(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQty(${item.id}, 1)">+</button>
                </div>
                <div class="item-total-price">${itemTotal.toLocaleString()} so'm</div>
            </div>`;
    });
    totalEl.innerText = `${totalSum.toLocaleString()} so'm`;
}

window.changeQty = function(id, delta) {
    const item = cart.find(p => p.id === id);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) cart = cart.filter(p => p.id !== id);
    }
    syncStorage();
    renderCart();
}

window.closeCart = function() {
    document.getElementById('cart-modal').style.display = "none";
}

// 5. TELEGRAM INTEGRATSIYASI VA INDIVIDUAL BONUS
window.finishOrder = async function() {
    const BOT_TOKEN = "8539044860:AAF_MNwdQrHUjLsu_aIYnjk8kBmX40-X9aM";
    const CHAT_ID = "6231029845";
    const nameInput = document.getElementById('user-name');
    const phoneInput = document.getElementById('user-phone');
    const addressInput = document.getElementById('user-address');

    if (cart.length === 0) return alert("Savat bo'sh!");
    if (!nameInput.value || !phoneInput.value || !addressInput.value) {
        return alert("Iltimos, ma'lumotlarni to'ldiring!");
    }

    const phone = phoneInput.value.trim();
    localStorage.setItem('last_customer_phone', phone); // Keyingi safar eslab qolish uchun

    // 1. Shu mijozning shaxsiy balansini hisoblash
    let customerBalance = parseInt(localStorage.getItem(`pizzas_balance_${phone}`)) || 0;
    const specialPizzas = cart.filter(item => item.id === 1 || item.id === 4);
    const pizzaCountInOrder = specialPizzas.reduce((sum, item) => sum + item.quantity, 0);
    
    customerBalance += pizzaCountInOrder;
    let giftMessage = "";

    // 2. Bonus mantiqi (Har bir mijoz uchun 1-5 sikli)
    if (customerBalance >= 5) {
        giftMessage = "\n\n🎁 *AKSIYA: MIJOZ 5 TA PITSA OLDI! 0.5L PEPSI SOVG'A!* 🥤";
        customerBalance = customerBalance % 5; 
    }
    localStorage.setItem(`pizzas_balance_${phone}`, customerBalance);

    // 3. Admin panel uchun buyurtmani saqlash
    let allOrders = JSON.parse(localStorage.getItem('oppa_orders')) || [];
    const newOrder = {
        id: Date.now(),
        customer: nameInput.value,
        phone: phone,
        address: addressInput.value,
        items: [...cart],
        total: cart.reduce((s, i) => s + (i.price * i.quantity), 0),
        date: new Date().toLocaleString()
    };
    allOrders.push(newOrder);
    localStorage.setItem('oppa_orders', JSON.stringify(allOrders));

    // 4. Telegramga xabar yuborish
    let orderHistoryCount = parseInt(localStorage.getItem('oppa_order_total_count')) || 0;
    orderHistoryCount += 1;
    localStorage.setItem('oppa_order_total_count', orderHistoryCount);

    const payMethodEl = document.querySelector('input[name="pay"]:checked');
    const payMethod = payMethodEl ? payMethodEl.value : "Naqd";
    let orderDetails = cart.map((item, i) => `${i + 1}. *${item.name}* — ${item.quantity} ta`).join('\n');
    
    const message = `🚀 *YANGI BUYURTMA (№${orderHistoryCount})*\n━━━━━━━━━━━━━━\n👤 *Mijoz:* ${newOrder.customer}\n📞 *Tel:* ${phone}\n📍 *Manzil:* ${newOrder.address}\n💳 *To'lov:* ${payMethod === 'Cash' ? 'Naqd' : 'Karta'}\n━━━━━━━━━━━━━━\n📦 *Mahsulotlar:*\n${orderDetails}\n━━━━━━━━━━━━━━\n🍕 *Mijoz shaxsiy balansi:* ${customerBalance}/5 ta\n💰 *JAMI:* ${newOrder.total.toLocaleString()} so'm` + giftMessage;

    try {
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: CHAT_ID, text: message, parse_mode: 'Markdown' })
        });
        if (response.ok) {
            alert(`Rahmat ${newOrder.customer}! Buyurtmangiz qabul qilindi. ✅`);
            cart = [];
            syncStorage();
            closeCart();
            renderCart();
        }
    } catch (error) { alert("Xatolik yuz berdi!"); }
}

// --- ADMIN PANEL FUNKSIYALARI (finishOrder'dan tashqarida bo'lishi shart) ---
window.renderAdminOrders = function() {
    const adminList = document.getElementById('admin-orders-list');
    if (!adminList) return;

    let allOrders = JSON.parse(localStorage.getItem('oppa_orders')) || [];
    adminList.innerHTML = '';

    if (allOrders.length === 0) {
        adminList.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:20px;">Buyurtmalar yo\'q</td></tr>';
        return;
    }

    allOrders.slice().reverse().forEach((order, index) => {
        let itemsHtml = order.items.map(i => `${i.name} (${i.quantity})`).join(', ');
        adminList.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${order.customer}<br><small>${order.phone}</small></td>
                <td>${order.address}</td>
                <td>${itemsHtml}</td>
                <td>${order.total.toLocaleString()} so'm</td>
                <td><button onclick="deleteOrder(${order.id})" style="background:#e74c3c; color:white; border:none; padding:5px; border-radius:4px; cursor:pointer;">O'chirish</button></td>
            </tr>`;
    });
}

window.deleteOrder = function(orderId) {
    if (confirm("O'chirilsinmi?")) {
        let allOrders = JSON.parse(localStorage.getItem('oppa_orders')) || [];
        allOrders = allOrders.filter(o => o.id !== orderId);
        localStorage.setItem('oppa_orders', JSON.stringify(allOrders));
        renderAdminOrders();
    }
}
