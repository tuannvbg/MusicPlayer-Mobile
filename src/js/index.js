
var player = getElement('#id-audio-player')
// 画出界面并给 播放 和 暂停 按钮绑定事件
var bindControl = function() {
    // 获取 播放 和 暂停 按钮， 还有 audio 标签
    var playBtn = getElement('#id-button-play')
    // 利用 绑定事件函数 给两个按钮分别绑上事件
    bindEvent(playBtn, 'click', function(){
        if(player.paused) {
            player.play()
            log('playing')
            updateTime()
        } else {
            player.pause()
            log('paused')
        }

    })
}

// 显示歌曲的 当前时间 和 总时间
var showTime = function() {
    var spanDura = getElement('#id-span-duration')
    var spanCurr = getElement('#id-span-currentTime')
    // 获取当前歌曲的总时间并将其写入 duration
    // (利用 oncanplay 已解决)这句语句存在 bug， 当 mp3 文件没有被加载时无法获取到 duration 属性
    var duration = parseInt(player.duration)
    setTime(duration, spanDura)
    // 获取歌曲的当前时间并将其写入 currentTime
    var currTime = parseInt(player.currentTime)
    setTime(currTime, spanCurr)

}
var updateTime = function() {
    var spanCurr = getElement('#id-span-currentTime')
    var spanDura = getElement('#id-span-duration')
    var progress = getElement('#id-input-progress')
    var duration = parseInt(player.duration)
    log('duration', duration)
    //
    var a = setInterval(function(){
        var currTime = parseInt(player.currentTime)
        var value = currTime / duration
        // log('value: ', value)
        progress.value = value
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
        var path = `../mp3/${pathNum}.mp3`
        var imgPath = `../imgs/${pathNum}.jpg`
        var name = self.querySelector('.mp3-list-name').innerHTML
        player.src = path
        songImg.src = imgPath
        divName.innerHTML = name
        // player.canplay = updateTime()
        player.play()
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
        var path = `../mp3/${pathNum}.mp3`
        var imgPath = `../imgs/${pathNum}.jpg`
        paths.push(path)
        imgPaths.push(imgPath)
    }
    //
    bindEvent(player, 'ended', function(){
        var songImg = getElement(".skye-mp3-img")
        var currSrc = player.src
        var currNum = parseInt(currSrc.slice(currSrc.length - 5, currSrc.length - 4))
        player.src = paths[currNum % list.length]
        songImg.src = imgPaths[currNum % list.length]
        player.canplay = updateTime()
        player.play()
    })
}














var skye = function() {
    bindControl()
    showTime()
    playList()
    playLoop()
}
// skye()
