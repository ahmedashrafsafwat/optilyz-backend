module.exports.validationRgex = {
    name: /^[_ a-zA-Z]{2,36}$/, // only letters from 2 to 36
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/,// minimum 4 chars at least one letter and one number
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    title: /^[0-9a-zäöü\- ]+$/ui, // unicode regex
    description: /^[0-9a-zäöü\- ]+$/ui, // letters and number from 0 to 500 chars
    perPage: /^[0-9a-fA-F]{0,500}$/, 
    page: /^[0-9a-fA-F]{0,500}$/,
    isCompleted: /^(true|false)$/,
    id: /^[0-9a-fA-F]{3,50}$/

}