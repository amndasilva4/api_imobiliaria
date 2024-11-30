const express = require('express');

const app = express();
const PORT =3000;

//dados em momória 
let imoveis = [
    {id:1, titulo:'apartamento em são paulo', descricao:'2 quartos, 1 banheiro',preco:30000, localizcao:'são Paulo', tipo:'apartamento'},
    {id:2, titulo:'casa em Curitiba', descricao:'3 quartos, 2 banheiro',preco:50000, localizacao:'Curitiba', tipo:'casa'}
];

//middleware para permirtir o uso de JSON
app.use(express.json());

//rota padrão
app.get('/',(req, res) => {
    res.send('API da imobiliária');
});
//obter todos os imóveis
app.get('/api/imoveis',(req, res) => {
    res.json(imoveis);
});
//criar um novo imóvel
app.post('/api/imoveis',(req,res) =>{
        const{titulo,descricao,preco,localizacao,tipo} = req.body;
        const novoImovel = {id:imoveis.length + 1, titulo, descricao, preco, localizacao, tipo};
        imoveis.push(novoImovel);
        res.status(201).json(novoImovel);
});


//obter um imóvel por ID
app.get('/api/imoveis:id',(req, res) =>{
    const imovel = imovel = imoveis.find( i => i.id === parserint(res.params.id) );
    if(!imovel) return res.status(404).json({Message:'imovel não encontrado'});
    res.json(imovel);
});

//atualizar um imóvel
app.put('/api/imoveis/:id',(req, res) =>{
    const imovel = imoveis.find( i => i.id === parserint(res.params.id));
    if(!imovel) return res.status(404).json({Message:'imovel não encontrado'});
    const {titulo,descricao,preco,localizacao,tipo} = req.body;
    imovel.titulo = titulo;
    imovel.descricao = descricao;
    imovel.preco = preco;
    imovel.localizacao = localizacao;
    imovel.tipo = tipo;
    res.json(imovel);
});
//excluir um imovel
app.delete('/api/imoveis/:id',(req, res) =>{
    const imovelIndex = imoveis.findIndex(i => i.id === parserint(res.params.id));
    if(imovelIndex === -1)return res.status(404).json({message:'imovel não encontrado'});
    imoveis.splice(imovelIndex, 1);
    res.status(204).send();

});
app.get('/api/imoveis/tipo/:tipo',(req,res)=>{
    const tipo= req.params.tipo;
    const imoveisFiltrados =imoveis.filter(i => i.tipo.toLocaleLowerCase() === tipo.toLocaleLowerCase());
    
    if(imoveisFiltrados.length === 0){
        return res.status(404).json({message:'Imoveis não encontrados para este tipo'});

    }
    res.json(imoveisFiltrados);

});
//iniciar aservidor 
 app.listen(PORT,()=>{
    console.log(`{servidor rodando na porta ${PORT}`);
 });