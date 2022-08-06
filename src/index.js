module.exports = function check(str, bracketsConfig) {
  let identical = bracketsConfig.map(elem => {
    if (elem[0] == elem[1]) return elem[0];
  }).filter(elem => elem !== undefined);
  let open = [];
  let pairs = {};


  bracketsConfig.forEach(elem => {
    if (elem[0] !== elem[1]) {
      open.push(elem[0]); //* заполняем open
      pairs[elem[1]] = elem[0]; //* запоняем pairs
    } 
  })

  let stack = [];
  for (let i = 0; i < str.length; i++) {
    let cur = str[i];
    let topElement = stack[stack.length - 1];

    if (identical.includes(cur)) {
      if (stack.length == 0 || topElement !== cur) {
        stack.push(cur)
      } else
      if (topElement === cur) {
        stack.pop()
      }
    } else {
      if (open.includes(cur)) {
        stack.push(cur)
      } else {
        if (!stack.length) return false;
        if (topElement === pairs[cur]) {
          stack.pop();
        } else return false
      }
    }
  }

  return stack.length === 0;
}