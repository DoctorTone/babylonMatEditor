import { Color3, Mesh, MeshBuilder, PBRMaterial } from "@babylonjs/core";
import { useScene } from "babylonjs-hook";
import React, { useEffect } from "react";

type SphereProps = {
  color: string;
  tint: string;
  EnvIntensity: number;
  ior: number;
  metallic: number;
  roughness: number;
  opacity: number;
  subSurface: boolean;
  refract: number;
  Refraction: boolean;
  Translucent: boolean;
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

      sphereMat.albedoColor = Color3.FromHexString(props.color);
      sphereMat.metallic = props.metallic;
      sphereMat.roughness = props.roughness;
      sphereMat.alpha = props.opacity;
      sphereMat.indexOfRefraction = props.ior;
      sphereMat.environmentIntensity = props.EnvIntensity;

      if (props.subSurface) {
        sphereMat.subSurface.isRefractionEnabled = props.Refraction;
        sphereMat.subSurface.isTranslucencyEnabled = props.Translucent;
        sphereMat.subSurface.indexOfRefraction = props.refract;
        sphereMat.subSurface.tintColor = Color3.FromHexString(props.tint);
      }

      return () => {
        sphere?.dispose();
      };
    }
  }, [scene, props]);

  return null;
};
