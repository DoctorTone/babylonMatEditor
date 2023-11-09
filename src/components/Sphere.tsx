import {
  Color3,
  Mesh,
  MeshBuilder,
  Nullable,
  StandardMaterial,
  Vector3,
} from "@babylonjs/core";
import { useBeforeRender, useScene } from "babylonjs-hook";
import React, { useRef, useEffect } from "react";

type SphereProps = {
  color: string;
};

export const Sphere: React.FC<SphereProps> = (props) => {
  const scene = useScene();

  useEffect(() => {
    if (scene !== null) {
      const sphere: Mesh = MeshBuilder.CreateSphere(
        "sphere",
        { diameter: 1.0 },
        scene
      );

      const sphereMat = new StandardMaterial("sphereMat", scene);
      sphereMat.diffuseColor = Color3.FromHexString(props.color);
      sphere.material = sphereMat;

      return () => {
        sphere?.dispose();
      };
    }
  }, [scene, props]);

  return null;
};
