// 1. Importlar (To'g'ri)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Firebase konfiguratsiyasi (Sizning rasmingizdan olingan haqiqiy ma'lumotlar)
const firebaseConfig = {
    apiKey: "AIzaSyCRkhvyKav1O40Y1mxNHwze9cen7Iexb5k",
    authDomain: "oppa-pizza-42a19.firebaseapp.com",
    projectId: "oppa-pizza-42a19",
    storageBucket: "oppa-pizza-42a19.firebasestorage.app",
    messagingSenderId: "127790906548",
    appId: "1:127790906548:web:d5cb5eee9d8d1efe53ebe1"
};

// Firebase ni ishga tushirish
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'uz'; 

let confirmationResult;

// 1. Sahifa yuklanganda foydalanuvchini tekshirish
window.addEventListener('load', () => {
    const savedUser = localStorage.getItem("oppa_user");
    if (savedUser) {
        showMenu();
    }
});

// 2. SMS yuborish funksiyasi
window.sendSMSCode = async function() {
    const nameInput = document.getElementById("auth-name");
    const phoneInput = document.getElementById("auth-phone");

    if (!nameInput || !phoneInput) return;

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim().replace(/\s/g, "");

    if (!name || phone.length < 12) {
        alert("Ism va telefon raqamni to'liq kiriting (masalan: +998901234567)!");
        return;
    }

    try {
        const recaptchaContainer = document.getElementById('recaptcha-container');
        if (!recaptchaContainer) {
            alert("Xatolik: recaptcha-container topilmadi!");
            return;
        }

        // Eski verifier bo'lsa tozalash
        if (window.recaptchaVerifier) {
            window.recaptchaVerifier.clear();
        }

        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            'size': 'invisible'
        });

        const result = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
        confirmationResult = result;
        
        document.getElementById("login-step-1").style.display = "none";
        document.getElementById("login-step-2").style.display = "block";
        document.getElementById("sent-number-text").innerText = `${phone} raqamiga kod yuborildi`;
    } catch (error) {
        // auth/operation-not-allowed xatosi chiqsa, Test raqamidan foydalanishni eslatamiz
        alert("Xatolik: " + error.message);
        console.error(error);
    }
};

// 3. Kodni tasdiqlash
window.verifyCode = async function() {
    const codeInput = document.getElementById("auth-code");
    const nameInput = document.getElementById("auth-name");

    if (!codeInput || !confirmationResult) {
        alert("Avval SMS kodini yuboring!");
        return;
    }

    try {
        const result = await confirmationResult.confirm(codeInput.value);
        const user = result.user;

        const userData = {
            uid: user.uid,
            name: nameInput.value,
            phone: user.phoneNumber
        };
        localStorage.setItem("oppa_user", JSON.stringify(userData));
        
        alert("Muvaffaqiyatli kirdingiz! 🍕");
        showMenu();
    } catch (error) {
        alert("Kod noto'g'ri yoki muddati o'tgan!");
    }
};

// 4. Menyuni ko'rsatish
function showMenu() {
    const authScreen = document.getElementById("auth-screen");
    const mainApp = document.getElementById("main-app");
    
    if (authScreen) authScreen.style.display = "none";
    if (mainApp) mainApp.style.display = "block";
    
    const savedData = localStorage.getItem("oppa_user");
    if(savedData) {
        const user = JSON.parse(savedData);
        const userNameEl = document.getElementById('user-name');
        const userPhoneEl = document.getElementById('user-phone');
        if(userNameEl) userNameEl.value = user.name;
        if(userPhoneEl) userPhoneEl.value = user.phone;
    }
}
