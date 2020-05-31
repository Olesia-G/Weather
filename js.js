var xmlhttp = new XMLHttpRequest();
    		xmlhttp.onreadystatechange = function() {
	        	if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
	           		if (xmlhttp.status == 200) {
	              		var data = JSON.parse(xmlhttp.responseText);
						var text1 = document.getElementById("text1");
						text1.innerHTML = 	"Date: " + new Date(data.DailyForecasts[0].Date).getDay() + "<br>" + 
											"Day: " + data.DailyForecasts[0].Day.IconPhrase + "<br>" +
											"Night: " + data.DailyForecasts[0].Night.IconPhrase + "<br>" + 
											"Temperature: " + data.DailyForecasts[0].Temperature.Minimum.Value + 
											"&#176"	+ data.DailyForecasts[0].Temperature.Minimum.Unit + "<br>" +
											new Date().setTime(data.DailyForecasts[0].EpochDate);
							              		
						var text2 = document.getElementById("text2");
						text2.innerHTML = 	"Date: " + data.DailyForecasts[1].Date + "<br>" + 
											"Day: " + data.DailyForecasts[1].Day.IconPhrase + "<br>" +
											"Night: " + data.DailyForecasts[1].Night.IconPhrase + "<br>" + 
											"Temperature: " + data.DailyForecasts[1].Temperature.Minimum.Value + 
											"&#176"	+ data.DailyForecasts[1].Temperature.Minimum.Unit;

							              		
						var text3 = document.getElementById("text3");
						text3.innerHTML = 	"Date: " + data.DailyForecasts[2].Date + "<br>" + 
											"Day: " + data.DailyForecasts[2].Day.IconPhrase + "<br>" +
											"Night: " + data.DailyForecasts[2].Night.IconPhrase + "<br>" + 
											"Temperature: " + data.DailyForecasts[2].Temperature.Minimum.Value + 
											"&#176"	+ data.DailyForecasts[2].Temperature.Minimum.Unit;
	           		}
	           		else if (xmlhttp.status == 400) {
	              		alert('There was an error 400');
	           		}
	           		else {
	               		alert('Something else other than 200 was returned');
	           		}
	        	}
    		};
    		xmlhttp.open("GET", "http://dataservice.accuweather.com/forecasts/v1/daily/5day/323684?apikey=JCLei7jjfUqFmpbIquZHa8NuCG8jAh7j", true);
    		xmlhttp.send();