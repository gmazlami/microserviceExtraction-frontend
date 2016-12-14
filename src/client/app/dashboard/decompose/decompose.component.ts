import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Repository } from '../../models/repository.model';
import {ActivatedRoute } from '@angular/router';




@Component({
	moduleId: module.id,
  selector: 'decompose-repo',
  templateUrl: './decompose.component.html',
  providers: [RestService]

})

export class DecomposeComponent implements OnInit{

  repository: Repository;

  isDataAvailable: boolean;

  constructor(private _rest : RestService, private _route: ActivatedRoute){

  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = +params['id'];
      this._rest.getRepository(id).subscribe(
        result => {
          this.repository = JSON.parse(result._body);
          this.isDataAvailable = true;
        },
        error => {
          alert(error);
        }
      );
    });
  }



}
