/* selects the field by id */
var filterField = document.querySelector("#filter-table");

/* "input" event is triggered by the keyboard */
filterField.addEventListener("input", function(){
	/* logs the content inputted */
	console.log(this.value);

	/*
	selects all table's patients
	continues only if something is inputted
	*/
	var patients = document.querySelectorAll(".patient");
	
	if (this.value.length > 0) {
		/* iterates over the patients */
		for (var i = 0; i < patients.length; i++) {
			/*seleciona o nome de cada paciente*/
			var patient = patients[i];
			var tdname = patient.querySelector(".info-name");
			var name = tdname.textContent;
			
			/*
			regular expression object (RegExp): 
			first parameter: what to search
			second parameter: operational flag, "i" discards case sensitive

			"test" method receives the reference as parameter
			it'll verify if this.value is into "name" and it'll return a boolean value
			if the patient doesn't have a name wich contains this.value, it'll receive "invisible" class
			and won't be shown in DOM
			otherwise, the class will be removed and it'll be shown
			in this way, as long as the user inputs something, the DOM adapts showing only the names
			wich matches
			*/
			var expression = new RegExp(this.value, "i");
            
			if (!expression.test(name)) {
                patient.classList.add("invisible");
            } else {
                patient.classList.remove("invisible");
            }
		}
	} else {
		/* if nothing inputted, all the patients are shown*/
		for (var i = 0; i < patients.length; i++) {
            var patient = patients[i];
            patient.classList.remove("invisible");
        }
    }
});