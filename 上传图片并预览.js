//filereader 的方法
/* <form action="" enctype="multipart/form-data">
    <input id="file" class="filepath" onchange="changepic(this)" type="file"><br>
    <img src="" id="show" width="200">
</form> */

function changepic() {
    var reads = new FileReader(); //返回一个新构造的FileReader
    f = document.getElementById('file').files[0]; //得到上传的文件对象
    reads.readAsDataURL(f); //开始读取特定的Blob中的内容.一旦完成,result属性中将包含一个data:url格式的字符串以表示所读取文件的内容
    reads.οnlοad = function (e) { //在读取操作完成是触发
        document.getElementById('show').src = this.result;
    };
}