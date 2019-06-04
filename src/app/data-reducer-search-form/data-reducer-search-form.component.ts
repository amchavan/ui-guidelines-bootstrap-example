import { Component, OnInit } from '@angular/core';

interface AlmaRegionalCenter {
  name: string,
  nodes: string[]
}

const NO_ARC_NODES = "No ARC nodes";

@Component({
  selector: 'data-reducer-search-form',
  templateUrl: './data-reducer-search-form.component.html',
  styleUrls: ['./data-reducer-search-form.component.css']
})
export class DataReducerSearchFormComponent implements OnInit {

  arcs : AlmaRegionalCenter[] = [{
    name: "EA",
    nodes: ['Japan', 'Korea', 'Taiwan']
  },
    {
    name: "EU",
    nodes:  ['Germany', 'Sweden', 'Czech Republic', 'France', 'UK', 'Netherlands', 'Italy', 'Portugal', 'ESO']
  },
    {
    name: "NA",
    nodes:  ['Charlottesville', 'Canada']
  },
    {
    name: "JAO",
    nodes:  []
  }];

  nameId = "";
  selectedArc   = null;
  selectedNode  = null;
  selectedNodes = [];
  shownInNodePulldown = NO_ARC_NODES;

  /* Qualifications */
  qManCal : boolean = false;
  qManImg : boolean = false;
  qWeblog : boolean = false;
  qQA2App : boolean = false;

  constructor() { }

  ngOnInit() {
  }

  /* Invoked with the ARC name when an ARC is selected */
  onSelectArc( name ) {
    this.arcs.forEach( (arc) => {
      if( arc.name == name ) {
        this.selectedNodes = arc.nodes;
        this.selectedNode = null;
        this.shownInNodePulldown = this.selectedNodes.length == 0 ? NO_ARC_NODES : "Select ARC node...";
      }
    });
  }

  /* Invoked with the ARC node name when an ARC node is selected */
  onSelectArcNode( node ) {
    this.selectedNode = this.shownInNodePulldown = node;
    console.log( '>>> ' + node );
  }

  /** ??? */
  search() {
    var qualifications = `qManCal=${this.qManCal}, qManImg=${this.qManImg}, qWeblog=${this.qWeblog}, qQA2App=${this.qQA2App}`;
    var message =
        `nameId='${this.nameId}', selectedArc=${this.selectedArc}, selectedNode=${this.selectedNode}, `
        + qualifications;
    alert( message );
  }
}
