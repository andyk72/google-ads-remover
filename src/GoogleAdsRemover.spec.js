const GoogleAdsRemover = require('./GoogleAdsRemover');

describe('GoogleAdsRemover Class', () => {

    let googleAdsRemover;
    let defaultSniffers;

    beforeEach(() => {
        googleAdsRemover = new GoogleAdsRemover();
        defaultSniffers = GoogleAdsRemover.sniffers;
    });

    describe('sniffers', () => {

        it('has a default static sniffers array', () => {
            expect(defaultSniffers).toBeInstanceOf(Array);
        });

        it('inits with default sniffers if no sniffers are passed to the constructor', () => {
            // setup
            const expectedSniffers = defaultSniffers;
            
            // action
            const sniff = googleAdsRemover.getSniffers();
            
            // test
            expect(sniff).toEqual(defaultSniffers);
        });

        it('inits with integrated sniffers if new sniffers are passed to the constructor', () => {
            // setup
            const newSniffers = ['.mynew-ads-sniffer'];
            const expectedSniffers = [...defaultSniffers, ...newSniffers];
            
            // action
            googleAdsRemover = new GoogleAdsRemover({
                sniffers: newSniffers
            });
            const sniff = googleAdsRemover.getSniffers();
            
            // test
            expect(sniff).toEqual(expectedSniffers);
        });

    });

    describe('domAdsElements', () => {

        let html,
            expectedAdsElementsNum,
            expectedAdsElementsRemovedNum;

        beforeEach(() => {

            html = `
                <div>
                    <div class="adsbygoogle">ADS BY GOOGLE 1</div>
                    <div class="non-ads-div">I AM REAL CONTENT, NOT GOOGLE ADS</div>
                    <div class="adsbygoogle">ADS BY GOOGLE 2</div>
                    <div class="non-ads-div">I AM REAL CONTENT, NOT GOOGLE ADS</div>
                    <div id="google_ads_iframe_1">GOOGLE ADS IFRAME 1</div>
                </div>
            `;

            document.body.innerHTML = html; // load html into document

            expectedAdsElementsNum = 3;
            expectedAdsElementsRemovedNum = expectedAdsElementsNum;

        });

        it('sniffs DOM ads elements correctly', () => {

            // action
            const adsElements = googleAdsRemover.sniffAdsElements();

            // test
            expect(adsElements.length).toEqual(expectedAdsElementsNum);
            adsElements.forEach(adsElement => {
                expect(adsElement instanceof HTMLElement).toEqual(true);
            });
            
        });

        it('removes DOM ads elements correctly', () => {

            // test if ads elements exist
            const adsElements = googleAdsRemover.sniffAdsElements();
            expect(adsElements.length).toEqual(expectedAdsElementsNum);

            // remove ads elements
            googleAdsRemover.removeAdsElements();

            // test that ads elements do not exist any more
            const removedElements = document.querySelectorAll('[style="display: none;"]');
            expect(removedElements.length).toEqual(expectedAdsElementsRemovedNum);

        });

    });

});