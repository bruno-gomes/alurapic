import {Http, Headers, Response} from '@angular/http';
import {FotoComponent} from '../foto/foto.component';
import {Observable} from 'rxjs'; 
import { Injectable } from '@angular/core';

@Injectable()
export class FotoService{

    http: Http;
    headers: Headers;
    url: string = 'v1/fotos';

    constructor(http: Http){
        this.http = http;
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
    }

    cadastra(foto: FotoComponent) :  Observable<MensagemCadastro> {
        if(foto._id){
            return this.http
            .put(this.url + '/' + foto._id, JSON.stringify(foto), {headers: this.headers})
            .map(() => new  MensagemCadastro('Foto alterada com sucesso', false));
            //.map(() => ({mensagem: 'Foto alterada com sucesso', inclusao: false}));
        }else{
            return this.http.post(this.url, JSON.stringify(foto), 
                    { headers: this.headers })
                    .map(() => new  MensagemCadastro('Foto cadastrada com sucesso', true));
                    //.map(() => ({mensagem: 'Foto cadastrada com sucesso', inclusao: true}));;
        }
    }

    lista(): Observable<FotoComponent[]>{
         return this.http.get(this.url).map(res => res.json());
    }

    remover(foto:FotoComponent) : Observable<Response>{
        return this.http.delete(this.url + '/' + foto._id);
    }

    buscaPorId(id:string): Observable<FotoComponent> {
        return this.http
        .get(this.url + '/' + id)
        .map(res => res.json());
    }
}

export class MensagemCadastro{
    
    constructor(private _mensagem: string,private _inclusao: boolean){
        this._mensagem = _mensagem;
        this._inclusao = _inclusao;
    }
    public get mensagem(): string{
        return this._mensagem;
    }
    public get inclusao(): boolean{
        return this._inclusao;
    }
}