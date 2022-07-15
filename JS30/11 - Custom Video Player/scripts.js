const video = document.querySelector('video')
const progress = document.querySelector('.progress')
const progressFilled = document.querySelector('.progress__filled')
const toggleplay = document.querySelector('.toggle')
const inputRanges = document.querySelectorAll('.player__slider')
const skips = document.querySelectorAll('[data-skip]')

function togglePlay(){
    if(video.paused){
        video.play()
        toggleplay.textContent = '❚ ❚'
    }else {
        video.pause()
        toggleplay.textContent = '►'
    }
}
function skipTime(){
    video.currentTime+=parseFloat(this.dataset.skip)
}
function changeValue(){
    video[this.name]=this.value
}
function updateProgressFilled(){
    let percent = video.currentTime/video.duration*100
    progressFilled.style.flexBasis= `${percent}%`
}

function changeVideoTime(e){
    let percent = (e.offsetX/progress.offsetWidth)*video.duration;
    video.currentTime = percent
}

//播放 暫停
video.addEventListener('click',togglePlay)
toggleplay.addEventListener('click',togglePlay)
//跳轉
skips.forEach(skip => skip.addEventListener('click',skipTime))
//range按鈕 音量速度
inputRanges.forEach(input=>{
    input.addEventListener('change',changeValue)
    input.addEventListener('mousemove',changeValue)
})
//進度條跟時間的聯繫
video.addEventListener('timeupdate',updateProgressFilled)
//progress 
let mousedown = false
progress.addEventListener('click',changeVideoTime)
progress.addEventListener('mousedown',()=>{
    mousedown = true
})
progress.addEventListener('mouseup',()=>{
    mousedown = false
})
progress.addEventListener('mousemove',(e)=>{
    if(mousedown){
        changeVideoTime(e)
    }
})