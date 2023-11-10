import {
  Color3,
  Mesh,
  MeshBuilder,
  Nullable,
  StandardMaterial,
  PBRMaterial,
  Vector3,
} from "@babylonjs/core";
import { useBeforeRender, useScene } from "babylonjs-hook";
import React, { useRef, useEffect } from "react";

type SphereProps = {
  tint: string;
  ior: number;
  metallic: number;
  roughness: number;
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

      const sphereMat = new PBRMaterial("sphereMat", scene);
      sphere.material = sphereMat;

      sphereMat.metallic = props.metallic;
      sphereMat.roughness = props.roughness;

      sphereMat.subSurface.isRefractionEnabled = true;
      sphereMat.subSurface.indexOfRefraction = props.ior;
      sphereMat.subSurface.tintColor = Color3.FromHexString(props.tint);

      return () => {
        sphere?.dispose();
      };
    }
  }, [scene, props]);

  return null;
};
