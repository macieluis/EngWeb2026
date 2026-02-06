import json
import os
import shutil

# Funções auxiliares (conforme aula1)
def open_json(file_path):
    with open(file_path, encoding='utf-8') as file:
        return json.load(file)

def mk_dir(relative_path):
    
    if os.path.exists(relative_path):
        shutil.rmtree(relative_path)
    os.makedirs(relative_path)

def new_file(file_path, content):
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(content)
        

# Carregamento dos dados
data = open_json('dataset_reparacoes.json')
reparacoes = data['reparacoes']

# --- Processamento de Dados ---

tipos_intervencao = {}
carros = {}

# Atribuir um ID a cada reparação para links

for i, r in enumerate(reparacoes):
    r['id'] = f"r{i}"
    
    # Agrupar Intervenções
    for inter in r['intervencoes']:
        
        cod = inter['codigo']
        if cod not in tipos_intervencao:
            tipos_intervencao[cod] = {
                "nome": inter['nome'],
                "descricao": inter['descricao'],
                "reps": []
            }
        tipos_intervencao[cod]['reps'].append(r)

    # Agrupar Marcas e Modelos
    marca = r['viatura']['marca']
    modelo = r['viatura']['modelo']
    car_key = (marca, modelo)
    if car_key not in carros:
        carros[car_key] = {
            "marca": marca,
            "modelo": modelo,
            "reps": []
        }
    carros[car_key]['reps'].append(r)


# --- Geração do Website ---
mk_dir("oficina_output")
mk_dir("oficina_output/reparacoes")
mk_dir("oficina_output/intervencoes")
mk_dir("oficina_output/veiculos")



# 1. Página Principal (index.html)

index_html = """
<html>
<head><title>Oficina Automóvel</title><meta charset="utf-8"/></head>
<body>
    <h1>Oficina Automóvel: Exploração de Dados</h1>
    <ul>
        <li><a href="lista_reparacoes.html">Listagem de Reparações</a></li>
        <li><a href="lista_intervencoes.html">Tipos de Intervenção</a></li>
        <li><a href="lista_marcas.html">Marcas e Modelos</a></li>
    </ul>
</body>
</html>
"""
new_file("oficina_output/index.html", index_html)


# 2. Listagem de Reparações
rep_rows = ""
for r in reparacoes:
    rep_rows += f"""
    <tr>
        <td>{r['data']}</td>
        <td>{r['nif']}</td>
        <td><a href="reparacoes/{r['id']}.html">{r['nome']}</a></td>
        <td>{r['viatura']['marca']}</td>
        <td>{r['viatura']['modelo']}</td>
        <td>{r['nr_intervencoes']}</td>
    </tr>"""

reparacoes_list_html = f"""
<html>
<head><title>Reparações</title><meta charset="utf-8"/></head>
<body>
    <h1>Listagem de Reparações</h1>
    <table border="1">
        <tr><th>Data</th><th>NIF</th><th>Cliente</th><th>Marca</th><th>Modelo</th><th>Intervenções</th></tr>
        {rep_rows}
    </table>
    <br/><a href="index.html">Voltar ao Início</a>
</body>
</html>
"""
new_file("oficina_output/lista_reparacoes.html", reparacoes_list_html)

# 3. Listagem de Tipos de Intervenção (Ordenada por código)
int_rows = ""
for cod in sorted(tipos_intervencao.keys()):
    info = tipos_intervencao[cod]
    int_rows += f"<li><a href='intervencoes/{cod}.html'><b>{cod}</b></a>: {info['nome']}</li>"

intervencoes_list_html = f"""
<html>
<head><title>Tipos de Intervenção</title><meta charset="utf-8"/></head>
<body>
    <h1>Tipos de Intervenção</h1>
    <ul>{int_rows}</ul>
    <a href="index.html">Voltar ao Início</a>
</body>
</html>
"""
new_file("oficina_output/lista_intervencoes.html", intervencoes_list_html)

# 4. Listagem de Marcas e Modelos (Ordenada)
car_rows = ""
for key in sorted(carros.keys()):
    c = carros[key]
    safe_name = f"{c['marca']}_{c['modelo']}".replace(" ", "_")
    car_rows += f"<li><a href='veiculos/{safe_name}.html'>{c['marca']} {c['modelo']}</a> ({len(c['reps'])} carros)</li>"

marcas_list_html = f"""
<html>
<head><title>Marcas e Modelos</title><meta charset="utf-8"/></head>
<body>
    <h1>Marcas e Modelos Intervencionados</h1>
    <ul>{car_rows}</ul>
    <a href="index.html">Voltar ao Início</a>
</body>
</html>
"""
new_file("oficina_output/lista_marcas.html", marcas_list_html)

# --- Páginas Individuais ---

# 5. Páginas de Reparação
for r in reparacoes:
    int_list = "".join([f"<li>{i['nome']} - {i['descricao']}</li>" for i in r['intervencoes']])
    html = f"""
    <html>
    <head><title>Reparação {r['id']}</title><meta charset="utf-8"/></head>
    <body>
        <h1>Detalhes da Reparação: {r['nome']}</h1>
        <p><b>Data:</b> {r['data']}</p>
        <p><b>NIF:</b> {r['nif']}</p>
        <p><b>Viatura:</b> {r['viatura']['marca']} {r['viatura']['modelo']} ({r['viatura']['matricula']})</p>
        <h3>Intervenções:</h3>
        <ul>{int_list}</ul>
        <hr/><a href="../lista_reparacoes.html">Voltar à lista</a>
    </body>
    </html>"""
    new_file(f"oficina_output/reparacoes/{r['id']}.html", html)

# 6. Páginas de Tipo de Intervenção
for cod, info in tipos_intervencao.items():
    reps_links = "".join([f"<li><a href='../reparacoes/{r['id']}.html'>{r['data']} - {r['nome']}</a></li>" for r in info['reps']])
    html = f"""
    <html>
    <head><title>{info['nome']}</title><meta charset="utf-8"/></head>
    <body>
        <h1>{info['nome']} ({cod})</h1>
        <p><b>Descrição:</b> {info['descricao']}</p>
        <h3>Reparações onde foi realizada:</h3>
        <ul>{reps_links}</ul>
        <hr/><a href="../lista_intervencoes.html">Voltar à lista</a>
    </body>
    </html>"""
    new_file(f"oficina_output/intervencoes/{cod}.html", html)

# 7. Páginas de Marca/Modelo
for key, info in carros.items():
    safe_name = f"{info['marca']}_{info['modelo']}".replace(" ", "_")
    reps_links = "".join([f"<li><a href='../reparacoes/{r['id']}.html'>{r['data']} - {r['nome']}</a></li>" for r in info['reps']])
    html = f"""
    <html>
    <head><title>{info['marca']} {info['modelo']}</title><meta charset="utf-8"/></head>
    <body>
        <h1>Viatura: {info['marca']} {info['modelo']}</h1>
        <p><b>Total de reparações encontradas:</b> {len(info['reps'])}</p>
        <h3>Histórico de Reparações:</h3>
        <ul>{reps_links}</ul>
        <hr/><a href="../lista_marcas.html">Voltar à lista</a>
    </body>
    </html>"""
    new_file(f"oficina_output/veiculos/{safe_name}.html", html)

print("Website gerado com sucesso na pasta 'oficina_output'!")