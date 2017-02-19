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
      4、添加动画
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
            // 切换至播放页面
            // changePage(true)

            // 添加过渡动画
            var playList = getElement('.skye-mp3-list')
            // toggleClass(playList, 'bounceInUp')
            // toggleClass(playList, 'bounceOutDown')
            toggleClass(playList, 'skye-mp3-list_play')

            var img = getElement('.skye-mp3-img')
            var circles = getElements('.circle')
            toggleClass(img, 'skye-mp3-img_play')
            setTimeout(function(){
                toggleClass(img, 'img-rotate_play')
                for (var i = 0; i < circles.length; i++) {
                    toggleClass(circles[i], 'circle_play')
                }
            }, 1000)

            var progressContainer = getElement('.skye-mp3-progress')
            toggleClass(progressContainer, 'skye-mp3-progress_play')

            var currentSongName = getElement('#id-div-currentSong')
            toggleClass(currentSongName, 'div-currentSong_play')

            var currentTime = getElement('#id-span-currentTime')
            var totalTime = getElement('#id-span-duration')
            toggleClass(currentTime, 'span-currentTime_play')
            toggleClass(totalTime, 'span-duration_play')

            var progressbar = getElement('#progressbar')
            var bar = getElement('.bar')
            toggleClass(progressbar, 'progressbar_play')
            toggleClass(bar, 'bar_play')

            toggleClass(playButton, 'button-play_play')
            var preButton = getElement('#id-button-pre')
            var nextButton = getElement('#id-button-next')
            toggleClass(preButton, 'button-pre_play')
            toggleClass(nextButton, 'button-next_play')



            addAnimate()
        } else {
            musicPlayer.pause()
            log('paused')
            // 切换播放图标
            changeIcon(false, playButton)

            // 添加过渡动画
            var playList = getElement('.skye-mp3-list')
            // toggleClass(playList, 'bounceOutDown')
            // toggleClass(playList, 'bounceInUp')
            toggleClass(playList, 'skye-mp3-list_play')

            var img = getElement('.skye-mp3-img')
            toggleClass(img, 'skye-mp3-img_play')
            toggleClass(img, 'img-rotate_play')

            var circles = getElements('.circle')
            for (var i = 0; i < circles.length; i++) {
                toggleClass(circles[i], 'circle_play')
            }

            var progressContainer = getElement('.skye-mp3-progress')
            toggleClass(progressContainer, 'skye-mp3-progress_play')

            var currentSongName = getElement('#id-div-currentSong')
            toggleClass(currentSongName, 'div-currentSong_play')

            var currentTime = getElement('#id-span-currentTime')
            var totalTime = getElement('#id-span-duration')
            toggleClass(currentTime, 'span-currentTime_play')
            toggleClass(totalTime, 'span-duration_play')

            var progressbar = getElement('#progressbar')
            var bar = getElement('.bar')
            toggleClass(progressbar, 'progressbar_play')
            toggleClass(bar, 'bar_play')

            toggleClass(playButton, 'button-play_play')
            var preButton = getElement('#id-button-pre')
            var nextButton = getElement('#id-button-next')
            toggleClass(preButton, 'button-pre_play')
            toggleClass(nextButton, 'button-next_play')



            addAnimate()
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

// 添加动画
var addAnimate = function() {

}














var __skye = function() {
    playSwitch()
}
// __skye()
