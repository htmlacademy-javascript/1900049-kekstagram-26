const bodyElement = document.querySelector('body');

const hideTemplate = (templateName) => {
  const modalToHide = document.querySelector(`body > .${templateName}`);
  modalToHide.parentNode.removeChild(modalToHide);
};

const showTemplate = (templateName, btnFunc, customMessage) => {
  const uploadSuccessTooltipTemplate = document
    .querySelector(`#${templateName}`)
    .content.querySelector(`.${templateName}`);

  const uploadSuccessTooltipFragment = document.createDocumentFragment();
  const uploadSuccessTooltipElement =
    uploadSuccessTooltipTemplate.cloneNode(true);

  if (customMessage) {
    uploadSuccessTooltipElement.querySelector('.success__title').textContent =
      customMessage;
  }

  if (uploadSuccessTooltipElement.querySelector('button')) {
    uploadSuccessTooltipElement
      .querySelector('button')
      .addEventListener('click', () => hideTemplate(templateName));

    if (btnFunc) {
      uploadSuccessTooltipElement
        .querySelector('button')
        .addEventListener('click', () => btnFunc());
    }
  }

  uploadSuccessTooltipFragment.appendChild(uploadSuccessTooltipElement);
  bodyElement.appendChild(uploadSuccessTooltipFragment);
};

const initCustomMessageTemplate = (templateMessage) => ({
  open: () => showTemplate('success', undefined, templateMessage),
  close: () => hideTemplate('success'),
});

const initTemplate = (templateName, btnFunc) => ({
  open: () => showTemplate(templateName, btnFunc),
  close: () => hideTemplate(templateName),
});

export { hideTemplate, showTemplate, initCustomMessageTemplate, initTemplate };
