'use strict';

const TABLE_PARAMETERS =
	[	{	name : "Role",
			htmlFromRole : htmlRoleNameFromRole
		}
	,	{	name : "Users",
			htmlFromRole : htmlRoleUsageFromRole
		}
	,	{	name : "Permissions",
			htmlFromRole : htmlRolePermissionsFromRole 
		}
	]

function htmlRoleNameFromRole(role, permissions) {
	return document.createTextNode(role?.name ?? "(none)")
}

function htmlRoleUsageFromRole(role, permissions) {
	return document.createTextNode("" + (role?.assigned_user_count ?? 0))
}

function htmlRolePermissionsFromRole(role, permissions) {
	let names = role.permission_ids.map(x => permissionNameFromPermissionId(x, permissions) ?? `(invalid role_id ${x})`)
	names = names?.length ? names : ["(none)"]

	let htmlRoleNames = document.createTextNode(names.join("; "))
	return htmlRoleNames
}


function htmlTableRowElementsFromRole(role, permissions) {
	return TABLE_PARAMETERS.map(x => x.htmlFromRole(role, permissions))
}

function htmlTableHeaderElements() {
	return TABLE_PARAMETERS.map(x => document.createTextNode(x.name))
}

function htmlTableFromRoles(roles, permissions) {
	let htmlTable = document.createElement("table")

	let headerRow = htmlTable.createTHead().insertRow(0)
	let headerRowElements = htmlTableHeaderElements()

	headerRowElements.forEach( function (ele) {
		let th = document.createElement("th")
		th.appendChild(ele)
		headerRow.appendChild(th)
	})

	let tableBody = htmlTable.createTBody()
	let rowsElements = roles.map(role => htmlTableRowElementsFromRole(role, permissions))
	rowsElements.forEach( function(eles, row_idx) {
		let row = tableBody.insertRow(row_idx)
		eles.forEach( function (ele, ele_idx) {
			let cell = row.insertCell(ele_idx)
			cell.appendChild(ele)
		})
	})

	return htmlTable
}

function htmlTableForLoading() {
	let htmlTable = document.createElement("table")

	let headerRow = htmlTable.createTHead().insertRow(0)
	let headerRowElements = htmlTableHeaderElements()

	let footerRow = htmlTable.createTFoot().insertRow(0)
	let eles = TABLE_PARAMETERS.map(x => document.createTextNode("(loading...)"))
	eles.forEach( function (ele, ele_idx) {
		let cell = footerRow.insertCell(ele_idx)
		cell.appendChild(ele)
	})

	return htmlTable
}


