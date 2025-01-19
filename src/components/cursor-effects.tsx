"use client";

import {useEffect, useRef, useState} from "react";

interface Position {
    x: number;
    y: number;
}

interface Particle extends Position {
    id: number;
    rotation: number;
    scale: number;
    opacity: number;
    createdAt: number;
}

export function CursorEffects(): JSX.Element {
    const [particles, setParticles] = useState<Particle[]>([]);
    const counter = useRef(0);
    const [lastSpawn, setLastSpawn] = useState(0);
    const [lastPosition, setLastPosition] = useState<Position>({x: 0, y: 0});

    const getDistance = (pos1: Position, pos2: Position): number => {
        return Math.sqrt(Math.pow(pos2.x - pos1.x, 2) + Math.pow(pos2.y - pos1.y, 2));
    };

    useEffect(() => {
        const updatePosition = (e: MouseEvent): void => {
            const currentPosition = {
                x: e.clientX,
                y: e.clientY,
            };

            const now = Date.now();
            const minDistance = 20;

            if (
                now - lastSpawn > 100 &&
                getDistance(lastPosition, currentPosition) > minDistance
            ) {
                const newParticle: Particle = {
                    id: counter.current,
                    x: e.clientX,
                    y: e.clientY,
                    rotation: Math.random() * 360,
                    scale: 0.5 + Math.random() * 0.7,
                    opacity: 1,
                    createdAt: now,
                };

                setParticles((prev) => [...prev, newParticle]);
                counter.current++;
                setLastSpawn(now);
                setLastPosition(currentPosition);
            }
        };

        window.addEventListener("mousemove", updatePosition);

        return (): void => window.removeEventListener("mousemove", updatePosition);
    }, [counter, lastSpawn, lastPosition]);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            setParticles((prev) =>
                prev
                    .map((particle) => ({
                        ...particle,
                        y: particle.y + 1,
                        opacity: Math.max(0, particle.opacity - 0.02),
                        rotation: particle.rotation + 2,
                    }))
                    .filter(
                        (particle) =>
                            particle.opacity > 0 && now - particle.createdAt < 5000,
                    ),
            );
        }, 16);

        return (): void => {
            clearInterval(interval);
            setParticles([]);
        };
    }, []);

    return (
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
            {particles.map((particle) => (
                <img
                    key={particle.id}
                    src="/small-leaf.svg"
                    alt=""
                    className="absolute w-6 h-6"
                    style={{
                        left: particle.x,
                        top: particle.y,
                        transform: `rotate(${particle.rotation}deg) scale(${particle.scale})`,
                        opacity: Math.max(0, Math.min(1, particle.opacity)),
                        transition: "transform 0.2s ease-out",
                    }}
                />
            ))}
        </div>
    );
}
