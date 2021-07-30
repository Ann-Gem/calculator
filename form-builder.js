// Выпадающий список
const selected = document.querySelector(".selected");
const optionsContainer = document.querySelector(".options-container");
const optionsList = document.querySelectorAll(".option");
selected.addEventListener("click", function () {
  optionsContainer.classList.toggle("active");
});
optionsList.forEach(function (option) {
  option.addEventListener("click", function () {
    selected.innerHTML = option.querySelector("label").innerHTML;
    optionsContainer.classList.remove("active");
  });
});

// Точки входа


let plus1 = document.getElementById('pl1');
let minus1 = document.getElementById('mn1');
let divTable = document.getElementsByClassName("container-content");
let addBtn = document.getElementById('buy');

let plus2 = document.getElementById('pl2');
let minus2 = document.getElementById('mn2');
let sellBtn = document.getElementById('sell');
////////////////////////////////////
let inputPrice1 = document.getElementById('add-input');
let inputPrice2 = document.getElementById('sell-input');
let inputCount1 = document.getElementById('count-to-buy');
let inputCount2 = document.getElementById('count-to-sell');
////////////////////////////////////
let itemPrice1 = 0;
let itemPrice2 = 0;
let itemSum = 0;
let inputCountToBuy = 0;
let inputCountToSell = 0;
////////////////////////////////////


function changingCount(sign, element) {
  if (sign == 'plus')
    element.value++;
  else if (element.value > 0)
    element.value--;
  return element.value;
}
////////////////////////////////////
function addButtonControl(price, count, element) {
  if (price == 0 || count == 0) {
    element.setAttribute("disabled", true);
  }
  else {
    element.removeAttribute('disabled');
  }
}

function addRecord(price, count,className1,norecId,iter){
  if ((price > 0) && (count > 0)) {
    let newItemRow = document.createElement('div');
    newItemRow.classList.add(className1);
    let newItemCount = document.createElement('div');
    newItemCount.classList.add('item', 'count');
    newItemCount.insertAdjacentHTML('afterbegin', `<span>${count}</span>`);
    let newItemPrice = document.createElement('div');
    newItemPrice.classList.add('item', 'price', 'currency');
    newItemPrice.insertAdjacentHTML('afterbegin', `<span>${price}</span>`)
    let newItemSum = document.createElement('div');
    newItemSum.classList.add('item', 'sum', 'currency');
    newItemSum.insertAdjacentHTML('afterbegin', `<span>${count * price}</span>`);
    let del = document.createElement('div');
    del.classList.add('btn-del');
    let delBtn = document.createElement('button');
    delBtn.classList.add('del');
    delBtn.insertAdjacentElement('afterbegin', del);
    /// добавление
    newItemRow.insertAdjacentElement('beforeend', newItemCount);
    newItemRow.insertAdjacentElement('beforeend', newItemPrice);
    newItemRow.insertAdjacentElement('beforeend', newItemSum);
    newItemRow.insertAdjacentElement('beforeend', delBtn);
    price = "";
    count = "";

    let divDefault1 = document.getElementById(norecId);
    delBtn.addEventListener('click', function () {
      newItemRow.remove();
      let div = document.createElement('div');
      div.className = "no-recording";
      div.id =norecId;
      div.innerHTML = "Нет записей";
      // newItemRow.id="row-items-1";
      if (document.getElementsByClassName(className1).length == 0)
        divTable[iter].insertAdjacentElement('beforeend', div);
    });
    if (divDefault1) {
      divDefault1.remove();
    }
    divTable[iter].appendChild(newItemRow);
    if (!newItemRow) {
      divTable[iter].insertAdjacentElement('afterbegin', divDefault1);
    }


  }

}

////////////////////////////////////
addBtn.addEventListener('click', function () {
    addRecord(+inputPrice1.value,+inputCount1.value,'container-content-items-1','norec-1',0);
    inputPrice1.value = "";
    inputCount1.value = "";
    addButtonControl(0, 0, addBtn);

})
////////////////////////////////////
sellBtn.addEventListener('click', function () {
  addRecord(+inputPrice2.value,+inputCount2.value,'container-content-items-2','norec-2',1);
  inputPrice2.value = "";
  inputCount2.value = "";
  addButtonControl(0, 0, sellBtn);

})


////////////////////////////////////
plus1.addEventListener('click', () => {
  inputCountToBuy = +changingCount('plus', inputCount1);
  addButtonControl(inputPrice1.value, inputCount1.value, addBtn);
});

minus1.addEventListener('click', () => {
  inputCountToBuy = +changingCount('minus', inputCount1);
  addButtonControl(inputPrice1.value, inputCount1.value, addBtn);
})

plus2.addEventListener('click', () => {
  inputCountToSell = +changingCount('plus', inputCount2);
  addButtonControl(inputPrice2.value, inputCount2.value, sellBtn);
})

minus2.addEventListener('click', () => {
  inputCountToSell = +changingCount('minus', inputCount2);
  addButtonControl(inputPrice2.value, inputCount2.value, sellBtn);
})


////////////////////////////////////
inputPrice1.addEventListener('input', () => {
  itemPrice1 = +inputPrice1.value;
  addButtonControl(inputPrice1.value, inputCount1.value, addBtn);
})

////////////////////////////////////
inputCount1.addEventListener('input', () => {
  inputCountToBuy = +inputCount1.value;
  addButtonControl(inputPrice1.value, inputCount1.value, addBtn);
})
////////////////////////////////////
inputPrice2.addEventListener('input', () => {
  itemPrice2 = +inputPrice2.value;
  addButtonControl(inputPrice2.value, inputCount2.value, sellBtn);
})
////////////////////////////////////
inputCount2.addEventListener('input', () => {
  inputCountToSell = +inputCount2.value;
  addButtonControl(inputPrice2.value, inputCount2.value, sellBtn);
});

