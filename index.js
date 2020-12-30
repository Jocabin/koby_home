//VUE INIT
var clock = new Vue({
    el: '#app',
    data: {
        date: '',
        time: '',
        seconds: '',
        username: '',
        backURL: '',
        randomWord: ''
    }
})

//DATE AND TIME
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
    'Friday', 'Saturday']
var months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December']

var timerID = setInterval(updateScreen, 1000)
var salutationWords = ['Hi', 'Hello', 'Hey', 'Whats up']
var formatSelector = document.getElementById('format')
var themeSelector = document.getElementById('theme')

var showAmPm = true

updateScreen()

clock.randomWord = salutationWords[randomNumber(0, salutationWords.length - 1)]
for (let i = 0; i < formatSelector.getElementsByTagName('option').length; i++) {
    if (formatSelector.getElementsByTagName('option')[i].value == localStorage.getItem('format')) {
        formatSelector.getElementsByTagName('option')[i].selected = 'selected'
    }
}

for (let i = 0; i < themeSelector.getElementsByTagName('option').length; i++) {
    if (themeSelector.getElementsByTagName('option')[i].value == localStorage.getItem('theme')) {
        themeSelector.getElementsByTagName('option')[i].selected = 'selected'
    }
}
changeTheme(themeSelector.options[themeSelector.selectedIndex].value)

function updateScreen() {
    var currentDate = new Date()
    var amPm = currentDate.getHours() >= 12 ? 'PM' : 'AM'
    clock.time = `${currentDate.getHours()} : ${addZero(currentDate.getMinutes())} ${showAmPm ? amPm : ''}`
    clock.seconds = `${addZero(currentDate.getSeconds())}`
    clock.date = `${days[currentDate.getDay()]}, ${months[currentDate.getMonth()]}, ${currentDate.getDate()}`
    clock.username = localStorage.getItem('username')
    clock.backURL = localStorage.getItem('backURL')

    document.body.style.backgroundImage = `url('${clock.backURL}')`
    changeFormat(currentDate)
}

function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function changeTheme(theme) {
    var documentHead = document.getElementsByTagName('head')[0]
    var darkStyleSheet = document.createElement('link')
    darkStyleSheet.rel = 'stylesheet'
    darkStyleSheet.href = 'dark.css'
    darkStyleSheet.id = 'darkcss'

    if (theme === 'light') {
        if (document.getElementById('darkcss')) {
            document.getElementById('darkcss').parentNode.removeChild(document.getElementById('darkcss'))
        }
    } else if (theme === 'dark') {
        documentHead.appendChild(darkStyleSheet)
    } else {
        console.error('[ERROR]: Undefined Theme !')
    }
}

function changeFormat(date) {
    var hour = date.getHours()

    if (localStorage.getItem('format') == 12) {
        hour = hour % 12 || 12
    } else if (localStorage.getItem('format') == 24) {
        hour = date.getHours()
    }
}

// MODAL
var modal = document.getElementById('settingsModal')
var settingsBTN = document.getElementById('settings')
var closeBTN = document.getElementById('close')

var usernameBar = document.getElementById('usernameBar')
var backgroundBar = document.getElementById('backgroundBar')

settingsBTN.onclick = function () {
    modal.style.display = 'block'
}

closeBTN.onclick = function () {
    modal.style.display = 'none'
}

usernameBar.addEventListener('change', () => {
    localStorage.setItem('username', usernameBar.value)
})

backgroundBar.addEventListener('change', () => {
    localStorage.setItem('backURL', backgroundBar.value)
})

themeSelector.addEventListener('change', () => {
    localStorage.setItem('theme', themeSelector.options[themeSelector.selectedIndex].value)
    changeTheme(themeSelector.options[themeSelector.selectedIndex].value)
})

formatSelector.addEventListener('change', () => {
    localStorage.setItem('format', formatSelector.options[formatSelector.selectedIndex].value)
    changeFormat()
})

usernameBar.value = localStorage.getItem('username')
backgroundBar.value = localStorage.getItem('backURL')