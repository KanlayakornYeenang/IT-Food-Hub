const createOrderID = (dateTime) => {
  // แยกวันที่และเวลา
  var parts = dateTime.split(" ");
  var date = parts[0];
  var time = parts[1];

  // แยกส่วนของวันที่
  var dateParts = date.split("-");
  var year = dateParts[0].substring(2);
  var month = dateParts[1];
  var day = dateParts[2];

  // แยกส่วนของเวลา
  var timeParts = time.split(":");
  var hour = timeParts[0];
  var minute = timeParts[1];
  var second = timeParts[2];

  // สร้างรหัสที่ต้องการ
  var code = year + month + day + hour + minute + second;
  return code;
};

module.exports = { createOrderID };
