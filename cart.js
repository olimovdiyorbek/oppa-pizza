// 1. MAHSULOTLAR BAZASI
const products = [
    // Pitsalar
    { id: 1, category: 'pizza', name: 'Margarita pitsa', price: 75000, img: 'pizza1.jpg' },
    { id: 2, category: 'pizza', name: 'Margarita pitsa-2', price: 60000, img: 'pizza2.jpg' },
    { id: 3, category: 'pizza', name: 'Pitsa Regina', price: 70000, img: 'pizza3.jpg' },
    { id: 4, category: 'pizza', name: 'Pomidorli pitsa', price: 85000, img: 'pizza4.jpg' },
    { id: 5, category: 'pizza', name: 'Qo\'ziqorinli pitsa', price: 65000, img: 'pizza5.jpg' },
    { id: 6, category: 'pizza', name: 'Pomidorli pitsa-2', price: 72000, img: 'pizza6.jpg' },
    { id: 7, category: 'pizza', name: 'Tovuqli pitsa', price: 68000, img: 'pizza7.jpg' },
    { id: 8, category: 'pizza', name: 'Qalbasali pitsa', price: 90000, img: 'pizza8.jpg' },

    // Taomlar
    { id: 9, category: 'food', name: 'Burger', price: 35000, img: 'food-1.jpg' },
    { id: 10, category: 'food', name: 'Lavash', price: 25000, img: 'food-2.jpg' },
    { id: 11, category: 'food', name: 'Non kabob', price: 17000, img: 'food-3.jpg' },
    { id: 12, category: 'food', name: 'Free', price: 12000, img: 'food-4.jpg' },
    { id: 13, category: 'food', name: 'Osh', price: 70000, img: 'food-5.jpg' },
    { id: 14, category: 'food', name: 'Go\'sht shashlik', price: 20000, img: 'food-6.jpg' },
    { id: 15, category: 'food', name: 'Ijjon shashlik', price: 12000, img: 'food-7.jpg' },
    { id: 16, category: 'food', name: 'Hod-dog', price: 15000, img: 'food-8.jpg' },

    // Desertlar
    { id: 17, category: 'dessert', name: 'CHizli desert', price: 57000, img: 'dessert-1.jpg' },
    { id: 18, category: 'dessert', name: 'San sebastian', price: 70000, img: 'dessert-2.jpg' },
    { id: 19, category: 'dessert', name: 'Karamelli muzqaymoqli desert', price: 70000, img: 'dessert-3.jpg' },
    { id: 20, category: 'dessert', name: 'San sebastian-2', price: 70000, img: 'dessert-4.jpg' },
    { id: 21, category: 'dessert', name: 'Qulupnayli Bingsu', price: 77000, img: 'dessert-5.jpg' },
    { id: 22, category: 'dessert', name: 'Tiramisu', price: 60000, img: 'dessert-6.jpg' },
    { id: 23, category: 'dessert', name: 'shokoladli cupcake', price: 23000, img: 'dessert-7.jpg' },
    { id: 24, category: 'dessert', name: 'Belgiya vaflisi', price: 20000, img: 'dessert-8.jpg' },

    // Ichimliklar
    { id: 25, category: 'drinks', name: 'Mohitto 0.5L', price: 12000, img: 'drink-1.jpg' },
    { id: 26, category: 'drinks', name: 'Coca-cola 0.5L', price: 12000, img: 'drink-2.jpg' },
    { id: 27, category: 'drinks', name: 'Pepsi 0.5L', price: 12000, img: 'drink-3.jpg' },
    { id: 28, category: 'drinks', name: 'Fanta o.5L', price: 12000, img: 'drink-4.jpg' },
    { id: 29, category: 'drinks', name: 'Sprite 0.5L', price: 12000, img: 'drink-5.jpg' },
    { id: 30, category: 'drinks', name: 'Adrinalin 0.5L', price: 18000, img: 'drink-6.jpg' },
    { id: 31, category: 'drinks', name: 'Read bull 0.5L', price: 16000, img: 'drink-7.jpg' },
    { id: 32, category: 'drinks', name: 'Dinay 0.5L', price: 15000, img: 'drink-8.jpg' }
];

// 2. HOLATNI BOSHQARISH
let cart = JSON.parse(localStorage.getItem('oppa_cart')) || [];

window.onload = () => {
    updateCartBadge();
    const firstBtn = document.querySelector('.cat-btn');
    if (firstBtn) filterCategory('pizza', firstBtn);
};

// 3. QIDIRUV VA FILTRLASH
function filterCategory(cat, element) {
    document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active'));
    if (element) element.classList.add('active');

    const filtered = products.filter(p => p.category === cat);
    renderProducts(filtered);
}

function searchProducts() {
    const query = document.getElementById('product-search').value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(query));
    renderProducts(filtered);
}

// Yangilangan renderProducts: Interaktiv reyting qo'shildi
function renderProducts(productsList) {
    const list = document.getElementById('pizza-list');
    list.innerHTML = ''; 

    if (productsList.length === 0) {
        list.innerHTML = '<p style="text-align:center; width:100%; grid-column: 1/3; padding: 20px;">Hech narsa topilmadi 😕</p>';
        return;
    }

    productsList.forEach(p => {
        const placeholder = `https://via.placeholder.com/300?text=${p.name}`;
        // Har bir mahsulot uchun alohida saqlangan reytingni olish
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

// Reyting yulduzchalarini generatsiya qilish
function generateStars(productId, rating) {
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
        starsHtml += `<span onclick="setRating(${productId}, ${i})" 
                      style="cursor:pointer; color: ${i <= rating ? '#f1c40f' : '#ccc'}; font-size: 18px;">★</span>`;
    }
    return starsHtml + ` <small style="color:#888;">${rating}.0</small>`;
}

// Foydalanuvchi bahosini saqlash
function setRating(productId, value) {
    localStorage.setItem(`rating_${productId}`, value);
    // Sahifani qayta chizmasdan yulduzlarni yangilash
    const starBox = document.getElementById(`rating-stars-${productId}`);
    if(starBox) starBox.innerHTML = generateStars(productId, value);
    alert("Baholaganingiz uchun rahmat! ⭐");
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
    if(!list || !totalEl) return;
    
    list.innerHTML = "";
    let totalSum = 0;

    if (cart.length === 0) {
        list.innerHTML = `<div style="text-align:center; padding: 40px 0;"><p style="font-size: 50px;">🛒</p><p style="color: #888;">Savat hozircha bo'sh</p></div>`;
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
                <div class="item-total-price">${itemTotal.toLocaleString()} so'm</div>
            </div>`;
    });
    
    totalEl.innerText = `${totalSum.toLocaleString()} so'm`;
}

function changeQty(id, delta) {
    const item = cart.find(p => p.id === id);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) cart = cart.filter(p => p.id !== id);
    }
    syncStorage();
    renderCart();
}

function closeCart() {
    document.getElementById('cart-modal').style.display = "none";
}

// 5. TELEGRAM INTEGRATSIYASI VA BUYURTMA HISOBI
async function finishOrder() {
    const BOT_TOKEN = "8539044860:AAF_MNwdQrHUjLsu_aIYnjk8kBmX40-X9aM"; 
    const CHAT_ID = "6231029845"; 

    const nameInput = document.getElementById('user-name');
    const phoneInput = document.getElementById('user-phone');
    const addressInput = document.getElementById('user-address');

    if (cart.length === 0) return alert("Savat bo'sh!");
    if (!nameInput.value || !phoneInput.value || !addressInput.value) {
        return alert("Iltimos, barcha ma'lumotlarni to'ldiring!");
    }

    // --- BUYURTMA SONINI HISOBLASH MANTIG'I ---
    let orderHistoryCount = parseInt(localStorage.getItem('oppa_order_total_count')) || 0;
    orderHistoryCount += 1; // Yangi buyurtma qo'shildi
    localStorage.setItem('oppa_order_total_count', orderHistoryCount);

    let giftMessage = "";
    // Har 5-buyurtma uchun sovg'a eslatmasi
    if (orderHistoryCount % 5 === 0) {
        giftMessage = "\n\n🎁 *AKSIYA:* Bu mijozning " + orderHistoryCount + "-buyurtmasi! *0.5L PEPSI QO'SHIB BERING!* 🥤";
    }
    // ------------------------------------------

    const name = nameInput.value;
    const phone = phoneInput.value;
    const address = addressInput.value;
    const payMethodEl = document.querySelector('input[name="pay"]:checked');
    const payMethod = payMethodEl ? payMethodEl.value : "Naqd";
    const payNote = payMethod === 'Card' ? "\n⚠️ *Mijozga karta raqamingizni yuboring!*" : "";

    let orderDetails = cart.map((item, i) => `${i+1}. *${item.name}* — ${item.quantity} dona`).join('\n');
    let totalSum = cart.reduce((s, item) => s + (item.price * item.quantity), 0);

    const message = `🚀 *YANGI BUYURTMA (№${orderHistoryCount})*\n` +
                  `━━━━━━━━━━━━━━\n` +
                  `👤 *Mijoz:* ${name}\n` +
                  `📞 *Tel:* ${phone}\n` +
                  `📍 *Manzil:* ${address}\n` +
                  `💳 *To'lov:* ${payMethod === 'Cash' ? 'Naqd' : 'Karta'}${payNote}\n` +
                  `━━━━━━━━━━━━━━\n` +
                  `📦 *Mahsulotlar:*\n${orderDetails}\n` +
                  `━━━━━━━━━━━━━━\n` +
                  `💰 *JAMI:* ${totalSum.toLocaleString()} so'm` + 
                  giftMessage;

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
            alert(`Rahmat! Buyurtmangiz qabul qilindi. Bu sizning ${orderHistoryCount}-buyurtmangiz. ✅`);
            cart = [];
            syncStorage();
            closeCart();
            renderCart();
        } else {
            alert("Xatolik yuz berdi. Iltimos qaytadan urinib ko'ring.");
        }
    } catch (error) {
        alert("Internet aloqasini tekshiring!");
    }
}
