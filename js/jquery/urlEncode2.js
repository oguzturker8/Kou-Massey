$j.extend({
  URLEncode2 : function (aString) {
    var s = aString;
    if (s.length > 0) {
      s = encodeURIComponent(s);
      s = s.replace(/\~/g, '%7E').replace(/\!/g, '%21').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\'/g, '%27');
      s = s.replace(/%20/g, '+');
    }
    return s;
  },
  URLDecode2 : function (aString) {
    var s = aString;
    if (s.length > 0) {
      s = s.replace(/\+/g, '%20');
      s = decodeURIComponent(s);
    }
    return s;
  }
});
