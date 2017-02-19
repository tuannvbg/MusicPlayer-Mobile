/*
** 播放器事件绑定
  I.  主要功能性控制事件
      1(done)、播放 & 暂停事件绑定
      2、点击列表播放相应歌曲并切换相应图片，获取并显示相应时间
      3、点击或拖动进度条跳转到相应歌曲时间不停止播放
  II. 效果性事件
      1(done)、点击 播放 时，播放按钮切换为 暂停，页面切换到 播放页面
               点击 暂停 时，暂停按钮切换为播放，页面切换到 列表页面
      2(done)、播放时，播放页面的图片转动
      3(done)、鼠标漂浮到 播放按钮、上下一曲按钮、列表，进度条按钮 上时效果变化
      4(done)、添加动画
*/



// 得到播放器元素
var musicPlayer = getElement('#id-audio-player')

// 1、播放 & 暂停事件绑定
var playSwitch = function() {
    // 得到播放按钮
    var playButton = getElement('#id-button-play')
    // 绑定播放按钮事件
    bindEvent(playButton, 'click', function(){
        if(musicPlayer.paused) {
            musicPlayer.play()
            log('playing')
            // 切换暂停图标
            changeIcon(true, playButton)
            // 添加过渡动画
            addTransition(true, playButton)

        } else {
            musicPlayer.pause()
            log('paused')
            // 切换播放图标
            changeIcon(false, playButton)
            // 添加过渡动画
            addTransition(false, playButton)

        }

    })

}

// 切换播放图标函数
var changeIcon = function(state, button) {
    //
    if(state) {
        // 状态为 true, 说明此时需要切换为暂停按钮
        button.src = '../icons/pause.png'
    } else {
        // 切换为播放按钮
        button.src = '../icons/play.png'
    }
}

// 添加过渡动画
var transition = function(selector, transitionClass) {
    var elements = getElements(selector)
    for (var i = 0; i < elements.length; i++) {
        toggleClass(elements[i], transitionClass)
        log('elements: ', elements[i])
    }
}

var addTransition = function(flag, button) {
    var img = getElement('.skye-mp3-img')
    if(flag) {
        setTimeout(function(){
            toggleClass(img, 'img-rotate_play')
            transition(".circle", 'circle_play')
        }, 1000)
    } else {
        toggleClass(img, 'img-rotate_play')
        transition(".circle", 'circle_play')
    }
    transition(".skye-mp3-list", 'skye-mp3-list_play')
    transition(".skye-mp3-img", 'skye-mp3-img_play')
    transition("#skye-mp3-progress", 'skye-mp3-progress_play')
    transition("#id-div-currentSong", 'div-currentSong_play')
    transition("#id-span-currentTime", 'span-currentTime_play')
    transition("#id-span-duration", 'span-duration_play')
    transition("#progressbar", 'progressbar_play')
    transition(".bar", 'bar_play')
    toggleClass(button, 'button-play_play')
    transition("#id-button-pre", 'button-pre_play')
    transition("#id-button-next", 'button-next_play')
}















var __skye = function() {
    playSwitch()
}
// __skye()
