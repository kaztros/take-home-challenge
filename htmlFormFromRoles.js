"use strict";

function repopulateDomCheckboxesLoading() {
	let loadingElements = [document.createTextNode("(loading...)")]
	repopulateFormCheckboxesWith(loadingElements)
}

function repopulateDomCheckboxesError(errorString) {
	errorString = errorString ?? "aw beans.  Something bad happened."
	let errorElements = [document.createTextNode(errorString)]
	repopulateFormCheckboxesWith(errorElements)
}

function createCheckboxHtmlElementsFromRoleName(name) {
	//Not whitespace friendly.
	let checkbox = document.createElement("input")
	let label = document.createElement("label")
	let description = document.createTextNode(name)

	checkbox.type = "checkbox"
	checkbox.id = "checkbox_" + name
	checkbox.name = "permission_" + name
	checkbox.value = "value_" + name

	label.htmlFor = "checkbox_" + name
	label.appendChild(description)

	return [checkbox, label]
}


function repopulateDomCheckboxesWithRoles(all_roles) {
	let arrayOfElements = all_roles.map(function(role) { 
		let elements = createCheckboxHtmlElementsFromRoleName(role.name) 
		elements = elements.concat([document.createElement("br")])
		return elements
	})

	repopulateFormCheckboxesWith(arrayOfElements.flat())
}

