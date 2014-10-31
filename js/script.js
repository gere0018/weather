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
    console.table(weatherData.hourly.data);
    var $table = $('<table></table>').addClass('forecast'); 
     $table += "<tr><th>icon</th> and <th>Time</th> and <th>Humidity</th> and <th>CloudCover</th> and <th>Temperature</th> and <th>WindSpeed</th> and <th>Summary</th></tr>"  ;
    var len = weatherData.hourly.data.length; 
    for(i=0; i < len; i++){
        switch( weatherData.hourly.data[i].icon){
            case "partly-cloudy-day":
                $table += "<tr><td><img src = 'images/partly-cloudy-day.png'>\
                        </img></td>";
                break;
        
            case "cloudy":
                $table += "<tr><td><img src = 'images/cloudy-day.png'>\
                        </img></td>";
                break;
    
            case "rain":$table += "<tr><td><img src = 'images/rain.png'>\
                       </img></td>";
                break;
            case "partly-cloudy-night":$table += "<tr><td><img src =\
                       'images/partly-cloudy-night.png'>\
                       </img></td>";
                break;
            case "clear-day":$table += "<tr><td><img src =\
                       'images/clear-day.png'>\
                       </img></td>";
                break;
                
                
                
                
                
                
                
        
    }
        $table += "<td>"+ weatherData.hourly.data[i].time + "</td>";
        $table += "<td>" + weatherData.hourly.data[i].humidity + "</td>";
        $table += "<td>" + weatherData.hourly.data[i].cloudCover + "</td>";
        $table += "<td>" + weatherData.hourly.data[i].temperature + "</td>";
        $table += "<td>" + weatherData.hourly.data[i].windSpeed + "</td>";
        $table += "<td>" + weatherData.hourly.data[i].summary + "</td></tr>";
        
    }  
    
      $(".weather-forecast").append($table);
      
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