import { copyToClipboard } from '../modules.js';

let dropCount = 0;
const boxes = document.querySelectorAll('.box');
const drops = document.querySelectorAll('.drop');
const dropContainer = document.querySelector('.drop-container');
const toast = document.querySelector('.toast');

// dragstart event
boxes.forEach(box => {
  box.addEventListener('dragstart', e => {
    e.dataTransfer.setData('data/string', e.target.style.backgroundColor);
    e.dataTransfer.effectAllowed = 'copy';
  });
});

// dragover event
drops.forEach(drop => {
  drop.addEventListener('dragover', e => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  });
});

// drop event
drops.forEach(drop => {
  drop.addEventListener('drop', e => {
    const color = e.dataTransfer.getData('data/string');
    e.target.style.backgroundColor = color;
    e.target.style.border = 'none';
    e.target.setAttribute('title', 'click to copy color code');
    e.target.style.cursor = 'pointer';
    dropCount++;

    if (dropCount == 5) {
      const bookmark = document.getElementById('bookmark');
      bookmark.style.color = 'gray';
      bookmark.style.cursor = 'pointer';
      bookmark.title = 'save color palatte';
    }
  });
});

// Copying to clipboard
dropContainer.addEventListener('click', e => {
  if (e.target.hasAttribute('title')) {
    const color = e.target.style.backgroundColor;
    /**
     * if success is true then showToast is called with color and success == true 
     * if success is false then showToast is called with errData and success == false 
     */
    copyToClipboard(color, 'Internal Error 403', showToast)
  }
});

// show toast
function showToast(data, success=false) {
  toast.style.visibility = 'visible';
  if (success) {
    toast.innerHTML = `<span>Color Copied: ${data}</span>`;
    toast.style.color = `${data}`;
    toast.style.borderLeft = `5px solid ${data}`;
  } else {
    toast.innerHTML = `<span>${data}</span>`;
    toast.style.color = '#E3342F';
    toast.style.borderLeft = '5px solid #E3342F';
  }
  setTimeout(() => {
    toast.style.visibility = 'hidden';
  }, 5000);
}