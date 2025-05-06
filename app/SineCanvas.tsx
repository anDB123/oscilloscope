import { RefObject, useEffect, useRef } from "react";

export default function SineCanvas(size: number, intensity: RefObject<number>, speed: RefObject<number>, spacing: RefObject<number>) {
    const canvasRef = useRef(null);
    const phaseRef = useRef(0);
    const width = size;
    const height = size;
    const numberPoints = 1000;

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let animationFrameId: number;

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            // Draw grid
            ctx.strokeStyle = "rgba(200, 200, 200, 0.5)";
            ctx.lineWidth = 0.5;

            // Vertical lines
            for (let x = 0; x <= width; x += width / 10) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
                ctx.stroke();
            }

            // Horizontal lines
            for (let y = 0; y <= height; y += height / 10) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
                ctx.stroke();
            }
            ctx.fillStyle = '#000000';
            ctx.moveTo(0, height / 2);
            ctx.beginPath();
            for (let x = 0; x < width; x += width / numberPoints) {
                const y = height / 2 + intensity.current * Math.sin(x * spacing.current + phaseRef.current);
                ctx.lineTo(x, y);
            }
            ctx.strokeStyle = "green";
            ctx.lineWidth = size / 100;
            ctx.shadowColor = "green";
            ctx.shadowBlur = 10; // Increase for stronger haze
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.stroke();
            phaseRef.current += speed.current * spacing.current;
            animationFrameId = requestAnimationFrame(draw);
        }
        requestAnimationFrame(draw);
        return () => cancelAnimationFrame(animationFrameId);
    }, [intensity, speed, spacing])

    return (
        <canvas
            ref={canvasRef}
            width={size}
            height={size}
            style={{
                borderRadius: "50%",
                overflow: "hidden",
                border: "5px solid black",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
            }}
            className="bg-[#1D3A1D]"
        />
    )

}
