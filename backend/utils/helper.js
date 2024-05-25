module.exports = {
  reqDataValidatir: (validationSchema, data) => {
    try {
      const validation = validationSchema.validate(data);
      if (validation.error) {
        let message = validation.error.details[0].message;
        message = message.split(" ");
        message[0] = message[0].split('"')[1];
        let erroeMessage = "";
        message.map((w) => (erroeMessage += ` ${w}`));
        throw erroeMessage.trim();
      }
      return true;
    } catch (err) {
      throw err;
    }
  },
  Success: function (res, message = "", body = {}) {
    return res.status(200).json({
      success: true,
      code: 200,
      message: message,
      body: body,
    });
  },
  failed: function (res, message = "", statusCode) {
    message =
      typeof message === "object"
        ? message.message
          ? message.message
          : ""
        : message;
    return res.status(400).json({
      success: false,
      code: statusCode ? statusCode : 400,
      message: message,
      body: {},
    });
  },
};
