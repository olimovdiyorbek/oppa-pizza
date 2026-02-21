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

const ADMIN_PASSWORD = "pitsa2026";

function checkAccess() {
    if (sessionStorage.getItem("admin_logged_in") !== "true") {
        const userPass = prompt("Admin panelga kirish uchun parolni kiriting:");
        if (userPass === ADMIN_PASSWORD) {
            sessionStorage.setItem("admin_logged_in", "true");
            loadOrdersFromFirebase();
        } else {
            alert("Xato parol!");
            window.location.href = "index.html";
        }
    } else {
        loadOrdersFromFirebase();
    }
}

function loadOrdersFromFirebase() {
    const ordersRef = ref(db, 'orders');
    const tableBody = document.querySelector("#orders-table tbody") || document.querySelector("table tbody");
    const totalDisplay = document.querySelector(".btn-success") || document.querySelector("#total-revenue");

    onValue(ordersRef, (snapshot) => {
        if (!tableBody) return;
        tableBody.innerHTML = "";
        let totalSum = 0;
        const data = snapshot.val();

        if (data) {
            // Eng yangi buyurtmalarni tepada ko'rsatish uchun reverse qilamiz
            const ordersArray = Object.values(data).reverse();
            
            ordersArray.forEach(order => {
                const numericSum = typeof order.total === 'number' ? order.total : parseInt(order.total.toString().replace(/[^0-9]/g, '')) || 0;
                totalSum += numericSum;

                const row = `
                    <tr>
                        <td>${order.date}</td>
                        <td>${order.customer}<br><small>${order.phone}</small></td>
                        <td>${order.orderDetails}</td>
                        <td>${numericSum.toLocaleString()} so'm</td>
                    </tr>`;
                tableBody.insertAdjacentHTML('beforeend', row);
            });
            if (totalDisplay) totalDisplay.textContent = `Umumiy tushum: ${totalSum.toLocaleString()} so'm`;
        } else {
            tableBody.innerHTML = "<tr><td colspan='4' style='text-align:center;'>Hozircha buyurtmalar yo'q</td></tr>";
            if (totalDisplay) totalDisplay.textContent = `Umumiy tushum: 0 so'm`;
        }
    });
}

window.clearHistory = function() {
    if (confirm("Haqiqatan ham barcha buyurtmalarni bazadan o'chirmoqchimisiz?")) {
        remove(ref(db, 'orders'))
            .then(() => alert("Baza tozalandi!"))
            .catch((e) => alert("Xato: " + e.message));
    }
}

window.onload = checkAccess;
