
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
    const eventImgNext = navNext.addEventListener('click', onImageNext) 
    

    // todo:
    // utwórz nasłuchiwanie eventu o nazwie [click], który ma uruchomić event [js-slider-img-prev]
    // na elemencie [.js-slider__nav--prev]
    const navPrev = sliderRootElement.querySelector('.js-slider__nav--prev');
    const eventImgPrev = navPrev.addEventListener('click', onImagePrev); 

    // todo:
    // utwórz nasłuchiwanie eventu o nazwie [click], który ma uruchomić event [js-slider-close]
    // tylko wtedy, gdy użytkownik kliknie w [.js-slider__zoom]
    const zoom = sliderRootElement.querySelector('.js-slider__zoom');
    const eventImgZoom = zoom.addEventListener('click', onImageClick); 
}

const fireCustomEvent = function(element, name) {
    console.log(element.className, '=>', name);

    const event = new CustomEvent(name, {
        bubbles: true,
    });

    element.dispatchEvent( event );
}

const initCustomEvents = function(imagesList, sliderRootElement, imagesSelector) {
    // imagesList wszystkie zdjęcia <figure> Node List
    // sliderRootElement cały kod
    // imagesSelector - z klasą gallery__item
    // console.log(sliderRootElement);
    // console.log(imagesSelector);
    imagesList.forEach(function(img) {
        img.addEventListener('js-slider-img-click', function(event) {
            onImageClick(event, sliderRootElement, imagesSelector);
        });
    });

    sliderRootElement.addEventListener('js-slider-img-next', onImageNext);
    sliderRootElement.addEventListener('js-slider-img-prev', onImagePrev);
    sliderRootElement.addEventListener('js-slider-close', onClose);
}

const imgAttrList = [];
console.log(imgAttrList);

const onImageClick = function(event, sliderRootElement, imagesSelector) {
    // todo:  
    // 1. dodać klasę [.js-slider--active], aby pokazać całą sekcję
    sliderRootElement.classList.add('js-slider--active');

    // 2. wyszukać ścieżkę (atrybut [src]) do klikniętego elementu i wstawić do [.js-slider__image]
    const elementClicked = event.target; //ok
    console.log(elementClicked);
    const imageClicked = elementClicked.querySelector('img'); //ok
    const imageClickedPath = imageClicked.getAttribute('src'); //ok 
    const sliderImg = document.querySelector('.js-slider__image');
    sliderImg.setAttribute('src', imageClickedPath); //ok 
    
    // 3. pobrać nazwę grupy zapisaną w dataset klikniętego elementu #tagName
    const sliderGroupName = elementClicked.dataset.sliderGroupName; //good

    // 4. wyszukać wszystkie zdjęcia należące do danej grupy, które wykorzystasz do osadzenia w dolnym pasku 
    
    //wszystkie <figure> należące do danej grupy
    const figureGroupList = document.querySelectorAll('figure[data-slider-group-name="' + sliderGroupName +'"'); //NodeList 8 ok
    console.log(figureGroupList); //ok
    //wszystkie <img> należące do danej grupy (wewnątrz wyszukanych <figure>)
    
    const childImgList = []; // tablica zawierająca zdjęcia z wyświetlanej grupy
    
    figureGroupList.forEach(function(childImg) {
        const allChildImg = childImg.querySelectorAll('img');
        console.log(allChildImg);
        for(let i=0; i<allChildImg.length; i ++) {
        const eachChildImg = allChildImg[i];
        console.log(eachChildImg); // ok
            childImgList.push(eachChildImg);
        }
    })
    console.log(childImgList); // ok

    // 5. utworzyć na podstawie elementu [.js-slider__thumbs-item--prototype] zawartość dla [.js-slider__thumbs]
    const imgThumbs = document.querySelector('.js-slider__thumbs');
    
    //DO WYJAŚNIENIA: czy to jest potrzebne?
    const imgThumbsProto = document.querySelector('.js-slider__thumbs-item--prototype');
    const imgThumbsProtoHTML = imgThumbsProto.innerHTML; //ok
    imgThumbs.innerHTML = imgThumbsProtoHTML; //ok
    console.log(imgThumbs);
    
    // 6. zaznaczyć przy pomocy klasy [.js-slider__thumbs-image--current], który element jest aktualnie wyświetlany
    const zoom = sliderRootElement.querySelector('.js-slider__image');
    zoom.classList.add('js-slider__thumbs-image--current'); //ok
    
    //dodanie aktualnego obrazka do paska na dole
    const currentImgAtt = zoom.getAttribute('src');
    console.log(currentImgAtt); 
    const thumbsImg = document.querySelector('.js-slider__thumbs-image'); 
    thumbsImg.setAttribute('src', currentImgAtt);
    console.log(thumbsImg); 
    
    //dodanie wszystkich obrazków z grupy do paska na dole
    // const imgAttrList = [];
    childImgList.forEach(function(addedImg) {
        const addedImgAttr = addedImg.getAttribute('src');
        console.log(addedImgAttr); //ok
        imgAttrList.push(addedImgAttr);
    })
    console.log(imgAttrList); // tablica zawierająca wartość <src> aktualnie wyświetlanej grupy
    
    childImgList.forEach(function(imgEl) {
        const thumbsSlider = document.querySelector('.js-slider__thumbs');
        //zmieniam nazwę klasy na js-slider__thumbs-image
        imgEl.className = "js-slider__thumbs-image";
            thumbsSlider.appendChild(imgEl);
            //DO POPRAWY: w pasku na dole 2x pokazuje się zdjęcie obecnie wyświetlane
            console.log(thumbsSlider);
    })
}

const onImageNext = function(event) {
    console.log(this, 'onImageNext');
    // [this] wskazuje na element [.js-slider]
    
    // todo:
    // 1. wyszukać aktualny wyświetlany element przy pomocy [.js-slider__thumbs-image--current]
    const currentImg = document.querySelector('.js-slider__thumbs-image--current'); //ok
   console.log(currentImg); //ok src...3
    // 2. znaleźć element następny do wyświetlenie względem drzewa DOM dla [.js-slider__thumbs]
    imgAttrList.forEach(function(attr) {
        currentImg.setAttribute('src', attr); // dodaje się tylko raz z galerii, a nie z grupy wyświetlanej na pasku na dole
    })

    // 3. sprawdzić czy ten element istnieje - jeśli nie to [.nextElementSibling] zwróci [null]
    if(!nextImg) {
        // 4. przełączyć klasę [.js-slider__thumbs-image--current] do odpowiedniego elementu
        //??
    }

    // 5. podmienić atrybut o nazwie [src] dla [.js-slider__image]
    // const elementClicked = event.target; 
    // const imageClicked = elementClicked.querySelector('img'); 
    // const imageClickedPath = imageClicked.getAttribute('src'); 
    // const sliderImg = document.querySelector('.js-slider__image');
    // sliderImg.setAttribute('src', imageClickedPath); 
}

const onImagePrev = function(event) {
    console.log(this, 'onImagePrev');
    // [this] wskazuje na element [.js-slider]
    
    // todo:
    // 1. wyszukać aktualny wyświetlany element przy pomocy [.js-slider__thumbs-image--current]
    const currentImg = document.querySelector('js-slider__thumbs-image--current'); //null

    // 2. znaleźć element poprzedni do wyświetlenie względem drzewa DOM dla [.js-slider__thumbs]
    const prevImg = currentImg.previousElementSiblingElementSibling;
    const imgThumbs = document.querySelector('.js-slider__thumbs');

    // 3. sprawdzić czy ten element istnieje i czy nie posiada klasy [.js-slider__thumbs-item--prototype]
    if(prevImg && !(prevImg.className === 'js-slider__thumbs-item--prototype')) {

    }
    // 4. przełączyć klasę [.js-slider__thumbs-image--current] do odpowiedniego elementu
    //??
    // 5. podmienić atrybut [src] dla [.js-slider__image]
    const elementClicked = event.target; 
    const imageClicked = elementClicked.querySelector('img'); 
    const imageClickedPath = imageClicked.getAttribute('src');  
    const sliderImg = document.querySelector('.js-slider__image');
    sliderImg.setAttribute('src', imageClickedPath); 
}

const onClose = function(event) {
    // todo:
    // 1. należy usunąć klasę [js-slider--active] dla [.js-slider]
    const sliderRootSelector = '.js-slider';
    sliderRootSelector.classList.remove('js-slider--active');
    // 2. należy usunąć wszystkie dzieci dla [.js-slider__thumbs] pomijając [.js-slider__thumbs-item--prototype]
    const imgThumbs = document.querySelectorAll('.js-slider__thumbs');
    while(imgThumbs.firstChild) {
        if(imgThumbs.firstChild.className !== 'js-slider__thumbs-item--prototype') {
            imgThumbs.removeChild(imgThumbs.firstChild);
        }
    }
}