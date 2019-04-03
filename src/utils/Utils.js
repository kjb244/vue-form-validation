class Utils{

  lettersOnly = (value) => {
    if (value.length === 0) return true;
    return /^[A-z]+$/.test(value || '');
  };

}

const utils = new Utils();

export default utils;
