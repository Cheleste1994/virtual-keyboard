window.addEventListener('load', () => {
  // eslint-disable-next-line no-undef
  if (!localStorage.getItem('lang')) {
    localStorage.setItem('lang', 'en');
  }
});

document.querySelector('body').classList.add('body');

function addFrame() {
  const body = document.querySelector('.body');
  for (let i = 1; i <= 5; i += 1) {
    const addDiv = document.createElement('div');
    const addH1 = document.createElement('h1');
    const keySpan = document.createElement('span');
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
        // eslint-disable-next-line no-use-before-define
        addKeyboard(addDiv);
        break;
      case i === 4:
        addDiv.className = 'system';
        keySpan.className = 'system__os';
        keySpan.innerText = 'Клавиатура создана в операционной системе Windows';
        addDiv.appendChild(keySpan);
        break;
      case i === 5:
        addDiv.className = 'switch';
        keySpan.className = 'switch__language';
        keySpan.innerText = 'Для переключения языка комбинация: левыe ctrl + alt';
        addDiv.appendChild(keySpan);
        break;
      default:
        return;
    }

    body.appendChild(addDiv);
  }
}

addFrame();

function addSpan(ruOrEn, dataKey) {
  const key = document.createElement('span');
  const keyUp = document.createElement('span');
  const keyShift = document.createElement('span');
  const keyCaps = document.createElement('span');
  key.className = 'key-down';
  key.innerText = dataKey.key;
  ruOrEn.appendChild(key);

  keyUp.className = 'key-up';
  keyUp.innerText = dataKey.keyUp;
  ruOrEn.appendChild(keyUp);

  keyShift.innerText = dataKey.keyShift;
  keyShift.className = 'key-shift';
  ruOrEn.appendChild(keyShift);

  keyCaps.innerText = dataKey.keyCaps;
  keyCaps.className = 'key-caps';
  ruOrEn.appendChild(keyCaps);
}

/* start load languages */

function langActive() {
  const keyEng = document.querySelectorAll('.key__eng');
  const keyRu = document.querySelectorAll('.key__ru');
  if (localStorage.lang === 'en') {
    for (let i = 0; i < keyRu.length; i += 1) {
      keyRu[i].style.display = 'none';
      keyEng[i].style.display = 'flex';
      localStorage.lang = 'en';
    }
  } else {
    for (let i = 0; i < keyRu.length; i += 1) {
      keyEng[i].style.display = 'none';
      keyRu[i].style.display = 'flex';
      localStorage.lang = 'ru';
    }
  }
}

/* end load languages */

async function addKeyboard(keyboard) {
  const imgHelp = './key.json';
  const res = await fetch(imgHelp);
  const dataKey = await res.json();

  for (let i = 0; i < 64; i += 1) {
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
  langActive();
}

/* start key click */

function keyActive(event) {
  const keyEng = document.querySelectorAll('.key__eng');
  const keyRu = document.querySelectorAll('.key__ru');
  for (let i = 0; i < keyEng.length; i += 1) {
    if (keyEng[i].children[1].innerText === event.code) {
      keyEng[i].classList.add('key-active');
      keyRu[i].classList.add('key-active');
    }
  }
}

function keyNoActive(event) {
  const keyEng = document.querySelectorAll('.key__eng');
  const keyRu = document.querySelectorAll('.key__ru');
  for (let i = 0; i < keyEng.length; i += 1) {
    if (keyEng[i].children[1].innerText === event.code) {
      keyEng[i].classList.remove('key-active');
      keyRu[i].classList.remove('key-active');
    }
  }
}

/* end key click */

/* start position cursor */

function getCursorPosition() {
  const textarea = document.querySelector('#textarea');
  let caretPos = 0;
  if (document.selection) {
    textarea.focus();
    const sel = document.selection.createRange();
    sel.moveStart('character', -textarea.value.length);
    caretPos = sel.text.length;
  } else if (textarea.selectionStart || textarea.selectionStart === '0') {
    caretPos = textarea.selectionStart;
  }
  return caretPos;
}

/* end position cursor */

/* start Tab click */

function tabClick() {
  const textarea = document.querySelector('#textarea');
  const position = getCursorPosition();
  textarea.setRangeText('\t', position, position);
}

/* end Tab click */

/* start shift click */

let isCaps = true;

function shiftActive() {
  const keyDown = document.querySelectorAll('.key-down');
  const keyShift = document.querySelectorAll('.key-shift');
  const keyCaps = document.querySelectorAll('.key-caps');
  for (let i = 0; i < keyDown.length; i += 1) {
    keyDown[i].style.display = 'none';
    keyShift[i].style.display = 'block';
    keyCaps[i].style.display = 'none';
  }
}

function shiftNoActive(event) {
  const keyDown = document.querySelectorAll('.key-down');
  const keyShift = document.querySelectorAll('.key-shift');
  const keyCaps = document.querySelectorAll('.key-caps');
  if (event.key === 'Shift') {
    for (let i = 0; i < keyDown.length; i += 1) {
      keyDown[i].style.display = 'block';
      keyShift[i].style.display = 'none';
      keyCaps[i].style.display = 'none';
    }
  }
}

/* end shift click */

/* start caps click */

function capsActive() {
  const keyDown = document.querySelectorAll('.key-down');
  const keyCaps = document.querySelectorAll('.key-caps');
  const keyShift = document.querySelectorAll('.key-shift');
  if (isCaps) {
    for (let i = 0; i < keyDown.length; i += 1) {
      keyDown[i].style.display = 'none';
      keyCaps[i].style.display = 'block';
      keyShift[i].style.display = 'none';
      isCaps = false;
    }
  } else {
    for (let i = 0; i < keyDown.length; i += 1) {
      keyDown[i].style.display = 'block';
      keyCaps[i].style.display = 'none';
      keyShift[i].style.display = 'none';
      isCaps = true;
    }
  }
}

/* end caps click */

/* start ctrl + alt click */

function ctrlActive() {
  const keyEng = document.querySelectorAll('.key__eng');
  const keyRu = document.querySelectorAll('.key__ru');
  if (localStorage.lang === 'en') {
    for (let i = 0; i < keyRu.length; i += 1) {
      keyRu[i].style.display = 'flex';
      keyEng[i].style.display = 'none';
      localStorage.lang = 'ru';
    }
  } else {
    for (let i = 0; i < keyRu.length; i += 1) {
      keyEng[i].style.display = 'flex';
      keyRu[i].style.display = 'none';
      localStorage.lang = 'en';
    }
  }
}

/* end ctrl + alt click */

/* start Backspace click */

function backspaceClick() {
  const textarea = document.querySelector('#textarea');
  const position = getCursorPosition();
  if (!position) { return; }
  textarea.setRangeText('', position - 1, position);
}

/* end Backspace click */

/* start Delete click */

function deleteClick() {
  const textarea = document.querySelector('#textarea');
  const position = getCursorPosition();
  if (position === textarea.value.length) { return; }
  textarea.setRangeText('', position, position + 1);
}

/* end Delete click */

/* start Enter click */

function enterClick() {
  const textarea = document.querySelector('#textarea');
  const position = getCursorPosition();
  textarea.setRangeText('\n', position, position);
}

/* end Enter click */

/* start Arrow click */

function arrowUpClick() {
  const textarea = document.querySelector('#textarea');
  const position = getCursorPosition();
  // textarea.setRangeText('\n', position, position);
  console.log(event)
}

/* end Enter click */

async function addDataKey(event) {
  const imgHelp = './key.json';
  const res = await fetch(imgHelp);
  const dataKey = await res.json();
  const textarea = document.querySelector('#textarea');
  getCursorPosition();
  textarea.value += event.key;
}

/* start switch key */

function switchKeyDown(event) {
  switch (event.isTrusted) {
    case event.key === 'Shift' && isCaps:
      shiftActive(event);
      break;
    case event.key === 'Shift' && !isCaps:
      shiftNoActive(event);
      break;
    case event.key === 'CapsLock':
      capsActive();
      break;
    case event.ctrlKey && event.altKey:
      ctrlActive();
      break;
    case event.ctrlKey || event.altKey:
      event.preventDefault();
      break;
    case event.key === 'Tab':
      tabClick(event);
      event.preventDefault();
      break;
    case event.key === 'Backspace':
      backspaceClick(event);
      event.preventDefault();
      break;
    case event.key === 'Delete':
      deleteClick(event);
      event.preventDefault();
      break;
    case event.key === 'Enter':
      enterClick(event);
      event.preventDefault();
      break;
    case event.key === 'ArrowUp':
      arrowUpClick(event);
      event.preventDefault();
      break;
    default:
      addDataKey(event);
      event.preventDefault();
  }
}

function switchKeyUp(event) {
  switch (event.isTrusted) {
    case event.key === 'Shift' && isCaps:
      shiftNoActive(event);
      break;
    case event.key === 'Shift' && !isCaps:
      shiftActive(event);
      break;
    default:
  }
}

/* end switch key */

window.addEventListener('keydown', (event) => {
  const textarea = document.querySelector('#textarea');
  textarea.focus();
  keyActive(event);
  switchKeyDown(event);
});

window.addEventListener('keyup', (event) => {
  keyNoActive(event);
  switchKeyUp(event);
});
