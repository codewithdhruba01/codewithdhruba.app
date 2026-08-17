import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "../../lib/utils";

export type FilmStripCardProps = Readonly<
  {
    frames?: string[];
    label?: string;
  } & ComponentPropsWithoutRef<"div">
>;

const defaultFrames = [
  "/assets/photo2.jpeg",
  "/assets/photo3.jpeg",
  "/assets/photo4.jpeg",
  "/assets/photo1.jpeg",
  "/assets/photo6.jpeg",
];

const LEFT_SPROCKET_HOLES = [
  "left-sprocket-1",
  "left-sprocket-2",
  "left-sprocket-3",
  "left-sprocket-4",
  "left-sprocket-5",
  "left-sprocket-6",
  "left-sprocket-7",
  "left-sprocket-8",
] as const;

const RIGHT_SPROCKET_HOLES = [
  "right-sprocket-1",
  "right-sprocket-2",
  "right-sprocket-3",
  "right-sprocket-4",
  "right-sprocket-5",
  "right-sprocket-6",
  "right-sprocket-7",
  "right-sprocket-8",
] as const;

// Production-ready Film Strip component — styled with Tailwind CSS.
export const FilmStripCard = forwardRef<HTMLDivElement, FilmStripCardProps>(
  (
    {
      className,
      frames = defaultFrames,
      label = "Roll 14 · Coding Life",
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      data-slot="film-strip-card"
      className={cn("w-full max-w-[720px] font-mono mx-auto my-6 sm:my-10", className)}
      {...props}
    >
      <p className="mb-2 sm:mb-4 text-center text-[9px] sm:text-xs tracking-widest text-neutral-400 uppercase">
        {label}
      </p>
      <div className="relative rounded-sm bg-neutral-900 px-2 py-3 sm:px-4 sm:py-5 shadow-xl flex justify-center">
        <div className="absolute top-0 bottom-0 left-0 flex w-3 sm:w-5 flex-col justify-evenly">
          {LEFT_SPROCKET_HOLES.map((holeId) => (
            <div
              key={holeId}
              className="mx-auto h-2 w-1.5 sm:h-3 sm:w-2.5 rounded-sm bg-neutral-700"
            />
          ))}
        </div>
        <div className="absolute top-0 right-0 bottom-0 flex w-3 sm:w-5 flex-col justify-evenly">
          {RIGHT_SPROCKET_HOLES.map((holeId) => (
            <div
              key={holeId}
              className="mx-auto h-2 w-1.5 sm:h-3 sm:w-2.5 rounded-sm bg-neutral-700"
            />
          ))}
        </div>
        <div className="mx-4 sm:mx-6 flex gap-1 sm:gap-2.5 overflow-hidden">
          {frames.map((src, frameNumber) => (
            <div
              key={src}
              className="relative shrink-0 overflow-hidden border-2 sm:border-[3px] border-neutral-800 h-[90px] w-[72px] sm:h-[110px] sm:w-[88px] md:h-[145px] md:w-[116px]"
            >
              <img
                src={src}
                alt={`Frame ${frameNumber + 1}`}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-0.5 left-0.5 sm:bottom-1 sm:left-1 bg-black/60 px-1 py-0.5 sm:px-1.5 text-[7px] sm:text-[9px] text-white">
                {String(frameNumber + 1).padStart(2, "0")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
);

FilmStripCard.displayName = "FilmStripCard";
