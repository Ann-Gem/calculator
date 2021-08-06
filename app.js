const container1 = document.getElementById('container1');
const container2 = document.getElementById('container2');

const formBuy= new FormCreator(container1);

const formSell= new FormCreator(container2);

//formBuy.state сюда приходит
function calculate() {

}

formBuy.subscribe(calculate);

formBuy.state