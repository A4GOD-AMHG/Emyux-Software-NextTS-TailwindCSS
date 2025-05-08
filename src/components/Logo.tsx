import Image from "next/image";
import { JSX } from "react";

type LogoProps = {
    width?: number;
    height?: number;
    className?: string;
}

function Logo({ width, height, className }: LogoProps): JSX.Element {
    return <Image
        src="/images/emyux-logo.png"
        alt="Emyux"
        width={width}
        height={height}
        priority
        className={className}
    />
}

export default Logo;