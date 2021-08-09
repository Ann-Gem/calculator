class AverageSection {
    constructor() {

        this.currentAveragePrice = 0;
        this.currentProfit = 0;
        // this.currentAveragePrice = 0;
        // this.amount = 0;
        // this.price = 0;
        this.initialize();
        // this.initEventListeners();
    }

    initialize() {
        // Средняя цена позиции:
        this.averagePriceOfPos = document.getElementById('avg-price-of-pos');

        // Текущая цена
        this.curPrice1 = document.getElementById('cur-price-1');

        // Текущий профит
        this.curProfit1 = document.getElementById('cur-profit-1');


        // Желаемая средняя цена
        this.wishPrice1 = document.getElementById('wish-price-1');
        // Текущая цена
        this.wishPrice2 = document.getElementById('wish-price-2');
        // Количество акций к покупке:
        this.countOfShare1 = document.getElementById('shares');
    }

    setCurrentAveragePrice(currentAveragePrice) {
        this.currentAveragePrice.textContent='+ '+ currentAveragePrice+' $';
    }
    setAveragePriceOfPos(value) {
        this.averagePriceOfPos.value = value;
    }

    setCurProfit1(value) {
        this.curProfit1.textContent=' '+ value+' $';
    }

    // // Текущая цена
    // get curPrice1() {
    //     return this._curPrice1;
    // }
    setCurPrice1(value) {
        this.curPrice1.value  = value;
    }
    // // Желаемая средняя цена
    // get wishPrice1() {
    //     return this._wishPrice1;
    // }
    setWishPrice1(value) {
        this.wishPrice1.value  = value;
    }
    // // Текущая цена
    // get wishPrice2() {
    //     return this._wishPrice2;
    // }
    setWishPrice2(value) {
        this.wishPrice2.value  = value;
    }
    // // Количество акций к покупке:
    // get countOfShare1() {
    //     return this._countOfShare1;
    // }
    setCountOfShare1(value) {
        // this.countOfShare1 = value;
        this.countOfShare1.textContent='+ '+ value+' шт.';
    }
}