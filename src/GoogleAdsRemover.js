/**
 * GoogleAdsRemover Class
 * 
 * Removes Google Ads DOM elements from the web page.
 * The to be removed elements are defined by default in GoogleAdsRemover.sniffers.
 * Alternatively, you can pass in custom sniffers to the constructor or the setSniffers() method.
 * By default, it will start watching by parameters defined in GoogleAdsRemover.watch, causeing the Google Ads DOM elements removal at
 * ...this.watch.frequancyMs frequency.
 * Call removeAdsElements() manually to remove Google Ads DOM elements.
 * 
 * @Properties
 * 
 *  @property {String[]} sniffers
 *  @property {HTMLElement[]} adsElements
 * 
 * @PublicMethods
 * 
 *  setSniffers(sniffers: string[], overwrite: boolean): void
 *  getSniffers(): string[]
 *  getAdsElements(): HTMLElement[]
 *  sniffAdsElements(): HTMLElement[]
 *  removeAdsElements(): void
 * 
 * @Usage
 * 
 *  // with default sniffers
 *  googleAdsRemover = new GoogleAdsRemover();
 *  googleAdsRemover.removeAdsElements();
 * 
 *  // with more sniffers
 *  googleAdsRemover = new GoogleAdsRemover({
 *      sniffers: ['.mynew-ads-sniffer', '#my-other-new-sniffer']
 *  });
 *  googleAdsRemover.removeAdsElements();
 * 
 */

function GoogleAdsRemover(options = {}) {
    this.sniffers = [];
    this.adsElements = [];
    this.watch = null; 
    this._init(options);
}

/**
 * Inits a class instance
 * @param {Object} options 
 *  .sniffers {String[] | undefined} optional
 *  .css {String | undefined} optional
 *  .watch {Object | undefined} optional
 *      .enable {Boolean}
 *      .frequencyMs {Number}
 *      .watcher {Number} (setInterval result)
 */
GoogleAdsRemover.prototype._init = function(options) {
    this._initCss(options.css);
    this._initSniffers(options.sniffers);
    this._initAdsElements();
    this._initWatch(options.watch);
};

/**
 * Injects the css into the dom
 * @param {String} css 
 */
GoogleAdsRemover.prototype._initCss = function(css) {
    css = css || GoogleAdsRemover.css;
    const styles = document.createElement('style');
    styles.rel = 'stylesheet';
    styles.innerHTML = css;
    document.getElementsByTagName('head')[0].appendChild(styles);
};

GoogleAdsRemover.prototype._initSniffers = function(sniffers) {
    this.setSniffers(sniffers);
};

GoogleAdsRemover.prototype._initAdsElements = function() {
    this.sniffAdsElements();
};

GoogleAdsRemover.prototype._initWatch = function(watch) {
    this.watch = watch || GoogleAdsRemover.watch;
    if (this.watch.enable) {
        this.watchStart();
    }
};

GoogleAdsRemover.prototype.getSniffers = function() {
	return this.sniffers;
};

GoogleAdsRemover.prototype.setSniffers = function(sniffers, overwrite = false) {
    if (overwrite) {
        this.sniffers = sniffers;
    } else {
        this.sniffers = sniffers ?
            [...GoogleAdsRemover.sniffers, ...sniffers] :
            GoogleAdsRemover.sniffers
    }
};

GoogleAdsRemover.prototype.getAdsElements = function() {
	return this.adsElements;
};

/**
 * Sniffs all adsElements based on this.sniffers
 * For each this.sniffers, queries the dom and add the results to this.adsElements
 * @returns {HTMLElement[]}
 */
GoogleAdsRemover.prototype.sniffAdsElements = function() {
    this.adsElements = this._sniffElements(this.sniffers);
    return this.adsElements;
};

/**
 * Toggles the ads eleemnts hiliting
 */
GoogleAdsRemover.prototype.hiliteAdsElementsToggle = function() {
	this.adsElements.forEach(adsElement => adsElement.classList.toggle('gar-ads-hilite'));
};

/**
 * Sniffs dom elements based sniffers
 * For each sniffers, queries the dom and store the results
 * @param {String[]}
 * @returns {HTMLElement[]}
 */
GoogleAdsRemover.prototype._sniffElements = function(sniffers) {

    let elements = [];

    sniffers.forEach(sniffer => {
        const snifferElements = document.querySelectorAll(sniffer);
        elements = [
            ...elements,
            ...Array.from(snifferElements)
        ]
    });

    return elements;

};

GoogleAdsRemover.prototype.removeAdsElements = function() {
    this._removeElements(this.adsElements);
};

GoogleAdsRemover.prototype._removeElements = function(elements) {
	elements.forEach(function(element) {
        element.style.setProperty('display', 'none', 'important');
	});
};

/**
 * Starts watching for Google Ads DOM elements.
 * This will cause the removeAdsElements() method to be called at this.watch.frequancyMs interval.
 */
GoogleAdsRemover.prototype.watchStart = function() {
    this.watch.watcher = setInterval(() => {
        this.removeAdsElements();
    }, this.watch.frequancyMs);
};

/**
 * Stops watching
 */
GoogleAdsRemover.prototype.watchStop = function() {
    clearInterval(this.watch.watcher);
};

GoogleAdsRemover.sniffers = [
	".adsbygoogle",
	"[id^=google_ads_iframe]",
];

GoogleAdsRemover.css = `
    .gar-ads-hilite {
        padding: 10px;
        border: 1px solid red
    }
`;

GoogleAdsRemover.watch = {
    enable: true,
    frequancyMs: 5000,
    watcher: null
};

module.exports = GoogleAdsRemover;
