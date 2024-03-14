
const init = function() {
    const imagesList = document.querySelectorAll('.gallery__item');
    imagesList.forEach( img => {
        img.dataset.sliderGroupName = Math.random() > 0.5 ? 'nice' : 'good';
    }); // za każdym przeładowaniem strony przydzielaj inną nazwę grupy dla zdjęcia

    runJSSlider();
}

document.addEventListener('DOMContentLoaded', init);

const runJSSlider = function() {
    const imagesSelector = '.gallery__item';
    const sliderRootSelector = '.js-slider'; 

    const imagesList = document.querySelectorAll(imagesSelector);
    const sliderRootElement = document.querySelector(sliderRootSelector);

    initEvents(imagesList, sliderRootElement);
    initCustomEvents(imagesList, sliderRootElement, imagesSelector);
}

const initEvents = function(imagesList, sliderRootElement) {
    imagesList.forEach( function(item)  {
        item.addEventListener('click', function(e) {
            fireCustomEvent(e.currentTarget, 'js-slider-img-click');
        });
        
    });

    // todo: 
    // utwórz nasłuchiwanie eventu o nazwie [click], który ma uruchomić event [js-slider-img-next]
    // na elemencie [.js-slider__nav--next]
    const navNext = sliderRootElement.querySelector('.js-slider__nav--next');
    const eventImgNext = navNext.addEventListener('click', onImageNext, true); 
    

    // todo:
    // utwórz nasłuchiwanie eventu o nazwie [click], który ma uruchomić event [js-slider-img-prev]
    // na elemencie [.js-slider__nav--prev]
    const navPrev = sliderRootElement.querySelector('.js-slider__nav--prev');
    const eventImgPrev = navPrev.addEventListener('click', onImagePrev, true); 

    // todo:
    // utwórz nasłuchiwanie eventu o nazwie [click], który ma uruchomić event [js-slider-close]
    // tylko wtedy, gdy użytkownik kliknie w [.js-slider__zoom]
    const zoom = sliderRootElement.querySelector('.js-slider__zoom');
    console.log(zoom);
    const eventImgZoom = zoom.addEventListener('click', onClose, true); 
}

const fireCustomEvent = function(element, name) {
    console.log(element.className, '=>', name);

    const event = new CustomEvent(name, {
        bubbles: true,
    });

    element.dispatchEvent( event );
}

const initCustomEvents = function(imagesList, sliderRootElement, imagesSelector) {

    imagesList.forEach(function(img) {
        img.addEventListener('js-slider-img-click', function(event) {
            onImageClick(event, sliderRootElement, imagesSelector);
        });
    });

    sliderRootElement.addEventListener('js-slider-img-next', onImageNext);
    sliderRootElement.addEventListener('js-slider-img-prev', onImagePrev);
    sliderRootElement.addEventListener('js-slider-close', onClose);
}
//DZIAŁA
const onImageClick = function(event, sliderRootElement, imagesSelector) {
    // todo:  
    // 1. dodać klasę [.js-slider--active], aby pokazać całą sekcję
    const sliderSection = document.querySelector('.js-slider');
    // console.log(sliderSection);
    sliderSection.classList.add('js-slider--active');  //ok

    // 2. wyszukać ścieżkę (atrybut [src]) do klikniętego elementu i wstawić do [.js-slider__image]
    const elementClicked = event.target; //ok
    const imageClicked = elementClicked.querySelector('img'); //ok
    const imageClickedPath = imageClicked.getAttribute('src'); //ok 
    const sliderImg = document.querySelector('.js-slider__image');
    sliderImg.setAttribute('src', imageClickedPath); //ok 
    
    // 3. pobrać nazwę grupy zapisaną w dataset klikniętego elementu #tagName
    const sliderGroupName = elementClicked.dataset.sliderGroupName; //good

    // 4. wyszukać wszystkie zdjęcia należące do danej grupy, które wykorzystasz do osadzenia w dolnym pasku 
    
    //wszystkie <figure> należące do danej grupy
    const figureGroupList = document.querySelectorAll('figure[data-slider-group-name="' + sliderGroupName +'"'); //NodeList 8 ok
    
    //wszystkie <img> należące do danej grupy (wewnątrz wyszukanych <figure>)
    // const imgGroupList = document.querySelectorAll('figure[data-slider-group-name="' + sliderGroupName +'"] img');

    
    // 5. utworzyć na podstawie elementu [.js-slider__thumbs-item--prototype] zawartość dla [.js-slider__thumbs]
    const imgThumbs = document.querySelector('.js-slider__thumbs');
    
    const imgThumbsProto = document.querySelector('.js-slider__thumbs-item--prototype').cloneNode(true);

    figureGroupList.forEach(function(figure) {
        const src = figure.querySelector('img').getAttribute('src');
        const newThumb = imgThumbsProto.cloneNode(true);
        
        const img = newThumb.querySelector('img');
        img.setAttribute('src', src);
        newThumb.classList.remove('js-slider__thumbs-item--prototype');
        imgThumbs.appendChild(newThumb);

        // 6. zaznaczyć przy pomocy klasy [.js-slider__thumbs-image--current], który element jest aktualnie wyświetlany
        if(imageClickedPath === src) {
            img.classList.add('js-slider__thumbs-image--current');
        }
    })
}
//DZIAŁA
const onImageNext = function(event) {
    console.log(this, 'onImageNext');
    // [this] wskazuje na element [.js-slider]
    
    // todo:
    // 1. wyszukać aktualny wyświetlany element przy pomocy [.js-slider__thumbs-image--current]
    const currentImg = document.querySelector('.js-slider__thumbs-image--current'); //ok
    // 2. znaleźć element następny do wyświetlenie względem drzewa DOM dla [.js-slider__thumbs]
    const nextElement = currentImg.parentElement.nextElementSibling; //ok

    
    // 3. sprawdzić czy ten element istnieje - jeśli nie to [.nextElementSibling] zwróci [null]
    // 4. przełączyć klasę [.js-slider__thumbs-image--current] do odpowiedniego elementu
    // 5. podmienić atrybut o nazwie [src] dla [.js-slider__image]
    if(nextElement) {
        currentImg.classList.remove('js-slider__thumbs-image--current');
        nextElement.querySelector('img').classList.add('js-slider__thumbs-image--current');
    
        document.querySelector('.js-slider__image').setAttribute('src', nextElement.querySelector('img').getAttribute('src'));
    }
}

//DZIAŁA
const onImagePrev = function(event) {
    console.log(this, 'onImagePrev');
    // [this] wskazuje na element [.js-slider]
    
    // todo:
    // 1. wyszukać aktualny wyświetlany element przy pomocy [.js-slider__thumbs-image--current]
    const currentImg = document.querySelector('.js-slider__thumbs-image--current'); //ok
    // 2. znaleźć element poprzedni do wyświetlenie względem drzewa DOM dla [.js-slider__thumbs]
    const prevElement = currentImg.parentElement.previousElementSibling; //ok
    // 3. sprawdzić czy ten element istnieje i czy nie posiada klasy [.js-slider__thumbs-item--prototype]
    // 4. przełączyć klasę [.js-slider__thumbs-image--current] do odpowiedniego elementu
    // 5. podmienić atrybut [src] dla [.js-slider__image]
    if(prevElement) {
        currentImg.classList.remove('js-slider__thumbs-image--current');
        prevElement.querySelector('img').classList.add('js-slider__thumbs-image--current');
        document.querySelector('.js-slider__image').setAttribute('src', prevElement.querySelector('img').getAttribute('src'));
    }
}
//WYŁĄCZYĆ PROPAGACJĘ
const onClose = function(event) {
    // todo:
    // 1. należy usunąć klasę [js-slider--active] dla [.js-slider]
    const sliderRootSelector = document.querySelector('.js-slider');
    sliderRootSelector.classList.remove('js-slider--active');
    // 2. należy usunąć wszystkie dzieci dla [.js-slider__thumbs] pomijając [.js-slider__thumbs-item--prototype]
    const imgThumbs = document.querySelectorAll('.js-slider__thumbs');
    while(imgThumbs.firstElementChild) {
        if(imgThumbs.firstElementChild.className !== 'js-slider__thumbs-item--prototype') {
            imgThumbs.removeChild(imgThumbs.firstChild);
        }
    }
}