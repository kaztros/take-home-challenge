"use strict";

function htmlsFormFromLoading() {
	return [document.createTextNode("(loading...)")]
}

function htmlsFormFromError(errorString) {
	errorString = errorString ?? "aw beans.  Something bad happened."
	return [document.createTextNode(errorString)]
}

function htmlsCheckboxFromRoleName(name) {
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

function htmlsFormFromPermissions(permissions) {
	let arrayOfElements = permissions.map(function(permission) { 
		let elements = htmlsCheckboxFromRoleName(permission.name) 
		elements = elements.concat([document.createElement("br")])
		return elements
	})

	return arrayOfElements.flat()
}

