import { Scene, Vector3, HemisphericLight } from "@babylonjs/core";
import * as BABYLON from "@babylonjs/core";
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
  scene.clearColor.set(0, 0, 0, 1);

  scene.environmentTexture = BABYLON.CubeTexture.CreateFromPrefilteredData(
    "./textures/environment.dds",
    scene
  );

  scene.createDefaultSkybox(scene.environmentTexture);
};

export default () => {
  // TODO: put button on @babylonjs/gui full screen
  const { tint, ior, metallic, roughness } = useControls({
    tint: "#ffff00",
    ior: { value: 1.5, min: 0, max: 5, step: 0.1 },
    metallic: { value: 0, min: 0, max: 1, step: 0.1 },
    roughness: { value: 0, min: 0, max: 1, step: 0.1 },
  });

  return (
    <div>
      <SceneComponent
        antialias
        onSceneReady={onSceneReady}
        id="my-canvas"
        renderChildrenWhenReady
      >
        <MyCamera radius={3} />
        <Sphere
          tint={tint}
          ior={ior}
          metallic={metallic}
          roughness={roughness}
        />
      </SceneComponent>
    </div>
  );
};
