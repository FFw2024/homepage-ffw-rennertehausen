/**
 *
 * @param {HTMLElement} parent
 * @param {keyof HTMLElementTagNameMap} tagName
 * @param {string[]} classNames
 * @param {*} attributes
 * @returns A new created Element with the specified classNames and attributes
 */
function createElement(parent, tagName, classNames = [], attributes = {}) {
  const element = document.createElement(tagName);

  classNames.forEach(className => element.classList.add(className));

  for (const attributeName in attributes) {
    element.setAttribute(attributeName, attributes[attributeName]);
  }

  parent.appendChild(element);

  return element;
}

const modalElement = document.getElementById('imageGallery');

function createModal(images, imageSrc) {
  modalElement.classList.add('modal', 'fade');

  // init image gallery
  const dialogNode = createElement(
      modalElement, 'div',
      ['modal-dialog', 'modal-xl', 'modal-dialog-centered']);
  const contentNode = createElement(dialogNode, 'div', ['modal-content']);

  // modal header with close button
  const headerNode = createElement(contentNode, 'div', ['modal-header']);

  // init close button
  const closeButton = createElement(
      headerNode, 'button', ['btn-close'],
      {'data-bs-dismiss': 'modal', 'aria-label': 'Close'});
  closeButton.type = 'button';

  // modal body
  const bodyNode = createElement(contentNode, 'div', ['modal-body']);

  // image carousel
  const carousel = createElement(
      bodyNode, 'div', ['carousel', 'carousel-dark', 'slide'],
      {'id': 'imageCarousel', 'data-bs-ride': 'carousel'});

  const carouselIndicators = createElement(carousel, 'div', ['carousel-indicators']);
  const carouselInner = createElement(carousel, 'div', ['carousel-inner']);

  images.forEach((image, index) => {
    // indicator
    createElement(carouselIndicators, 'button', index == 0 ? ['active'] : [], 
    {
      type: "button",
      "data-bs-target": "#imageCarousel",
      "data-bs-slide-to": index,
    });

    // carousel item
    const carouselItem = createElement(carouselInner, 'div',
        index == 0 ? ['carousel-item', 'active'] : ['carousel-item']);
    createElement(
        carouselItem, 'img', ['d-block', 'w-100'],
        {'src': `${imageSrc}/${image.filename}`});
  });

  // carousel buttons and indicators
  const buttonPrev =
      createElement(carousel, 'button', ['carousel-control-prev'], {
        'type': 'button',
        'data-bs-target': '#imageCarousel',
        'data-bs-slide': 'prev'
      });

  createElement(
      buttonPrev, 'span', ['carousel-control-prev-icon'],
      {'aria-hidden': 'true'});
  const labelButtonPrev =
      createElement(buttonPrev, 'span', ['visually-hidden']);
  labelButtonPrev.textContent = 'Previous';

  const buttonNext =
      createElement(carousel, 'button', ['carousel-control-next'], {
        'type': 'button',
        'data-bs-target': '#imageCarousel',
        'data-bs-slide': 'next'
      });

  createElement(
      buttonNext, 'span', ['carousel-control-next-icon'],
      {'aria-hidden': 'true'});
  const labelButtonNext =
      createElement(buttonNext, 'span', ['visually-hidden']);
  labelButtonNext.textContent = 'Next';
}
// add images
const searchParams = (new URL(window.location)).searchParams;
const urlPath = modalElement.getAttribute('data-image-src');

if (urlPath && searchParams) {
  const id = searchParams.get('id');

  const imgSrc = `${urlPath}/${id}`;

  var res = await fetch(`${imgSrc}/images.json`)

  if (!res.ok) {
    if (res.status == 404) {
      const button = document.querySelector('[data-bs-target="#imageGallery"]');
      if (button) {
        button.classList.add('invisible')
      }
    }

    console.log(res);
    throw res.statusText;
  }
  else {
    const images = await res.json();
    createModal(images, imgSrc);
  }
}
