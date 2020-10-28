window.onload = loadJson;
var checked = false;
var jsonData;
let index = 0;
let numofQns;
let score = 0;

function checkAns(event, answer) {
  event.preventDefault();
  let userAns = document.getElementById("answer").value;
  if (userAns.length == 0) return
  let isTrue = false;

  if (!checked) {
    userAns = userAns.toLowerCase();
    answer = answer.toLowerCase();
    if (answer === userAns) {
      isTrue = true;
      let prevScore = parseInt(document.getElementById("score").textContent);
      document.getElementById("score").textContent = prevScore + 1;
      document.getElementById("input").innerHTML = ``;
      checked = true;
      score = prevScore + 1;
    } 

    let p = document.createElement("p");
    p.textContent = isTrue ? "You did it" : "!!! Wrong Answer !!!";
    document.getElementById("showResult").appendChild(p);
    let nextBtn = document.createElement("button");
    nextBtn.setAttribute("id", "next");
    nextBtn.textContent = "Next";
    document.getElementById("showResult").appendChild(nextBtn);
    document.getElementById("next").addEventListener("click", loadNextForm);
    document.getElementById("input").innerHTML = '';
  }
}

function loadNextForm(e) {
  e.preventDefault();
  checked = false;
  document.getElementById("showResult").innerHTML = "";
  numofQns = jsonData.length - 1; // count from zero 
  loadForm(jsonData);
}

function loadForm(jsonData) {
  if (index == numofQns)
  {
    document.querySelector(".wrapper").innerHTML = `<p style="font-size: 50px; font-weight: 1000;">Your socre is ${score}</p>`
  }
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
  index += 1;
}

async function loadJson() {
  await fetch("http://127.0.0.1:5000/api/quiz")
    .then((response) => response.json())
    .then((data) => {
      jsonData = data;
    })
    .catch((err) => console.log(err));
  loadForm(jsonData);
}
