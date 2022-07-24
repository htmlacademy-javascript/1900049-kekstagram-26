const getRand = (min, max) => {
  if (min > max) {
    return;
  }

  return Math.floor(Math.random() * (max - min + 1) + min);
};

getRand(2, 5);

export const debounce = function (callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
};

const getStringLength = (str, maxLength) => str.length <= maxLength;
const strParam = 'sgsdfgsdfgsdfgsfg';
const maxLengthParam = 20;
getStringLength(strParam, maxLengthParam);

export { getRand, getStringLength };
