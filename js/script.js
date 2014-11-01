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
      $today += "<table ><tr id = 'titleBar'><th>icon</th><th>Time</th><th>Summary</th><th>CloudCover</th><th>Temperature</th><th>WindSpeed</th><th>Humidity</th></tr></table>"  ;
      
      $(".weather-forecast").append("<div class = 'today'>" + $today + "</div>");
      
      
      
      
    //The following will create my table variable and attach data to it.
    var $table = "";
    var len = weatherData.hourly.data.length; 
    for(i=0; i < len; i++){
    //In the case of the icon, based on the input i want to select which image to diplay, therefore i used switch/case method.
        
        switch( weatherData.hourly.data[i].icon){
            case "clear-day":$table += "<tr><td><img src =\
                       'images/clear-day.png'>\
                       </img></td>";
                break;
            
            case "clear-night":$table += "<tr><td><img src =\
                       'images/clear-night.png'>\
                       </img></td>";
                break;
                
            case "rain":$table += "<tr><td><img src = 'images/rain.png'>\
                       </img></td>";
                break;
                
            case "snow":$table += "<tr><td><img src = 'images/snow.png'>\
                       </img></td>";
                break;
                
             case "sleet":$table += "<tr><td><img src = 'images/sleet.png'>\
                       </img></td>";
                break;
            
            case "wind":$table += "<tr><td><img src = 'images/wind.png'>\
                       </img></td>";
                break;
                
            case "fog":$table += "<tr><td><img src = 'images/fog.png'>\
                       </img></td>";
                break;
                
            case "cloudy":
                $table += "<tr><td><img src = 'images/cloudy-day.png'>\
                        </img></td>";
                break;
            
            case "partly-cloudy-day":
                $table += "<tr><td><img src = 'images/partly-cloudy-day.png'>\
                        </img></td>";
                break;
        
            case "partly-cloudy-night":
                $table += "<tr><td><img src = 'images/partly-cloudy-night.png'>\
                       </img></td>";
                break;            
        
    }
        //for my time, I need to display it in a more readable format.the forecast api gives the time in seconds. need to convert it into milliseconds so i can parse it.
//        var timeInMs = (weatherData.hourly.data[i].time) * 1000;
//        function millisecondsToStr (milliseconds) {
//            function numberEnding (number) {
//                return (number > 1) ? 's' : '';
//            }
//
//            var temp = Math.floor(timeInMs / 1000);
//            var hours = Math.floor((temp %= 86400) / 3600);
//            if (hours) {
//                return hours + ' hour' + numberEnding(hours);
//            }
//            var minutes = Math.floor((temp %= 3600) / 60);
//            if (minutes) {
//                return minutes + ' minute' + numberEnding(minutes);
//            }
//            var seconds = temp % 60;
//            if (seconds) {
//                return seconds + ' second' + numberEnding(seconds);
//            }
//            return 'less than a second'; 
//            console.log(millisecondsToStr)
//}
        
        $table += "<td>"+ weatherData.hourly.data[i].time + "</td>";
        $table += "<td>" + weatherData.hourly.data[i].summary + "</td>";
        $table += "<td>" + weatherData.hourly.data[i].cloudCover + "</td>";
        $table += "<td>" + weatherData.hourly.data[i].temperature + "&deg" + "</td>";
        $table += "<td>" + weatherData.hourly.data[i].windSpeed + "</td>";
        $table += "<td>" + weatherData.hourly.data[i].humidity + "</td></tr>";
        
        
        
    }  
      
      $(".weather-forecast").append("<div class = 'table'><table>" + $table + "</table></div>");
      
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