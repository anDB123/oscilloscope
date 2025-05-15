import { RefObject, use, useRef, useState } from "react";
export default function Dial(name: string, size: number, refValue: RefObject<number>, minVal: number, maxVal: number) {
    const containerRef = useRef<HTMLDivElement>(null);
    const angleRef = useRef(0);


    const delta = (maxVal - minVal) / 90;
    const sensitivity = 1;
    const [angle, setAngle] = useState(3.6 * refValue.current / delta);
    const textSize = size / 10;
    const [dragging, setDragging] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const handleMouseDown = (e: { preventDefault?: any; clientX?: any; clientY?: any; }) => {
        e.preventDefault();
        setDragging(true);
        const { clientX, clientY } = e;
        setMousePos({ x: clientX, y: clientY });
    }


    const dialDegradations = () => {
        //
        let coords = [];
        let radius = size * 0.6;
        const startX = 0;
        const startY = 0;
        for (let i = 0; i < 10; i++) {
            const angle = (i * 36) * (Math.PI / 180);
            const x = startX - Math.cos(angle) * (radius);
            const y = startY - Math.sin(angle) * (radius);
            const value = minVal + (maxVal - minVal) * (i / 10);
            coords.push({ x, y, i });
        }
        return (
            <div className=" block " style={{ transform: `translate(${-size * 0.48 - textSize / 2}px, ${- textSize * 0.8}px)` }}>
                {
                    coords.map((coord, index) => {
                        return (
                            <div key={index} style={{ transform: `translate(${coord.x}px, ${coord.y}px)` }} className="absolute">
                                <div style={{ fontSize: `${textSize}px` }} className="text-white">{coord.i}</div>
                            </div>
                        )
                    })}
            </div>
        );
    }

    const handleScroll = (e: { preventDefault?: any; deltaY?: any; }) => {
        e.preventDefault();
        const { deltaY } = e;
        if (deltaY > 0) {
            angleRef.current += 3.6;
            refValue.current += delta;
        } else {
            angleRef.current -= 3.6;
            refValue.current -= delta;
        }
        if (refValue.current > maxVal) {
            refValue.current = maxVal;
            angleRef.current = 360 - 36;
        }

        if (refValue.current < minVal) {
            refValue.current = minVal;
            angleRef.current = 0;
        }
        setAngle(angleRef.current)
    }
    function handleMouseEnter() {
        if (containerRef.current) {
            containerRef.current.addEventListener('wheel', handleScroll, { passive: false });
            console.log('mouse enter event');
        }
    }
    function handleMouseLeave() {
        if (containerRef.current) {
            containerRef.current.removeEventListener('wheel', handleScroll);
            console.log('mouse leave event');
        }
    }
    return (
        <div >
            <div style={{ fontSize: `${size / 5}px` }} className="flex justify-center items-center h-full text-black p-5">
                {name}
            </div>
            <div className="flex justify-center items-center">
                <div style={{ width: `${size}px`, height: `${size}px`, rotate: `${angle}deg` }} className={` bg-white rounded-full cursor-pointer`} onWheel={handleScroll} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} ref={containerRef}>
                    <div style={{ transform: `translateY(${size / 2}px)`, width: `${size / 10}px`, height: `${size / 50}px` }} className=" bg-black top-1/2 left-0"></div>
                </div >
                {dialDegradations()}
            </div>
        </div>);
}