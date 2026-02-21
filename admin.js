// 1. Admin sozlamalari
const ADMIN_PASSWORD = "pitsa2026"; // O'zingiz xohlagan parolni qo'ying

// 2. Kirishni tekshirish funksiyasi
function checkAccess() {
    // Brauzer sessiyasini tekshiramiz (sahifa yangilanganda qayta so'ramasligi uchun)
    const isAuthorized = sessionStorage.getItem("admin_logged_in");

    if (isAuthorized !== "true") {
        const userPass = prompt("Admin panelga kirish uchun parolni kiriting:");

        if (userPass === ADMIN_PASSWORD) {
            sessionStorage.setItem("admin_logged_in", "true");
            alert("Xush kelibsiz, Admin!");
            renderOrders(); // Parol to'g'ri bo'lsa buyurtmalarni ko'rsatish
        } else {
            alert("Xato parol! Sizda bu sahifaga kirish huquqi yo'q.");
            window.location.href = "index.html"; // Asosiy sahifaga qaytarish
        }
    } else {
        renderOrders(); // Agar allaqachon kirgan bo'lsa, buyurtmalarni chiqarish
    }
}

// 3. Buyurtmalarni ekranga chiqarish (Mavjud kodingizga moslashtiring)
function renderOrders() {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const ordersTable = document.querySelector("#orders-table"); // HTML'dagi jadval ID'si
    
    if (orders.length === 0) {
        console.log("Hozircha buyurtmalar yo'q.");
        return;
    }

    // Bu yerda jadvalni to'ldirish kodi bo'ladi...
    console.log("Buyurtmalar yuklandi:", orders);
}

// 4. Tarixni tozalash funksiyasi
function clearHistory() {
    if (confirm("Haqiqatan ham barcha buyurtmalarni o'chirmoqchimisiz?")) {
        localStorage.removeItem("orders");
        location.reload();
    }
}

// Sahifa yuklanishi bilan ishga tushiramiz
window.onload = checkAccess;
