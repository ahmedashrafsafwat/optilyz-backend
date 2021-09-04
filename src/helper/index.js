exports.successResponse = (message,data =[], code = 200,res) => res.status(code).send({
    code,
    data,
    message,
  });
  
  exports.errorResponse = (
    message,
    code = 500,
    res
  ) => res.status(code).json({
    code,
    message,
  });
  
  exports.validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  
  exports.validateFields = (object, fields) => {
    const errors = [];
    fields.forEach((f) => {
      if (!(object && object[f])) {
        errors.push(f);
      }
    });
    return errors.length ? `${errors.join(', ')} are required fields.` : '';
  };
  
  exports.uniqueId = (length = 13) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };