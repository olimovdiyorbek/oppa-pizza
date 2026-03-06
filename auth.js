import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCRkhvyKav1040Y1mxNHwze9cen7Iexb5k",
    authDomain: "oppa-pizza-42a19.firebaseapp.com",
    projectId: "oppa-pizza-42a19",
    storageBucket: "oppa-pizza-42a19.firebasestorage.app",
    messagingSenderId: "331899141018",
    appId: "1:331899141018:web:740411706691763750f0c0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'uz'; // SMS tilini o'zbekcha qilish

let confirmationResult;

// 1. Sahifa yuklanganda foydalanuvchini tekshirish
window.onload = () => {
    const savedUser = localStorage.getItem("oppa_user");
    if (savedUser) {
        showMenu();
    }
};

// 2. SMS yuborish funksiyasi
window.sendSMSCode = async function() {
    const name = document.getElementById("auth-name").value.trim();
    const phone = document.getElementById("auth-phone").value.trim().replace(/\s/g, "");

    if (!name || phone.length < 12) {
        alert("Ism va telefon raqamni to'liq kiriting!");
        return;
    }

    try {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            'size': 'invisible'
        });

        const result = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
        confirmationResult = result;
        
        // UI-ni o'zgartirish
        document.getElementById("login-step-1").style.display = "none";
        document.getElementById("login-step-2").style.display = "block";
        document.getElementById("sent-number-text").innerText = `${phone} raqamiga kod yuborildi`;
    } catch (error) {
        alert("Xatolik: " + error.message);
        console.error(error);
    }
};

// 3. Kodni tasdiqlash
window.verifyCode = async function() {
    const code = document.getElementById("auth-code").value;
    const name = document.getElementById("auth-name").value;

    try {
        const result = await confirmationResult.confirm(code);
        const user = result.user;

        // Foydalanuvchini saqlash
        const userData = {
            uid: user.uid,
            name: name,
            phone: user.phoneNumber
        };
        localStorage.setItem("oppa_user", JSON.stringify(userData));
        
        alert("Muvaffaqiyatli kirdingiz! 🍕");
        showMenu();
    } catch (error) {
        alert("Kod noto'g'ri yoki muddati o'tgan!");
    }
};

function showMenu() {
    document.getElementById("auth-screen").style.display = "none";
    document.getElementById("main-app").style.display = "block";
    
    // Savat kodingizdagi ism va telni avto-to'ldirish
    const user = JSON.parse(localStorage.getItem("oppa_user"));
    if(document.getElementById('user-name')) document.getElementById('user-name').value = user.name;
    if(document.getElementById('user-phone')) document.getElementById('user-phone').value = user.phone;
}
