const bodyElement = document.querySelector('body');

export const hideTemplate = (templateName) => {
  const modalToHide = document.querySelector(`body > .${templateName}`);
  modalToHide.parentNode.removeChild(modalToHide);
};

export const showTemplate = (templateName, btnFunc, customMessage) => {
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

export const initCustomMessageTemplate = (templateMessage) => ({
  open: () => showTemplate('success', undefined, templateMessage),
  close: () => hideTemplate('success'),
});

export const initTemplate = (templateName, btnFunc) => ({
  open: () => showTemplate(templateName, btnFunc),
  close: () => hideTemplate(templateName),
});
