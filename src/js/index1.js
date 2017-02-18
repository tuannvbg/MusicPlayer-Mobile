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
            changePage(true)
            // 添加动画
            addAnimate()
        } else {
            musicPlayer.pause()
            log('paused')
            // 切换播放图标
            changeIcon(false, playButton)
            // 切换至列表页面
            changePage(false)
            // 添加动画
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

// 切换页面函数
var changePage = function(state) {
    // 获取 link 标签
    var link = getElement('#id-link-css')
    //
    if(state) {
        link.href = 'css/indexPlay.css'
    } else {
        link.href = 'css/index.css'
    }
}

// 添加动画
var addAnimate = function() {
    
}












var __skye = function() {
    playSwitch()
}
// __skye()
