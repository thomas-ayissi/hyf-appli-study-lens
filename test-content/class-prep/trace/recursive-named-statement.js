const a = function b(x) {
  if (x === 0) {
    return x;
  } else {
    return b(x - 1) + x;
  }
};

const r = a(3);
const s = a(4);
