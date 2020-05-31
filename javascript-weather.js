$(function() {
	var isMetric = false;
	var locationUrl = "";
	var currentConditionsUrl = "";
	var language = "en";
	var apiKey = "JCLei7jjfUqFmpbIquZHa8NuCG8jAh7j";   
	var awxClearMessages = function() {
		$("#awxLocationInfo").html("...");
		$("#awxLocationUrl").html("...");
		$("#awxWeatherInfo").html("...");
		$("#awxWeatherUrl").html("...");
	}
	
	var awxCityLookUp = function(freeText) {
		awxClearMessages();
		locationUrl = "http://dataservice.accuweather.com/locations/v1/search?q=" + freeText + "&apikey=" + apiKey;
		$.ajax({
			type: "GET",
			url: locationUrl,
			dataType: "jsonp",
			cache: true,                    
			jsonpCallback: "awxCallback",   
			success: function (data) {awxCityLookUpFound(data);}
		});
	};

	var awxCityLookUpFound = function(data) {
		var msg, locationKey = null;
		$("#awxLocationUrl").html("<a href=" + encodeURI(locationUrl) + ">" + locationUrl + "</a>");
		if (data.length == 1) {
			locationKey = data[0].Key;
			msg = data[0].LocalizedName + ", " + data[0].Country.LocalizedName + "</b>";
		}
		else if (data.length == 0) {
			msg = "No locations found."
		}
		else {
			locationKey = data[0].Key;
			msg = "Multiple locations found (" + data.length + "). Selecting the first one. " + "<br>" +
				  "<b>" + data[0].LocalizedName + ", " + data[0].Country.LocalizedName + "</b>";
		}
		$("#awxLocationInfo").html(msg);
		if (locationKey != null) {
			awxGetCurrentConditions(locationKey);
		}

		var	xmlhttp = new XMLHttpRequest();
    	xmlhttp.onreadystatechange = function() {
	        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
	           	if (xmlhttp.status == 200) {
					var data = JSON.parse(xmlhttp.responseText);
					var day1 = document.getElementById("day1");
					date1.innerHTML = data.DailyForecasts[0].Date.slice(0,10);
					day1.innerHTML = "<p style='color: snow; border: 2px solid #7FFFD4; text-align: center; margin-bottom: 0;'>"+data.Headline.Text+"</p>"+"<br>"+
									"Day: " + data.DailyForecasts[0].Day.IconPhrase.replace(" w/",",") + "<br>" +
									"Night: " + data.DailyForecasts[0].Night.IconPhrase.replace(" w/",",") + "<br>" + 
									"Max. temperature: " + Number((data.DailyForecasts[0].Temperature.Maximum.Value-32)/1.8).toFixed(1) + "&#176" + "C" + "<br>" +
									"Min. temperature: " + Number((data.DailyForecasts[0].Temperature.Minimum.Value-32)/1.8).toFixed(1) + "&#176" + "C";

					var day2 = document.getElementById("day2");
					date2.innerHTML = data.DailyForecasts[1].Date.slice(0,10);
					day2.innerHTML = "Day: " + data.DailyForecasts[1].Day.IconPhrase.replace(" w/",",") + "<br>" +
									"Night: " + data.DailyForecasts[1].Night.IconPhrase.replace(" w/",",") + "<br>" + 
									"Max. temperature: " + Number((data.DailyForecasts[1].Temperature.Maximum.Value-32)/1.8).toFixed(1) + "&#176" + "C" + "<br>" +
									"Min. temperature: " + Number((data.DailyForecasts[1].Temperature.Minimum.Value-32)/1.8).toFixed(1) + "&#176" + "C";

					var day3 = document.getElementById("day3");
					date3.innerHTML = data.DailyForecasts[2].Date.slice(0,10);
					day3.innerHTML = "Day: " + data.DailyForecasts[2].Day.IconPhrase.replace(" w/",",") + "<br>" +
									"Night: " + data.DailyForecasts[2].Night.IconPhrase.replace(" w/",",") + "<br>" + 
									"Max. temperature: " + Number((data.DailyForecasts[2].Temperature.Maximum.Value-32)/1.8).toFixed(1) + "&#176" + "C" + "<br>" +
									"Min. temperature: " + Number((data.DailyForecasts[2].Temperature.Minimum.Value-32)/1.8).toFixed(1) + "&#176" + "C";

					var day4 = document.getElementById("day4");
					date4.innerHTML = data.DailyForecasts[3].Date.slice(0,10);
					day4.innerHTML = "Day: " + data.DailyForecasts[3].Day.IconPhrase.replace(" w/",",") + "<br>" +
									"Night: " + data.DailyForecasts[3].Night.IconPhrase.replace(" w/",",") + "<br>" + 
									"Max. temperature: " + Number((data.DailyForecasts[3].Temperature.Maximum.Value-32)/1.8).toFixed(1) + "&#176" + "C" + "<br>" +
									"Min. temperature: " + Number((data.DailyForecasts[3].Temperature.Minimum.Value-32)/1.8).toFixed(1) + "&#176" + "C";

					var day5 = document.getElementById("day5");
					date5.innerHTML = data.DailyForecasts[4].Date.slice(0,10);
					day5.innerHTML = "Day: " + data.DailyForecasts[4].Day.IconPhrase.replace(" w/",",") + "<br>" +
									"Night: " + data.DailyForecasts[4].Night.IconPhrase.replace(" w/",",") + "<br>" + 
									"Max. temperature: " + Number((data.DailyForecasts[4].Temperature.Maximum.Value-32)/1.8).toFixed(1) + "&#176" + "C" + "<br>" +
									"Min. temperature: " + Number((data.DailyForecasts[4].Temperature.Minimum.Value-32)/1.8).toFixed(1) + "&#176" + "C";
				}
	           	else if (xmlhttp.status == 400) {
	              	alert("There was an error 400");
	           	}
	           	else {
	               	alert("Something else other than 200 was returned");
	           	}
	        }
		};		
    	xmlhttp.open("GET", "http://dataservice.accuweather.com/forecasts/v1/daily/5day/" + locationKey + "?apikey=JCLei7jjfUqFmpbIquZHa8NuCG8jAh7j&details&details=true", true);	
		xmlhttp.send();
	};	
	
	var awxGetCurrentConditions = function(locationKey) {
		currentConditionsUrl = "http://dataservice.accuweather.com/currentconditions/v1/" + locationKey + ".json?language=" + language + "&apikey=" + apiKey;
		$.ajax({
			type: "GET",
			url: currentConditionsUrl,
			dataType: "jsonp",
			cache: true,                    
			jsonpCallback: "awxCallback",   
			success: function(data) {
				var html;
				if (data && data.length > 0) {
					var conditions = data[0];
					var temp = isMetric ? conditions.Temperature.Metric : conditions.Temperature.Imperial;
					html = conditions.WeatherText + ", " + temp.Value + " " + temp.Unit;
				}
				else {
					html = "N/A";
				}
				$("#awxWeatherInfo").html(html);
				$("#awxWeatherUrl").html("<a href=" + currentConditionsUrl + ">" + currentConditionsUrl + "</a>");
			}
		});
	};

	/** Search **/
	$("#awxSearchTextBox").click(function (e) {
		if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
			var text = $("#awxSearchTextBox").val();
			awxCityLookUp(text);
			return false;
		} 
		else {
			return true;
		}
	});

	/** LocalStorage **/
	$("#awxSearchButton").click(function () {
		var text = $("#awxSearchTextBox").val();
		awxCityLookUp(text);
		var alert = $("#alert").html();
		
        if ($("#awxSearchTextBox").val() == "") {
        	$("#alert").html("<strong>Warning!</strong> The input field is empty");
            $("#alert").fadeIn().delay(1000);
            return false;
        }
        $("#alert").prepend(text + " ");
        $("#form")[0].reset();
        localStorage.setItem("alert", alert);
        return false;
	});
	if (localStorage.getItem("alert")) {
        $("#alert").html(localStorage.getItem("alert"));
    }
 
    $("#clear").click(function() {
        window.localStorage.clear();
        location.reload();
        return false;
    });
});