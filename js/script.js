var scriptsLoaded = 0;

document.addEventListener("DOMContentLoaded", function(){
  
  var css = document.createElement("link");
  css.setAttribute("rel", "stylesheet");
  css.setAttribute("href", "css/style.css");	
  //loads the CSS file and applies it to the page
  css.addEventListener("load", loadCount);
  document.querySelector("head").appendChild(css);
  var jq = document.createElement("script");
  jq.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js");
  jq.addEventListener("load", loadCount); 
  document.querySelector("head").appendChild(jq);
    
    
  var buildWidget = function (){
  $.ajax({
        url: "https://api.forecast.io/forecast/8726821408e2ddb59506f9c67810cb5c/45.348391,-75.757045?units=ca",
      
      dataType: "jsonp",
      xhrFields: {
      withCredentials: true
   },
      

}).done(function gotData( weatherData ){
    //The following will create a div at the top of my widget that will display a brief description of today's weather.
      console.log(weatherData);
      var $today = "";
      var today = new Date();
      var date = today.getDate();
      var month = (today.getMonth()) + 1;
      var year = today.getFullYear();
      
      $today += "<h1>Algonquin College</h1>";
      $today +="<p>Today <time>" + date + "-"+ month + "-" + year + "</time></p>";
      $today += "<h2>" + weatherData.hourly.data[0].temperature + "&deg" + "</h2>";
      $today += "<p>" +   weatherData.daily.data[0].summary + "</p>";
      
    //The following will create my table variable and attach data to it.
    var $table = "";
      $table += "<tr><th>Time</th><th>Icon</th><th>Summary</th><th id = 'titleBar'>CloudCover</th><th id = 'titleBar'>Temperature</th><th>Wind Speed</th><th>Humidity</th></tr>"  ;
       
    for(i=0; i < 24; i++){
        var time = new Date((weatherData.hourly.data[i].time) * 1000);
        var hours = time.getHours();
        if (hours === 0) {
            $table += "<tr><td>" + "12am" + "</td>";
        } else if (hours === 12) {
            $table += "<tr><td>" + "12pm" + "</td>";
        } else if (hours > 12) {
            $table += "<tr><td>" + (hours - 12) + "pm" + "</td>";
        } else {
           $table += "<tr><td>" + hours + "am" + "</td>";
        }
    //In the case of the icon, based on the input i want to select which image to diplay, therefore i used switch/case method.
        
                                                                            switch(weatherData.hourly.data[i].icon){
                                                                                case "clear-day":
     $table += "<td><img src ='images/clear-day.png'></img></td>";
     break;

     case "clear-night":
     $table += "<td><img src ='images/clear-night.png'></img></td>";
     break;
                                                                                case "rain":
     $table += "<td><img src = 'images/rain.png'></img></td>";
     break;
                 
      case "snow":
     $table += "<td><img src = 'images/snow.png'></img></td>";
     break;

     case "sleet":
     $table += "<td><img src = 'images/sleet.png'></img></td>";
     break;
                                                                                case "wind":
       $table += "<td><img src = 'images/wind.png'></img></td>";
     break;
                                                                                case "fog":
        $table += "<td><img src = 'images/fog.png'></img></td>";
        break;

                                                                                case "cloudy":
       if(hours > 18){
         $table += "<td><img src = 'images/cloudy-night.png'></img></td>";                                                                                  }else{
         $table += "<td><img src = 'images/cloudy-day.png'></img></td>";          }
     break;

                                                                                case "partly-cloudy-day":
         $table += "<td><img src = 'images/partly-cloudy-day.png'>\
      </img></td>";
                                                                                    break;

                                                                                case "partly-cloudy-night":
         $table += "<td><img src = 'images/partly-cloudy-night.png'>\
      </img></td>";
     break;            

                                                                        }
        //for my time, I need to display it in a more readable format.the forecast api gives the time in seconds. 
       
        
                
        $table += "<td>" + weatherData.hourly.data[i].summary + "</td>";
        $table += "<td>" + weatherData.hourly.data[i].cloudCover + "</td>";
        $table += "<td>" + weatherData.hourly.data[i].temperature + "&deg" + "</td>";
        $table += "<td>" + weatherData.hourly.data[i].windSpeed + "</td>";
        $table += "<td>" + weatherData.hourly.data[i].humidity + "</td></tr>";
        
    }  
      
     
      $(".weather-forecast").append("<div class = 'container'><div class = 'today'>" + $today + "</div>" + "<div class = 'table'><table>" + $table + "</table></div></div>");
     
      
    });

  }

function loadCount(){
  scriptsLoaded++;
    if(scriptsLoaded === 2){
      buildWidget(".mywidget");
      console.log("both scripts loaded");
    }
}
    
    });