define(function (require) {
  var $ = require('$');
  var html5Uploader = require('../src/html5-uploader');

  describe('html5-uploader', function () {

    beforeEach(function () {
      $('<input id="test" type="file"/>').appendTo(document.body);
    });

    afterEach(function () {
      $('#test').remove();
    });

    it('没有选择文件', function (done) {

      var uploader = new html5Uploader({
        element: '#test',
        action: '#',
        data: {
          a: 1
        }
      }).on('error', function (files) {
          expect(files).to.eql([]);
          done();
        });
      uploader.submit();
    });

  });
});

