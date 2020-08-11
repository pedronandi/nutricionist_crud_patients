var addButton = document.querySelector("#search-patients");

addButton.addEventListener("click", function(){
    
	/*
	"XMLHttpRequest" is a class wich executes a HTTP request
	"open" is a method wich prepares the request
	receives the HTTP method (get) and the route (URI)

	"send" is the methid wich executes the request
	*/
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "https://api-pacientes.herokuapp.com/pacientes");
	xhr.send();
	
	/* "load" is the event triggered when the response arrives */
	xhr.addEventListener("load", function(){
		/*
		selects <span> by id
		"status" contains the HTTP response code
		*/
		var ajaxError = document.querySelector("#ajax-err");

		if (xhr.status == 200) {
			/*
			if the response is OK (200), the <span> gets invisible
			"responseText" delivers the response in text format
			"typeof" shows the variable type
			"JSON.parse" parses (removes serialization) the JSON into a JS object. in that case, a String array
			iterating the array, is possible to add new patients into table
			*/
			ajaxError.classList.add("invisible");
			
			var response = xhr.responseText;
			console.log(typeof response);
			
			var patients = JSON.parse(response);
			
			patients.forEach(function(patient) {
                addPatientIntoTable(patient);
            });
        } else {
			/*
			if teh response code is not OK
			<span> will show the error message on the page
			the console will log the error message
			*/
			ajaxError.classList.remove("invisible");
            console.log(xhr.status);
            console.log(xhr.responseText);
        }
    });
});