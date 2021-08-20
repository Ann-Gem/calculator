class AverageSection {
  constructor() {
    this.currentAveragePrice = 0;
    this.currentProfit = 0;
    this._curPrice1 = 0;
    this._wishPrice1 = 0;
    this._wishPrice2 = 0;
    // this.currentAveragePrice = 0;
    // this.amount = 0;
    // this.price = 0;
    this.initialize();
    this.initEventListeners();
  }

  getPubsubEvent(params) {
    console.log(`container= ${params.container}`);
    console.log(`state= ${params.state}`);
    console.log(params.state);
  }

  initialize() {
    // Средняя цена позиции:
    this.averagePriceOfPos = document.getElementById("avg-price-of-pos");
    // Текущий профит
    this.curProfit1 = document.getElementById("cur-profit-1");
    // Количество акций к покупке:
    this.countOfShare1 = document.getElementById("shares");

    /// INPUTS ///
    // Текущая цена
    this.curPrice1 = document.getElementById("cur-price-1");
    // Желаемая средняя цена
    this.wishPrice1 = document.getElementById("wish-price-1");
    // Текущая цена
    this.wishPrice2 = document.getElementById("wish-price-2");
  }

  initEventListeners() {
    this.validateNumberInput(this.curPrice1);
    this.validateNumberInput(this.wishPrice1);
    this.validateNumberInput(this.wishPrice2);

    this.curPrice1.addEventListener("input", () => {
      this._curPrice1 = this.curPrice1.value;

      this.publishModel(this._curPrice1,this._wishPrice1, this._wishPrice2);

    });

    this.wishPrice1.addEventListener("input", () => {
      this._wishPrice1 = this.wishPrice1.value;
      this.publishModel(this._curPrice1,this._wishPrice1, this._wishPrice2);
    });
    this.wishPrice2.addEventListener("input", () => {
      this._wishPrice2 = this.wishPrice2.value;
      this.publishModel(this._curPrice1,this._wishPrice1, this._wishPrice2);
    });
  }

  validateNumberInput(input_field) {
    input_field.addEventListener(
      "keypress",
      function (e) {
        var key = !isNaN(e.charCode) ? e.charCode : e.keyCode;
        function keyAllowed() {
          var keys = [
            8, 9, 13, 16, 17, 18, 19, 20, 27, 46, 48, 49, 50, 51, 52, 53, 54,
            55, 56, 57, 91, 92, 93,
          ];
          if (key && keys.indexOf(key) === -1) return false;
          else return true;
        }
        if (!keyAllowed()) e.preventDefault();
      },
      false
    );

    input_field.addEventListener(
      "paste",
      function (e) {
        var pasteData = e.clipboardData.getData("text/plain");
        if (pasteData.match(/[^0-9]/)) e.preventDefault();
      },
      false
    );
  }

  publishModel(_curPrice1,_wishPrice1, _wishPrice2) {
    console.log("price_changed -событие!!");
    EventBus.publish("price_changed", {
      curPrice1: _curPrice1,
      wishPrice1: _wishPrice1,
      wishPrice2: _wishPrice2,
    });
  }

  setCurrentAveragePrice(currentAveragePrice) {
    this.averagePriceOfPos.textContent = "+ " + currentAveragePrice.toString();
  }
  setAveragePriceOfPos(value) {
    this.averagePriceOfPos.value = value;
  }

  setCurProfit1(value) {
    this.curProfit1.textContent = " " + value + " $";
  }

  // // Текущая цена//////////////////////////////////////////////////////////////////
  // get curPrice1() {
  //     return this._curPrice1;
  // }
  setCurPrice1(value) {
    this.curPrice1.value = value;
  }
  getCurPrice1() {
    return this._curPrice1;
  }
  // // Желаемая средняя цена/////////////////////////////////////////////////////////
  getWishPrice1() {
    return this._wishPrice1;
  }
  setWishPrice1(value) {
    this.wishPrice1.value = value;
  }
  // // Текущая цена//////////////////////////////////////////////////////////////////
  getWishPrice2() {
    return this._wishPrice2;
  }
  setWishPrice2(value) {
    this.wishPrice2.value = value;
  }
  // // Количество акций к покупке:////////////////////////////////////////////////////
  // get countOfShare1() {
  //     return this._countOfShare1;
  // }
  setCountOfShare1(value) {
    // this.countOfShare1 = value;
    this.countOfShare1.textContent =  " " + value;
  }
}
