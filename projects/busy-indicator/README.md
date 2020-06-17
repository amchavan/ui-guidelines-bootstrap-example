# BusyIndicator

Implements a simple "I'm busy" modal indicator, showing a rotating figure on a
semi-transparent background.

## Build

Run `ng build busy-indicator` to build the project.  
The build artifacts will be stored in the `dist/` directory.

## Publishing

After building:
```shell script
cd dist/busy-indicator
npm publish --private=false
```

## Usage

### package.json
Add `"@almaobservatory/busy-indicator": "^0.0.9"` to the _dependencies_ 
element

### app.module.ts
Add an import statement:
```typescript
import { BusyIndicatorModule, BusyIndicatorComponent, BusyIndicatorService } from '@almaobservatory/busy-indicator';
```
In the `@NgModule` declaration:
* Add `BusyIndicatorModule` to the `imports` element
* Add `BusyIndicatorService` to the `providers` element
* Add `BusyIndicatorComponent` to the `entryComponents` element

### HTML page(s)
The indicator should be placed so that it ends up at the top of the main HTML
page, _index.html_; for instance, at the top of the page header:
```html
<busy-indicator></busy-indicator>
```

### Showing and hiding the indicator

The indicator should be shown when a "long" operation is taking
place, and the user needs to wait. The class controlling the
indicator should inject an instance of the `BusyIndicatorService`
and use its `show()` and `hide()` methods:

```typescript
    constructor( private busyIndicatorService: BusyIndicatorService ) {
    }

    this.busyIndicatorService.show();

    // Perform some lengthy operation

    this.busyIndicatorService.hide();
```
