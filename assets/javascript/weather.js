    /*Description:
    used two api URl for weather information: one for current and one for forecast.
    On starting page, gets the user geo location and thus obtained latittude and longitude which is 
    used by another api (google api) to get the name of location and passed to weather api url.
    Api used from: Weather UnderGround API
    Used two url: One for current weather condition and another for forecast.    
    http://api.wunderground.com/api/{key}/forecast/q/"+city+".json"
    http://api.wunderground.com/api/{key}/conditions/q/"+city+".json
    
    The response gives difference parameters of current weather information and forecast. We have used icons,
    short description about present condition, some parameters and forecast for three phases (day-night-next day or night-nextday-next night)
    The main problem was to pass the city format to the url and fixed input area in the format that is accepted by API url.
    */


function getCity(city) {
   // var city = "nc/cary";

    //API for wether forecast, use one of the below two api key
    //var queryURL = "https://api.wunderground.com/api/87d18b0282c9396c/forecast/q/"+city+".json"; 
    var queryURL = "http://api.apixu.com/v1/forecast.json?key=4a55707a9d6e4ecaa35141243190605&q="+city;

    $.ajax({
        url: queryURL,
        method: "GET"
        })
        
        .then (function(response) {
            //console.log(response.forecast.txt_forecast.date);
            if (response) {
               

                    //console.log(queryURL);
                    //console.log(response);
                   // console.log(response.forecast.forecastday[0].day.condition.icon);
                    var x = document.createElement("IMG");
                    x.setAttribute("src", ("https:"+response.forecast.forecastday[0].day.condition.icon));
                    x.setAttribute("width", "70");
                    x.setAttribute("height", "auto");
                    x.setAttribute("alt", "Icon");            
                    //console.log(x);
                    $("#duration1").html(response.forecast.forecastday[0].date);
                    $("#forecat_first").html(x);
                    $("#forecat_first_description").html( response.forecast.forecastday[0].day.avgtemp_c+": "+response.forecast.forecastday[0].day.condition.text);
                    
                    var y = document.createElement("IMG");
                    y.setAttribute("src", response.forecast.txt_forecast.forecastday[1].icon_url);
                    y.setAttribute("width", "70");
                    y.setAttribute("height", "auto");
                    y.setAttribute("alt", "The Pulpit Rock");       
                    console.log(y);
                    $("#duration2").html(response.forecast.txt_forecast.forecastday[1].title);
                    $("#forecat_second").html(y);
                    $("#forecat_second_description").html(response.forecast.txt_forecast.forecastday[1].fcttext);
                    
                    var z = document.createElement("IMG");
                    z.setAttribute("src", response.forecast.txt_forecast.forecastday[2].icon_url);
                    z.setAttribute("width", "70");
                    z.setAttribute("height", "auto");
                    z.setAttribute("alt", "The Pulpit Rock");       
                    console.log(z);
                    $("#duration3").html(response.forecast.txt_forecast.forecastday[2].title);
                    $("#forecat_third").html(z);
                    $("#forecat_third_description").html(response.forecast.txt_forecast.forecastday[2].fcttext);
            }else{
                
                    $("#duration1").text("");
                    $("#forecat_first").text("");
                    $("#forecat_first_description").text("");
                    $("#duration2").text("");
                    $("#forecat_second").text("");
                    $("#forecat_second_description").text("");
                    $("#duration3").text("");
                    $("#forecat_third").text("");
                    $("#forecat_third_description").text("");
            }
        });
        
    //API url (use one of the two.)
    //var queryURL2 = "https://api.wunderground.com/api/87d18b0282c9396c/conditions/q/"+city+".json"
    var queryURL2 = "http://api.apixu.com/v1/forecast.json?key=4a55707a9d6e4ecaa35141243190605&q="+city;
    console.log(queryURL2);

    $.ajax({
        url: queryURL2,
        method: "GET"
        })
        
        .then (function(response) {
            if (response) {
               
                    console.log(response);
                
                    var x = document.createElement("IMG");
                    x.setAttribute("src", ("https:"+response.current.condition.icon));
                    x.setAttribute("width", "70");
                    x.setAttribute("height", "auto");
                    x.setAttribute("alt", "The Pulpit Rock");        
                    console.log(x);        
                    $("#current_condition").html(response.current.condition.text); 
                    $("#current_img").html(x);
                    $("#current_data").html("<p>Temperature: "+response.current.temp_c + " C</p></br>"+                                           
                                            "<p>Precipitation today (mm): "+response.current.precip_mm+ "</p></br>");
                    $("#current_data2").html("<p>Relative Humidity: "+response.current.humidity + "</p></br>"+
                                            "<p>Wind: "+response.current.wind_kph + " kph</p></br>"+
                                            "<p>Visibility: "+response.current.vis_km + " Km</p></br>"+
                                    "<p>Atmospheric Pressure (mb): "+response.current.pressure_mb+ "</p></br>");
            } else {
                $("#current_condition").text("Cannot get the Weather information. Please re-enter City and State. If you still can not get weather information, please try with different name or nearby city"); 
                $("#current_img").text("");
                $("#current_data").text("");
                $("#current_data2").text("");
                
            }

        });
};

$("#searchbtn").click(function(event){
    event.preventDefault();
    
    state2= $("#stateInput").val().trim();
    place= $("#cityInput").val().trim();
    city = state2+"/"+place;
    console.log(city);
    getCity(city);
    
   
});

function getLocation() {
   
        navigator.geolocation.getCurrentPosition(showPosition);        
}
 

function showPosition(position) {
    var getLatitude = position.coords.latitude;
    var getLongitude = position.coords.longitude;
    //console.log(getLatitude);
   // console.log(getLongitude);
    var apiCode = "AIzaSyBxbpX0AuckHtRbiG6fA8EFQoX6WDeZYFk";
    //var queryURL1 = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + getLatitude+"," + getLongitude+ "&sensor=true";
    var queryURL1 = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + getLatitude + "," + getLongitude + "&key=" + apiCode;
   
    console.log(queryURL1);
    $.ajax({
    url: queryURL1,
    method: "GET"
    })
    
        .then (function(response) {
            response.results[0].address_components.forEach(function(data1){
                    data1.types.forEach(function(data2){
                        if(data2 ==="locality"){
                            cityName=data1.long_name;
           
                        }
                        if(data2=== "administrative_area_level_1"){
                            state=data1.long_name;
           
                        }
                        if(data2=== "country"){
                            country=data1.long_name;
           
                        }
                    })
          
            });
        console.log(country);
        if(country !="United States"){
            state=country;
        }
        //console.log(response.results[0].address_components[5].long_name);
        //console.log(response.results[0].address_components[2].long_name);
        //console.log(response.results[0].address_components[6].long_name);
       // console.log(response.results[0].address_components[3].long_name);
      //  state=response.results[0].address_components[5].long_name;
        //cityName=response.results[0].address_components[2].long_name;
        var city= state+"/"+cityName;
        $("#userLocation").html(cityName +", " +state);
        getCity(city);
        });
        
}

$( document ).ready(function() {

    if (navigator.geolocation) {
         getLocation();
      //   getCity();
    }
    else {
        console.log("not available");
    
    }     

});

