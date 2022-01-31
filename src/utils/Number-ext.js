Number.prototype.mod = function (n) {
  return ((this % n) + n) % n;
};

Number.prototype.between = function (min, max){
  return min <= this && this <= max;
}