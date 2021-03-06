console.log("hello")

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg-1')
const msgTwo = document.querySelector('#msg-2')

msgOne.textContent = 'Loading..'
msgTwo.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    //console.log(location)

    //const url = "http://localhost:3000/weather?address="+location
    const url = "/weather?address="+location
    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error){
                msgOne.textContent = data.error
                msgTwo.textContent = ''
            }else{
                msgOne.textContent = data.location
                msgTwo.textContent = data.forecast
            }
        })
    })
})