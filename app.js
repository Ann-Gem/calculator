const container1 = document.getElementById("container1");
const container2 = document.getElementById("container2");

const st1 = [];
const st2 = [];
const formBuy = new FormCreator({ container: container1, state: st1 });
const formSell = new FormCreator({ container: container2, state: st2 });

const formAverage = new AverageSection();

EventBus.subscribe("model_changed", this.changedModelEvent);
EventBus.subscribe("price_changed", this.changedPriceEvent);

let state1 = formBuy.getState();
let state2 = formSell.getState();
// let profit = calculateProfit();

let _curPrice1 = 0;
let _wishPrice1 = 0;
let _wishPrice2 = 0;

let resArr = [];

let params1 = {
  container: "",
  state: [],
};
params1.container = "container1";
params1.state = state1;

let params2 = {
  container: "",
  state: [],
};
params2.container = "container2";
params2.state = state2;

// let profit = calculaterProfit(_state1,_state2);

// recalculateEvent(params1);
// recalculateEvent(params2);
///////////////////////////////////////

function changedModelEvent(params) {
  console.log(`container= ${params.container}`);
  if (params.container === "container1") {
    console.log(`state1= ${params.state}`);
    console.log(params.state);
    state1 = params.state;
  } else if (params.container === "container2") {
    console.log(`state2= ${params.state}`);
    console.log(params.state);
    state2 = params.state;
  }

  totalRecalculation();
  // if getStateStorageAmount()>
}

///////////////////////////Усреднение//////////////////////////////
function changedPriceEvent(params) {
  _curPrice1 = Number(params.curPrice1);
  _wishPrice1 = Number(params.wishPrice1);
  _wishPrice2 = Number(params.wishPrice2);

  totalRecalculation();
}

function totalRecalculation() {
  // state1;
  // state2;

  // _curPrice1 ;
  // _wishPrice1 ;
  // _wishPrice2;

  resArr = calculaterProfitAvg(state1, state2);
  countAmountShares(...resArr);
  // if (resArr[2] && resArr[3]) {
  //   countAmountShares(...resArr);
  // }

  // resArr = calculateAverage(state1, state2);
  // if(this._wishPrice1> 0 && this._curPrice1  > 0&& this._wishPrice2) {
  //   countAmountShares(...resArr);
  // }
}

//////////////////////////////////////
//////////////////   профит   ////////////////////////////////////

function calculaterProfitAvg(_state1, _state2) {
  // for (let k = 0; k < _state2.length - 1; k++) {
  //   for (let h = _state1.length - 1; h >= 0; h--){
  //     debugger;
  //     if (_state2.length==0) break;
  //       if(_state2[k].id <_state1[h].id) {

  //         _state2 = statlong2.filter((n) => { return n.id > statlong1[h].id });

  //       }
  // }}

  let statlong1 = createLongState(_state1);
  let statlong2 = createLongState(_state2);
  let arr_profit = [];
  // let arr_avg = statlong1;
  let profitl = 0;
  let avg = 0;

  if (statlong1.length > 0)
    statlong2 = getStateBeforeDateTime(statlong2, statlong1[0].id);
  let realcount = Number(
    parseInt(Math.min(statlong1.length, statlong2.length))
  );
  //////////////////////   profit  ///////////////////////////////////////////////////////
  for (let k = 0; k < realcount; k++) {
    for (let h = statlong1.length - 1; h >= 0; h--) {
      if (statlong2[k].id >= statlong1[h].id) {
        let record1 = {
          //   id: this.state.length > 0 ? this.state[this.state.length - 1].id + 1 : 1,
          id: statlong2[k].id,
          amount: 1,
          profit: Number(statlong2[k].price) - Number(statlong1[h].price),
          // ,sum: Number(amount1) * Number(price1)
        };
        arr_profit.push(record1);
        profitl += Number(record1.profit);
        // statlong1 = statlong1.splice(statlong1[h],1)
        statlong1 = statlong1.filter((n) => {
          return n != statlong1[h];
        });

        break;
      }
      // else
      //   statlong2 = statlong2.filter((n) => { return n.id > statlong1[h].id });
    }
  }

  console.log("arr_avg=");
  console.log(statlong1);

  avg = calculateAverage(statlong1);

  formAverage.setCurProfit1(profitl);
  // formAverage.setAveragePriceOfPos(avg);
  formAverage.setCurrentAveragePrice(avg);

  // let curP = Number(formAverage.wishPrice2.value);
  // let wishP = Number(formAverage.wishPrice1.value);

  debugger;

  console.log("arr_profit=");
  console.log(arr_profit);
  ////////////////////////
  console.log("profitl=");
  console.log(profitl);

  console.log("avg=");
  console.log(avg);
  ////////////////////////
  console.log("statlong1.length=");
  console.log(statlong1.length);

  //   let  _curPrice1 = 0;
  // let  _wishPrice1 = 0;
  // let  _wishPrice2 = 0;

  ////////////////////////
  console.log("_curPrice1=");
  console.log(_curPrice1);

  ////////////////////////
  console.log("_wishPrice1=");
  console.log(_wishPrice1);

  console.log("_wishPrice2=");
  console.log(_wishPrice2);

  return [Number(avg), Number(statlong1.length), _wishPrice2, _wishPrice1];
}

function countAmountShares(avgPrice, amount, curP, wishP) {
  let sharesToBuy;



  // curP = Number(formAverage.wishPrice2);

  // wishP = Number(formAverage.wishPrice1);

  // sharesToBuy = ((Number(avgPrice)-Number(wishP))/(Number(wishP)-Number(curP)))*Number(amount);
  debugger;
  if (curP <= 0 || wishP <= 0||avgPrice<=0 || amount<=0) {
    formAverage.setAveragePriceOfPos(0);
    formAverage.setCountOfShare1(0);
    sharesToBuy=0;
    // return 0;
  } else {
    sharesToBuy=0;
    formAverage.setAveragePriceOfPos(avgPrice);
    sharesToBuy = Number(((avgPrice - wishP) / (wishP - curP)) * amount);
    formAverage.setCountOfShare1(sharesToBuy);


  }
  return sharesToBuy.toFixed(2);
  // formAverage.setCountOfShare1(sharesToBuy);
}

/////////////////////////////////////////////////////////////////////////////

function createLongState(_state) {
  if (_state.length === 0) return 0;
  let statenew = [];

  for (let i = 0; i < _state.length; i++) {
    let countnew = _state[i].amount;
    for (let j = 0; j < countnew; j++) {
      let record = {
        //   id: this.state.length > 0 ? this.state[this.state.length - 1].id + 1 : 1,
        id: _state[i].id,
        amount: 1,
        price: _state[i].price,
        // ,
        // sum: Number(amount1) * Number(price1)
      };
      statenew.push(record);
      // statenew.push({_state.i,});
    }
  }
  return statenew;
}

function getStateBeforeDateTime(_state1, _datetime) {
  let statecorrect = [];
  if (_state1.length > 0) {
    for (let i = 0; i < _state1.length; i++) {
      if (_state1[i].id >= _datetime) statecorrect.push(_state1[i]);
    }
  }
  //  console.log("statecorrect=");
  //   console.log(statecorrect);
  return statecorrect;
}

function calculateAverage(_state) {
  let count1 = 0;
  let sum1 = 0;
  let _avg = 0;
  if (_state.length < 0) return 0;

  for (let i = 0; i < _state.length; i++) {
    count1 += _state[i].amount;
    sum1 += _state[i].amount * _state[i].price;
  }
  if (count1 != 0) _avg = sum1 / count1;

  return Number(_avg).toFixed(2);
}

function calculateComboAverage(_state1, _state2) {
  let count1 = 0;
  let sum1 = 0;
  let _avg = 0;
  if (_state.length < 0) return 0;

  for (let i = 0; i < _state.length; i++) {
    count1 += _state[i].amount;
    sum1 += _state[i].amount * _state[i].price;
  }
  if (count1 != 0) _avg = sum1 / count1;

  return Number(_avg).toFixed(2);
}

function calculateOldProfit(_state1, _state2) {
  let count1 = 0;
  let sum1 = 0;
  let count2 = 0;
  let sum2 = 0;
  if (_state1.length > 0) {
    for (let i = 0; i < _state1.length; i++) {
      count1 += _state1[i].amount;
      sum1 += _state1[i].amount * _state1[i].price;
    }
  }
  if (_state2.length > 0) {
    for (let i = 0; i < _state2.length; i++) {
      count2 += _state2[i].amount;
      sum2 += _state2[i].amount * _state2[i].price;
    }
  }

  _profit = sum2 * count2 - sum1 * count1;

  // if (count1!=0)
  //     _avg=sum1/count1;

  return _profit;
}
