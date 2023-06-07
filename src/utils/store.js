const showLoading = (element) => {
  element.classList.add('active');
};

const hideLoading = (element) => {
  element.classList.remove('active');
};

export { showLoading, hideLoading };
