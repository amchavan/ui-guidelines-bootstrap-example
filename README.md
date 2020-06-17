# ALMA UI Guidelines libraries and example

This project includes some libraries and other supporting
software to aid in implementing the
[ALMA Web UI Guidelines](https://confluence.alma.cl/x/mwLoAQ).
It includes an example showcase application as well.

The implementation is based on
[Bootstrap](https://getbootstrap.com/) 
and 
[ng-bootstrap](https://ng-bootstrap.github.io/#/home).  

## Libraries, etc.

* [busy-indicator](projects/busy-indicator/README.md): Implements a simple "I'm busy" modal indicator
* TODO

## Running the example

To build and run this example you need to set up an Angular 
development environment.

### Node.js

Node.js is the server-side Javascript runtime, it's used to power JS 
development tools. Verify if you have a working installation by running
`node --version` — you'll need version 10.9.0 or later.

See your environment's specific instructions for  installing Node 
on https://nodejs.org/en/download  
The Node installation will include `npm`, the Node package manager.

### Angular CLI

To install the CLI globally using _npm_, enter
```$sh
npm install -g @angular/cli
```

### Node dependencies

Change into the _ui-guidelines-bootstrap-example_ directory and install all needed dependencies:
```$sh
npm install

```

### Building the libraries
```shell script
ng build busy-indicator
... TODO
```

### Launch the example 

You can start the example with `ng serve --open` from the _ui-guidelines-bootstrap-example_ 
directory.  The `--open` (or just `-o`) option automatically opens your browser to 
http://localhost:4200 and refreshes the UI when you update the source code.

### DA QUI ###

### External CSS definitions

**NOTE** This example relies on an external CSS file to implement the ALMA 
Web UI Guidelines. The file is part of the NPM module 
[@almaobservatory/ui-guidelines](https://github.com/amchavan/alma-ui-guidelines), 
included via a dependency entry in  _package.json_.  
See [here](https://github.com/amchavan/alma-ui-guidelines/blob/master/README.md) 
for more info.

