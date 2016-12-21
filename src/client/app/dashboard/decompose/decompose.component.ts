import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Repository } from '../../models/repository.model';
import { DecompositionDTO } from '../../models/decomposition.dto';
import {ActivatedRoute } from '@angular/router';


declare var vis: any;


@Component({
	moduleId: module.id,
  selector: 'decompose-repo',
  templateUrl: './decompose.component.html',
  providers: [RestService]

})

export class DecomposeComponent implements OnInit{

  repository: Repository;

  logicalCoupling: boolean = true;

  semanticCoupling: boolean;

  contributorCoupling: boolean;

  numServices: Number = 4;

  intervalSeconds: Number = 3600;

  sizeThreshold: Number = 10;

  isDataAvailable: boolean;

  @ViewChild('mynetwork') networkDiv;


  constructor(private _rest : RestService, private _route: ActivatedRoute, private _element: ElementRef){

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

  decompose(): void {
    var dto = new DecompositionDTO();
    dto.intervalSeconds = this.intervalSeconds;
    dto.numServices = this.numServices;
    dto.sizeThreshold = this.sizeThreshold;
    dto.logicalCoupling = this.logicalCoupling == true ? true : false;
    dto.semanticCoupling = this.semanticCoupling == true ? true : false;
    dto.contributorCoupling = this.contributorCoupling == true ? true : false;

    this._rest.decompose(this.repository.id, dto).subscribe(
      result => {
        var response = result._body;
        var options = {
          physics: {
            repulsion:{
              centralGravity: 0.0
            }
          }
        };

        var microservices = JSON.parse(response);

        var componentIds = [];

        var nodeList = [];

        var edgeList = [];

        for(var i=0; i < microservices.length; i++){
          componentIds.push(microservices[i].componentId);

          for(var k=0; k < microservices[i].nodes.length; k++){
            var node = microservices[i].nodes[k];
            node.componentId = microservices[i].componentId;
            nodeList.push(node);
          }

          for(var k=0; k < microservices[i].edges.length; k++){
            edgeList.push(microservices[i].edges[k]);
          }

        }




        var nodes = new vis.DataSet(nodeList);

        // create an array with edges
        var edges = new vis.DataSet(edgeList);


        // provide the data in the vis format
        var data = {
          nodes: nodes,
          edges: edges
        };

        var initiated = false;

        // console.log(data);

        var network = new vis.Network(this.networkDiv.nativeElement, data, options);

        // form clusters after drawing the nodes
        network.on("afterDrawing", function (params) {
          if(initiated==false){


            for(var i = 0; i < componentIds.length; i++){
              console.log("Clustering: " + componentIds[i]);
              var options = {
                joinCondition: function(nodeOptions){

                  if(nodeOptions.componentId == componentIds[i]){
                    return true;
                  }else{
                    return false;
                  }
                }
              };
              network.cluster(options);
            }
            initiated = true;
          }
        });


        network.on("selectNode", function (params) {
          var selectedNodeId = params.nodes[0];
          console.log("SelectedNodeId: " + selectedNodeId);
          network.openCluster(selectedNodeId,{});
        });

      },
      error => {
        console.log(error);
      }
    );

  }





}
