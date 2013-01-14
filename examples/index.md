# 常用场景

- order: 1

---

## 1.基本用法
 
<input id="uploader1" type="file" name="image" accept="image/*" multiple />
<button id="trigger1" type="button">Upload！</button>


````javascript
seajs.use(['$', 'html5-uploader'], function($, html5Uploader){
    var uploader = new html5Uploader({
        element: '#uploader1',
        action: '#',
        size: 1024
    }).on('change', function(){
        console.info('change');
    });
    $('#trigger1').click(function(){
        uploader.submit();
    });
});
````
