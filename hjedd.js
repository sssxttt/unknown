(function () {

    // Your code here...
    // 引入 CSS
    $('head').append($(`<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">`));
    // 使用 Bootstrap 搭建简洁的界面


    $(document).ready(function () {

        var divapp = $(`<button id="ope" class="btn btn-primary" style="position: fixed; z-index:9999;width:100px;height:40px;top:80px;left:1%;font-size:14px;">解析视频</button>`);

        $('body').append(divapp);

        $('#ope').click(function () {


            if ( $('#button1') ) {
                $('#button1').remove();
            }
            if ( $('#button2') ) {
                $('#button2').remove();
            }

            let videoNodes = document.getElementsByClassName("video-div-btn");
            console.log('当前界面包含：%d 个视频！！！', videoNodes.length);
            if (videoNodes.length > 0) {
                for (let i = 0; i < videoNodes.length; i++) {
                    console.log('开始解析第 %d 个视频', (i + 1));
                    let videoNodeId = videoNodes[i].id;
                    let videoNode = document.getElementById(videoNodeId);
                    let videoPreviewUrl = videoNode.getAttribute('data-url');

                    let mp4Url;
                    let movUrl;
                    // 解析视频链接
                    if (videoPreviewUrl.search(/.m3u8/i)) {
                        mp4Url = videoPreviewUrl.substr(0, videoPreviewUrl.lastIndexOf('/')) + '.mp4';
                        movUrl = videoPreviewUrl.substr(0, videoPreviewUrl.lastIndexOf('/')) + '.mov';
                    }

                    let button1 = document.createElement('button');
                    button1.id = 'button1';
                    button1.innerText = 'Go for free MP4!!!';
                    button1.style = 'width:60px; height:100px;margin: 0 10px;';
                    button1.addEventListener('click', function () {
                        window.open(mp4Url);
                    });

                    let button2 = document.createElement('button');
                    button2.id = 'button2';
                    button2.innerText = 'Go for free MOV!!!';
                    button2.style = 'width:60px; height:100px;';

                    button2.addEventListener('click', function () {
                        window.open(movUrl);
                    });



                    let box = document.getElementsByClassName('action-tyf d-flex justify-content-center mt-2')[0];
                    box.appendChild(button1);
                    box.appendChild(button2);

                }
            } else {
                // 消息提示
                alert('当前页面未找到视频！！！');
                console.log('当前页面未找到视频！！！');
            }
        });

    })


})();
