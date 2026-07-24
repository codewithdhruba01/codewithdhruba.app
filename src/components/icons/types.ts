export interface AnimatedIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

export interface AnimatedIconProps {
  size?: number | string;
  color?: string;
  strokeWidth?: number | string;
  className?: string;
}
