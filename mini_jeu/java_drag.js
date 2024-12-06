function onDragStart(event) {
  event
    .dataTransfer
    .setData('text/plain', event.target.id);
    
   event
    .currentTarget
    .style
    .backgroundColor = '';
}

function onDragOver(event) {
  event.preventDefault();
  const draggableId = event.dataTransfer.getData('text');
  

  const dropzoneId = event.target.id;
  

  if (draggableId.replace('draggable-', '') === dropzoneId.replace('dropzone-', '')) {
    event.target.style.backgroundColor = ''; 
    draggableElement.style.background= 'green';
  } else {
    event.target.style.backgroundColor = '';
  }
}

function onDrop(event) {
  event.preventDefault();

  const draggableId = event.dataTransfer.getData('text');
  
  const draggableElement = document.getElementById(draggableId);
  const dropzone = event.target;

    if (draggableId.replace('draggable-', '') === dropzone.id.replace('dropzone-', '')) {
      
      draggableElement.style.width = '100%';
      draggableElement.style.height = '100%';
      draggableElement.style.position = 'absolute'; 
      draggableElement.style.top = '0';
      draggableElement.style.left = '0';

      dropzone.style.position = 'relative'; 
      dropzone.appendChild(draggableElement);

      dropzone.style.backgroundColor = 'green';
      draggableElement.style.background='green';
    } else {
      dropzone.style.backgroundColor = '';
    }
  }

function shuffleAndOrganize() {
  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  function organizeColumn(column, items) {
    const columnHeight = column.offsetHeight;  
    const itemHeight = items[0].offsetHeight;  
    const totalItemsHeight = itemHeight * items.length;  

    let spacing;
    if (totalItemsHeight > columnHeight) {
      spacing = itemHeight;  
    } else {
      spacing = (columnHeight - totalItemsHeight) / (items.length + 1);  
    }

    items.forEach((item, index) => {
      item.style.position = 'relative';  
      item.style.top = `${spacing * (index + 1) - itemHeight / 2}px`;  
    });

    items.forEach(item => column.appendChild(item));
  }

  const draggableColumn = document.querySelector('.draggable-column');
  const dropzoneColumn = document.querySelector('.dropzone-column');

  const draggables = shuffle(Array.from(draggableColumn.children));
  const dropzones = shuffle(Array.from(dropzoneColumn.children));

  organizeColumn(draggableColumn, draggables);
  organizeColumn(dropzoneColumn, dropzones);
}


window.onload = shuffleAndOrganize;


function creerBulle() {
    const bulle = document.createElement('div');
    bulle.classList.add('bulle');

    const taille = Math.random() * (80 - 30) + 30; 
    bulle.style.width = `${taille}px`;
    bulle.style.height = `${taille}px`;
    bulle.style.left = `${Math.random() * window.innerWidth}px`; 
    bulle.style.animationDuration = `${Math.random() * 2 + 3}s`; 

    document.body.appendChild(bulle);

    setTimeout(() => {
        bulle.remove();
    }, 5000);
}


setInterval(creerBulle, 300);


