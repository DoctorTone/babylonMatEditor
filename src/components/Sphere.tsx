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
  position: Vector3 | undefined;
};

export const Sphere: React.FC = () => {
  const scene = useScene();

  useEffect(() => {
    if (scene !== null) {
      const sphere: Mesh = MeshBuilder.CreateSphere(
        "sphere",
        { diameter: 1.0 },
        scene
      );

      const sphereMat = new StandardMaterial("sphereMat", scene);
      sphereMat.diffuseColor = Color3.Red();
      sphere.material = sphereMat;

      return () => {
        sphere?.dispose();
      };
    }
  }, [scene]);

  return null;
};
