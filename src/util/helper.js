const getFirstLetterOfName = (name) => {
  const nameArr = name.trim().split(' ').reverse();
  const firstName = nameArr[0];

  return firstName.trim().charAt(0);
};

export { getFirstLetterOfName };