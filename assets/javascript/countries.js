var cities = ["Kansas City", "San Antonio","Los Angeles-Long Beach-Santa Ana","Tampa-St. Petersburg-Clearwater", "Minneapolis-St. Paul-Bloomington","NEW YORK","Atlanta-Sandy Springs-Marietta", "Seattle-Tacoma-Bellevue","El Bosque", "Osasco", "Delhi", "South East Queensland", "Jakarta", "Chengdu", "Ulaanbaatar", "ALBERTA", "London", "Lisboa", "Oost-Vlaanderen", "Středočeský", "Brandenburg", "Oslo", "Roma", "Moscow", "İstanbul", "Bogota" ];

var des, images = [], input ;

var countriesList = [

	{
		id: "Toronto Downtown",
		value: 0,
		info: "CA"
	},

	{
		id: "Beijing",
		value: 0,
		info: "CN"
	},

	{
		id: "Chengdu",
		value: 0,
		info: "CN"
	},


	{
		id: "Jakarta",
		value: 0
	},

	{
		id: "Tehran",
		value: 0,
		info: "IR"
	},

	{
		id: "Ulaanbaatar",
		value: 0,
		info: "MN"
	}, 

	{
		id: "Lahore",
		value: 0
	},

	{
		id: "Lima",
		value: 0
	},

	{
		id: "Vienna",
		value: 0
	}, 

	{
		id: "Busan",
		value: 0
	},

	{
		id: "Warsaw",
		value: 0,
		info: "PL"
	},

	{
		id: "Kolkata",
		value: 0	
	},

	{
		id: "Manila",
		value: 0
	},

	{
		id: "Osaka",
		value: 0
	},

	{
		id: "Riyadh",
		value: 0
	},

	{
		id: "Munich",
		value: 0,
		info: "DE"
	},

	{
		id: "Moscow",
		value: 0,
		info: "RU"
	},

	{
		id: "London",
		value: 0,
		info: "GB"
	},


	{
		id: "Santiago",
		value: 0,
		info: "CL"
	},

	{
		id: "Sao Paulo",
		value: 0,
		info: "BR"
	},

	{
		id: "Nice",
		value: 0,
		info: "FR"
	},

	{
		id: "Los Angeles",
		value: 0,
		info: "US"
	
	},

	{
		id: "Ankara",
		value: 0
	},

	{
		id: "Jerusalem",
		value: 0
	},

	{
		id: "Sydney",
		value: 0,
		info: "AU"
	},

	{
		id: "Madrid",
		value: 0,
		info: "ES"
	},

	{
		id: "Prague",
		value: 0
	},

	{
		id: "Oslo",
		value: 0
	},

	{
		id: "Helsinki",
		value: 0
	},

	{
		id: "Richards Bay",
		value: 0
	},

	{
		id: "Budapest",
		value: 0
	},

	{
		id: "Matosinhos",
		value: 0
	},

	{
		id: "Bogota",
		value: 0
	},

	{
		id: "Dhaka",
		value: 0
	},

	{
		id: "Brasov",
		value: 0
	},

	{
		id: "Phnom Penh",
		value: 0
	},

	{
		id: "Port Harcourt",
		value: 0,
		info: "NG"
	},

	{
		id: "Hanoi",
		value: 0
	},

	{
		id: "Busan",
		value: 0
	},

	{
		id: "Brussels",
		value: 0
	},

	{
		id: "Beograd",
		value: 0
	},

	{
		id: "Vilnius",
		value: 0
	},

	{
		id: "Rotterdam",
		value: 0
	},

	{
		id: "Roma",
		value: 0,
		info: "IT"
	}

];

// Initialize Firebase
var config = {
	apiKey: "AIzaSyCWlmhjcyuT8F60G7LcgbyI1zIY1IfhS5I",
	authDomain: "air-pollution-c03c3.firebaseapp.com",
	databaseURL: "https://air-pollution-c03c3.firebaseio.com",
	projectId: "air-pollution-c03c3",
	storageBucket: "air-pollution-c03c3.appspot.com",
	messagingSenderId: "229702085661"
};
firebase.initializeApp(config);

var database = firebase.database();




var cityAQ = 0;
var queryURL = "https://api.airvisual.com//v2/city_ranking?key=7nsRkFTrepCQ4LCmX";

$.ajax({
	url: queryURL,
	method: "GET"
})
	.done(function(response) {
	console.log(response);
	console.log(countriesList);

	//---------------trying to plug in cities instead of countries
	for (var i = 0; i < response.data.length ; i++ ){
		var hold = response.data[i];
		var city = hold.city;
		var state = hold.state;
	
		for (var j = 0; j < countriesList.length; j++) {
			if (city === countriesList[j].id){
				countriesList[j].value = response.data[i].ranking.current_aqi;
	
			};

			if (state === countriesList[j].id){
				countriesList[j].value = response.data[i].ranking.current_aqi;
			}  
		}

	}
	render();
});


var des;

function render() {

	var countryImages = [];

	var map = new AmCharts.makeChart("mapdiv", {
		type: "map",
		theme: "light",
		colorSteps: 10,


		dataProvider: {
			map: "worldHigh",
			areas: countriesList,
			images: images
		},

		areasSettings: {
			autoZoom: true,
			selectable: true
		},

		listeners:  [ {
   		event: "clickMapObject",
    	method: function(event) {
    		var countryImages =[];

  			 var queryURL = "https://api.openaq.org/v1/measurements?country=" + event.mapObject.info + "&sort=asc&limit=10";
    		$.ajax({
    			url: queryURL,
    			method: "GET"
    		}).done(function(response) {
    			console.log(response);
     			console.log("click registered");
					
			for (var z = 0; z < response.results.length; z ++){
				var parameter = response.results[z].parameter;
				var value = response.results[z].value;
				var unit = response.results[z].unit; 
				des = (parameter + " = " + value +" " + unit );

					var box = new Object();
					box.label = "";
					box.title = response.results[z].city;
					box.latitude = response.results[z].coordinates.latitude;
					box.longitude = response.results[z].coordinates.longitude;
					box.type = "circle";
					box.alpha = 0.7;
					box.scale= 0.9;
					box.selectable = false;		
					box.description = des;
					images.push(box);

					// images.concat(countryImages);
			};

					console.log(box);
 	
    		});

    	}
		} ],

		valueLegend: {
			right: 10,
			minValue: "Healthy",
			maxValue: "Hazardous"
		}
		});
};


var secondAPI = function(input){
	var queryURL = "https://api.openaq.org/v1/latest?city=" + input;
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		console.log(response);

		for (var y = 0; y < response.results[0].measurements.length; y++){
			var parameter = response.results[0].measurements[y].parameter;
			var value = response.results[0].measurements[y].value;
			var unit = response.results[0].measurements[y].unit; 
			des = (parameter + " = " + value +" " + unit );

		};
		var box = new Object();
		box.label = "";
		box.title = response.results[0].city;
		box.latitude = response.results[0].coordinates.latitude;
		box.longitude = response.results[0].coordinates.longitude;
		box.type = "circle";
		box.alpha = 0.7;
		box.scale= 0.9;
		box.selectable = true;		
		box.description = des;
		images.push(box);


		render();

	});
};



//retrieving information from FB

var retrieve = function(){
	database.ref().on("child_added", function(snapshot) {
		country = snapshot.val().country;
		city = snapshot.val().city;
		cityAQ = snapshot.val().cityAQ;

		var row = $("<tr>");
		row.append("<td>" + country+ "</td>");
		row.append("<td>" + city + "</td>");
		row.append("<td>" + cityAQ + "</td>");

		$("#tbody").append(row);

	}, function(errorObject){
		console.log(errorObject);
	});
};

retrieve();


$("#submit").on("click" , function(event){
    event.preventDefault();
    input = $("#keyWord").val();
    var inputIndex = cities.indexOf(input);
    
    secondAPI(cities[inputIndex]);
    render();
    $("#keyWord").val("");
    
    if (inputIndex == -1 && input.length != 0 ){
         // show an error to the user
        $('#myModal').modal("show")
    }
});

