## google-ads-remover module

Removes Google Ads DOM elements from the web page.  
The to be removed elements are defined by default in GoogleAdsRemover.sniffers.  
Alternatively, you can pass in custom sniffers to the constructor or the setSniffers() method.  
By default, it will start watching by parameters defined in GoogleAdsRemover.watch, causeing the Google Ads DOM elements removal at this.watch.frequancyMs frequency.  
Call removeAdsElements() manually to remove Google Ads DOM elements.  
The removal is accomplished through a element.style.display = 'none !important'

## Use in your code

Use the module in your code, like so:

```
const GoogleAdsRemover = require('lib/google-ads-remover.js');
const gar = new GoogleAdsRemover();
```

This will run an instance of GoogleAdsRemover in watch mode.  
It will try to remove the Ads DOM Elements identified by GoogleAdsRemover.sniffers.

```
const GoogleAdsRemover = require('lib/google-ads-remover.js');
const gar = new GoogleAdsRemover({
    sniffers: [
        '#my-custom-ads-id',
        '.my-custom-ads-class'
    ]
});
```

This will run an instance of GoogleAdsRemover in watch mode.  
It will try to remove the Ads DOM Elements identified by both GoogleAdsRemover.sniffers and the custom sniffers passed intoo the constructor.

## Run development

```
> npm start
```

## Run test

```
> npm run test
```

## Build the lib

```
> npm run build:lib
```

## Build the web demo

```
> npm run build:web-sample
```

## Run the web demo

Open dist/index.html in a web browser.
