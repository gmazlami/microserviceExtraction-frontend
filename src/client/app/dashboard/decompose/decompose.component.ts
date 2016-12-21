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

  ngAfterViewInit(): void{
    var nodes = new vis.DataSet([
      {id: 1, label: 'Node 1'},
      {id: 2, label: 'Node 2'},
      {id: 3, label: 'Node 3'},
      {id: 4, label: 'Node 4'},
      {id: 5, label: 'Node 5'}
    ]);

    // create an array with edges
    var edges = new vis.DataSet([
      {from: 1, to: 3},
      {from: 1, to: 2},
      {from: 2, to: 4},
      {from: 2, to: 5}
    ]);


    // provide the data in the vis format
    var data = {
      nodes: nodes,
      edges: edges
    };

    console.log(data);
    var options = {};

    // initialize your network!
    // var network = new vis.Network(this.networkDiv.nativeElement, data, options);
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

        var graph = JSON.parse(response);

        var nodes = new vis.DataSet(graph.nodes);

        // create an array with edges
        var edges = new vis.DataSet(graph.edges);


        // provide the data in the vis format
        var data = {
          nodes: nodes,
          edges: edges
        };

        // console.log(data);

        var network = new vis.Network(this.networkDiv.nativeElement, data, options);


        var clusterIndex = 0;
        var clusters = [];
        var lastClusterZoomLevel = 0;
        var clusterFactor = 0.9;

        // make the clusters
        function makeClusters(scale) {
          var clusterOptionsByData = {
            processProperties: function (clusterOptions, childNodes) {
              clusterIndex = clusterIndex + 1;
              var childrenCount = 0;
              for (var i = 0; i < childNodes.length; i++) {
                childrenCount += childNodes[i].childrenCount || 1;
              }
              clusterOptions.childrenCount = childrenCount;
              clusterOptions.label = "# " + childrenCount + "";
              clusterOptions.font = {size: childrenCount*5+30}
              clusterOptions.id = 'cluster:' + clusterIndex;
              clusters.push({id:'cluster:' + clusterIndex, scale:scale});
              return clusterOptions;
            },
            clusterNodeProperties: {borderWidth: 3, shape: 'database', font: {size: 30}}
          }
          network.clusterOutliers(clusterOptionsByData);
          network.setOptions({
            physics: {repulsion:{centralGravity: 0.0}}}
          );

        }

        // open them back up!
        function openClusters(scale) {
          var newClusters = [];
          var declustered = false;
          for (var i = 0; i < clusters.length; i++) {
            if (clusters[i].scale < scale) {
              network.openCluster(clusters[i].id);
              lastClusterZoomLevel = scale;
              declustered = true;
            }
            else {
              newClusters.push(clusters[i])
            }
          }
          clusters = newClusters;

          network.setOptions({
            physics: {repulsion:{centralGravity: 0.0}}}
          );

        }

        // set the first initial zoom level
        network.once('initRedraw', function() {
          if (lastClusterZoomLevel === 0) {
            lastClusterZoomLevel = network.getScale();
          }
        });

        // we use the zoom event for our clustering
        network.on('zoom', function (params) {
          if (params.direction == '-') {
            if (params.scale < lastClusterZoomLevel*clusterFactor) {
              makeClusters(params.scale);
              lastClusterZoomLevel = params.scale;
            }
          }
          else {
            openClusters(params.scale);
          }
        });

        // if we click on a node, we want to open it up!
        network.on("selectNode", function (params) {
          if (params.nodes.length == 1) {
            if (network.isCluster(params.nodes[0]) == true) {
              network.openCluster(params.nodes[0])
            }
          }
        });

      },
      error => {
        console.log(error);
      }
    );

  }





}
