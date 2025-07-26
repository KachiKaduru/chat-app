// utils/bubble-data.ts
export interface BubbleConfig {
  id: number;
  size: number;
  startX: number; // Starting X position (0-1000)
  endX: number; // Ending X position
  duration: number; // Animation duration in seconds
  initialY: number; // Starting Y position (-100 to -500)
  exitY: number; // Ending Y position (1000+)
  initialX: number;
}

export const generateBubbleData = (): BubbleConfig[] => {
  // These values are carefully chosen to look random but are completely static
  return [
    { id: 1, size: 15, startX: 248, endX: 298, duration: 22, initialY: -100, exitY: 1100 },
    { id: 2, size: 38, startX: 320, endX: 370, duration: 28, initialY: -250, exitY: 1200 },
    { id: 3, size: 58, startX: 786, endX: 836, duration: 25, initialY: -400, exitY: 1050 },
    { id: 4, size: 45, startX: 604, endX: 654, duration: 30, initialY: -150, exitY: 1150 },
    { id: 5, size: 20, startX: 393, endX: 443, duration: 20, initialY: -300, exitY: 1250 },
    { id: 6, size: 44, startX: 755, endX: 805, duration: 26, initialY: -200, exitY: 1000 },
    { id: 7, size: 55, startX: 228, endX: 278, duration: 24, initialY: -350, exitY: 1100 },
    { id: 8, size: 35, startX: 210, endX: 260, duration: 27, initialY: -120, exitY: 1200 },
    { id: 9, size: 38, startX: 309, endX: 359, duration: 23, initialY: -280, exitY: 1050 },
    { id: 10, size: 46, startX: 94, endX: 144, duration: 29, initialY: -180, exitY: 1150 },
  ].map((bubble) => ({
    ...bubble,
    // Make some bubbles enter from left/right instead of top
    initialX:
      bubble.id % 3 === 0
        ? -100
        : bubble.id % 5 === 0
        ? 1100 // Right side
        : bubble.startX, // Normal X position
    // Alternate Y starting points for variety
    initialY: bubble.id % 2 === 0 ? bubble.initialY : -bubble.size,
  }));
};
