import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Repository } from '../../models/repository.model';

@Component({
  moduleId: module.id,
  selector: 'microservices',
  templateUrl: './microservices.component.html',
  providers: [RestService]
})

export class MicroservicesComponent implements OnInit{

  decompositions : Array<Object> = [];

  constructor(private _rest : RestService){

  }

  ngOnInit(): void {
      this._rest.listDecompositions().subscribe(
          result => {
              this.decompositions = JSON.parse(result._body);
          },
          error => {
              //alert(error);
          }
      );

  }

  parameterString(parameters:any): string {

    if(parameters !== null){
      let parameterString = "Strategies: [ ";

      if(parameters.logicalCoupling == true){
        parameterString = parameterString + " LogicalCoupling ";
      }

      if(parameters.semanticCoupling == true){
        parameterString = parameterString + " SemanticCoupling ";
      }

      if(parameters.contributorCoupling == true){
        parameterString = parameterString + " ContributorCoupling ";
      }

      parameterString = parameterString + " ]";


      parameterString = parameterString + ", numPartitions: [ " + parameters.numServices + " ]";

      parameterString = parameterString + ", maxComponentSize: [ " + parameters.sizeThreshold + " ]";

      if(parameters.logicalCoupling == true){
        parameterString = parameterString + ", historyInterval: [ " + parameters.intervalSeconds + "s ]";
      }

      return parameterString;
    }else{
      return "No Parameters";
    }



  }


}
