import {Component} from '@angular/core';
import {FotoComponent} from '../foto/foto.component';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { FotoService } from '../foto/foto.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'cadastro',
    templateUrl: './cadastro.component.html',
    
})

export class CadastroComponent{

    foto: FotoComponent = new FotoComponent();
    bgForm: FormGroup;
    service: FotoService;
    route: ActivatedRoute;
    mensagem: string = '';
    router: Router;
    
    constructor(service: FotoService ,fb:FormBuilder, route:ActivatedRoute, router: Router){
        this.route = route;
        this.service = service;
        this.router = router;
        
        this.route.params.subscribe(params => {
            let id = params['id'];
            if(id) {
                this.service.buscaPorId(id)
                    .subscribe(
                        foto => this.foto = foto,
                        erro => console.log(erro));    
            }            
         });

        this.bgForm =  fb.group({
            titulo: ['', Validators.compose(
                [Validators.required, Validators.minLength(4)]
            )],
            url: ['', Validators.required],
            descricao: ['']
        });
    }

    cadastrar(event){
        event.preventDefault();
        console.log(this.foto);
       
        this.service.cadastra(this.foto)
        .subscribe(res => {
            console.log('Foto cadastrada com sucesso');
            this.mensagem = res.mensagem;
            
            this.foto = new FotoComponent();
             if(!res.inclusao) this.router.navigate(['Listagem']);
        }, erro=>{ 
            console.log(erro);
            this.mensagem = 'Não foi possível salvar a foto';
        });
    }
}