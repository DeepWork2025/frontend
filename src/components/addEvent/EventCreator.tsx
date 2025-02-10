import React, { useState, useRef } from 'react';

interface EventCreatorProps {
    onCreateEvent: (startTime: string, endTime: string) => void;
}

const EventCreator: React.FC<EventCreatorProps> = ({ onCreateEvent }) => {
    const [dragState, setDragState] = useState({
        isDragging: false,
        startY: 0,
        startTime: '',
        endTime: '',
    });

    const containerRef = useRef<HTMLDivElement>(null);

    const getTimeFromPosition = (clientY: number): string => {
        if (!containerRef.current) return '';

        const rect = containerRef.current.getBoundingClientRect();
        const relativeY = clientY - rect.top;
        const hourHeight = 48; // Assuming each hour block is 48px high
        const hour = Math.floor(relativeY / hourHeight);

        return `${hour.toString().padStart(2,'0')}:00`;
    };

    // when user click TimeAxis to drag
    const handleMouseDown = (e:React.MouseEvent) => {
        if(!containerRef.current) return;

        setDragState({
            isDragging: true,
            startY: e.clientY,
            startTime: getTimeFromPosition(e.clientY),
            endTime: getTimeFromPosition(e.clientY),
        });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if(!dragState.isDragging) return;

        setDragState(prev => ({
            ...prev,
            endTime: getTimeFromPosition(e.clientY),
        }));
    };

    const handleMouseUp = () => {
        if(!dragState.isDragging) return;

        onCreateEvent(dragState.startTime, dragState.endTime);

        setDragState({
            isDragging: false,
            startY: 0,
            startTime: '',
            endTime: '',
        });
    };

    return (
        <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave="absolute inset-0 z-10">
            {/* drag preview */}
            {dragState.isDragging && (
                <div
                className="absolute left-16 right-0 bg-blue-200 opacity-50 pointer-events-none"
                style={{
                    top: `${Math.min(
                        parseInt(dragState.startTime[0]) * 48, 
                        parseInt(dragState.endTime[0]) * 48
                      )}px`,
                      height: `${Math.abs(
                        (parseInt(dragState.endTime[0]) -
                         parseInt(dragState.startTime[0])) * 48
                      )}px`
                }}
                >
                    <div className="text-sm p-1">
                        {dragState.startTime} -s {dragState.endTime}
                    </div>
                </div>
            )}

        </div>
    )
}

export default EventCreator;