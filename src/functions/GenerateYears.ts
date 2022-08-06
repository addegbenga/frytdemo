const generateArrayOfYears = () => {
  var max = new Date().getFullYear();
  var min = max - 20;
  var years = [];

  for (var i = max; i >= min; i--) {
    years.push({ name: i });
  }
  return years;
};

const years = generateArrayOfYears();

export default years;
