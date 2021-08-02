let container1 = document.getElementById('container1');
let container2 = document.getElementById('container2');
let inputCountToBuy = 0;

function createForm(container) {
  let resultArray = [];
  let plus = container.getElementsByClassName('plus');
  let minus = container.getElementsByClassName('minus');
  let addBtn= container.getElementsByClassName('add');
  let inputAmount = container.getElementsByClassName('counter-units');
  let inputPrice = container.getElementsByClassName('unit-price');

  plus[0].addEventListener('click', () => {
  inputCountToBuy = Number(changingCount('plus', inputAmount[0]));
  addButtonControl(inputPrice[0].value, inputAmount[0].value, addBtn[0]);
  });

  minus[0].addEventListener('click', () => {
  inputCountToBuy = Number(changingCount('minus', inputAmount[0]));
  addButtonControl(inputPrice[0].value, inputAmount[0].value, addBtn[0]);
  })

  addBtn[0].addEventListener('click', function () {
  addRecord(Number(inputPrice[0].value),Number(inputAmount[0].value),'container-content-items-1','norec-1',0);
  inputPrice.value = "";
  inputAmount.value = "";
  addButtonControl(0, 0, addBtn[0]);

  })

  // [].forEach.call(plus,function(el) {
  //   el.addEventListener('click', () => {
  //     inputAmount = Number(changingCount('plus', inputAmount));
  //     addButtonControl(inputPrice.value, inputAmount.value, addBtn[0]);
  // })
  // });

  // [].forEach.call(minus,function(el) {
  //   el.addEventListener('click', () => {
  //     inputAmount = Number(changingCount('minus', inputAmount));
  //     addButtonControl(inputPrice.value, inputAmount.value, addBtn[0]);
  // })
  // });
  // [].forEach.call(addBtn, function(el) {
  //   el.addEventListener('click', function () {
  //     addRecord(Number(inputPrice.value),Number(inputAmount.value),'container-content-items-1','norec-1',0);
  //     inputPrice.value = "";
  //     inputAmount.value = "";
  //     addButtonControl(0, 0, addBtn);
  // })
  // })

}


createForm(container1);
createForm(container2);





// Точки входа

// const plus1 = document.getElementById('pl1');
// const minus1 = document.getElementById('mn1');
// const divTable = document.getElementsByClassName("container-content");
// const addBtn = document.getElementById('buy');

// const plus2 = document.getElementById('pl2');
// const minus2 = document.getElementById('mn2');
// const sellBtn = document.getElementById('sell');
// ////////////////////////////////////
// const inputPrice1 = document.getElementById('add-input');
// const inputPrice2 = document.getElementById('sell-input');
// const inputCount1 = document.getElementById('count-to-buy');
// const inputCount2 = document.getElementById('count-to-sell');
////////////////////////////////////
// let itemPrice1 = 0;
// let itemPrice2 = 0;
// let itemSum = 0;
// let inputCountToBuy = 0;
// let inputCountToSell = 0;
////////////////////////////////////


function changingCount(sign, element) {
  if (sign == 'plus')
    element.value++;
  else if (element.value > 0)
    element.value--;
  return element.value;
}
////////////////////////////////////
function addButtonControl(price, amount, element) {
  if (price == 0 || amount == 0) {
    element.setAttribute("disabled", true);
  }
  else {
    element.removeAttribute('disabled');
  }
}

function addRecord(price, amount,className1,norec){
  if ((price <= 0) || (amount <= 0)) {
    return;
  } else {
    let result = [];
    let recordRow = document.createElement('div');
    recordRow.classList.add(className1);
    let recordAmount = document.createElement('div');
    recordAmount.classList.add('item', 'count');
    recordAmount.insertAdjacentHTML('afterbegin', `<span>${amount}</span>`);
    let recordPrice = document.createElement('div');
    recordPrice.classList.add('item', 'price', 'currency');
    recordPrice.insertAdjacentHTML('afterbegin', `<span>${price}</span>`)
    let recordSum = document.createElement('div');
    recordSum.classList.add('item', 'sum', 'currency');
    recordSum.insertAdjacentHTML('afterbegin', `<span>${amount * price}</span>`);
    let del = document.createElement('div');
    del.classList.add('btn-del');
    let delBtn = document.createElement('button');
    delBtn.classList.add('del');
    delBtn.insertAdjacentElement('afterbegin', del);
    /// добавление
    recordRow.insertAdjacentElement('beforeend', recordAmount);
    recordRow.insertAdjacentElement('beforeend', recordPrice);
    recordRow.insertAdjacentElement('beforeend', recordSum);
    recordRow.insertAdjacentElement('beforeend', delBtn);
    price = "";
    amount = "";

    let divDefault = document.getElementById(norecId);
    delBtn.addEventListener('click', function () {
      recordRow.remove();
      let div = document.createElement('div');
      div.className = "no-recording";
      div.id =norecId;
      div.innerHTML = "Нет записей";
      if (document.getElementsByClassName(className1).length == 0)
        divTable[iter].insertAdjacentElement('beforeend', div);
    });
    if (divDefault) {
      divDefault.remove();
    }
    divTable[iter].appendChild(recordRow);
    if (!recordRow) {
      divTable[iter].insertAdjacentElement('afterbegin', divDefault);
    }
  }
}

////////////////////////////////////
// addBtn.addEventListener('click', function () {
//   addRecord(Number(inputPrice1.value),Number(inputCount1.value),'container-content-items-1','norec-1',0);
//   inputPrice1.value = "";
//   inputCount1.value = "";
//   addButtonControl(0, 0, addBtn);

// })
// ////////////////////////////////////
// sellBtn.addEventListener('click', function () {
//   addRecord(Number(inputPrice2.value),Number(inputCount2.value),'container-content-items-2','norec-2',1);
//   inputPrice2.value = "";
//   inputCount2.value = "";
//   addButtonControl(0, 0, sellBtn);

// })


////////////////////////////////////
// plus1.addEventListener('click', () => {
//   inputCountToBuy = Number(changingCount('plus', inputCount1));
//   addButtonControl(inputPrice1.value, inputCount1.value, addBtn);
// });

// minus1.addEventListener('click', () => {
//   inputCountToBuy = Number(changingCount('minus', inputCount1));
//   addButtonControl(inputPrice1.value, inputCount1.value, addBtn);
// })

// plus2.addEventListener('click', () => {
//   inputCountToSell = Number(changingCount('plus', inputCount2));
//   addButtonControl(inputPrice2.value, inputCount2.value, sellBtn);
// })

// minus2.addEventListener('click', () => {
//   inputCountToSell = Number(changingCount('minus', inputCount2));
//   addButtonControl(inputPrice2.value, inputCount2.value, sellBtn);
// })


////////////////////////////////////
// inputPrice1.addEventListener('input', () => {
//   itemPrice1 = Number(inputPrice1.value);
//   addButtonControl(inputPrice1.value, inputCount1.value, addBtn);
// })

// ////////////////////////////////////
// inputCount1.addEventListener('input', () => {
//   inputCountToBuy = Number(inputCount1.value);
//   addButtonControl(inputPrice1.value, inputCount1.value, addBtn);
// })
// ////////////////////////////////////
// inputPrice2.addEventListener('input', () => {
//   itemPrice2 = Number(inputPrice2.value);
//   addButtonControl(inputPrice2.value, inputCount2.value, sellBtn);
// })
// ////////////////////////////////////
// inputCount2.addEventListener('input', () => {
//   inputCountToSell = Number(inputCount2.value);
//   addButtonControl(inputPrice2.value, inputCount2.value, sellBtn);
// });

