// 1. Firebase modullarini import qilish (index.html da script type="module" bo'lishi shart)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, onValue, remove } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Firebase konfiguratsiyasi
const firebaseConfig = {
    apiKey: "AIzaSyCRkhvyKav1040Y1mxNHwze9cen7Iexb5k",
    authDomain: "oppa-pizza-42a19.firebaseapp.com",
    projectId: "oppa-pizza-42a19",
    storageBucket: "oppa-pizza-42a19.firebasestorage.app",
    messagingSenderId: "331899141018",
    appId: "1:331899141018:web:740411706691763750f0c0",
    databaseURL: "https://oppa-pizza-42a19-default-rtdb.firebaseio.com"
};

// Firebase-ni ishga tushirish
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const ADMIN_PASSWORD = "olimovdiyorbekrealcoder";

// Kirish huquqini tekshirish
function checkAccess() {
    if (sessionStorage.getItem("admin_logged_in") !== "true") {
        const userPass = prompt("Admin panelga kirish uchun parolni kiriting:");
        if (userPass === ADMIN_PASSWORD) {
            sessionStorage.setItem("admin_logged_in", "true");
            showPanel();
        } else {
            alert("Xato parol!");
            window.location.href = "index.html"; // Bosh sahifaga qaytarish
        }
    } else {
        showPanel();
    }
}

// Panelni ko'rsatish
function showPanel() {
    const container = document.getElementById("admin-main-container");
    if (container) {
        container.style.display = "block";
        loadOrdersFromFirebase();
    }
}

// Buyurtmalarni Firebase'dan yuklash
function loadOrdersFromFirebase() {
    const ordersRef = ref(db, 'orders');
    const tableBody = document.querySelector("#orders-table tbody");
    const totalDisplay = document.getElementById("total-revenue-box");

    if (!tableBody || !totalDisplay) return;

    onValue(ordersRef, (snapshot) => {
        tableBody.innerHTML = "";
        let totalSum = 0;
        const data = snapshot.val();

        if (data) {
            // Firebase obyektini massivga aylantirish va ID larni saqlab qolish
            const ordersArray = Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            }));

            // Sanasi bo'yicha teskari tartiblash (eng yangilari tepada)
            ordersArray.sort((a, b) => new Date(b.date) - new Date(a.date));
            
            ordersArray.forEach(order => {
                // Summani hisoblash (tekst yoki raqam bo'lishidan qat'iy nazar)
                const numericSum = typeof order.total === 'number' ? 
                    order.total : 
                    parseInt(order.total?.toString().replace(/[^0-9]/g, '')) || 0;
                
                totalSum += numericSum;

                // Mahsulotlar ro'yxati
                let itemsList = "";
                if (Array.isArray(order.items)) {
                    itemsList = order.items.map(i => `${i.name} (${i.quantity})`).join(', ');
                } else {
                    itemsList = order.orderDetails || "Ma'lumot yo'q";
                }

                const row = `
                    <tr>
                        <td>${order.date || 'Noma\'lum'}</td>
                        <td>
                            <strong>${order.customer || 'Mijoz'}</strong><br>
                            <small>${order.phone || ''}</small>
                        </td>
                        <td>${itemsList}</td>
                        <td><strong>${numericSum.toLocaleString()} so'm</strong></td>
                    </tr>`;
                tableBody.insertAdjacentHTML('beforeend', row);
            });
            totalDisplay.textContent = `Umumiy tushum: ${totalSum.toLocaleString()} so'm`;
        } else {
            tableBody.innerHTML = "<tr><td colspan='4' style='text-align:center;'>Hozircha buyurtmalar yo'q</td></tr>";
            totalDisplay.textContent = `Umumiy tushum: 0 so'm`;
        }
    }, (error) => {
        console.error("Firebase o'qishda xatolik:", error);
    });
}

// Tarixni tozalash tugmasi
const clearBtn = document.getElementById('clear-history-btn');
if (clearBtn) {
    clearBtn.addEventListener('click', () => {
        if (confirm("DIQQAT! Barcha buyurtmalar butunlay o'chib ketadi. Rozimisiz?")) {
            remove(ref(db, 'orders'))
                .then(() => alert("Baza muvaffaqiyatli tozalandi!"))
                .catch((e) => alert("Xatolik yuz berdi: " + e.message));
        }
    });
}

// Ishga tushirish
checkAccess();
