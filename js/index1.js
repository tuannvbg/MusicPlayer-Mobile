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
// 得到播放按钮
var playButton = getElement('#id-button-play')

// 1、播放 & 暂停事件绑定
var playSwitch = function() {
    // 绑定播放按钮事件
    bindEvent(playButton, 'click', function(){
        if(musicPlayer.paused) {
            musicPlayer.play()
            log('playing')
            // 切换暂停图标
            changeIcon(true, playButton)
            // 添加过渡动画
            addTransition(true, playButton)

            updateTime()
// (bug) 播放和暂停功能与列表播放的事件有冲突
        } else if(musicPlayer.played) {
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
        button.src = 'res/icons/pause.png'
    } else {
        // 切换为播放按钮
        button.src = 'res/icons/play.png'
    }
}

// 添加过渡动画
var transition = function(selector, transitionClass) {
    var elements = getElements(selector)
    for (var i = 0; i < elements.length; i++) {
        toggleClass(elements[i], transitionClass)
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

// 显示歌曲的 当前时间 和 总时间
var showTime = function() {
    var spanDura = getElement('#id-span-duration')
    var spanCurr = getElement('#id-span-currentTime')
    // 获取当前歌曲的总时间并将其写入 duration
    // (利用 oncanplay 已解决)这句语句存在 bug， 当 mp3 文件没有被加载时无法获取到 duration 属性
    var duration = parseInt(musicPlayer.duration)
    setTime(duration, spanDura)
    // 获取歌曲的当前时间并将其写入 currentTime
    var currTime = parseInt(musicPlayer.currentTime)
    setTime(currTime, spanCurr)

}
var updateTime = function() {
    var spanCurr = getElement('#id-span-currentTime')
    var spanDura = getElement('#id-span-duration')
    var progress = getElement('#id-input-progress')
    var duration = parseInt(musicPlayer.duration)
    // 进度条与时间同步
    var a = setInterval(function(){
        var currTime = parseInt(musicPlayer.currentTime)
        var value = currTime / duration
        // log('value: ', value)
        // progress.value = value
        setTime(currTime, spanCurr)
    }, 1000)
    setTimeout(function(){
        clearInterval(a)
    }, duration * 1000)
}

var setTime = function(time, container) {
    var Min = parseInt(time / 60)
    var Sec = time % 60
    Min  = rjust(String(Min), 2, '0')
    Sec  = rjust(String(Sec), 2, '0')
    container.innerHTML = `${Min}:${Sec}`
}
// 补全不足的 0 的函数
var rjust = function(s, width, fillchar=' ') {
    var result = ''
    // 比较 s 与 width 的长度
    if(s.length >= width) {
        result = s
    } else {
        for (var i = 0; i < (width - s.length); i++) {
            result = result + fillchar
        }
        result = result + s
    }
    return result
}

var playList = function() {
    var selector = '.mp3-list'
    var divName = getElement('#id-div-currentSong')
    var songImg = getElement(".skye-mp3-img")
    bindEventAll(selector, 'click', function(event){
        var self = event.target
        var pathNum = self.dataset.path
        var path = `res/mp3/${pathNum}.mp3`
        var imgPath = `res/imgs/${pathNum}.jpg`
        var name = self.querySelector('.mp3-list-name').innerHTML
        musicPlayer.src = path
        songImg.src = imgPath
        divName.innerHTML = name
        // musicPlayer.canplay = updateTime()
        musicPlayer.play()
        log('playing')
        // 切换暂停图标
        changeIcon(true, playButton)
        // 添加过渡动画
        addTransition(true, playButton)

        updateTime()
    })
}

// 列表循环时存在 bug
var playLoop = function() {
    // 得到列表中所有音乐的路径并存入数组
    var list = document.querySelectorAll('.mp3-list')
    var paths = []
    var imgPaths = []
    for (var i = 0; i < list.length; i++) {
        var pathNum = list[i].dataset.path
        var path = `res/mp3/${pathNum}.mp3`
        var imgPath = `res/imgs/${pathNum}.jpg`
        paths.push(path)
        imgPaths.push(imgPath)
    }
    //
    bindEvent(musicPlayer, 'ended', function(){
        var songImg = getElement(".skye-mp3-img")
        var currSrc = musicPlayer.src
        var currNum = parseInt(currSrc.slice(currSrc.length - 5, currSrc.length - 4))
        musicPlayer.src = paths[currNum % list.length]
        songImg.src = imgPaths[currNum % list.length]
        musicPlayer.canplay = updateTime()
        musicPlayer.play()
    })
}
















var __skye = function() {
    playSwitch()
    showTime()
    playList()
    playLoop()
}
// __skye()
