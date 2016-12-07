import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Repository } from '../../models/repository.model';

@Component({
  moduleId: module.id,
  selector: 'clone-repo',
  templateUrl: './clone.component.html',
  providers: [RestService]
})

export class CloneComponent implements OnInit{

  repository : string;

  repositories : Array<Repository> = [];

  constructor(private _rest : RestService){

  }

  ngOnInit(): void {
      this._rest.listRepositories().subscribe(
          result => {
              this.repositories = JSON.parse(result._body);
          },
          error => {
              //alert(error);
          }
      );

  }

  submit(): void {
    console.log("Repository:  " + this.repository);
    this._rest.cloneRepository(this.repository).subscribe(
        result => {
          this.repositories.unshift(JSON.parse(result._body));
        },
        error => {
          alert("There was an error during cloning.");
        }
    );
    console.log("Sent request");
  }
}
