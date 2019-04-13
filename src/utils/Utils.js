class Utils{

  lettersOnly = (value) => {
    if (value.length === 0) return true;
    return /^[A-z]+$/.test(value || '');
  };

  fillInputs = (that, route) => {
    const fd = that.routeData.formData[route];
    Object.keys(fd).map((e) => {
      if(that.formData && e in that.formData){
        that.formData[e] = fd[e];
      }
      else if(e in that){
        that[e] = fd[e];
      }
    })
  }

}

const utils = new Utils();

export default utils;
