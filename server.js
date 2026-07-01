// Importações
const express = require("express")

const mysql = require("mysql2")

const cors = require("cors")

const app = express()
///////////////////////////////////

app.use(cors())

app.use(express.json())
app.use = (express.static("public"))

// Conexão como o banco de dados
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"spa_quitanda" 
})

//teste de conexão

db.connect(function(erro){
    if(erro){
        console.log("erro ao conectar ao banco")
        return
    }
        console.log("Banco conectado com sucesso!!!")
})

///// ROTAS /////


//GET
app.get("/spa_quitanda", function (req, res){
    const sql = "select * from spa_quitanda"

       //Fazer busca
    db.query(sql, function(erro, resultados){
        if(erro){
            return res.status(500).json({
                erro: "Erro ao buscar produos"
            })
        }
        res.status(200).json(resultados)
    })
})
////////////////////////////////////////////////

//POST
app.post("/spa_quitanda", function  (req, res ){

    //CRIA TODAS AS CONSTANTES
    const {nome, categoria, preco,  quantidade, unidade} = req.body

    //CRIA O SQL DE INSERÇÃO
    const sql = `INSERT INTO spa_quitanda (nome, categoria, preco, quantidade, unidade) VALUES (?, ?, ?, ?, ?)`

    //EXECULTA O CADASTRO
    db.query(sql, [nome, categoria, preco, quantidade, unidade], function (erro, resultado){
        if(erro){
            return res.status(500).json({
                erro: "Erro ao cadastrar produto"
            })
        }

        res.status(201).json({
            menssagem: "Produto cadastrado com sucesso"
        })
    })
})

// PUT
app.put("/spa_quitanda/:id", function(req, res){

    //CAPTURA DE ID
    const id = req.params.id
    const nome = req.body.nome
    const categoria = req.body.categoria
    const preco = req.body.preco
    const quantidade = req.body.quantidade
    const unidade = req.body.unidade

    //COMANDO PARA ATUALIZAR PARAMETRO
    const sql = "UPDATE spa_quitanda set nome = ?, categoria = ?, preco = ?, quantidade = ?, unidade = ? where id = ?"

    //EXECULTA A ATUALIZAÇÃO DOS DADOS
     db.query(sql, [nome, categoria, preco, quantidade, unidade, id], function (erro, resultado){
        if(erro){
            return res.status(500).json({
                erro: "Erro ao atualizar produto"
            })
        }

        if (resultado.affectedRows === 0) {
            //Retorna mensagem de não encontrado
            return res.status(404).json({
                Erro: "Produtdo não encontrado!"
            });
        }

        res.status(201).json({
            menssagem: "Produto atualizado com sucesso"
        })
    })
})

//PATH
app.patch("/spa_quitanda/:id", function(req, res){

    //CAPTURA DE ID
    const id = req.params.id
    const nome = req.body.nome
    const categoria = req.body.categoria
    const preco = req.body.preco
    const quantidade = req.body.quantidade
    const unidade = req.body.unidade

    //COMANDO PARA ATUALIZAR PARAMETRO
    const sql = `UPDATE spa_quitanda set nome = ifnull(?,nome), categoria = ifnull(?,categoria), preco = ifnull(?,preco), quantidade = ifnull(?,quantidade), unidade = ifnull(?,unidade) where id = ?`

    //EXECULTA A ATUALIZAÇÃO DOS DADOS
     db.query(sql, [nome, categoria, preco, quantidade, unidade, id], function (erro, resultado){
        if(erro){
            return res.status(500).json({
                erro: "Erro ao atualizar produto"
            })
        }

        if (resultado.affectedRows === 0) {
            //Retorna mensagem de não encontrado
            return res.status(404).json({
                Erro: "Produtdo não encontrado!"
            });
        }

        res.status(201).json({
            menssagem: "Produto atualizado com sucesso"
        })
    })
})



//DELETE
app.delete("/spa_quitanda/:id", function(req, res){

    const id = req.params.id

    const sql = "DELETE FROM spa_quitanda where id = ?"

    db.query(sql,[id], function(erro, resultado){
        if(erro){
            return res.status(500).json({
                erro: "Erro ao excluir produto"
            })
        }

         if (resultado.affectedRows === 0) {
            //Retorna mensagem de não encontrado
            return res.status(404).json({
                menssagem: "Produtdo não encontrado!"
            });
        }
        //Retorna mensagem de sucesso
        res.status(200).json({
            messagem: "Produto excluido sucesso!"
        });
    });
})




//PORTA DO SERVIDOR //

app.listen(3000, function(){
    console.log("Servidor Rodando na porta 3000")

})
