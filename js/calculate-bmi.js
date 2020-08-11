/*
"document" is the DOM (Document Object Model), wich represents HTML
"querySelector" is a method wich is abble to select parts (elements) of the DOM
prefix "#" selects elements by id and the "." selects by classes

"textContent" allows to set the internal value of HTML's element
"querySelectorAll" is a method wich loads all DOM's elements into an array
*/

var title = document.querySelector(".title");
title.textContent = "Nutri's Patients";

var patients = document.querySelectorAll(".patient");
console.log(patients);

/* it's possible to iterate with the array returned by "querySelectorAll" */
for(var i = 0; i < patients.length; i++) {
  
  var patient = patients[i];

  /* extraction of element's internal contents */
  var wheight = patient.querySelector(".info-wheight").textContent;
  var height = patient.querySelector(".info-height").textContent;
  var tdBmi = patient.querySelector(".info-bmi");
  
  /* functions */
  var wheightIsValid = validatesWheight(wheight);
  var heightIsValid = validatesHeight(height);

  if(!wheightIsValid) {
    wheightIsValid = false;
    tdBmi.textContent = "Invalid wheight!";
    
    /* DOM's manipulation: Changing font color */
    patient.style.color = "red";

	  /* "classList" allows add/remove classes to DOM's elements */
    patient.classList.add("invalid-patient");
  }

  if (!heightIsValid){
    console.log("Invalid Height!");
    heightIsValid = false;
    tdBmi.textContent = "Invalid Height!";
    patient.style.color = "red";
    patient.classList.add("invalid-patient");
  }

  if (wheightIsValid && heightIsValid) {
    console.log("All clear!");

    /* function's return injected into element */
    tdBmi.textContent = calculatesBmi(wheight, height);
  }

  /*
  calculate-bmi: 
  - Updates page's title;
  - Selects all elements with class=patient and iterates over the array;
  - Extracts wheight, height and BMI of each patient;
  - Validates wheight and height and, if both valid, calculates and shows the BMI.
  */
}

/*
possible to add an element into another element
example through "anonimous functions"
"addEventListener" allows the declaration of N events, executed in sequence
event "click" is triggered by the cursor's click
*/
title.addEventListener("click", function (){
    console.log("Anonimous function execution!");
});

/* returns the value with 2 decimals */
function calculatesBmi(wheight, height) {
	var bmi = (wheight / (height * height));
	
	return bmi.toFixed(2);
}

function validatesWheight(wheight){

    if (wheight >= 0 && wheight <= 1000) {
        return true;
    } else {
        return false;
    }
}

function validatesHeight(height) {

    if (height >= 0 && height <= 3.0) {
        return true;
    } else {
        return false;
    }
}