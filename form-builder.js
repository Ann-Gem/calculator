let container1 = document.getElementById('container1');
let container2 = document.getElementById('container2');
let inputCountToBuy = 0;
let itemPrice = 0;

function createForm(container) {
  let form = {};
  let res = {};
  let state = [];
  let plus = container.getElementsByClassName('plus')[0];
  let minus = container.getElementsByClassName('minus')[0];
  let addBtn = container.getElementsByClassName('add')[0];
  let inputAmount = container.getElementsByClassName('counter-units')[0];
  let inputPrice = container.getElementsByClassName('unit-price')[0];
  let divTable = container.getElementsByClassName('container-content')[0];

  plus.addEventListener('click', () => {
    inputCountToBuy = Number(changingCount('plus', inputAmount));
    addButtonControl(inputPrice.value, inputAmount.value, addBtn);
  });

  minus.addEventListener('click', () => {
    inputCountToBuy = Number(changingCount('minus', inputAmount));
    addButtonControl(inputPrice.value, inputAmount.value, addBtn);
  });

  inputPrice.addEventListener('input', () => {
    itemPrice = Number(inputPrice.value);
    addButtonControl(inputPrice.value, inputAmount.value, addBtn);
  });

  inputAmount.addEventListener('input', () => {
    inputCountToBuy = Number(inputAmount.value);
    addButtonControl(inputPrice.value, inputAmount.value, addBtn);
  });

  addBtn.addEventListener('click', function () {
    addRecord(Number(inputPrice.value), Number(inputAmount.value), divTable, state);
    commitRecord(inputPrice.value, inputAmount.value, state)
    clearInputs(inputPrice, inputAmount);

    addButtonControl(0, 0, addBtn);
    console.log(state);
    return state;

  });

  return form = {
    plus: plus,
    minus: minus,
    inputAmount: inputAmount,
    inputPrice: inputPrice,
    divTable: divTable,
    addBtn: addBtn,
    state: state,
  };

}

function clearInputs(input1, input2) {
  input1.value = "";
  input2.value = "";
}

function commitRecord(price1, amount1, state) {
  const record = {
    id: state.length > 0 ? state[state.length - 1].id + 1 : 1,
    amount: Number(amount1),
    price: Number(price1),
    sum: Number(amount1) * Number(price1)
  }
  state.push(record);
  return state;
}




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

function addRecord(price, amount, divTable,state) {
  if ((price <= 0) || (amount <= 0)) {
    return;
  } else {
    let result = {};

    let recordRow = document.createElement('div');
    recordRow.classList.add('container-content-items');
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

    let divDefault = divTable.getElementsByClassName('no-recording')[0];
    delBtn.addEventListener('click', function () {

      recordRow.remove();
      if (divTable.getElementsByClassName('container-content-items').length==0){
        let div = document.createElement('div');
        div.className = "no-recording";
        div.innerHTML = "Нет записей";
        divTable.insertAdjacentElement('beforeend', div);

      }

    });
    if (divDefault) {
      divDefault.remove();
    }
    divTable.appendChild(recordRow);
    if (!recordRow) {
      divTable.insertAdjacentElement('afterbegin', divDefault);
    }

    return result;
  }
};

const form1 = createForm(container1);
const form2 = createForm(container2);