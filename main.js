'use strict';

const fs = require("fs")

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
	} else if (req.url == "/addAccount.html") {
		serveAddAccountPage(res)
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

function buildMenuCreate(req, res) {
	res.end()
}

main_ish();







