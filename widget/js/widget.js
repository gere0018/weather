//Pretend that this is somewhere else on another server

var buildWidget = function (){
//do Ajax call to api.forecast.io
  $.ajax({
        url: "https://api.forecast.io/forecast/8726821408e2ddb59506f9c67810cb5c/45.348391,-75.757045",
      dataType: "jsonp",
      xhrFields: {
      withCredentials: true
   },
      data: "units = [ca]"

}).done(function gotData( weatherData ){
  $( this ).addClass( "done" );
    console.log(weatherData);
    var today = new Date();
    var icon = weatherData.hourly.data[0].icon;
    console.log(today);
    var summary = weatherData.hourly.data[0].summary;
    var $button = $("<button class ='button'>Hourly forecast</button>");
        $button.css("display", "block");
    var $today= $('<div></div>').addClass('today');
        $today.css({backgroundColor: "#FFFD97", borderLeft: "5px solid #ccc", padding: "3rem" });
        $today.append($("<h1>Today</h1>)"));
        $today.append($("<img src= 'images/partly-cloudy-day.png'></img>)"));
        $today.append($("<h2></h2>)")).append(today);
        $today.append($("<h3></h3>)")).append(summary);
        $today.append($button);

        $(".weather-forecast").append($today);
        $(".weather-forecast").css({maxWidth: "800px", minWidth: "500px"})

    //creating a function that displays the hourly weather when we click on the button.
        $button.click(function(){
        var $table = $('<table></table>').addClass('table');
            $table.css({backgroundColor:"#97D6FF", border: "1px solid black", tableLayout: "fixed", width: "800px", textAlign:"center" ,
    verticalAlign:"middle"});
            $table.append($("<tr class= 'tableTitle'><th>Today's hourly weather</th></tr>\
and <tr><th>Time</th> and<th>Humidity</th> and <th>Cloud Cover</th> and <th>Temperature</th><th>Wind Speed</th> and <th>Summary</th> and <th>Weather Icon</th></tr>"));
            $(".weather-forecast").append($table);


        for(i=0; i < 24; i++){
        var time = i+1;
        var humidity = weatherData.hourly.data[i].humidity;
        var cloudCover = weatherData.hourly.data[i].cloudCover;
        var temperature = weatherData.hourly.data[i].temperature;
        var windSpeed = weatherData.hourly.data[i].windSpeed;
        var summary = weatherData.hourly.data[i].summary;
        var icon = weatherData.hourly.data[i].icon;



            $table.append($("<tr><td>"+i+"</td> and <td>"+humidity+"</td> and <td>"+ cloudCover +"</td> and <td>"+ temperature+ "</td> and <td>"+ windSpeed+ "</td> and <td>" + summary+ "</td> and <td>" + icon + "</td></tr>"));

        }

  });
 });

}






//         $table.append($("<tr><td>Time</td> and <td class ='humidity'>Humidity</td> and <td>Cloud Cover</td> and <td>Temperature</td><td>Wind Speed</td> and <td>Summary</td> and <td>Weather Icon</td></tr>"));var $humidity = $(".humidity");$humidity.text(humidity);











