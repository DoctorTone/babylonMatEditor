import React, { Suspense, useState } from "react";
import {
  Scene,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  Color3,
} from "@babylonjs/core";
import { useControls } from "leva";

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
  // TODO: put button on @babylonjs/gui full screen
  const { color } = useControls({ color: "#ffff00" });

  return (
    <div>
      <SceneComponent
        antialias
        onSceneReady={onSceneReady}
        id="my-canvas"
        renderChildrenWhenReady
      >
        <MyCamera radius={3} />
        <Sphere color={color} />
      </SceneComponent>
    </div>
  );
};
