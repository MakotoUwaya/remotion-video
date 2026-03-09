import React from "react";
import {
    AbsoluteFill,
    useCurrentFrame,
    useVideoConfig,
    interpolate,
    spring,
} from "remotion";

export const Countdown: React.FC<{ startFrom?: number }> = ({
    startFrom = 3,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // 1 increment = 1 second
    const progress = frame / fps;
    const currentNumber = Math.max(0, Math.ceil(startFrom - progress));

    // Animation for each second
    // progress % 1 goes from 0 to 1 every second
    // We want an effect that triggers every time the number changes.
    // The number changes at t=0, t=1, t=2...

    // Let's use spring for entry animation of each number
    // The "time" for the current number is (frame % fps)
    const entry = spring({
        fps,
        frame: frame % fps,
        config: {
            damping: 200,
        },
        durationInFrames: 15,
    });

    const scale = interpolate(entry, [0, 1], [0.5, 1]);
    const opacity = interpolate(entry, [0, 1], [0, 1]);

    // Hide if finished
    if (currentNumber === 0 && progress > startFrom) {
        return <AbsoluteFill style={{ backgroundColor: '#0000FF' }} />;
    }

    return (
        <AbsoluteFill
            style={{
                backgroundColor: "#0000FF", // Blue background
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontSize: 400,
                    fontWeight: "bold",
                    color: "white",
                    transform: `scale(${scale})`,
                    opacity: opacity,
                }}
            >
                {currentNumber}
            </div>
        </AbsoluteFill>
    );
};
