import { Component, OnInit, ViewChild } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Repository } from '../../models/repository.model';
import { ActivatedRoute } from '@angular/router';
import { DataPassingService } from "../../services/datapassing.service";



declare var vis: any;


@Component({
	moduleId: module.id,
  selector: 'graph-view',
  templateUrl: './graph.component.html',
  providers: [RestService]

})

export class GraphComponent implements OnInit{

  repository: Repository;

  decomposition: any;

  isDataAvailable: boolean;

  @ViewChild('mynetwork') networkDiv;

  constructor(private _rest : RestService, private _route: ActivatedRoute, private _datapassingService: DataPassingService){

  }


  createNetwork(): void {
    this.isDataAvailable = true;

    var options = {
      physics: {

        forceAtlas2Based:{
          gravitationalConstant: -1000,
          springLength: 50,
          centralGravity: 0,
          springConstant: 0.9,
          springLength: 20,
          avoidOverlap: 1,
          damping: 0
        }
      }
    };

    var microservices = JSON.parse(this.decomposition);

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
        console.log(microservices[i].edges[k]);
        edgeList.push(microservices[i].edges[k]);
      }

    }

    // provide the data in the vis format
    var data = {
      nodes: new vis.DataSet(nodeList),
      edges: new vis.DataSet(edgeList)
    };

    var initiated = false;

    var network = new vis.Network(this.networkDiv.nativeElement, data, options);

    // form clusters after drawing the nodes
    network.on("afterDrawing", function (params) {
      if(initiated==false){

        for(var i = 0; i < componentIds.length; i++){
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
      network.openCluster(selectedNodeId,{});
    });
  }

  ngOnInit(): void {
    this._route
      .params
      .subscribe(params => {
        if(params['id']){
          // means we come from the 'microservices' view
          this.repository = this._datapassingService.getRepository();
          this._rest.getDecomposition(params['id']).subscribe(response => {
            this.decomposition = response._body;
            this.createNetwork();
          });
        }else{
          // means we come from the 'decompose' view
          this.repository = this._datapassingService.getRepository();
          this.decomposition = this._datapassingService.getDecomposition();
          this.createNetwork();
        }
      });
  }
}
