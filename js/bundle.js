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
        addTextarea.rows = 5;
        addTextarea.cols = 50;
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
    addDiv.className = 'key';
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
  textarea.focus();
  textarea.setRangeText('\t', position, position, 'end');
}

/* end Tab click */

/* start shift click */

let isCaps = true;

function shiftActive(event) {
  const keyDown = document.querySelectorAll('.key-down');
  const keyShift = document.querySelectorAll('.key-shift');
  const keyCaps = document.querySelectorAll('.key-caps');
  if (event.key === 'Shift' && isCaps) {
    for (let i = 0; i < keyDown.length; i += 1) {
      keyDown[i].style.display = 'none';
      keyShift[i].style.display = 'block';
      keyCaps[i].style.display = 'none';
    }
  } else if (event.key === 'Shift' && !isCaps) {
    for (let i = 0; i < keyDown.length; i += 1) {
      if (i < 28) {
        keyDown[i].style.display = 'none';
        keyShift[i].style.display = 'block';
        keyCaps[i].style.display = 'none';
      } else {
        keyDown[i].style.display = 'block';
        keyShift[i].style.display = 'none';
        keyCaps[i].style.display = 'none';
      }
    }
  }
}

function shiftNoActive(event) {
  const keyDown = document.querySelectorAll('.key-down');
  const keyShift = document.querySelectorAll('.key-shift');
  const keyCaps = document.querySelectorAll('.key-caps');
  if (event.key === 'Shift' && isCaps) {
    for (let i = 0; i < keyDown.length; i += 1) {
      keyDown[i].style.display = 'block';
      keyShift[i].style.display = 'none';
      keyCaps[i].style.display = 'none';
    }
  } else if (event.key === 'Shift' && !isCaps) {
    for (let i = 0; i < keyDown.length; i += 1) {
      if (i < 28) {
        keyDown[i].style.display = 'none';
        keyShift[i].style.display = 'none';
        keyCaps[i].style.display = 'block';
      } else {
        keyDown[i].style.display = 'none';
        keyShift[i].style.display = 'none';
        keyCaps[i].style.display = 'block';
      }
    }
  }
}

/* end shift click */

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
  textarea.setRangeText('', position - 1, position, 'end');
}

/* end Backspace click */

/* start Delete click */

function deleteClick() {
  const textarea = document.querySelector('#textarea');
  const position = getCursorPosition();
  if (position === textarea.value.length) { return; }
  textarea.setRangeText('', position, position + 1, 'end');
}

/* end Delete click */

/* start Enter click */

function enterClick() {
  const textarea = document.querySelector('#textarea');
  const position = getCursorPosition();
  textarea.setRangeText('\n', position, position, 'end');
}

/* end Enter click */

/* start Arrow click */

function arrowClick(event) {
  const textarea = document.querySelector('#textarea');
  const position = getCursorPosition();
  if (event.key === 'ArrowUp') {
    textarea.setRangeText('⯅', position, position, 'end');
  } else if (event.key === 'ArrowLeft') {
    textarea.setRangeText('⯇', position, position, 'end');
  } else if (event.key === 'ArrowDown') {
    textarea.setRangeText('⯆', position, position, 'end');
  } else if (event.key === 'ArrowRight') {
    textarea.setRangeText('⯈', position, position, 'end');
  }
}

/* end Arrow click */

/* start Space click */

function spaceClick() {
  const textarea = document.querySelector('#textarea');
  const position = getCursorPosition();
  textarea.focus();
  textarea.setRangeText(' ', position, position, 'end');
}

/* end Space click */

function addDataKey(event, indexKey) {
  const textarea = document.querySelector('#textarea');
  const keyEng = document.querySelectorAll('.key__eng');
  const enDown = document.querySelectorAll('.key__eng .key-down');
  const enShift = document.querySelectorAll('.key__eng .key-shift');
  const enCaps = document.querySelectorAll('.key__eng .key-caps');
  const keyRu = document.querySelectorAll('.key__ru');
  const ruDown = document.querySelectorAll('.key__ru .key-down');
  const ruShift = document.querySelectorAll('.key__ru .key-shift');
  const ruCaps = document.querySelectorAll('.key__ru .key-caps');
  const position = getCursorPosition();
  if (keyEng[indexKey].style.display !== 'none' && enDown[indexKey].style.display !== 'none') {
    textarea.setRangeText(`${enDown[indexKey].innerText}`, position, position, 'end');
  } else if (keyEng[indexKey].style.display !== 'none' && enShift[indexKey].style.display !== 'none') {
    textarea.setRangeText(`${enShift[indexKey].innerText}`, position, position, 'end');
  } else if (keyEng[indexKey].style.display !== 'none' && enCaps[indexKey].style.display !== 'none') {
    textarea.setRangeText(`${enCaps[indexKey].innerText}`, position, position, 'end');
  } else if (keyRu[indexKey].style.display !== 'none' && ruDown[indexKey].style.display !== 'none') {
    textarea.setRangeText(`${ruDown[indexKey].innerText}`, position, position, 'end');
  } else if (keyRu[indexKey].style.display !== 'none' && ruShift[indexKey].style.display !== 'none') {
    textarea.setRangeText(`${ruShift[indexKey].innerText}`, position, position, 'end');
  } else if (keyRu[indexKey].style.display !== 'none' && ruCaps[indexKey].style.display !== 'none') {
    textarea.setRangeText(`${ruCaps[indexKey].innerText}`, position, position, 'end');
  }
}

/* start switch key */

function switchKeyDown(event, index) {
  const textarea = document.querySelector('#textarea');
  textarea.focus();
  switch (event.isTrusted || event.click) {
    case event.key === 'Shift' && isCaps:
      shiftActive(event);
      break;
    case event.key === 'Shift' && !isCaps:
      shiftActive(event);
      break;
    case event.key === 'CapsLock':
      // eslint-disable-next-line no-use-before-define
      capsActive(event);
      break;
    case event.ctrlKey && event.altKey:
      ctrlActive();
      break;
    case event.code === 'ControlLeft' || event.code === 'AltLeft' || event.code === 'ControlRight' || event.code === 'AltRight' || event.key === 'Win':
      break;
    case event.key === 'Tab':
      tabClick(event);
      break;
    case event.key === 'Backspace':
      backspaceClick(event);
      break;
    case event.key === 'Delete' || event.key === 'Del':
      deleteClick(event);
      break;
    case event.key === 'Enter':
      enterClick(event);
      break;
    case event.key === 'ArrowUp' || event.key === 'ArrowLeft' || event.key === 'ArrowDown' || event.key === 'ArrowRight':
      arrowClick(event);
      break;
    case event.code === 'Space':
      spaceClick(event);
      break;
    default:
      addDataKey(event, index);
  }
  if (!event.click) { event.preventDefault(); }
}

function switchKeyUp(event) {
  switch (event.isTrusted || event.click) {
    case event.key === 'Shift' && isCaps:
      shiftNoActive(event);
      break;
    case event.key === 'Shift' && !isCaps:
      shiftNoActive(event);
      break;
    default:
  }
}

/* end switch key */

/* start key click */

function keyActive(event) {
  const keyEng = document.querySelectorAll('.key__eng');
  const keyRu = document.querySelectorAll('.key__ru');
  const key = document.querySelectorAll('.key');
  for (let i = 0; i < keyEng.length; i += 1) {
    if (keyEng[i].children[1].innerText === event.code) {
      key[i].classList.add('key-active');
      keyEng[i].classList.add('key-active');
      keyRu[i].classList.add('key-active');
      switchKeyDown(event, i);
    }
  }
}

function keyNoActive(event) {
  const keyEng = document.querySelectorAll('.key__eng');
  const keyRu = document.querySelectorAll('.key__ru');
  const key = document.querySelectorAll('.key');
  for (let i = 0; i < keyEng.length; i += 1) {
    if (keyEng[i].children[1].innerText === event.code) {
      key[i].classList.remove('key-active');
      keyEng[i].classList.remove('key-active');
      keyRu[i].classList.remove('key-active');
    }
  }
}

/* end key click */

/* start caps click */

function capsActive(event) {
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
    keyNoActive(event);
  }
}

/* end caps click */

window.addEventListener('keydown', (event) => {
  const textarea = document.querySelector('#textarea');
  textarea.focus();
  keyActive(event);
});

window.addEventListener('keyup', (event) => {
  if (event.key !== 'CapsLock') { keyNoActive(event); }
  switchKeyUp(event);
});

function clickTargetKey(event) {
  if (!event) { return false; }
  return event.target.innerText;
}

function searchIndex(event) {
  const key = document.querySelectorAll('.key');
  if (!event) { return false; }
  for (let i = 0; i < key.length; i += 1) {
    if (key[i].innerText === event.target.innerText) {
      return i;
    }
  }
  return false;
}

function searchCode(event) {
  const keyCode = document.querySelectorAll('.key-up');
  if (!event) { return false; }
  for (let i = 0; i < keyCode.length; i += 1) {
    if (event.target.children[1]) {
      if (keyCode[i].innerText === event.target.children[1].innerText) {
        return keyCode[i].innerText;
      }
    } else if (keyCode[i].innerText === event.target.parentElement.children[1].innerText) {
      return keyCode[i].innerText;
    }
  }
  return false;
}

let eventObj = false;

document.querySelector('.keyboard').addEventListener('mousedown', (event) => {
  const obj = {
    key: clickTargetKey(event),
    click: true,
    index: searchIndex(event),
    code: searchCode(event),
  };
  eventObj = event;
  if (obj.index || obj.index === 0) {
    keyActive(obj);
  }
});

document.querySelector('.body').addEventListener('mouseup', () => {
  const obj = {
    key: clickTargetKey(eventObj),
    click: true,
    index: searchIndex(eventObj),
    code: searchCode(eventObj),
  };
  if (obj.index || obj.index === 0) {
    if (obj.key !== 'CapsLock') { keyNoActive(obj); }
    switchKeyUp(obj);
  }
});
