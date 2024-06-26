let xhr = new XMLHttpRequest();
let btn = document.querySelector("input[type='button']");
let span = document.getElementById("countrydetails");
const countryList = document.getElementById("countryname");
window.addEventListener("load", () => {
  xhr.onreadystatechange = processList;
  let urls = "https://restcountries.com/v2/all";
  xhr.open("GET", urls, true);
  xhr.send(null);
});
function processList() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    let obj = xhr.responseText;
    let result = JSON.parse(obj);
    for (let i = 0; i < result.length; i++) {
      countryList.innerHTML += `<option> ${result[i].name} </option>`;
    }
  }
}

btn.addEventListener("click", () => {
  cname = countryList.value;

  xhr = new XMLHttpRequest();
  xhr.onreadystatechange = countryDetails;
  let urls = "https://restcountries.com/v2/all";
  xhr.open("GET", urls, true);
  xhr.send(null);
});
function countryDetails() {
  if (xhr.readyState == 4 && xhr.status == 200) {
    let obj = xhr.responseText;
    let result = JSON.parse(obj);
    span.innerHTML = "";
    for (let i = 0; i < result.length; i++) {
      if (result[i].name == cname) {
        let flag = result[i].flag;
        let name = result[i].name;
        let region = result[i].region;
        let population = result[i].population;
        let language = result[i].languages[0].name;
        let currencie = result[i].currencies[0].name;

        let countryFlag = document.createElement("img");
        countryFlag.src = flag;
        countryFlag.width = "357";
        countryFlag.height = "150";
        countryFlag.style.objectFit = "cover";
        countryFlag.style.borderTopLeftRadius = "8px";
        countryFlag.style.borderTopRightRadius = "8px";
        countryFlag.style.backgroundColor = "lightblue";

        let countryName = document.createElement("p");
        countryName.innerHTML = ` ${name}`;
        countryName.style.textAlign = "center";
        countryName.style.marginTop = "20px";

        let countryRegion = document.createElement("p");
        countryRegion.innerHTML = ` ${region.toUpperCase()}`;
        countryRegion.style.textAlign = "center";
        countryRegion.style.margin = "25px";
        countryRegion.style.marginTop = "20px";
        countryRegion.style.borderBottom = "3px solid gray";
        countryRegion.style.color = "gray";
        countryRegion.style.paddingBottom = "20px";
        countryRegion.style.fontSize = "25px";
        let countryPopulation = document.createElement("p");
        countryPopulation.innerHTML = ` ${(population / 1000000).toFixed(
          1
        )}  million`;
        countryPopulation.classList.add("active");
        countryPopulation.classList.add("fa-solid", "fa-people-robbery");

        let countryLanguage = document.createElement("p");
        countryLanguage.innerHTML = `   ${language}`;
        countryLanguage.classList.add("fa-solid", "fa-head-side-cough");
        countryLanguage.classList.add("active");

        let countryCurrencie = document.createElement("p");
        countryCurrencie.innerHTML = "   " + currencie;
        countryCurrencie.classList.add("active");
        countryCurrencie.classList.add("fa-solid", "fa-sack-dollar");

        span.appendChild(countryFlag);
        span.appendChild(countryName);
        span.appendChild(countryRegion);
        span.appendChild(countryPopulation);
        span.appendChild(countryLanguage);
        span.appendChild(countryCurrencie);
        span.classList.add("countrydetails");
      }
    }
  } else if (xhr.readyState === 4 && xhr.status !== 200) {
    span.innerHTML =
      "Error! could not get date and time <br> Reason:" + xhr.statusText;
    span.classList.add("error");
  }
}
