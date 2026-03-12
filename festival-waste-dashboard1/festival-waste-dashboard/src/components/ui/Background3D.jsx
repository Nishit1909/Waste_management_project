import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

function RotatingSphere({ position, size, color, speed, parallaxFactor }) {
    const meshRef = useRef();
    const { mouse, viewport } = useThree();
    const materialColor = useMemo(() => new THREE.Color(color), [color]);

    useFrame((state, delta) => {
        if (!meshRef.current) return;

        // Slow rotation animation
        meshRef.current.rotation.x += delta * speed;
        meshRef.current.rotation.y += delta * speed * 1.5;

        // Mouse Parallax effect
        const targetX = (mouse.x * viewport.width) * parallaxFactor;
        const targetY = (mouse.y * viewport.height) * parallaxFactor;

        // Smooth interpolation towards target position based on mouse
        meshRef.current.position.x += (position[0] + targetX - meshRef.current.position.x) * 0.05;
        meshRef.current.position.y += (position[1] + targetY - meshRef.current.position.y) * 0.05;
        // Keep initial Z position
        meshRef.current.position.z = position[2];
    });

    return (
        <Sphere ref={meshRef} position={position} args={[size, 16, 16]}>
            <meshBasicMaterial
                color={materialColor}
                wireframe
                transparent
                opacity={0.15}
                blending={THREE.AdditiveBlending}
            />
        </Sphere>
    );
}

export function Background3D() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
            <Canvas camera={{ position: [0, 0, 15], fov: 45 }} dpr={[1, 2]}>
                <RotatingSphere position={[-6, 4, -5]} size={3.5} color="#3b82f6" speed={0.1} parallaxFactor={0.1} />
                <RotatingSphere position={[7, -5, -8]} size={5} color="#06b6d4" speed={0.08} parallaxFactor={0.15} />
                <RotatingSphere position={[-8, -6, -10]} size={6} color="#6366f1" speed={0.05} parallaxFactor={0.05} />
                <RotatingSphere position={[5, 6, -3]} size={2} color="#8b5cf6" speed={0.12} parallaxFactor={0.2} />
                <RotatingSphere position={[0, -2, -15]} size={8} color="#0ea5e9" speed={0.03} parallaxFactor={0.02} />
            </Canvas>
        </div>
    );
}
