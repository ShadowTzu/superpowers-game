import * as path from "path";
import * as fs from "fs";

export default class SpriteSettingsResource extends SupCore.Data.Base.Resource {

  static schema: SupCore.Data.Base.Schema = {
    filtering: { type: "enum", items: [ "pixelated", "smooth" ], mutable: true },
    pixelsPerUnit: { type: "number", minExcluded: 0, mutable: true },
    framesPerSecond: { type: "number", minExcluded: 0, mutable: true },
    alphaTest: { type: "number", min: 0, max: 1, mutable: true }
  }

  constructor(pub: any, server: ProjectServer) {
    super(pub, SpriteSettingsResource.schema, server);
  }

  init(callback: Function) {
    this.pub = {
      filtering: "pixelated",
      pixelsPerUnit: 100,
      framesPerSecond: 10,
      alphaTest: 0.1
    };

    super.init(callback);
  }
}
