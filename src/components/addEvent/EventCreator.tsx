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

        // Ensure hour is within 0-23 range
        const clampedHour = Math.max(0, Math.min(23, hour));
        return `${clampedHour.toString().padStart(2,'0')}:00`;
    };

    // when user click TimeAxis
    const handleMouseDown = (e:React.MouseEvent) => {
        if(!containerRef.current) return;

        const time = getTimeFromPosition(e.clientY);
        setDragState({
            isDragging: true,
            startY: e.clientY,
            startTime: time,
            endTime: time,
        });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if(!dragState.isDragging) return;

        const newEndTime = getTimeFromPosition(e.clientY);
        setDragState(prev => ({
            ...prev,
            endTime: newEndTime,
        }));
    };

    const handleMouseUp = () => {
        if(!dragState.isDragging) return;

        // Ensure start time is before end time
        const [startHour, endHour] = [
            parseInt(dragState.startTime.split(':')[0]),
            parseInt(dragState.endTime.split(':')[0])
        ];

        const [finalStartTime, finalEndTime] = startHour <= endHour 
            ? [dragState.startTime, dragState.endTime]
            : [dragState.endTime, dragState.startTime];

            onCreateEvent(finalStartTime, finalEndTime);

            setDragState({
                isDragging: false,
                startY: 0,
                startTime: '',
                endTime: '',
            });
    };

    const handleMouseLeave = () => {
        if (!dragState.isDragging) return;

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
        onMouseLeave={handleMouseLeave}
        className='absolute inset-0 h-full w-full'>
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