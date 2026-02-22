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

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const ADMIN_PASSWORD = "olimovdiyorbekrealcoder";

function checkAccess() {
    if (sessionStorage.getItem("admin_logged_in") !== "true") {
        const userPass = prompt("Admin panelga kirish uchun parolni kiriting:");
        if (userPass === ADMIN_PASSWORD) {
            sessionStorage.setItem("admin_logged_in", "true");
            showPanel();
        } else {
            alert("Xato parol!");
            window.location.href = "index.html";
        }
    } else {
        showPanel();
    }
}

function showPanel() {
    document.getElementById("admin-main-container").style.display = "block";
    loadOrdersFromFirebase();
}

function loadOrdersFromFirebase() {
    const ordersRef = ref(db, 'orders');
    const tableBody = document.querySelector("#orders-table tbody");
    const totalDisplay = document.getElementById("total-revenue-box");

    onValue(ordersRef, (snapshot) => {
        tableBody.innerHTML = "";
        let totalSum = 0;
        const data = snapshot.val();

        if (data) {
            // Ma'lumotlarni massivga aylantirib, sanasi bo'yicha teskari tartiblaymiz
            const ordersArray = Object.values(data).reverse();
            
            ordersArray.forEach(order => {
                const numericSum = typeof order.total === 'number' ? order.total : parseInt(order.total.toString().replace(/[^0-9]/g, '')) || 0;
                totalSum += numericSum;

                // Mahsulotlar ro'yxatini shakllantirish (Massiv bo'lsa map qilamiz, aks holda tayyor tekstni chiqaramiz)
                let itemsList = "";
                if (Array.isArray(order.items)) {
                    itemsList = order.items.map(i => `${i.name} (${i.quantity})`).join(', ');
                } else {
                    itemsList = order.orderDetails || "Ma'lumot yo'q";
                }

                const row = `
                    <tr>
                        <td>${order.date || 'Noma'lum'}</td>
                        <td>${order.customer || 'Mijoz'}<br><small>${order.phone || ''}</small></td>
                        <td>${itemsList}</td>
                        <td>${numericSum.toLocaleString()} so'm</td>
                    </tr>`;
                tableBody.insertAdjacentHTML('beforeend', row);
            });
            totalDisplay.textContent = `Umumiy tushum: ${totalSum.toLocaleString()} so'm`;
        } else {
            tableBody.innerHTML = "<tr><td colspan='4' style='text-align:center;'>Hozircha buyurtmalar yo'q</td></tr>";
            totalDisplay.textContent = `Umumiy tushum: 0 so'm`;
        }
    });
}

// Tarixni tozalash tugmasi uchun event listener
document.getElementById('clear-history-btn').addEventListener('click', () => {
    if (confirm("Haqiqatan ham barcha buyurtmalarni bazadan o'chirmoqchimisiz?")) {
        remove(ref(db, 'orders'))
            .then(() => alert("Baza tozalandi!"))
            .catch((e) => alert("Xato: " + e.message));
    }
});

// Sahifa yuklanganda tekshirishni boshlash
checkAccess();
