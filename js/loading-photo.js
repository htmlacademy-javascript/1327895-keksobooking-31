const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const avatarInputElement = document.querySelector('.ad-form-header__input');
const avatarImageElement = document.querySelector('.ad-form-header__preview');
const propertyPhotoInputElement = document.querySelector('.ad-form__input');
const propertyPhotoPreviewElement = document.querySelector('.ad-form__photo');

propertyPhotoPreviewElement.style.overflow = 'hidden';

const loadAndDisplayImage = (inputElement, previewElement) => {
  const selectedFile = inputElement.files[0];
  const fileName = selectedFile.name.toLowerCase();
  const match = FILE_TYPES.some((extension) => fileName.endsWith(extension));

  previewElement.querySelector('img').src = '';

  if (match) {
    previewElement.querySelector('img').src = URL.createObjectURL(selectedFile);
  }
};

const setupImageUploadListeners = () => {
  avatarInputElement.addEventListener('change', () => {
    loadAndDisplayImage(avatarInputElement, avatarImageElement);
  });
  propertyPhotoInputElement.addEventListener('change', () => {
    loadAndDisplayImage(propertyPhotoInputElement, propertyPhotoPreviewElement);
  });
};

export { setupImageUploadListeners };
