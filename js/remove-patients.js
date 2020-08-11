var patients = document.querySelectorAll(".patient");
var table = document.querySelector("table");

/* "dblclick" is triggered by two cursor clicks */
table.addEventListener("dblclick", function(event) {
	
	/*
	"event.target" is about the element who suffered the event
	the event owner or any inner element (<tr> or <td>)

	by the way, if "event.target.remove();" are used, only one element will be removed
	in this case, the <td>, wich represents the line's column
	at the double click, the whole line is removed
	*/
	console.log(event.target);
	
	/*
	to remove the whole line, we use "parentNode"
	"parentNode" remove the element wich suffered the event and his father
	the <td> and the <tr> (whole line)

	to make an effect, use the "fadeOut" CSS class into <tr>, to add a transparence
	after 500ms, the .remote() is executed
	*/
	event.target.parentNode.classList.add("fadeOut");
	
	setTimeout(function() {
        event.target.parentNode.remove();
	}, 500);
	
	/*
	effect "Event Bubbling"
	when an element suffers an event, all the father's chain will suffer the same event
	an inverse cascade
	*/
});