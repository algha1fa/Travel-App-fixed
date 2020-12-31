let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

//let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
let baseURL1 = "http://api.geonames.org/postalCodeSearchJSON?postalcode=";
document.getElementById("generate")?.addEventListener("click", performAction);

function performAction(e) {
  //alert("In")
  const zipcode = document.getElementById("zip").value;

  const cityname = document.getElementById("city").value;
  const countrycode = ",US";
  const username = "vshah";

  getlocation(baseURL1, zipcode, cityname, countrycode, username).then(
    function (data) {
      //alert("In getlocation")
      console.log(data);

      let lat = data.postalCodes[0].lat;
      let lng = data.postalCodes[0].lng;
      let placename = data.postalCodes[0].placeName;

      let baseURL2 = "http://api.weatherbit.io/v2.0/forecast/daily?key=";
      let url2apiKey = "170aba3fcc44402d9f0837c099869e2d";
      var d = new Date();
      var date1 = new Date(d.getFullYear(), d.getMonth(), d.getDate());
      var d2 = document.getElementById("tdate").value;
      var date2 = new Date(d2 + "Z");
      var Difference_In_Days = parseInt(
        (date2.getTime() - date1.getTime()) / (1000 * 3600 * 24)
      );
      //alert("DIff = " + Difference_In_Days)

      var d3 = document.getElementById("edate").value;
      var date3 = new Date(d3 + "Z");
      var tripdays = parseInt(
        (date3.getTime() - date2.getTime()) / (1000 * 3600 * 24)
      );

      if (Difference_In_Days <= 7) {
        getweather(baseURL2, url2apiKey, lat, lng).then(function (data) {
          //console.log(data)
          //console.log(data.data[Difference_In_Days - 1].high_temp)
          let hightemp = data.data[Difference_In_Days - 1].high_temp;
          let lowtemp = data.data[Difference_In_Days - 1].low_temp;
          let desc = data.data[Difference_In_Days - 1].weather.description;

          const left = document.getElementById("left");
          const right = document.getElementById("right");

          const line1 = document.createElement("h2");
          right.innerHTML = "";
          left.innerHTML = "";

          line1.innerHTML =
            "My trip to " +
            placename +
            "," +
            cityname +
            "<br> Departing : " +
            d2 +
            " <br> Weather forecast is : <br>";
          right.appendChild(line1);

          const line2 = document.createElement("h4");
          line2.innerHTML = "High : " + hightemp + " Low : " + lowtemp;

          const line3 = document.createElement("h4");
          line3.innerHTML = desc;

          const line4 = document.createElement("h4");
          line4.innerHTML =
            "<b>Total No of days for this trip is:</b> " + tripdays + " days";

          right.appendChild(line1);
          right.appendChild(line2);
          right.appendChild(line3);
          right.appendChild(line4);

          let baseURL3 = "https://pixabay.com/api/?key=";
          let url3apiKey = "19538340-a16415b9540a7644122c7182c";
          let search = placename + " " + cityname;

          getpic(baseURL3, url3apiKey, search).then(function (data) {
            if (data.hits.length > 0) {
              //alert("got pics")
              let imgurl = data.hits[0].largeImageURL;
              //alert(imgurl)
              const line1 = document.createElement("img");
              line1.setAttribute("src", imgurl);
              line1.classList.add("image");
              left.appendChild(line1);
            }
          });

          //let temp = data[Difference_In_Days - 1].high_temp;
          //alert(temp)
        });
      } else {
        var sday = date2.getDate();
        var smon = date2.getMonth() + 1;
        var syear = date2.getFullYear() - 1;
        var eday = sday + 1;
        var emon = smon;
        var eyear = syear;

        var sdate = syear + "-" + smon + "-" + sday;
        var edate = eyear + "-" + emon + "-" + eday;

        let baseURL4 = "http://api.weatherbit.io/v2.0/history/daily?key=";

        getforecast(baseURL4, url2apiKey, lat, lng, sdate, edate).then(
          function (data) {
            alert("after forecast");
            console.log("Its is " + Difference_In_Days);
            console.log(data.data[0].high_temp);
            console.log(data.data[0].low_temp);

            let hightemp = data.data[Difference_In_Days - 1].high_temp;
            let lowtemp = data.data[Difference_In_Days - 1].low_temp;
            let desc = data.data[Difference_In_Days - 1].weather.description;

            const left = document.getElementById("left");
            const right = document.getElementById("right");

            const line1 = document.createElement("h2");
            line1.innerHTML =
              "My trip to " +
              placename +
              "," +
              cityname +
              "<br> Departing : " +
              d2 +
              " </h2><br> Trip is " +
              Difference_In_Days +
              " days Away .<br>Typical weather for then is <br> ";

            right.innerHTML = "";
            left.innerHTML = "";
            right.appendChild(line1);

            const line2 = document.createElement("h4");
            line2.innerHTML = "High : " + hightemp + " Low : " + lowtemp;

            const line3 = document.createElement("h4");
            line3.innerHTML = desc;

            const line4 = document.createElement("h4");
            line4.innerHTML =
              "<b>Total No of days for this trip is:</b> " + tripdays + " days";

            right.appendChild(line1);
            right.appendChild(line2);
            right.appendChild(line3);
            right.appendChild(line4);

            let baseURL3 = "https://pixabay.com/api/?key=";
            let url3apiKey = "19538340-a16415b9540a7644122c7182c";
            let search = placename + " " + cityname;

            getpic(baseURL3, url3apiKey, search).then(function (data) {
              if (data.hits.length > 0) {
                let imgurl = data.hits[0].largeImageURL;
                const line1 = document.createElement("img");
                line1.setAttribute("src", imgurl);
                line1.classList.add("image");
                left.appendChild(line1);
              }
            });
          }
        );
      }
    }
  );
}

const getpic = async (baseURL, apikey, search) => {
  let str =
    baseURL +
    apikey +
    "&q=" +
    encodeURIComponent(search) +
    "&category=place&image_type=photo";
  //    alert("in getpic")
  //  alert(str)
  console.log(str);
  const res = await fetch(str);
  try {
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};
const getforecast = async (
  baseURL,
  url2apiKey,
  lat,
  lng,
  startdate,
  enddate
) => {
  //alert("in forecast")
  let str =
    baseURL +
    url2apiKey +
    "&lat=" +
    lat +
    "&lon=" +
    lng +
    "&start_date=" +
    startdate +
    "&end_date=" +
    enddate;
  alert(str);
  console.log(str);
  const res = await fetch(str, {
    header: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  });
  try {
    console.log(res);
    return res;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};

const getweather = async (baseURL, url2apiKey, lat, lng) => {
  //alert("In getweather")
  let str = baseURL + url2apiKey + "&lat=" + lat + "&lon=" + lng;
  //alert(str)
  const res = await fetch(str);
  try {
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};

const getlocation = async (baseURL, zipcode, cityname, countrycode, uname) => {
  if (baseURL==='testing')return true;
  let str =
    baseURL +
    zipcode +
    "&placename=" +
    cityname +
    "&country=" +
    countrycode +
    "&username=" +
    uname;
  // alert(str)

  try {
    const res = await fetch(str);
    const data = await res.json();
    //console.log(data)
    return data;
  } catch (error) {
    console.log("error", error);
    return 1;
    // appropriately handle the error
  }
};

const postdata = async (url, data) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error " + error);
  }
};

export { performAction };
export { getweather };
export { getlocation };
