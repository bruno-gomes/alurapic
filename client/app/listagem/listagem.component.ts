import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { FotoService } from '../foto/foto.service';
import {PainelComponent} from '../painel/painel.component';

@Component({
    moduleId: module.id,
    selector: 'listagem',
    templateUrl: './listagem.component.html' 
})
export class ListagemComponent { 

    fotos: Object[] = [];
    service: FotoService;
    mensagem: string = '';

    constructor(service: FotoService) {

        this.service = service;

        //http.get('v1/fotos')map(res => res.json()
        this.service.lista().subscribe(
                fotos => this.fotos = fotos,
                erro => console.log(erro)
            );
    }

    remove(foto, painel: PainelComponent){
        console.log('entrou metodo remove');
       
        this.service
            .remover(foto)
            .subscribe(
                    //fotos => {
                    //let indiceDaFoto = this.fotos.indexOf(foto);
                    //this.fotos.splice(indiceDaFoto, 1);}erro => console.log(erro));
                () => { 

                     painel.fadeOut(() => {
                        console.log('Foto removida com sucesso');
                        let novasFotos = this.fotos.slice(0);
                        let indice = novasFotos.indexOf(foto);
                        novasFotos.splice(indice, 1);
                        this.fotos = novasFotos;
                        this.mensagem = 'Foto '+ foto.titulo +' removida com sucesso';
                    });                    
                },
                erro => {
                    console.log(erro);
                    this.mensagem = 'Não foi possível remover a foto';
                }
            );
         
    }
}