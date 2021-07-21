var timer;
module.exports=(flashel)=>{
    if(flashel.classList.contains("is-flashing")){
        flashel.classList.remove("is-flashing")
    }
    clearTimeout(timer)
    flashel.classList.add("is-flashing")
    timer=setTimeout(_=>{
        flashel.classList.remove("is-flashing")
    },2000)
}