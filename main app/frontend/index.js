window.onload = loadJson;
var checked = false;
var jsonData;

function checkAns(event, answer) {
  event.preventDefault();
  if (!checked) {
    let userAns = document.getElementById("answer").value;
    userAns = userAns.toLowerCase();
    answer = answer.toLowerCase();
    if (answer === userAns) {
      let prevScore = parseInt(document.getElementById("score").textContent);
      document.getElementById("score").textContent = prevScore + 1;
      document.getElementById("input").innerHTML = ``;
      let p = document.createElement("p");
      p.textContent = "You did it";
      document.getElementById("showResult").appendChild(p);
      let nextBtn = document.createElement("button");
      nextBtn.setAttribute("id", "next");
      nextBtn.textContent = "Next";
      document.getElementById("showResult").appendChild(nextBtn);
      document.getElementById("next").addEventListener("click", loadNextForm);
      checked = true;
    } else console.log("fucking dumb shit");
  }
}

function loadNextForm(e) {
  e.preventDefault();
  checked = false;
  document.getElementById("showResult").innerHTML = "";
  loadForm(jsonData);
}

function loadForm(jsonData) {
  let index = Math.floor(Math.random() * 5);
  let answer = jsonData[index].answer;
  document.getElementById("question").textContent = jsonData[index].question;
  let form = document.createElement("form");
  const input = document.createElement("input");
  input.setAttribute("id", "answer");
  input.setAttribute("type", "text");
  form.appendChild(input);
  document.getElementById("input").appendChild(form);
  let btn = document.createElement("button");
  btn.setAttribute("id", "check");
  btn.textContent = "check";
  let div = document.createElement("div");
  div.setAttribute("id", "submitBtn");
  div.appendChild(btn);
  form.appendChild(div);
  form.addEventListener("submit", (e) => checkAns(e, answer));
}

async function loadJson() {
  await fetch("https://stark-citadel-14131.herokuapp.com/api/quiz")
    .then((response) => response.json())
    .then((data) => {
      jsonData = data;
    })
    .catch((err) => console.log(err));
  loadForm(jsonData);
}
