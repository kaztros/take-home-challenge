# Singularity Interactive take home code challenge

This challenge should take approximately 8 - 12 hours of time and should demonstrate how you would 
approach architecting a web application. You may use the framework or library of your choice but you should not adopt any
additional libraries for specific functionality as we would like to see how you organize your application components. Utility libraries like moment, axios, lodash etc are fine this is more speaking to component solutions that would handle rendering more complex components like tables, modals or sliders.
To begin you should clone this repo then when ready to submit your work open a pull request on github outlining your 
decisions and outcomes. 

## Goals

- Build the layout as depicted in the attached screenshot ( pixel perfection is not expected and some sections of the design have been commented out for simplicity ).
- All needed data should be consumed from the linked endpoints
- The application should support loading the existing role and permission data preferably with Promises or Async Await and rendering it 
- The application should demonstrate the ability to add a new role with permissions and render it into the table of loaded records ( the data updates on the client are not expected to persist on refresh )

## Bonus Goals

- Building the layout to be responsive
- Demonstrating CSS architecture and organization
- Providing some minimal level of test coverage
- Providing some build tooling to show optimization paths for production


### Comp
![Admin roles interface](take-home-challenge-comp.png)

### Endpoints

https://code-challenge-api.github59.now.sh/api/roles.json

https://code-challenge-api.github59.now.sh/api/permissions.json
