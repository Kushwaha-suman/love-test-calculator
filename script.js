// Import Firebase modules (using ES module imports)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Your Firebase project config (replace with your real config)
const firebaseConfig = {
  apiKey: "AIzaSyCtl2aFE4QJHuBKkx7p9FtNexp1oafvhGs",
  authDomain: "lovecalculator-a8a4b.firebaseapp.com",
  databaseURL: "https://lovecalculator-a8a4b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "lovecalculator-a8a4b",
  storageBucket: "lovecalculator-a8a4b.appspot.com",
  messagingSenderId: "106250601241",
  appId: "1:106250601241:web:02de7abb7613dc7aef7b88",
  measurementId: "G-3HCYNEQD2V"
};

// Initialize Firebase app and database
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

window.calculateLove = function () {
  const name1 = document.getElementById("name1").value.trim().toLowerCase();
  const name2 = document.getElementById("name2").value.trim().toLowerCase();
  const result = document.getElementById("result");
  const button = document.querySelector("button");

  if (name1 === "" || name2 === "") {
    result.innerText = "Please enter both names 😅";
    return;
  }

  const specialPairs = [
    ["suman", "aditi"],
    ["aditi", "suman"],
    ["suman", "khushi"],
    ["khushi", "suman"]
  ];

  const isSpecial = specialPairs.some(([a, b]) => name1 === a && name2 === b);

  let percentage, message;

  if (isSpecial) {
    percentage = 100;
    message = `
      ❤️ You two are destined to be together forever.<br>
      💫 True Eternal Love that the universe itself admires. 💫
    `;
  } else {
    percentage = Math.floor(Math.random() * 21) + 80;

    if (percentage > 95) {
      message = "💖 You’re made for each other 💖";
    } else if (percentage > 90) {
      message = "💘 Deep Romantic Vibes 💘";
    } else if (percentage > 85) {
      message = "💕 Strong Love Connection 💕";
    } else {
      message = "❤️ Sweet Love is in the Air ❤️";
    }
  }

  function capitalize(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  const displayName1 = capitalize(name1);
  const displayName2 = capitalize(name2);

  result.innerHTML = `
    ${displayName1} ❤️ ${displayName2} = <br>
    <span style="font-size: 30px;">${percentage}%</span><br>
    ${message}
  `;

  button.disabled = true;

  // Save to Firebase Realtime Database
  push(ref(database, 'loveEntries'), {
    name1: displayName1,
    name2: displayName2,
    percentage: percentage,
    timestamp: new Date().toISOString()
  }).then(() => {
    console.log("Saved to Firebase");
    button.disabled = false;
  }).catch(error => {
    console.error("Firebase error:", error);
    result.innerHTML += `<br><small style="color:red;">Failed to save data 😢</small>`;
    button.disabled = false;
  });
};
