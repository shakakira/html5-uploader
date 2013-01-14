define(function (require, exports, module) {

  var $ = require('$');
  var Widget = require('widget');

  var html5Uploader = Widget.extend({
    setup: function () {
      if (this.element[0].tagName !== 'INPUT') {
        return;
      }

      var accept = this.get('accept');

      if (accept) {
        this.element.prop('accept', accept);
      }

      this._initEvent();
    },
    _initEvent: function () {
      var that = this;

      this.element.on('change', function () {
        var size = that.get('size');

        that.trigger('change', that.files = this.files);
      });
    },
    submit: function () {
      var pass = true;
      //没有选择文件
      if (!this.files) {
        this.trigger('error');
        return;
      }
      //验证文件大小
      var size = this.get('size');
      if (size) {
        //本地验证
        $.each(this.files, function (i, file) {
          if(file.size > size){
            file._size = false;
            pass = false;
          } else {
            file._size = true;
          }
        });
      }

      if (pass) {
        var action = this.get('action') || this.element.data('action');
        var name = this.get('name') || this.element.attr('name');
        var data = this.get('data') || {};
        var formdata = new FormData();

        for (var p in data) {
          formdata.append(p, data[p]);
        }

        $.each(this.files, function (i, file) {
          formdata.append(name, file);
        });

        $.ajax(action, {
          type: 'post',
          processData: false,
          contentType: false,
          data: formdata,
          context: this,
          success: function (response) {
            this.trigger('success', response);
          },
          error: function () {
            this.trigger('error');
          }
        })
      } else {
        this.trigger('error');
      }
    }
  });

  module.exports = html5Uploader;
});

