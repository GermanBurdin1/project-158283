function showBigPicture(photo) {
  console.log('Photo data:', photo);

  const batchSize = 5;

  const bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.remove('hidden');

  const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  bigPictureImg.src = photo.url;

  const likesCountElement = bigPicture.querySelector('.likes-count');
  likesCountElement.textContent = photo.likes;

  const descriptionElement = bigPicture.querySelector('.social__caption');
  descriptionElement.textContent = photo.description;

  const commentsList = bigPicture.querySelector('.social__comments');
  commentsList.innerHTML = '';

  const commentsCountElement = bigPicture.querySelector('.comments-count');
  commentsCountElement.textContent = photo.comments.length;

  const commentsLoader = bigPicture.querySelector('.comments-loader');
  let currentBatchSize = batchSize;

  function renderComments() {
    commentsList.innerHTML = '';
    const commentsToShow = photo.comments.slice(0, currentBatchSize);

    commentsToShow.forEach((comment) => {
      const commentElement = document.createElement('li');
      commentElement.classList.add('social__comment');

      const avatarElement = document.createElement('img');
      avatarElement.classList.add('social__picture');
      avatarElement.src = comment.avatar;
      avatarElement.alt = comment.name;
      avatarElement.width = 35;
      avatarElement.height = 35;

      const textElement = document.createElement('p');
      textElement.classList.add('social__text');
      textElement.textContent = comment.message;

      commentElement.appendChild(avatarElement);
      commentElement.appendChild(textElement);
      commentsList.appendChild(commentElement);
    });

    const displayedComments = Math.min(currentBatchSize, photo.comments.length);
    commentsCountElement.textContent = `${displayedComments} из ${photo.comments.length}`;

    commentsLoader.classList.toggle('hidden', currentBatchSize >= photo.comments.length);
  }

  renderComments();


  commentsLoader.addEventListener('click', () => {
    currentBatchSize += batchSize;
    renderComments();
  });

  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onEscPress);

  const cancel = document.querySelector('.big-picture__cancel');
  cancel.addEventListener('click', hideBigPicture);

  function onEscPress(evt) {
    if (evt.key === 'Escape') {
      hideBigPicture();
    }
  }

  function hideBigPicture() {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onEscPress);
  }

}

const commentCountElement = document.querySelector('.social__comment-count');
const commentLoaderElement = document.querySelector('.social__comments-loader');
commentCountElement.classList.remove('hidden');
commentLoaderElement.classList.remove('hidden');

export { showBigPicture };
