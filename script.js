function calculateLove() {
  const name1 = document.getElementById("name1").value.trim().toLowerCase();
  const name2 = document.getElementById("name2").value.trim().toLowerCase();
  const result = document.getElementById("result");

  if (name1 === "" || name2 === "") {
    result.innerText = "Please enter both names 😅";
    return;
  }

  // Special love conditions (Always 100%)
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
    percentage = Math.floor(Math.random() * 21) + 80; // 80 to 100%

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

  result.innerHTML = `
    ${capitalize(name1)} ❤️ ${capitalize(name2)} = <br>
    <span style="font-size: 30px;">${percentage}%</span><br>
    ${message}
  `;

  // Send data to Google Sheets
  fetch("https://script.google.com/macros/s/AKfycbzM4175sHET1QhwIPpm8ep58sjvhZqzV8OT0hh0QPDBTGB13h_sUcpE5upSmA5bhoL5/exec", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name1: capitalize(name1),
      name2: capitalize(name2),
      percentage: percentage,
    }),
  })
  .then(response => response.text())
  .then(data => console.log("Data sent to Google Sheets:", data))
  .catch(error => console.error("Error sending to Google Sheets:", error));
}

function capitalize(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}
