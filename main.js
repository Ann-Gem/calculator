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

let itemPrice=0;
let itemSum=0;
let inputCountToBuy=0;

let plus1= document.getElementById('pl1');
let minus1 = document.getElementById('mn1');


plus1.addEventListener('click', () => {
  inputCountToBuy= +document.getElementById('count-to-buy').value;
  inputCountToBuy++;
  document.getElementById('count-to-buy').value = inputCountToBuy;
})

minus1.addEventListener('click', () => {
  inputCountToBuy= +document.getElementById('count-to-buy').value;
  if(inputCountToBuy > 0) {
    inputCountToBuy--;
    document.getElementById('count-to-buy').value = inputCountToBuy;
  }

})

let divTable = document.getElementsByClassName("container-content");

let addBtn = document.getElementById('buy');


addBtn.addEventListener('click', function () {
  let newItemRow = document.createElement('div');
  newItemRow.classList.add('container-content-items-1');

  inputCountToBuy = +document.getElementById('count-to-buy').value;

  let newItemCount = document.createElement('div');
  newItemCount.classList.add('item', 'count');
  newItemCount.insertAdjacentHTML('afterbegin', `<span>${inputCountToBuy}</span>`);

  itemPrice =+document.getElementById('add-input').value;


  let newItemPrice = document.createElement('div');
  newItemPrice.classList.add('item', 'price', 'currency');
  newItemPrice.insertAdjacentHTML('afterbegin', `<span>${itemPrice}</span>`)

  let newItemSum = document.createElement('div');
  newItemSum.classList.add('item', 'sum', 'currency');
  newItemSum.insertAdjacentHTML('afterbegin', `<span>${inputCountToBuy * itemPrice}</span>`);

  let del = document.createElement('div');
  del.classList.add('btn-del');

  let delBtn = document.createElement('button');
  delBtn.classList.add('del');
  delBtn.insertAdjacentElement('afterbegin', del);

  newItemRow.insertAdjacentElement('beforeend', newItemCount);
  newItemRow.insertAdjacentElement('beforeend', newItemPrice);
  newItemRow.insertAdjacentElement('beforeend', newItemSum);
  newItemRow.insertAdjacentElement('beforeend', delBtn);

  let divDefault1 = document.getElementById('norec-1');

  delBtn.addEventListener('click', function () {
    newItemRow.remove();
    let div = document.createElement('div');
    div.className = "no-recording";
    div.id="norec-1";
    div.innerHTML = "Нет записей";
    if (document.getElementsByClassName("container-content-items-1").length==0)
      divTable[0].insertAdjacentElement('beforeend',div);
  });

  if (divDefault1) {
    divDefault1.remove();
  }

  divTable[0].appendChild(newItemRow);

})






// Точки выхода


let inputCountToSell=0;

let plus2= document.getElementById('pl2');
let minus2 = document.getElementById('mn2');

plus2.addEventListener('click', () => {
  inputCountToSell= +document.getElementById('count-to-sell').value;
  inputCountToSell++;
  document.getElementById('count-to-sell').value = inputCountToSell;
})

minus2.addEventListener('click', () => {
  inputCountToSell= +document.getElementById('count-to-sell').value;
  if(inputCountToSell > 0) {
    inputCountToSell--;
    document.getElementById('count-to-sell').value = inputCountToSell;
  }

})


let sellBtn = document.getElementById('sell');

sellBtn.addEventListener('click', function () {
  let newItemRow = document.createElement('div');
  newItemRow.classList.add('container-content-items-2');

  inputCountToSell = +document.getElementById('count-to-sell').value;

  let newItemCount = document.createElement('div');
  newItemCount.classList.add('item', 'count');
  newItemCount.insertAdjacentHTML('afterbegin', `<span>${inputCountToSell}</span>`);

  itemPrice = +document.getElementById('sell-input').value;



  let newItemPrice = document.createElement('div');
  newItemPrice.classList.add('item', 'price', 'currency');
  newItemPrice.insertAdjacentHTML('afterbegin', `<span>${itemPrice}</span>`)

  let newItemSum = document.createElement('div');
  newItemSum.classList.add('item', 'sum', 'currency');
  newItemSum.insertAdjacentHTML('afterbegin', `<span>${inputCountToSell * itemPrice}</span>`);

  let del = document.createElement('div');
  del.classList.add('btn-del');

  let delBtn = document.createElement('button');
  delBtn.classList.add('del');
  delBtn.insertAdjacentElement('afterbegin', del);

  newItemRow.insertAdjacentElement('beforeend', newItemCount);
  newItemRow.insertAdjacentElement('beforeend', newItemPrice);
  newItemRow.insertAdjacentElement('beforeend', newItemSum);
  newItemRow.insertAdjacentElement('beforeend', delBtn);

  let divDefault2 = document.getElementById('norec-2');
  delBtn.addEventListener('click', function () {
    newItemRow.remove();
    let div = document.createElement('div');
    div.className = "no-recording";
    div.id="norec-2";
    div.innerHTML = "Нет записей";
    if (document.getElementsByClassName("container-content-items-2").length==0)
      divTable[1].insertAdjacentElement('beforeend',div);
  });

  if (divDefault2) {
    divDefault2.remove();
  }

  divTable[1].appendChild(newItemRow);

})




