let sec1 = document.getElementById("search-section");
let sec2 = document.getElementById("list-section");
let select = document.getElementById("region");
let input = document.getElementById("searchTxt");
let total = document.getElementById("total");
let countriesData = [];
let filteredCountriesData = [];

fillData();

function fillData() {
  fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((data) => {
      countriesData = [...data];
      drawHTML();
      fillRegion();
    })
    .catch((err) => console.log(err));
}

function drawHTML(filteredData) {
  let row = "";
  sec2.innerHTML = "";

  if (countriesData.length == 0) {
    console.log("data hooson bna");
  }
  (filteredData
    ? filteredData.length == 0
      ? []
      : filteredData
    : countriesData
  ).map((country) => {
    row += `<div class="col"> 
  <a href="./country.html?countryname='${country.name.common}'&region=${country.region}">
    <h6> ${country.name.common}</h6>
  </a>
  <span class="txt">Хүн амын тоо ${country.population}</span><br/>
  <span class="txt">Газар нутгийн хэмжээ ${country.area}</span>
</div>`;
  });

  total.innerHTML = filteredData ? filteredData.length : countriesData.length;
  sec2.innerHTML = row;
}

function fillRegion() {
  let arrRegion = [];
  countriesData.map((c) => {
    if (!arrRegion.includes(c.region)) {
      arrRegion.push(c.region);
    }
  });
  for (let i = 0; i < arrRegion.length; i++) {
    select.innerHTML += `<option value="${arrRegion[i]}">${arrRegion[i]}</option>`;
  }
}

select.addEventListener("change", (event) => {
  let newCountryArr = countriesData.filter((co) => {
    if (input.value.length > 0) {
      return (
        co.region == event.target.value && co.name.common.includes(input.value)
      );
    } else {
      return co.region == event.target.value;
    }
  });
  drawHTML(newCountryArr);
});

input.addEventListener("input", (e) => {
  let newCountryArr = countriesData.filter((co) => {
    if (select.value != "0") {
      return (
        co.name.common.includes(e.target.value) == true &&
        co.region == select.value
      );
    } else {
      return co.name.common.includes(e.target.value) == true;
    }
  });
  drawHTML(newCountryArr);
});

function sort(parameter) {
  let sortEl = document.getElementById("sort");

  if (sortEl.innerHTML[sortEl.innerHTML.length - 1] == "↑") {
    sortEl.innerHTML = sortEl.innerHTML.replace("↑", "↓");
    if (parameter == "name") {
      countriesData.sort((a, b) =>
        a.name.common == b.name.common
          ? 0
          : a.name.common > b.name.common
          ? -1
          : 1
      );
    } else if (parameter == "population") {
      countriesData.sort((a, b) => b.population - a.population);
    } else {
      countriesData.sort((a, b) => b.area - a.area);
    }
  } else {
    sortEl.innerHTML = sortEl.innerHTML.replace("↓", "↑");

    if (parameter == "name") {
      countriesData.sort((a, b) =>
        a.name.common == b.name.common
          ? 0
          : a.name.common > b.name.common
          ? 1
          : -1
      );
    } else if (parameter == "population") {
      countriesData.sort((a, b) => a.population - b.population);
    } else {
      countriesData.sort((a, b) => a.area - b.area);
    }
  }

  drawHTML();
}

function group(a) {
  console.log(a);
}