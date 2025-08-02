function calculateLove() {
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

  // ✅ Save to Firebase
  firebase.database().ref("loveEntries").push({
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
}
