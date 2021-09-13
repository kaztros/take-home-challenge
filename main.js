'use strict';

const fs = require("fs")

function GET_ALL_PERMISSIONS() {
	const all_permissions = ["add", "assign", "create", "edit", "read", "remove", "transfer", "upload", "write"]
	let all_permissions_as_set = new Set()
	for(let permission of all_permissions) {
		all_permissions_as_set.add(permission)
	}
	//Set() cannot be JSON.stringify'd right now.  Fallback on to the array.
	return all_permissions
}

function main_ish() {
	const http = require('http')

	const server = http.createServer(adminServerDemux)

	server.listen(80, () => { console.log("It's running, probably.") } )
}

function adminServerDemux(req, res) {
	if (req.url == "/all_permissions.json") {
		serveAllPermissions(res)
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

function serveAllPermissions(res) {
	res.statusCode = 200
	res.setHeader("Content-Type", "application/json")
	res.end(JSON.stringify(GET_ALL_PERMISSIONS()))
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







