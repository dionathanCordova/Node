if(process.env.NODE_ENV == "production") {
    module.exports = {mongoURI: "mongodb+srv://cursoNode:rancid@cluster0-blzsc.mongodb.net/test?retryWrites=true&w=majority", PORT: process.end.PORT}
}else{
    module.exports = {mongoURI: "mongodb://localhost/cursoNode", PORT: 8080}
}