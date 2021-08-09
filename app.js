import * as importObj1  from './form-creator.js'
import * as importObj2  from './average-section.js'


const container1 = document.getElementById('container1');
const container2 = document.getElementById('container2');


const formBuy = new FormCreator(container1);
const formSell = new FormCreator(container2);
const formAverage = new AverageSection();



const state1 =formBuy.getState();
const state2 =formSell.getState();
// let profit = calculateProfit();
formAverage.setAveragePriceOfPos(25);

// formAverage.setCurProfit1(2000)
// formAverage.setCurPrice1(999);
// formAverage.setWishPrice1(999);
// formAverage.setWishPrice2(999);
// formAverage.setCountOfShare1(999);

// _state1,_state2


// const pubSub = require("./pubsub");
// pubSub.subscribe("anEvent", data => {
//     console.log(
//         `"anEvent", was published with this data: "${data.msg}"`
//     );
// });




function calculateAverage(_state)
{
    let count1=0;
    let sum1=0;
    let _avg= 0;
    if(this._state.length < 0) return;

    for (let i = 0; i < this._state.length; i++) {
        count1+= this._state[i].amount;
        sum1+=this._state[i].amount*this._state[i].price;
    }
    if (count1!=0)
        _avg=sum1/count1;

    return _avg;
}

function calculateProfit(_state1,_state2)
{
    let count1=0;
    let sum1=0;
    let count2=0;
    let sum2=0;
    if(_state1.length > 0) {
      for (let i = 0; i < _state1.length; i++) {
        count1+= _state1[i].amount;
        sum1+=_state1[i].amount*_state1[i].price;
      }
    }
    if(_state2.length >0) {
      for (let i = 0; i < _state2.length; i++) {
        count2+= _state2[i].amount;
        sum2+=_state2[i].amount*_state2[i].price;
      }
    }

    _profit=sum2*count2-sum1*count1;

    // if (count1!=0)
    //     _avg=sum1/count1;

    return _profit;

}

// console.log("estate===");
// console.log(estate);

// const formBuy= new FormCreator(container1);

// const formSell= new FormCreator(container2);

// //formBuy.state сюда приходит
// function calculate() {

// }

// formBuy.subscribe(calculate);

// formBuy.state


// addTableRow(id, amount, price, sum) {};
// deleteTableRow(id) {};
// subcsribe(callback);
// this.state