
var requiredFileCount = 2, currentFileCount = 0;
var buildWidget = function (){
//do Ajax call to api.forecast.io
    console.log("step2");
  $.ajax({
        url: "https://api.forecast.io/forecast/8726821408e2ddb59506f9c67810cb5c/45.348391,-75.757045?units=ca",
      
      dataType: "jsonp",
      xhrFields: {
      withCredentials: true
   },
      

}).done(function gotData( weatherData ){
    console.log(weatherData);
//    var today = new Date();
//    var icon = weatherData.hourly.data[0].icon;
//    console.log(today);
//    var summary = weatherData.hourly.data[0].summary;
//    var $button = $("<button class ='button'>Hourly forecast</button>");
//        $button.css("display", "block");
//    var $today= $('<div></div>').addClass('today');
//        $today.css({backgroundColor: "#FFFD97", borderLeft: "5px solid #ccc", padding: "3rem" });
//        $today.append($("<h1>Today</h1>)"));
//        $today.append($("<img src= 'images/partly-cloudy-day.png'></img>)"));
//        $today.append($("<h2></h2>)")).append(today);
//        $today.append($("<h3></h3>)")).append(summary);
//        $today.append($button);
//
//        $(".weather-forecast").append($today);
//        $(".weather-forecast").css({maxWidth: "800px", minWidth: "500px"})
//
//    //creating a function that displays the hourly weather when we click on the button.
//        $button.click(function(){
//        var $table = $('<table></table>').addClass('table');
//            $table.css({backgroundColor:"#97D6FF", border: "1px solid black", tableLayout: "fixed", width: "800px", textAlign:"center" ,
//    verticalAlign:"middle"});
//            $table.append($("<tr class= 'tableTitle'><th>Today's hourly weather</th></tr>\
//and <tr><th>Time</th> and<th>Humidity</th> and <th>Cloud Cover</th> and <th>Temperature</th><th>Wind Speed</th> and <th>Summary</th> and <th>Weather Icon</th></tr>"));
//            $(".weather-forecast").append($table);
//
//
//        for(i=0; i < 24; i++){
//        var time = i+1;
//        var humidity = weatherData.hourly.data[i].humidity;
//        var cloudCover = weatherData.hourly.data[i].cloudCover;
//        var temperature = weatherData.hourly.data[i].temperature;
//        var windSpeed = weatherData.hourly.data[i].windSpeed;
//        var summary = weatherData.hourly.data[i].summary;
//        var icon = weatherData.hourly.data[i].icon;
//
//
//
//            $table.append($("<tr><td>"+i+"</td> and <td>"+humidity+"</td> and <td>"+ cloudCover +"</td> and <td>"+ temperature+ "</td> and <td>"+ windSpeed+ "</td> and <td>" + summary+ "</td> and <td>" + icon + "</td></tr>"));
//
//        }
//
//  });
 });

}


document.addEventListener("DOMContentLoaded", function(){
    alert("test");
  var css = document.createElement("link");
  css.setAttribute("rel", "stylesheet");
  css.setAttribute("href", "widget/css/main.css");
  //loads the CSS file and applies it to the page
  var scriptsLoaded = 0;

  var jq = document.createElement("script");
  jq.addEventListener("load", function(){
    scriptsLoaded++;
    if(scriptsLoaded === 2){
      //call the function in My widget script to load the JSON and build the widget
      buildWidget(".mywidget");
      console.log("both scripts loaded");
    }
  });
  document.querySelector("head").appendChild(jq);
  jq.setAttribute("src","//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js");

  var script = document.createElement("script");
  script.addEventListener("load", function(){
    scriptsLoaded++;
    if(scriptsLoaded === 2){
      //call the function in My widget script to load the JSON and build the widget
      buildWidget(".mywidget");
      console.log("both scripts loaded");
    }
  });
  document.querySelector("head").appendChild(script);
// TODO:corerct the source to edumedia
    script.setAttribute("src","widget/js/widget.js");
});


if (document.readyState === "complete"){
    alert("I");
}