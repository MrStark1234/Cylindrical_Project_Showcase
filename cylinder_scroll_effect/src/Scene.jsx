import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import * as THREE from "three"; // sab kuch three JS se import kar liya as THREE me

const Scene = () => {
  let tex = useTexture("./image.png");
  let cyl = useRef(null);

  useFrame((state, delta) => {
    cyl.current.rotation.y += delta;
  });
  return (
    // we give rotation effect to group on [x,y,z] axis
    <group rotation={[0, 1.4, 0.5]}>
      <mesh ref={cyl}>
        {/* yaha open ended ko true kiya hai jisse endpoint khul gaya or cylinder ka
        ek hi hissa dikh raha hai */}
        <cylinderGeometry args={[1, 1, 1, 60, 60, true]} />
        {/* THREE.DoubleSide ki help se dusre side ka hisssa bhi visible ho gaya */}
        <meshBasicMaterial transparent map={tex} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

export default Scene;
