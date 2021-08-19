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

    getPubsubEvent (params) {
        console.log(`container= ${params.container}`);
        console.log(`state= ${params.state}`);
        console.log(params.state);
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


    ///////////новое//////////////////////////////////////////////////////////////////////

    // initEventListeners() {
    //     this.wishPrice1.addEventListener('input', () => {
    //         this.wishPrice1 = this.wishPrice1.value;
    //     });
    //     this.wishPrice2.addEventListener('input', () => {
    //         this.wishPrice2 = this.wishPrice2.value;
    //     })
    // }

    publishModel(wishPrice1, wishPrice2) {
        console.log('price_changed -событие!!')
        EventBus.publish('price_changed', {
            wishPrice1: wishPrice1,
            wishPrice2: wishPrice2
        })
      }

    setCurrentAveragePrice(currentAveragePrice) {
        this.averagePriceOfPos.textContent='+ '+ currentAveragePrice.toString();
}
    setAveragePriceOfPos(value) {
        this.averagePriceOfPos.value = value;
    }

    setCurProfit1(value) {
        this.curProfit1.textContent=' '+ value+' $';
    }

    // // Текущая цена//////////////////////////////////////////////////////////////////
    // get curPrice1() {
    //     return this._curPrice1;
    // }
    setCurPrice1(value) {
        this.curPrice1.value  = value;
    }
    // // Желаемая средняя цена/////////////////////////////////////////////////////////
    getWishPrice1() {
        return this._wishPrice1;
    }
    setWishPrice1(value) {
        this.wishPrice1.value  = value;
    }
    // // Текущая цена//////////////////////////////////////////////////////////////////
    getWishPrice2() {
        return this._wishPrice2;
    }
    setWishPrice2(value) {
        this.wishPrice2.value  = value;
    }
    // // Количество акций к покупке:////////////////////////////////////////////////////
    // get countOfShare1() {
    //     return this._countOfShare1;
    // }
    setCountOfShare1(value) {
        // this.countOfShare1 = value;
        this.countOfShare1.textContent='+ '+ value;
    }
}