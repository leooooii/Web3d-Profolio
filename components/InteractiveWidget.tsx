
import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Float } from '@react-three/drei';
import * as THREE from 'three';
import { RobotTriggerState } from '../types';

interface InteractiveWidgetProps {
    trigger?: RobotTriggerState;
    [key: string]: any;
}

export const InteractiveWidget: React.FC<InteractiveWidgetProps> = ({ trigger, ...props }) => {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  
  // Eye Refs for animation
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  
  // Arm Refs for Pivot Groups
  const leftArmGroupRef = useRef<THREE.Group>(null);
  const rightArmGroupRef = useRef<THREE.Group>(null);

  const [hovered, setHovered] = useState(false);

  // Animation State
  const animTime = useRef(0);
  const currentAnim = useRef<'idle' | 'left' | 'right'>('idle');
  
  // Jump Logic
  const isJumping = useRef(false);
  const jumpProgress = useRef(0);

  // Eye Animation State
  const nextBlinkTime = useRef(0); // Timestamp for next blink
  const blinkDuration = 0.15; // Duration of a blink in seconds
  const blinkTimer = useRef(0); // Current progress of blink

  // Watch for trigger changes
  useEffect(() => {
    if (trigger && trigger.type !== 'idle') {
        currentAnim.current = trigger.type;
        animTime.current = 0; // Reset animation timer
    }
  }, [trigger]);

  useFrame((state, delta) => {
    if (!headRef.current || !groupRef.current || !leftArmGroupRef.current || !rightArmGroupRef.current) return;

    // 1. Head Tracking (Look at mouse)
    const mouseX = state.pointer.x;
    const mouseY = state.pointer.y;
    headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, mouseX * 0.5, delta * 5);
    headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, -mouseY * 0.5, delta * 5);

    // 2. Click Jump Animation
    if (isJumping.current) {
        // Speed of the jump
        const jumpSpeed = 5; 
        jumpProgress.current += delta * jumpSpeed;

        // Sine wave trajectory
        if (jumpProgress.current < Math.PI) {
            groupRef.current.position.y = Math.sin(jumpProgress.current) * 0.6;
        } else {
            // Land
            groupRef.current.position.y = 0;
            isJumping.current = false;
            jumpProgress.current = 0;
        }
    } else {
        groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, 0, delta * 10);
    }

    // 3. Eye Expressions (Blink, Squint, Widen)
    let targetScaleX = 1;
    let targetScaleY = 1;
    let targetColor = new THREE.Color("#ffffff"); // Default White

    // Logic Priority: Jump (Happy) > Blink > Hover (Focus) > Idle
    if (isJumping.current) {
        // Happy Squint ^_^
        targetScaleX = 1.3;
        targetScaleY = 0.1;
        targetColor.set("#00e5ff"); // Cyan for excitement
    } else {
        // Hover State
        if (hovered) {
            targetScaleX = 1.2;
            targetScaleY = 1.2;
            targetColor.set("#00ff00"); // Green for focus
        } 
        
        // Blinking Logic
        // We subtract delta from timer if a blink is active
        if (blinkTimer.current > 0) {
            blinkTimer.current -= delta;
            
            // Calculate blink curve (Open -> Closed -> Open)
            const progress = 1 - (blinkTimer.current / blinkDuration); // 0 to 1
            const closure = Math.sin(progress * Math.PI); // 0 -> 1 -> 0
            targetScaleY = targetScaleY * (1 - closure); // Scale down Y
        } else {
            // Schedule next blink
            if (state.clock.elapsedTime > nextBlinkTime.current) {
                blinkTimer.current = blinkDuration;
                nextBlinkTime.current = state.clock.elapsedTime + Math.random() * 3 + 2; // Random 2-5s interval
            }
        }
    }

    // Apply Eye Animations
    if (leftEyeRef.current && rightEyeRef.current) {
        // Smoothly lerp scale
        const lerpSpeed = 20;
        leftEyeRef.current.scale.x = THREE.MathUtils.lerp(leftEyeRef.current.scale.x, targetScaleX, delta * lerpSpeed);
        leftEyeRef.current.scale.y = THREE.MathUtils.lerp(leftEyeRef.current.scale.y, targetScaleY, delta * lerpSpeed);
        rightEyeRef.current.scale.x = THREE.MathUtils.lerp(rightEyeRef.current.scale.x, targetScaleX, delta * lerpSpeed);
        rightEyeRef.current.scale.y = THREE.MathUtils.lerp(rightEyeRef.current.scale.y, targetScaleY, delta * lerpSpeed);
        
        // Smoothly lerp color
        (leftEyeRef.current.material as THREE.MeshBasicMaterial).color.lerp(targetColor, delta * 10);
        (rightEyeRef.current.material as THREE.MeshBasicMaterial).color.lerp(targetColor, delta * 10);
    }


    // 4. Wave Animation
    if (currentAnim.current !== 'idle') {
        animTime.current += delta;
        const t = animTime.current;
        const duration = 1.2;

        if (t > duration) {
            currentAnim.current = 'idle';
        } else {
            const isLeft = currentAnim.current === 'left';
            const arm = isLeft ? leftArmGroupRef.current : rightArmGroupRef.current;
            const direction = isLeft ? -1 : 1; 

            let targetZ = 0;
            let targetX = 0; 

            if (t < 0.3) {
                // Raise
                const progress = t / 0.3;
                const eased = 1 - Math.pow(1 - progress, 2);
                targetZ = eased * (Math.PI * 0.8);
            } else if (t < 0.9) {
                // Wave
                targetZ = Math.PI * 0.8;
                const waveProgress = (t - 0.3) * 15; 
                targetX = Math.sin(waveProgress) * 0.2; 
            } else {
                // Lower
                const progress = (t - 0.9) / 0.3;
                const eased = progress * progress; 
                targetZ = (Math.PI * 0.8) * (1 - eased);
            }

            arm.rotation.z = THREE.MathUtils.lerp(arm.rotation.z, direction * targetZ, delta * 15);
            arm.rotation.x = THREE.MathUtils.lerp(arm.rotation.x, targetX, delta * 15);
        }
    } else {
        // Return arms to idle
        leftArmGroupRef.current.rotation.z = THREE.MathUtils.lerp(leftArmGroupRef.current.rotation.z, 0, delta * 5);
        leftArmGroupRef.current.rotation.x = THREE.MathUtils.lerp(leftArmGroupRef.current.rotation.x, 0, delta * 5);
        rightArmGroupRef.current.rotation.z = THREE.MathUtils.lerp(rightArmGroupRef.current.rotation.z, 0, delta * 5);
        rightArmGroupRef.current.rotation.x = THREE.MathUtils.lerp(rightArmGroupRef.current.rotation.x, 0, delta * 5);
    }
  });

  const handleClick = (e: any) => {
    e.stopPropagation();
    if (!isJumping.current) {
        isJumping.current = true;
        jumpProgress.current = 0;
    }
  };

  const bodyColor = hovered ? "#007AFF" : "#8e8e93"; 
  
  return (
    <group {...props}>
      <Float speed={4} rotationIntensity={0.5} floatIntensity={0.5}>
        <group 
            ref={groupRef} 
            onClick={handleClick}
            onPointerOver={() => setHovered(true)} 
            onPointerOut={() => setHovered(false)}
        >
            {/* HEAD */}
            <group ref={headRef} position={[0, 0.6, 0]}>
                <RoundedBox args={[0.5, 0.4, 0.4]} radius={0.1} smoothness={4}>
                    <meshStandardMaterial color="#f5f5f7" />
                </RoundedBox>
                {/* Face */}
                <mesh position={[0, 0, 0.21]}>
                    <planeGeometry args={[0.4, 0.25]} />
                    <meshBasicMaterial color="#1d1d1f" />
                </mesh>
                
                {/* Eyes - Dynamic Refs */}
                <mesh ref={leftEyeRef} position={[-0.1, 0.02, 0.22]}>
                    <planeGeometry args={[0.08, 0.08]} />
                    <meshBasicMaterial />
                </mesh>
                <mesh ref={rightEyeRef} position={[0.1, 0.02, 0.22]}>
                    <planeGeometry args={[0.08, 0.08]} />
                    <meshBasicMaterial />
                </mesh>
                
                {/* Antenna */}
                <mesh position={[0, 0.25, 0]}>
                    <cylinderGeometry args={[0.02, 0.02, 0.3]} />
                    <meshStandardMaterial color="#86868b" />
                </mesh>
                <mesh position={[0, 0.4, 0]}>
                    <sphereGeometry args={[0.05]} />
                    <meshStandardMaterial color={hovered ? "#007AFF" : "#ff3b30"} emissive={hovered ? "#007AFF" : "#ff3b30"} emissiveIntensity={2} />
                </mesh>
            </group>

            {/* BODY */}
            <RoundedBox args={[0.3, 0.4, 0.3]} radius={0.05} smoothness={4} position={[0, 0.1, 0]}>
                <meshStandardMaterial color="#d1d1d6" />
            </RoundedBox>

            {/* LEFT ARM GROUP (Shoulder Pivot) */}
            <group ref={leftArmGroupRef} position={[-0.22, 0.2, 0]}>
                 {/* Arm Mesh - Offset so top is at pivot */}
                <RoundedBox args={[0.1, 0.3, 0.1]} radius={0.05} position={[0, -0.12, 0]}>
                    <meshStandardMaterial color={bodyColor} />
                </RoundedBox>
            </group>

            {/* RIGHT ARM GROUP (Shoulder Pivot) */}
            <group ref={rightArmGroupRef} position={[0.22, 0.2, 0]}>
                <RoundedBox args={[0.1, 0.3, 0.1]} radius={0.05} position={[0, -0.12, 0]}>
                    <meshStandardMaterial color={bodyColor} />
                </RoundedBox>
            </group>

        </group>
      </Float>
    </group>
  );
};
