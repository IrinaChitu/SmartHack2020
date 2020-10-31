window.onload = function () {
  document.getElementById('productList').style.visibility = 'hidden';

  var nrRow = 15;
  var nrCol = 25;
  var gridTable = document.createElement('TABLE');
  for (var i = 0; i < nrRow; i++) {
    var gridRow = document.createElement('TR');
    for (var j = 0; j < nrCol; j++) {
      var gridCell = document.createElement('TD');
      var gridPlus = document.createElement('IMG');
      gridPlus.src = '../../public/images/plusShelf.png';
      gridPlus.id = `${i * nrCol + j}`;
      gridPlus.addEventListener('click', addShelf);
      gridPlus.classList.add('plus');
      gridCell.classList.add('grid');
      gridCell.appendChild(gridPlus);
      gridRow.appendChild(gridCell);
    }
    gridTable.appendChild(gridRow);
  }
  document.getElementById('gridSpace').appendChild(gridTable);
};

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData('text', ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData('text');
  ev.target.appendChild(document.getElementById(data));
}

function addShelf(ev) {
  //   alert(ev.target.id);
  ev.target.src = '../../public/images/shelf.png';
  document.getElementById('productList').style.visibility = 'visible';
}
