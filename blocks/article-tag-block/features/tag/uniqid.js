'strict';

const uniqueId = () => {
  let idCounter = 0;
  return (prefix) => {
    idCounter += 1;
    return `${prefix}${idCounter}`;
  };
};

export default uniqueId();
