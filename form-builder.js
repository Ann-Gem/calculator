let container1 = document.getElementById('container1');
let container2 = document.getElementById('container2');
let inputCountToBuy = 0;
let itemPrice = 0;

function createForm(container) {

  let plus = container.getElementsByClassName('plus')[0];
  let minus = container.getElementsByClassName('minus')[0];
  let addBtn= container.getElementsByClassName('add')[0];
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
  addRecord(Number(inputPrice.value),Number(inputAmount.value), divTable);
  inputPrice.value = "";
  inputAmount.value = "";
  addButtonControl(0, 0, addBtn);
  });

  return

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

function addRecord(price, amount, divTable){
  if ((price <= 0) || (amount <= 0)) {
    return;
  } else {
    let resultArray = [];
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

    result.amount = recordAmount.textContent;
    result.price = recordPrice.textContent;
    result.sum = recordSum.textContent;
    resultArray = resultArray.push(result);

    price = "";
    amount = "";

    let divDefault = document.getElementsByClassName('no-recording')[0];
    delBtn.addEventListener('click', function () {
      recordRow.remove();
      let div = document.createElement('div');
      div.className = "no-recording";
      div.innerHTML = "Нет записей";
      if (resultArray.length == 0)
        divTable.insertAdjacentElement('beforeend', div);
    });
    if (divDefault) {
      divDefault.remove();
    }
    divTable.appendChild(recordRow);
    if (!recordRow) {
      divTable.insertAdjacentElement('afterbegin', divDefault);
    }
    console.log(resultArray);
    return resultArray;
  }
};

createForm(container1);

createForm(container2);
