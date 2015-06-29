import ArcadeBody2D from "./ArcadeBody2D";
let THREE = SupEngine.THREE;

import ArcadeBody2DUpdater from "./ArcadeBody2DUpdater";

export default class ArcadeBody2DMarker extends SupEngine.ActorComponent {
  static Updater = ArcadeBody2DUpdater;

  markerActor: SupEngine.Actor;
  offset = new THREE.Vector3(0, 0, 0);
  line: THREE.Line;

  constructor(actor: SupEngine.Actor) {
    super(actor, "ArcadeBody2DMarker");

    this.markerActor = new SupEngine.Actor(this.actor.gameInstance, `Marker`, null, { layer: -1 });
  }

  update() {
    super.update();
    this.markerActor.setGlobalPosition(this.actor.getGlobalPosition());
  }

  setBox(width: number, height: number) {
    if (this.line != null) this._clearRenderer();

    let geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(-width / 2, -height / 2, 0.01));
    geometry.vertices.push(new THREE.Vector3( width / 2, -height / 2, 0.01));
    geometry.vertices.push(new THREE.Vector3( width / 2,  height / 2, 0.01));
    geometry.vertices.push(new THREE.Vector3(-width / 2,  height / 2, 0.01));
    geometry.vertices.push(new THREE.Vector3(-width / 2, -height / 2, 0.01));

    let material = new THREE.LineBasicMaterial({color: 0xf459e4});

    this.line = new THREE.Line(geometry, material);
    this.line.position.copy(this.offset);
    this.markerActor.threeObject.add(this.line);
    this.line.updateMatrixWorld(false);
  }

  setOffset(x: number, y: number) {
    this.offset.set(x, y, 0);
    this.line.position.copy(this.offset);
    this.line.updateMatrixWorld(false);
  }

  setTileMap() {
    if (this.line != null) this._clearRenderer();
    // TODO ?
  }

  _clearRenderer() {
    this.markerActor.threeObject.remove(this.line);
    this.line.geometry.dispose();
    this.line.material.dispose();
    this.line = null;
  }

  _destroy() {
    if (this.line != null) this._clearRenderer();
    this.actor.gameInstance.destroyActor(this.markerActor);
    this.markerActor = null;
    super._destroy();
  }
}
