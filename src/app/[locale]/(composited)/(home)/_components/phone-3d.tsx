"use client";

import React, { Suspense, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { RoundedBox, Float, PerspectiveCamera, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function PhoneModel({ textureUrl }: { textureUrl: string }) {
    const groupRef = useRef<THREE.Group>(null);
    const texture = useLoader(THREE.TextureLoader, textureUrl);

    useFrame((state) => {
        if (!groupRef.current) return;
        const t = state.clock.getElapsedTime();
        // Constant gentle rotation
        groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.1;
        // Follow mouse slightly
        const x = (state.mouse.x * Math.PI) / 20;
        const y = (state.mouse.y * Math.PI) / 20;
        groupRef.current.rotation.y += x;
        groupRef.current.rotation.x = -y;
    });

    return (
        <group ref={groupRef} scale={0.85}>
            {/* Phone Body */}
            <RoundedBox args={[3.45, 7, 0.35]} radius={0.3} smoothness={4}>
                <meshStandardMaterial color="#0a0a0a" roughness={0.1} metalness={0.9} />
            </RoundedBox>

            {/* Screen */}
            <mesh position={[0, 0, 0.18]}>
                <planeGeometry args={[3.2, 6.75]} />
                <meshStandardMaterial map={texture} roughness={0.2} transparent />
            </mesh>

            {/* Screen Glass (Reflection) */}
            <mesh position={[0, 0, 0.19]}>
                <planeGeometry args={[3.2, 6.75]} />
                <meshPhysicalMaterial
                    transparent
                    opacity={0.1}
                    roughness={0}
                    metalness={1}
                    clearcoat={1}
                />
            </mesh>
        </group>
    );
}

export default function Phone3D({ textureUrl }: { textureUrl: string }) {
    return (
        <div className="w-full h-[500px] md:h-[700px] cannot-hover:h-[400px]">
            <Canvas shadows gl={{ antialias: true }}>
                <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
                <ambientLight intensity={0.7} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />

                <Suspense fallback={null}>
                    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                        <PhoneModel textureUrl={textureUrl} />
                    </Float>
                    <ContactShadows position={[0, -4, 0]} opacity={0.4} scale={15} blur={2.5} far={4.5} />
                    <Environment preset="city" />
                </Suspense>
            </Canvas>
        </div>
    );
}
