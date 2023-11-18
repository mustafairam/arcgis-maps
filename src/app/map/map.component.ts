import { Component, OnInit } from '@angular/core';
declare const require: any;
import LayerList from '@arcgis/core/widgets/LayerList';
import Map from '@arcgis/core/Map';
import SceneView from '@arcgis/core/views/SceneView';
import MeshLayer from '@arcgis/core/layers/IntegratedMeshLayer';
import Mesh from '@arcgis/core/geometry/Mesh';
import Graphic from '@arcgis/core/Graphic';
import Symbol3D from '@arcgis/core/symbols/Symbol3D';
import MeshSymbol3D from '@arcgis/core/symbols/MeshSymbol3D';
import FillSymbol3DLayer from '@arcgis/core/symbols/FillSymbol3DLayer';
import WebScene from '@arcgis/core/WebScene';
import IntegratedMeshLayer from '@arcgis/core/layers/IntegratedMeshLayer';
import Legend from '@arcgis/core/widgets/Legend';
import Search from '@arcgis/core/widgets/Search';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    const map = new Map({
      basemap: 'streets-navigation-vector',
    });

    const view = new SceneView({
      container: 'container',
      map: map,
      center: [-74.006, 40.7128], // New York coordinates
      zoom: 12,
    });

    const searchWidget = new Search({
      view: view,
      container: 'searchWidgetContainer', // Create a container in your HTML for the search widget
    });

    const layer = new IntegratedMeshLayer({
      url: 'https://tiles.arcgis.com/tiles/cFEFS0EWrhfDeVw9/arcgis/rest/services/Buildings_Frankfurt_2021/SceneServer',
      copyright: 'Aerowest GmbH',
      title: 'Integrated Mesh Frankfurt',
    });

    const layerList = new LayerList({
      view: view,
    });

    const legend = new Legend({
      view,
      style: {
        type: 'card',
        layout: 'side-by-side',
      },
    });

    view.ui.add(layerList, 'top-right');
    view.ui.add(legend, 'bottom-right');
    view.ui.add(searchWidget, 'top-left'); // Add the search widget to the top-left corner

    map.add(layer);
  }

  // initializeMap() {
  //   this.map = new Map({
  //     basemap: 'topo-vector',
  //   });

  //   const view = new SceneView({
  //     container: 'container',
  //     map: this.map,
  //     zoom: 4,
  //     camera: {
  //       position: {
  //         latitude: 50.365424715682565,
  //         longitude: -4.071202012397289,
  //       }, // Set the initial camera position
  //       tilt: 0,
  //       heading: 0,
  //     },
  //   });
  // }

  // addMeshLayer() {
  //   const mesh = Mesh.fromJSON({
  //     vertexAttributes: {
  //       position: new Float32Array([
  //         -100, -100, 0, 100, -100, 0, 100, 100, 0, -100, 100, 0, 0, 0, 200,
  //       ]),
  //     },
  //     faces: {
  //       v: [0, 1, 2, 0, 2, 3, 0, 1, 4, 1, 2, 4, 2, 3, 4, 3, 0, 4],
  //     },
  //   });

  //   // const meshSymbol = new MeshSymbol3D({
  //   //   symbolLayers: [
  //   //     new FillSymbol3DLayer({
  //   //       material: {
  //   //         color: [255, 0, 0],
  //   //       },
  //   //     }),
  //   //   ],
  //   // });

  //   const meshLayer = new IntegratedMeshLayer({
  //     url: 'https://tiles.arcgis.com/tiles/cFEFS0EWrhfDeVw9/arcgis/rest/services/Buildings_Frankfurt_2021/SceneServer',
  //   });

  //   this.map.add(meshLayer);
  // }
}
