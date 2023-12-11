const maxPictures = 10;
const generateBtn = document.querySelector('.generate-btn');
const imageContainer = document.getElementById('imageContainer');
const operationBtn = document.querySelector('.operation-btn');
let images = [];

generateBtn.addEventListener("click",()=>{
    const numberOfPhotosInput = document.getElementById('numberOfPhotos');
    const numberofPhotos = parseInt(numberOfPhotosInput.value);

    if (isNaN(numberofPhotos) || numberofPhotos <= 0 || numberofPhotos > maxPictures) {
        alert('Please enter a valid number between 1 and 10.');
        return;
    }

    generateImages(numberofPhotos);
    displayImages();
    
});

operationBtn.addEventListener('click',()=>{
    const selectedOperation = prompt('Choose an operation:\n1. Add New Picture\n2. Delete a Picture\n3. Replace a Picture\n4. Change the Size of a Picture');

    switch (selectedOperation) {
      case '1':
        addNewPicture();
        break;
      case '2':
        deletePicture();
        break;
      case '3':
        replacePicture();
        break;
      case '4':
        changePictureSize();
        break;
      default:
        alert('Invalid operation selection.');
    }
});

function generateImages(n) {
    images = [];
    for (let i=0;i<n;i++){
        const imageUrl = `https://picsum.photos/200/200?random=${Math.floor(Math.random()*1000)}`;
        images.push(imageUrl);
    }
};

function displayImages(){
    imageContainer.innerHTML='';
    for (let i=0;i<images.length;i++){
        let imgElement = document.createElement('img');
        imgElement.src=images[i];
        imageContainer.appendChild(imgElement);
    }

};

function getPosition() {
    let position = parseInt(prompt('Enter the position of the picture:'));
    if (!isFinite(position)||position<0) alert('Enter a valid position');
    //  adjust as array position
    position--;
    return position;
}

function addNewPicture() {
    let position = getPosition();
    const url = prompt('Enter the url of the picture:');
    images.splice(position,0,url);
    displayImages();
}

function deletePicture() {
    let position = getPosition();
    images.splice(position,1);
    displayImages();
}

function replacePicture() {
    let position = getPosition();
    const url = prompt('Enter the url of the picture:');
    images.splice(position,1,url);
    displayImages();
}

function changePictureSize() {
    const images = document.querySelectorAll('#imageContainer img');
    let position = getPosition();
    const width = prompt('Set the width in px:');
    const height = prompt('Set the height in px:');
    images[position].style.width = `${width}px`;
    images[position].style.height = `${height}px`;
}

