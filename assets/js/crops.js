const cropsData = JSON.parse(crops)[0];
console.log(cropsData);
// function generatePlot();
function getCol() {
  return Math.random() * 256;
}

function getTrace(x, y, name, text) {
  let trace = {
    x: x,
    y: y,
    mode: 'line',
    name: name,
    text: text,
    marker: {
      color: `rgb(${getCol()},${getCol()},${getCol()})`,
      size: 12,
      line: {
        color: 'white',
        width: '0.5'
      }
    },
    type: 'scatter'
  };

  return trace;
}

function getLayout(title, yaxis) {
  let layout = {
    title: title,
    xaxis: {
      title: 'year',
      showgrid: false,
      zeroline: false
    },
    yaxis: {
      title: yaxis,
      showline: false
    }
  };
  return layout;
}

function showCrops(state, district, crops) {
  document.getElementById("all-crops").innerHTML = "";
  var allCropsArea = document.getElementById("all-crops");
  // console.log(crops);
  for (index in crops) {
    crop = crops[index];
    var btn = document.createElement("BUTTON");
    btn.type = "button";
    btn.className = "btn btn-outline-success cropbtn";
    btn.innerHTML = crop;
    btn.onclick = (function () {
      return function (e) {
        const cropName = e.target.textContent;
        // console.log(state,district,crop);
        // document.getElementById("district-name").textContent=district;
        getSpecificCrop(state, district, cropName);
      }
    })();
    allCropsArea.appendChild(btn);
  }
}

function getCrops(state, district) {
  const cropList = cropsData[state][district.toUpperCase()];
  // console.log(state, district, cropList);
  // generatePlot(cropList, state, district);
  let crops = {};
  for (cropName in cropList) {
    crops[cropName] = 1;
  }
  // crops = Object.keys()
  // console.log(crops);
  // console.log(Object.keys(crops));
  showCrops(state, district, Object.keys(crops));
}

function getSpecificCrop(state, district, crop) {
  // crop = crop.toString();
  const cropList = cropsData[state][district.toUpperCase()][crop];
  let cropListObj = {};
  cropListObj[crop] = cropList;
  document.getElementById("crop-name").innerHTML = crop;
  document.getElementById("state-name").innerHTML = `${district}, <i>${state}</i>`;
  generatePlot(cropListObj, state, district);
}

function generatePlot(cropList, state, district) {
  let prodTraces = [], areaTraces = [], prodPerAreaTraces = [];
  // let areaTraces = [];
  // let years = [];
  // console.log(cropList);
  for (cropName in cropList) {
    crop = cropList[cropName];
    // year=crop[0];
    // area = crop[2];
    // prod = crop[3];
    // if(!years.includes(year)) {
    //   years.push(year);
    // }
    let areaTrace = [], years = [], prods = [],
      areas = [], seasons = [], prodPerArea = [];
    crop.forEach(i => {
      year = i[0];
      season = i[1];
      area = i[2];
      prod = i[3];
      years.push(year);
      prods.push(prod);
      areas.push(area);
      prodPerArea.push(prod / area);
      seasons.push(season);
    });
    prodTrace = getTrace(years, prods, cropName, seasons);
    areaTrace = getTrace(years, areas, cropName, seasons);
    prodPerAreaTrace = getTrace(years, prodPerArea, cropName, seasons);
    prodTraces.push(prodTrace);
    areaTraces.push(areaTrace);
    prodPerAreaTraces.push(prodPerAreaTrace);
    // console.log(crop);
  }
  const prodLayout = getLayout(`Production-wise Plot`, "Production");
  const areaLayout = getLayout(`Area-wise Plot`, "Area used for production");
  const prodPerAreaLayout = getLayout(`Production per unit Area`, "Production per unit area");
  Plotly.newPlot('prodDiv', prodTraces, prodLayout);
  Plotly.newPlot('areaDiv', areaTraces, areaLayout);
  Plotly.newPlot('prod-area-div', prodPerAreaTraces, prodPerAreaLayout);
}
