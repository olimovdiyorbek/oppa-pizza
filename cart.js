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
    { id: 28, category: 'drinks', name: 'Fanta o.5L', price: 15000, img: 'drink-4.jpg' },
    { id: 29, category: 'drinks', name: 'Srite 0.5L', price: 5000, img: 'drink-5.jpg' },
    { id: 30, category: 'drinks', name: 'Adrinalin 0.5L', price: 18000, img: 'drink-6.jpg' },
    { id: 31, category: 'drinks', name: 'Read bull 0.5L', price: 4000, img: 'drink-7.jpg' },
    { id: 32, category: 'drinks', name: 'Dinay 0.5L', price: 20000, img: 'drink-8.jpg' }
];

// 2. HOLATNI BOSHQARISH
let cart = JSON.parse(localStorage.getItem('oppa_cart')) || [];

window.onload = () => {
    if(localStorage.getItem('user_name')) document.getElementById('user-name').value = localStorage.getItem('user_name');
    if(localStorage.getItem('user_phone')) document.getElementById('user-phone').value = localStorage.getItem('user_phone');
    if(localStorage.getItem('user_address')) {
        const addr = localStorage.getItem('user_address');
        document.getElementById('user-address').value = addr;
        if(document.getElementById('display-address')) document.getElementById('display-address').innerText = addr;
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

// 5. TELEGRAM INTEGRATSIYASI (YANGILANGAN)
async function finishOrder() {
    const BOT_TOKEN = "8539044860:AAF_MNwdQrHUjLsu_aIYnjk8kBmX40-X9aM"; 
    const CHAT_ID = " 6231029845"; 

    const nameInput = document.getElementById('user-name');
    const phoneInput = document.getElementById('user-phone');
    const addressInput = document.getElementById('user-address');

    if (cart.length === 0) return alert("Savat bo'sh!");
    if (!nameInput.value || !phoneInput.value || !addressInput.value) {
        return alert("Iltimos, barcha ma'lumotlarni to'ldiring!");
    }

    const name = nameInput.value;
    const phone = phoneInput.value;
    const address = addressInput.value;
    const payMethodEl = document.querySelector('input[name="pay"]:checked');
    const payMethod = payMethodEl ? payMethodEl.value : "Naqd";

    localStorage.setItem('user_name', name);
    localStorage.setItem('user_phone', phone);
    localStorage.setItem('user_address', address);

    let orderDetails = cart.map((item, i) => `${i+1}. *${item.name}* — ${item.quantity} dona`).join('\n');
    let totalSum = cart.reduce((s, item) => s + (item.price * item.quantity), 0);

    const message = `🚀 *YANGI BUYURTMA!*\n` +
                  `━━━━━━━━━━━━━━\n` +
                  `👤 *Mijoz:* ${name}\n` +
                  `📞 *Tel:* ${phone}\n` +
                  `📍 *Manzil:* ${address}\n` +
                  `💳 *To'lov:* ${payMethod === 'Cash' ? 'Naqd' : 'Karta'}\n` +
                  `━━━━━━━━━━━━━━\n` +
                  `📦 *Mahsulotlar:*\n${orderDetails}\n` +
                  `━━━━━━━━━━━━━━\n` +
                  `💰 *JAMI:* ${totalSum.toLocaleString()} so'm`;

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
            alert("Rahmat! Buyurtmangiz botga yuborildi. ✅");
            cart = [];
            syncStorage();
            closeCart();
            renderCart();
        } else {
            alert("Xatolik: Bot sizga xabar yubora olmayapti. Botga kirib /start tugmasini bosganmisiz?");
        }
    } catch (error) {
        alert("Internet aloqasini tekshiring!");
    }
}

