const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname,'../public'))

//path for express config
const app = express()
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const port = process.env.PORT || 3000

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setyo static directory to server
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Advencha'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Advenchaa'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Advencha',
        helpText: 'It is a help text.'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "Provide an address."
        })
    }
    else{
        geocode(req.query.address, (error, {latitude:lat, longitude:lon, location:loc} = {}) => {
            if(error){
                return res.send({error})
            }

            forecast(lat, lon, (error, forecastData) => {
                if(error){
                    return res.send({error})
                }
                res.send({
                    lat,
                    lon,
                    forecast: forecastData,
                    location: loc,
                    address: req.query.address
                })
            })
        })
    }
})

app.get('/product', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: "You must provide a search term."
        })
    }
    console.log(req.query.search)
    res.send({
        product: []
    })
})

//404
app.get('/help/*', (req, res) => {
    res.render('error404', {
        errorText: 'Help article not found.',
        name: 'Advenchaa',
        title: '404'
    })
})

app.get('*', (req,res) => {
    res.render('error404', {
        errorText: 'Page not found.',
        name: 'Advenchaa',
        title: '404'
    })
})


// app.get('', (req, res) => {
//     res.send('Hello express')
// })

// app.get('/help', (req, res) => {
//     res.send({
//         name: 'Andrew',
//         age: 27
//     })
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About page</h1>')
// })


//app.com
//app.com/help
//app.com/about

// app.listen(3000, () => {
//     console.log('Server is up on port 3000.')
// })

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})