'use strict';

const fs = require("fs")

function constrainProperties(defaultObj, obj) {
	let constraintProperties = Reflect.ownKeys(defaultObj)
	let result = {}
	constraintProperties.forEach(property => {
		Reflect.set(result, property, Reflect.get(obj, property) ?? Reflect.get(defaultObj, property))
	})
	return result
}

const PERMISSIONS = {
  data: [
    {
      id: 1,
      name: "View"
    },
    {
      id: 2,
      name: "Create"
    },
    {
      id: 3,
      name: "Edit"
    },
    {
      id: 4,
      name: "Destroy"
    },
    {
      id: 5,
      name: "Transfer"
    },
    {
      id: 6,
      name: "Quack"
    }
  ],
  meta: {}
}

const TheNullRole = {
	id: -1,
	name: "(none)",
	assigned_user_count: 0,
	permission_ids: []
}

var ROLES = {
  data: [
    {
      id: 1,
      name: "All Powerful",
      assigned_user_count: 3,
      permission_ids: [ 1, 2, 3, 4, 5, 6 ]
    },
    {
      id: 2,
      name: "Ghost",
      assigned_user_count: 42,
      permission_ids: [ 2, 3, 4, 5 ]
    },
    {
      id: 3,
      name: "Ed",
      assigned_user_count: 1,
      permission_ids: [ ]
    },
    {
      id: 4,
      name: "Duck",
      assigned_user_count: 10,
      permission_ids: [ 6 ]
    }
  ],
  meta: { }
}

function nextId(roles) {
	let currentIds = roles.map(x => x.id)
	return Math.max(0, Math.max(...currentIds)) + 1
}

function main_ish() {
	const http = require('http')

	const server = http.createServer(adminServerDemux)

	server.listen(80, () => { console.log("It's running, probably.") } )
}

function adminServerDemux(req, res) {
	if (req.url == "/permissions.json") {
		serveAsJSON(res, PERMISSIONS)
	} else if (req.url == "/roles.json") {
		serveAsJSON(res, ROLES)
	} else if (req.url == "/htmlTableFromRoles.js") {
		serveJavaScript(res, "htmlTableFromRoles.js")
	} else if (req.url == "/htmlFormFromRoles.js") {
		serveJavaScript(res, "htmlFormFromRoles.js")
	} else if (req.url == "/addAccount.html") {
		serveAddAccountPage(res)
	} else if (req.url == "/addNewRole.json") {
		recieveAddNewRole(req, res)
	} else {
		buildPageNotFound(req, res)
	}
}

function buildPageNotFound(req, res) {
	res.statusCode = 404
	res.setHeader("Content-Type", "text/html")
	res.end(
		`<h1>404 - Page not found.</h1>
		 <p>${req.method} ${req.url}</p>
		`
		)
}

function serveAsJSON(res, jsonable) {
	res.statusCode = 200
	res.setHeader("Content-Type", "application/json")
	res.end(JSON.stringify(jsonable))
}

function serveJavaScript(res, path) {
	const stream = fs.createReadStream("./" + path)

	res.statusCode = 200
	res.setHeader("Content-Type", "text/javascript")
	stream.pipe(res)
}

function serveAddAccountPage(res) {
	const stream = fs.createReadStream("./addAccount.html")

	res.statusCode = 200
	res.setHeader("Content-Type", "text/html")
	stream.pipe(res)
}

async function recieveAddNewRole(req, res) {
	res.statusCode = 200
	res.setHeader("Content-Type", "application/json")

	let returnVal = { success: true,
		error: null
	}

	const buffers = [];

	for await (const chunk of req) {
		buffers.push(chunk)
	}

	try {
		let partialRole = JSON.parse(Buffer.concat(buffers).toString())
		console.log(partialRole)
		partialRole.id = nextId(ROLES.data)
		partialRole.assigned_user_count = 0

		let sanitizedRole = constrainProperties(TheNullRole, partialRole)
		ROLES.data.push(sanitizedRole)
		console.log(sanitizedRole)

	} catch (err) {
		console.log("error: ", err)
		returnVal.success = false
		returnVal.error = err

		res.statusCode = 500
	} finally {
		res.end(JSON.stringify(returnVal))
	}

	//TOOD: Server-side conversion of permission to id (blech).
	//TODO: Server-side modification.
	//TODO: Server-side validation.

}

main_ish();







