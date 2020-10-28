const enfermedadController = {}
const { request, response } = require('express')
const db = require('../../db/firebase.conn')
const brain = require('brain.js')
const net = new brain.recurrent.LSTM()

enfermedadController.getData = async(req = request, res = response) => {
    let datos = []
    const sintomas = await db.collection("EnfermedadesComunes").get()
    sintomas.forEach((result) => {
        datos.push(result.data())
    })

    res.render("index", {
        data: datos
    })
}

enfermedadController.postData = (req = request, res = response) => {
    const conjunto = []
    const data = JSON.parse(JSON.stringify(req.body));
    conjunto.push(data)
    conjunto.forEach((sintomas) => {
        console.log('funciono hpta', sintomas);
        prediccion(sintomas)
    })
    res.redirect("/")
}


const prediccion = (sintomas) => {

    console.log('desde la funsion predeir', sintomas);
    // net.train([
    //     { input: "Gripa", output: 'Resfriado común' }
    // ])
    // const output = net.run(`${sintoma}`);
    // console.log('prediccion', output);
}

prediccion();


module.exports = enfermedadController;