const showLoading = (element) => {
  element.classList.add('active');
};

const hideLoading = (element) => {
  element.classList.remove('active');
};

const showEl = (element) => {
  element.classList.add('show');
  element.classList.remove('hidden');
};

const hideEl = (element) => {
  element.classList.add('hidden');
  element.classList.remove('show');
};

export { showLoading, hideLoading, showEl, hideEl };
