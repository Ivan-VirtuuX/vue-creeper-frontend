export const pluralizeProductCount = (count: number = 0) => {
  if (count === 1) {
    return `${count} товар`;
  } else if (count >= 2 && count <= 4) {
    return `${count} товара`;
  } else if (count >= 5 && count <= 20) {
    return `${count} товаров`;
  } else {
    const lastDigit = count % 10;
    if (lastDigit === 1) {
      return `${count} товар`;
    } else if (lastDigit >= 2 && lastDigit <= 4) {
      return `${count} товара`;
    } else {
      return `${count} товаров`;
    }
  }
};
