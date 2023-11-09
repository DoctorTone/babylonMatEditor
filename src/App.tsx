import React, { Suspense, useState } from "react";
import {
  Scene,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  Color3,
} from "@babylonjs/core";

import SceneComponent from "babylonjs-hook";
import "./css/editorStyles.css";
import { MyCamera } from "./MyCamera";
import { Sphere } from "./components/Sphere";

/**
 * Called once when the scene is ready.
 */
const onSceneReady = (scene: Scene) => {
  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  var light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7;

  // Our built-in 'ground' shape.
  // const ground = MeshBuilder.CreateGround(
  //   "ground",
  //   { width: GROUND_SIZE, height: GROUND_SIZE },
  //   scene
  // );
  // ground.position.y = -0.75;
};

export default () => {
  const [xyPosition, setXyPosition] = useState(8);
  // TODO: put button on @babylonjs/gui full screen
  return (
    <div>
      <button onClick={() => setXyPosition(xyPosition === 10 ? 6 : 10)}>
        zoom
      </button>
      <SceneComponent
        antialias
        onSceneReady={onSceneReady}
        id="my-canvas"
        renderChildrenWhenReady
      >
        <MyCamera radius={3} />
        <Sphere />
      </SceneComponent>
    </div>
  );
};
