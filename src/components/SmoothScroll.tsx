
import { ReactLenis } from '@studio-freight/react-lenis';

function SmoothScroll({ children }: { children: React.ReactNode }) {
    // lenis options for smooth scrolling
    const lenisOptions = {
        lerp: 0.1,
        duration: 1.5,
        smoothTouch: true, //smooth scroll for touch devices
        smooth: true,
    };

    return (
        <ReactLenis root options={lenisOptions}>
            {children}
        </ReactLenis>
    );
}

export default SmoothScroll;
