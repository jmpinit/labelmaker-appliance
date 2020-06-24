const fcanvas = new fabric.Canvas('label');
const submitButton = document.getElementById('submit');
const labelText = document.getElementById('labelText');

submitButton.addEventListener('click', () => {
  fcanvas.discardActiveObject();
  fcanvas.renderAll();

  const canvas = document.getElementById('label');
  const canvasData = canvas.toDataURL();

  $.post(`http://${window.location.host}/print`, { img: canvasData });

  console.log('Submitted label:', canvasData);
});

const clearButton = document.getElementById('clear');
clearButton.addEventListener('click', () => {
  labelText.value = '';
  updateText();
});

const suggestButton = document.getElementById('suggest');
suggestButton.addEventListener('click', () => {
  const suggestion = document.getElementById('suggestText').value;
  $.post(`http://${window.location.host}/suggest`, {
    data: JSON.stringify({ suggestion: suggestion }),
  });
});

function updateText() {
  textbox.set({
    text: labelText.value,
  });
  fcanvas.renderAll();
}

labelText.addEventListener('keyup', () => updateText());

const fonts = ['Pacifico', 'VT323', 'Quicksand', 'Inconsolata'];

const textbox = new fabric.Textbox('Lorum ipsum dolor sit amet', {
  left: 50,
  top: 50,
  width: 150,
  fontSize: 20
});
fcanvas.add(textbox).setActiveObject(textbox);
//fonts.unshift('Times New Roman');
fcanvas.getActiveObject().set('fontFamily', 'Quicksand');

const select = document.getElementById('font-family');

fonts.forEach(function(font) {
  var option = document.createElement('option');
  option.innerHTML = font;
  option.value = font;
  //select.appendChild(option);
});
