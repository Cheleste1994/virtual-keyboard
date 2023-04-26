document.querySelector('body').classList.add('body');

function addFrame () {
  const body = document.querySelector('.body');
  for (let i = 1; i <= 5; i++) {
    const addDiv = document.createElement('div');
    const addH1 = document.createElement('h1');
    const addSpan = document.createElement('span');
    const addTextarea = document.createElement('textarea');
    // eslint-disable-next-line no-empty
    switch (i <= 5) {
      case i === 1:
        addDiv.className = 'title';
        addH1.className = 'title__h1';
        addH1.innerText = 'RSS Виртуальная клавиатура';
        addDiv.appendChild(addH1);
        break;
      case i === 2:
        addDiv.className = 'body-entry';
        addTextarea.id = 'textarea';
        addTextarea.className = 'body-entry__textarea';
        addDiv.appendChild(addTextarea);
        break;
      case i === 3:
        addDiv.className = 'keyboard';
        addKeyboard(addDiv);
        break;
      case i === 4:
        addDiv.className = 'system';
        addSpan.className = 'system__os';
        addSpan.innerText = 'Клавиатура создана в операционной системе Windows';
        addDiv.appendChild(addSpan);
        break;
      case i === 5:
        addDiv.className = 'switch';
        addSpan.className = 'switch__language';
        addSpan.innerText = 'Для переключения языка комбинация: левыe ctrl + alt';
        addDiv.appendChild(addSpan);
        break;
    }
    body.appendChild(addDiv);
  }
}

addFrame();

async function addKeyboard (keyboard) {
  const imgHelp = './key.json';
  const res = await fetch(imgHelp);
  const dataKey = await res.json();

  for (let i = 0; i < 64; i++) {
    const addDiv = document.createElement('div');
    const addSpan = document.createElement('span');
    addDiv.className = `key key${i}`;
    addSpan.className = `key__span key__span${i}`;
    addSpan.innerText = `${dataKey[i].load}`;
    addDiv.appendChild(addSpan);
    keyboard.appendChild(addDiv);
  }
}

// const obj = {};

window.addEventListener('keydown', (event) => {
  const textareaEntry = document.querySelector('#textarea');
  textareaEntry.innerHTML = textareaEntry.innerHTML + event.key + '\t';
  // obj[event.code] = event.key;
  // console.log(obj);
  // console.log(event);
});
