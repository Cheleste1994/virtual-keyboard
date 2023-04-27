window.addEventListener('load', () => {
  // eslint-disable-next-line no-undef
  localStorage.setItem('lang', 'en');
});

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
        addTextarea.setAttribute('autofocus', '');
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
    const addSpanEng = document.createElement('span');
    const addSpanRus = document.createElement('span');
    addDiv.className = `key key${i}`;
    addSpanEng.className = 'key__eng';
    addDiv.appendChild(addSpanEng);
    addSpan(addSpanEng, dataKey[i].load);
    addSpanRus.className = 'key__ru';
    addDiv.appendChild(addSpanRus);
    addSpan(addSpanRus, dataKey[i].loadRu);
    keyboard.appendChild(addDiv);
  }
}

function addSpan (span, dataKey) {
  const key = document.createElement('span');
  const keyUp = document.createElement('span');
  const keyShift = document.createElement('span');
  const keyCaps = document.createElement('span');
  key.className = 'key-down';
  key.innerText = dataKey.key;
  span.appendChild(key);

  keyUp.className = 'key-up';
  keyUp.innerText = dataKey.keyUp;
  span.appendChild(keyUp);

  keyShift.innerText = dataKey.keyShift;
  keyShift.className = 'key-shift';
  span.appendChild(keyShift);

  keyCaps.innerText = dataKey.keyCaps;
  keyCaps.className = 'key-caps';
  span.appendChild(keyCaps);
}

const arrEntry = [];

window.addEventListener('keydown', addDataKey);
window.addEventListener('keyup', keyNoActive);

async function addDataKey (event) {
  const imgHelp = './key.json';
  const res = await fetch(imgHelp);
  const dataKey = await res.json();
  const textareaEntry = document.querySelector('#textarea');
  const eventCode = event.code;
  keyActive(event);
  if (dataKey[64][eventCode]) {
    arrEntry.push(dataKey[64][eventCode]);
    window.addEventListener('keydown', stopDefAction);
  } else if (dataKey[65][eventCode]) {
    arrEntry.push(dataKey[64][eventCode]);
    window.addEventListener('keydown', stopDefAction);
  } else {
    arrEntry.push(dataKey[64][eventCode] || dataKey[65][eventCode] ? '' : event.key);
  }
  textareaEntry.innerHTML = arrEntry.join('');
}

function stopDefAction (evt) {
  evt.preventDefault();
}

function keyActive (event) {
  const keyBtn = document.querySelectorAll('.key__eng');
  keyBtn.forEach(x => {
    if (x.firstChild.innerText === event.key) {
      x.classList.add('key-active');
    } else if (x.firstChild.innerText === 'Del' && event.key === 'Delete') {
      x.classList.add('key-active');
    }
  });
}

function keyNoActive (event) {
  const keyBtn = document.querySelectorAll('.key__eng');
  keyBtn.forEach(x => {
    if (x.firstChild.innerText === event.key) {
      x.classList.remove('key-active');
    } else if (x.firstChild.innerText === 'Del' && event.key === 'Delete') {
      x.classList.remove('key-active');
    }
  });
}
