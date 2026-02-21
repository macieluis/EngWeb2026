const http = require("http")

// ---------------- HTML Helpers ------------
function pagina(titulo, corpo){
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8"/>
        <title>${titulo}</title>
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
    </head>
    <body class="w3-light-grey">

        <div class="w3-container w3-teal">
            <h1>${titulo}</h1>
        </div>

        <div class="w3-container w3-margin-top">
            ${corpo}
        </div>

    </body>
    </html>
    `
}

function link(href, texto){
    return `<a href="${href}">${texto}</a>`
}

function card(titulo, conteudo){
    return `
    <div class="w3-card-4 w3-white w3-margin-bottom">
        <header class="w3-container w3-teal">
            <h3>${titulo}</h3>
        </header>
        <div class="w3-container w3-padding">
            ${conteudo}
        </div>
    </div>
    `
}

function botaoVoltar(){
    return `<a class="w3-button w3-teal w3-margin-top" href="/">Voltar ao Menu</a>`
}

// ---------------- API Calls using native fetch ------------
async function getAlunos(){
    const resp = await fetch("http://localhost:3000/alunos")
    return resp.json()
}

async function getCursos(){
    const resp = await fetch("http://localhost:3000/cursos")
    return resp.json()
}

async function getInstrumentos(){
    const resp = await fetch("http://localhost:3000/instrumentos")
    return resp.json()
}

// ---------------- Server Setup ------------

var myServer = http.createServer(async function(req, res){
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    switch(req.method){
        case "GET":
            if(req.url == "/"){
                var corpo = `
                    <ul class="w3-ul w3-hoverable w3-border">
                        <li>${link("/alunos", "Lista de Alunos")}</li>
                        <li>${link("/cursos", "Lista de Cursos")}</li>
                        <li>${link("/instrumentos", "Lista de Instrumentos")}</li>
                    </ul>
                `
                res.writeHead(200, {'Content-Type':'text/html;charset="utf-8"'})
                res.end(pagina("Escola de Música", card("Menu Principal", corpo)))
            }
            else if(req.url == "/alunos"){
                try{
                    var alunos = await getAlunos()
                    var linhas = alunos.map(a => `
                        <tr>
                            <td>${a.id || ''}</td>
                            <td>${a.nome || ''}</td>
                            <td>${a.dataNasc || ''}</td>
                            <td>${a.curso || ''}</td>
                            <td>${a.anoCurso || ''}</td>
                            <td>${a.instrumento || ''}</td>
                        </tr>
                        `).join("\n")
                    
                    var corpo = card("Lista de Alunos", `
                        <table class="w3-table w3-striped w3-bordered w3-hoverable">
                            <tr class="w3-light-grey">
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Data Nasc.</th>
                                <th>Curso</th>
                                <th>Ano Curso</th>
                                <th>Instrumento</th>
                            </tr>
                            ${linhas}
                        </table>
                        `) + botaoVoltar()
                    
                    res.writeHead(200, {'Content-Type':'text/html;charset="utf-8"'})
                    res.end(pagina("Alunos", corpo))
                }
                catch(error){
                    res.writeHead(500, {'Content-type':'text/html;charset=utf-8'})
                    res.end(pagina("Erro", `<p>Erro ao carregar alunos: ${error}</p>` + botaoVoltar()))
                }
            }
            else if(req.url == "/cursos"){
                try{
                    var cursos = await getCursos()
                    var linhas = cursos.map(c => `
                        <tr>
                            <td>${c.id || ''}</td>
                            <td>${c.designacao || ''}</td>
                            <td>${c.duracao || ''}</td>
                            <td>${c.instrumento ? c.instrumento["#text"] : ''}</td>
                        </tr>
                        `).join("\n")
                    
                    var corpo = card("Lista de Cursos", `
                        <table class="w3-table w3-striped w3-bordered w3-hoverable">
                            <tr class="w3-light-grey">
                                <th>ID</th>
                                <th>Designação</th>
                                <th>Duração</th>
                                <th>Instrumento</th>
                            </tr>
                            ${linhas}
                        </table>
                        `) + botaoVoltar()

                    res.writeHead(200, {'Content-Type':'text/html;charset="utf-8"'})
                    res.end(pagina("Cursos", corpo))
                }
                catch(error){
                    res.writeHead(500, {'Content-type':'text/html;charset=utf-8'})
                    res.end(pagina("Erro", `<p>Erro ao carregar cursos: ${error}</p>` + botaoVoltar()))
                }
            }
            else if(req.url == "/instrumentos"){
                try{
                    var instrumentos = await getInstrumentos()
                    var linhas = instrumentos.map(i => `
                        <tr>
                            <td>${i.id || ''}</td>
                            <td>${i["#text"] || ''}</td>
                        </tr>
                        `).join("\n")
                    
                    var corpo = card("Lista de Instrumentos", `
                        <table class="w3-table w3-striped w3-bordered w3-hoverable">
                            <tr class="w3-light-grey">
                                <th>ID</th>
                                <th>Instrumento</th>
                            </tr>
                            ${linhas}
                        </table>
                        `) + botaoVoltar()

                    res.writeHead(200, {'Content-Type':'text/html;charset="utf-8"'})
                    res.end(pagina("Instrumentos", corpo))
                }
                catch(error){
                    res.writeHead(500, {'Content-type':'text/html;charset=utf-8'})
                    res.end(pagina("Erro", `<p>Erro ao carregar instrumentos: ${error}</p>` + botaoVoltar()))
                }
            }
            else{
                res.writeHead(404, {'Content-type':'text/html;charset=utf-8'})
                res.end(pagina("Erro 404", `<p>Rota não suportada: ${req.url}</p>` + botaoVoltar()))
            }
            break

        default:
            res.writeHead(405, {'Content-type':'text/html;charset=utf-8'})
            res.end(pagina("Erro 405", `<p>Método não suportado: ${req.method}.</p>` + botaoVoltar()))
    }
})

myServer.listen(24000)

console.log("Servidor à escuta na porta 24000...")
