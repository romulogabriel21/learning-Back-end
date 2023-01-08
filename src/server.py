from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional
from fastapi.middleware.cors import CORSMiddleware
from uuid import uuid4

app = FastAPI()

origins = ['http://localhost:5500']

app.add_middleware(
     CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class Pessoa(BaseModel):
    id: Optional[str]
    nome: str
    idade: int
    peso: float
    altura: float

pessoas: List[Pessoa] = []

@app.get('/pessoas')
def exibir_pessoas():
    return {'pessoas': pessoas}


@app.post('/pessoas')
def cadastrar_pessoa(pessoa: Pessoa) -> Pessoa:
    pessoa.id = str(uuid4())
    pessoas.append(pessoa)
    return {'mensagem': f'{pessoa.nome} cadastrado com  sucesso'}


def mostrar_pessoa(pessoa_id: str):
    for pessoa in pessoas:
        if pessoa.id == pessoa_id:
            return pessoa
    
    return {'menssagem':'pessoa não encontrado'}

@app.delete('/pessoas/{pessoa_id}')
def remover_pessoa(pessoa_id: str) -> str:
    for pessoa in pessoas:
        if pessoa.id == pessoa_id:
            pessoas.remove(pessoa)
    
    return {'mensagem': f'{pessoa.nome} removido com sucesso'}