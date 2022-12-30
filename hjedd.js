// ==UserScript==
// @name         HJSQ
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  better use!
// @author       You
// @match        https://hjedd.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bing.com
// @require      https://code.jquery.com/jquery-3.6.3.min.js
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function () {
    $('head').append($(`<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">`));
    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i].trim();
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return "";
    }

    let account = {
        username: '', // 用户名
        password: '' // 密码
    }


    // Your code here...
    $(document).ready(function () {
        let count1 = 0
        let count2 = 0
        let dialog1 = setInterval(function () {
            count1++;
            if (count1 > 10) {
                clearInterval(dialog1)
            }
            if (document.evaluate('/html/body/div[1]/div[6]/div[1]/div/div[3]/span/button', document).iterateNext()) {
                document.evaluate('/html/body/div[1]/div[6]/div[1]/div/div[3]/span/button', document).iterateNext().click()
                clearInterval(dialog1)
            }
        }, 200)
        let dialog2 = setInterval(function () {
            count2++
            if (count2 > 10) {
                clearInterval(dialog2)
            }
            if (document.evaluate('/html/body/div/div[6]/div[2]/div/div[3]/span/span', document).iterateNext()) {
                document.evaluate('/html/body/div/div[6]/div[2]/div/div[3]/span/span', document).iterateNext().click()
                clearInterval(dialog2)
            }
        }, 200)


        if (getCookie('NOTLOGIN') == 'NOTLOGIN' || !document.cookie) {
            console.log('当前未登录...')
            console.log('开始尝试登陆...')


            let loginPollingCount = 0;
            let loginPolling = setInterval(function () {
                loginPollingCount++
                if (loginPollingCount > 10) {
                    clearInterval(loginPolling)
                }
                let loginDiv = document.evaluate('/html/body/div/div[1]/div/div[3]/div/div[1]', document).iterateNext();
                if (loginDiv) {
                    console.log('执行登录...')
                    clearInterval(loginPolling)
                    loginDiv.click()
                }
            }, 200)



            let loginBoxCount = 0;
            let loginBoxPolling = setInterval(function () {
                loginBoxCount++;
                if (loginBoxCount > 10) {
                    clearInterval(loginBoxPolling);
                }



                let username = document.evaluate('/html/body/div/div[2]/div/div/form/div[1]/div/div/input', document).iterateNext();
                let password = document.evaluate('/html/body/div/div[2]/div/div/form/div[2]/div/div/input', document).iterateNext();


                if (username || password) {
                    clearInterval(loginBoxPolling);
                    if (!account) {
                        console.log('未检测到账号，退出登录');
                        return;
                    }
                    console.log(username,password)

                    username.value = account.username;
                    password.value = account.password;

                    // 触发输入事件
                    username.dispatchEvent(new Event('input'));
                    password.dispatchEvent(new Event('input'));

                    let loginBtn = document.evaluate('/html/body/div/div[2]/div/div/form/div[3]/div/button', document).iterateNext();
                    loginBtn.click();
                }

            }, 200)


            let msgCount = 0;
            let msgPolling = setInterval(function () {
                msgCount++;
                if (msgCount > 10) {
                    clearInterval(msgPolling);
                }

                if (document.evaluate('/html/body/div[2]/div/div[3]/button[1]', document).iterateNext()) {
                    clearInterval(msgPolling);
                    document.evaluate('/html/body/div[2]/div/div[3]/button[1]', document).iterateNext().click();
                    console.log('登陆成功')
                }

            }, 200)


        }


        // 注入解析功能


        var divapp = $(`<button id="ope" class="btn btn-primary" style="position: fixed; z-index:9999;width:100px;height:40px;top:80px;left:1%;font-size:14px;">解析视频</button>`);

        $('body').append(divapp);
        let flag = false;

        $('#ope').click(function () {
            let dataUrl = document.querySelector('div.video-div').getAttribute("data-url");
            let mp4 = dataUrl.substring(0, dataUrl.lastIndexOf('/')) + '.mp4';
            let mov = dataUrl.substring(0, dataUrl.lastIndexOf('/')) + '.mov';

            if (!flag) {
                document.querySelector('video.dplayer-video').setAttribute('src', mp4);
                document.querySelector('span.sell_line2').innerHTML = 'mp4解析中...当播放器中出现的时长与视频预计的时长相等时，就别在按了！'
                flag = !flag;
            } else {
                document.querySelector('video.dplayer-video').setAttribute('src', mov);
                document.querySelector('span.sell_line2').innerHTML = 'mov解析中...当播放器中出现的时长与视频预计的时长相等时，就别在按了！'
                flag = !flag;
            }


        })







    })
})();
