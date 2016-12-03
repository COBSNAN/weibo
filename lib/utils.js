
/**
 *  ObjectID
 */
//exports.ObjectID = require('bson').ObjectID;
/**
 * trim 删除左右两端的空格
 * @param  {String} str
 * @return {String}
 */
var trim = function(str) {
  if (str && str != '' && str != 'undefined') {
    return str.replace(/(^\s*)|(\s*$)/g, "");
  } else {
    return "";
  }
};
exports.trim = trim;
/**
 * ltrim 删除左边的空格
 * @param  {String} str
 * @return {String}
 */
function ltrim(str) {
  return str.replace(/(^\s*)/g, "");
}
exports.ltrim = ltrim;
/**
 * rtrim 删除右边的空格
 * @param  {String} str
 * @return {String}
 */
function rtrim(str) {
  return str.replace(/(\s*$)/g, "");
}


exports.rtrim = rtrim;
