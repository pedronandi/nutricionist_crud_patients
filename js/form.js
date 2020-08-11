/* selects the form button, by id */
var addButton = document.querySelector("#add-patient");

/* event "click" on the button */
addButton.addEventListener("click", function (){
    /*
    event's default behavior would be update the page and don't show msg on the console
    because it's a button's <form>. Command "preventDefault" prevents that event
    follows his natural course and makes him to follow what the code determines
    */
    event.preventDefault();
    
	var form = document.querySelector("#add-form");
	
	/* receives the <form> element and returns a "patient" object */
	var patient = getFormsPatient(form);
    
    /* reutrns and array of errors, or nothing */
	var errors = validatesPatient(patient);
	
    /* if the array is not null, error messages will be shown and the execution ends */
    if(errors.length > 0){
		printErrorMessages(errors);
		return;
    }
    
    /* adds patient's info into page's table*/
    addPatientIntoTable(patient);
	
	/* resets form and clean <ul> */
	form.reset();
	var errorMessage = document.querySelector("#err-message");
    errorMessage.innerHTML = "";
    
    /*
    event:
    - extracts info from form, validates them and create a patient with them;
    - if raises validation errors, they are shown at the page;
    - patient is added into table's page;
    - the form is reseted, with the possible error messages.
    */
});

function getFormsPatient(form) {
	
	/* "patient" object, created with form data */
	var patient = {
        name: form.name.value,
        wheight: form.wheight.value,
        height: form.height.value,
        bodyFat: form.bodyFat.value,
		bmi: calculatesBmi(form.wheight.value, form.height.value)
    }
	
    return patient;
}

/* goal: build a <tr> element, with <td>, representing a patient */
function buildTr(patient) {
    /*
    "createElement" is a method wich creates elements into DOM
    new <tr> receives patient class
    function "buildTd" creates each <td>, receiving the element's value and the class name
    */
    var patientTr = document.createElement("tr");
    patientTr.classList.add("patient");

    /* back-end may send attributes in portuguese */
    var patientName = patient.name || patient.nome;
    var patientWheight = patient.wheight || patient.peso;
    var patientHeight = patient.height || patient.altura;
    var patientBodyFat = patient.bodyFat || patient.gordura;
    var patientBmi = patient.bmi || patient.imc;

    var nameTd = buildTd(patientName, "info-name");
	var wheightTd = buildTd(patientWheight, "info-wheight");
	var heightTd = buildTd(patientHeight, "info-height");
	var bodyFatTd = buildTd(patientBodyFat, "info-fat");
	
    /*
    "appendChild" is a method wich associates elements in DOM
    the built <td> are being injected into <tr> already built
    returns the <tr>
    */
    patientTr.appendChild(nameTd);
    patientTr.appendChild(wheightTd);
    patientTr.appendChild(heightTd);
    patientTr.appendChild(bodyFatTd);
    patientTr.appendChild(buildTd(patientBmi, "info-bmi"));

    return patientTr;
}

function buildTd(data, className){
    var td = document.createElement("td");
    td.textContent = data;
    td.classList.add(className);

    return td;
}

/* Patient's info is validated and are generated possible error messages, returned into an array */
function validatesPatient(patient) {
    var errors = [];
	
    if (patient.name.length == 0)
        /* "push" add into array */
        errors.push("The name cannot be null!")
	if (patient.wheight.length == 0)
        errors.push("Wheight cannot be null!")
    if(!validatesWheight(patient.wheight))
        errors.push("Wheight is invalid!")
	if (patient.height.length == 0)
        errors.push("Height cannot be null!")
    if(!validatesHeight(patient.height))
        errors.push("Height is invalid!")
	if (patient.bodyFat.length == 0)
        errors.push("Body fat cannot be null!")
    
	return errors;
}

/* receives an array of errors, not null, and prints in DOM */
function printErrorMessages(errors){
    /*
    selects <ul> by id
    with "innerHTML" is possible to remove possible <li> into <ul>
    */
    var ul = document.querySelector("#err-message");
	ul.innerHTML = "";
    
    /*
    iterating over the array
    the parameter "error" can have any name
    it just ilustrates that the function has one parameter to use
    creates <li> and adds the error as an element
    adds <li> into <ul>
    */
	errors.forEach(function(error){
        var li = document.createElement("li");
        li.textContent = error;
        ul.appendChild(li);
    });
}

/* builds patient's <tr> and adds into patients <table> */
function addPatientIntoTable(patient) {
    var patientTr = buildTr(patient);
    var table = document.querySelector("#table-patient");
    table.appendChild(patientTr);
}