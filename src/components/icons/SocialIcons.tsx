type IconProps = {
    size: string;
    className?: string;
};

// GitHub
export const GithubIcon = ({ size, className = '' }: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        className={`${className} stroke-[#919191]`}
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77A5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
);

// LinkedIn
export const LinkedinIcon = ({ size, className = '' }: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 512 512"
        className={`${className} fill-[#919191]`}
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M182.8 384V212.9h-54.9V384h54.9zm-25.4-197c18.3 0 29.7-13.1 29.7-29.5-.3-16.7-11.4-29.5-29.4-29.5S128 140.8 128 157.5c0 16.4 11.4 29.5 29 29.5h.4z"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M320.6 209c-29.1 0-41.6 16.4-49.6 27.8V213h-55v171h55v-97.4c0-5 .4-10 1.9-13.5 4-10 13-20.3 28.2-20.3 19.9 0 27.9 15.3 27.9 37.7V384h55v-99.9c0-51.3-27.2-75.1-63.4-75.1z"
        />
        <path d="M417.2 64H96.8C79.3 64 64 76.6 64 93.9V415c0 17.4 15.3 32.9 32.8 32.9h320.3c17.6 0 30.8-15.6 30.8-32.9V93.9C448 76.6 434.7 64 417.2 64zM414 416H99.1c-1.8 0-3.1-1.4-3.1-3.1V98c0-1.1 1-2 2-2h316c1 0 2 1 2 2v316c0 .9-.9 2-2 2z" />
    </svg>
);

// X (Twitter)
export const XIcon = ({ size, className = '' }: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        className={`${className} fill-[#919191]`}
    >
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584l-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
);

// Instagram
export const InstagramIcon = ({ size, className = '' }: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${className} stroke-[#919191]`}
    >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
    </svg>
);


// Share
export const ShareIcon = ({ size, className = '' }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 8 8"
        className={`${className} fill-[#919191]`}>
        <path d="M5 0v2C1 2 0 4.05 0 7c.52-1.98 2-3 4-3h1v2l3-3.16L5 0z" />
    </svg>
);

// LeetCode
export const LeetcodeIcon = ({ size, className = '' }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        className={`${className} fill-[#919191]`}>
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104a5.35 5.35 0 0 0-.125.513a5.527 5.527 0 0 0 .062 2.362a5.83 5.83 0 0 0 .349 1.017a5.938 5.938 0 0 0 1.271 1.818l4.277 4.193l.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019l-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523a2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382a1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382a1.38 1.38 0 0 0-1.38-1.382z" />
    </svg>
);

// Download
export const DownloadIcon = ({ size, className = '' }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 16 16"
        className={`${className} fill-[#919191]`}>
        <path d="m8 9l4-4H9V1H7v4H4zm3.636-1.636l-1.121 1.121L14.579 10L8 12.453L1.421 10l4.064-1.515l-1.121-1.121L0 9v4l8 3l8-3V9z" />
    </svg>
);


// Daily.dev
export const DailydotdevIcon = ({ size, className = '' }: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        className={`${className} fill-[#919191]`}
    >
        <path d="M18.29 5.706a1.405 1.405 0 0 0-1.987 0L4.716 17.296l1.324-2.65l-2.65-2.649l3.312-3.311l2.65 2.65l1.986-1.988l-3.642-3.642a1.405 1.405 0 0 0-1.987 0L.411 11.004a1.404 1.404 0 0 0 0 1.987l4.305 4.304l.993.993a1.405 1.405 0 0 0 1.987 0L19.285 6.7l-.993-.994Zm-.332 3.647l2.65 2.65l-4.306 4.305a1.404 1.404 0 1 0 1.986 1.986l5.299-5.298a1.404 1.404 0 0 0 0-1.987l-4.305-4.304z" />
    </svg>
);

// Codepen
export const CodepenIcon = ({ size, className = '' }: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        className={`${className} stroke-[#919191]`}
    >
        <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
            <path d="m12 2l10 6.5v7L12 22L2 15.5v-7L12 2zm0 20v-6.5" />
            <path d="m22 8.5l-10 7l-10-7" />
            <path d="m2 15.5l10-7l10 7M12 2v6.5" />
        </g>
    </svg>
);

// Forem / News
export const NewsIcon = ({ size, className = '' }: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 26 26"
        className={`${className} fill-[#919191]`}
    >
        <path d="M16.906 1.969H1A1 1 0 0 0 0 3v15.969c0 2.365 1.319 3.818 2.563 4.437C3.806 24.025 5 24 5 24h16.094c.175 0 1.176-.026 2.313-.594c1.186-.593 2.427-1.959 2.53-4.125V8.031s-.004-.702-.375-1.438c-.337-.667-1.147-1.4-2.281-1.53H18V3.187A1 1 0 0 0 17 2zM2 4h14v14.969c0 1.28.406 2.275.969 3.031H5s-.454.002-1-.156C2.681 21.249 2 20.68 2 18.969V4zm2 2c-.551 0-1 .449-1 1v2c0 .551.449 1 1 1h10c.551 0 1-.449 1-1V7c0-.551-.449-1-1-1H4z" />
    </svg>
);

// Book
export const BookIcon = ({ size, className = '' }: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 48 48"
        className={`${className} stroke-[#919191]`}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M10.35 4.5a2 2 0 0 0-1.95 2v35.1a2 2 0 0 0 1.95 2h27.3a2 2 0 0 0 2-2V6.45a2 2 0 0 0-2-1.95h-2v8.82l-3.86-3.91l-3.88 3.91V4.5Z" />
        <path d="M16.19 24.5h16.62" />
        <path d="M16.19 36.18h12.69" />
        <path d="M16.19 30.33h9.74" />
    </svg>
);


// Calendar
export const CalendarIcon = ({ size, className = '' }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 16 16"
        className={`${className} fill-[#919191]`}>
        <path fillRule="evenodd"
            d="M14 4v-.994C14 2.45 13.55 2 12.994 2H11v1h-1V2H6v1H5V2H3.006C2.45 2 2 2.45 2 3.006v9.988C2 13.55 2.45 14 3.006 14h9.988C13.55 14 14 13.55 14 12.994V5H2V4z" />
    </svg>
);

// Threads
export const ThreadsIcon = ({ size, className = '' }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        className={`${className} fill-[#919191]`}>
        <path d="M17.743 11.123a8.547 8.547 0 0 0-.315-.142c-.185-3.414-2.05-5.368-5.182-5.388h-.042c-1.874 0-3.431.8-4.39 2.255l1.722 1.181c.716-1.087 1.84-1.319 2.669-1.319h.028c1.031.007 1.81.307 2.313.892c.367.425.612 1.014.733 1.756a13.176 13.176 0 0 0-2.96-.143c-2.977.172-4.892 1.908-4.763 4.321c.065 1.224.675 2.277 1.717 2.965c.88.582 2.015.866 3.195.802c1.557-.086 2.778-.68 3.63-1.766c.648-.825 1.057-1.894 1.238-3.241c.742.448 1.292 1.037 1.596 1.745c.517 1.205.547 3.184-1.068 4.797c-1.415 1.414-3.116 2.025-5.686 2.044c-2.851-.02-5.008-.935-6.41-2.717c-1.313-1.67-1.991-4.08-2.016-7.165c.025-3.085.703-5.496 2.016-7.165c1.402-1.782 3.558-2.696 6.41-2.717c2.871.02 5.065.94 6.521 2.73c.714.879 1.252 1.983 1.607 3.27l2.018-.538c-.43-1.585-1.107-2.95-2.027-4.083C18.43 1.2 15.7.024 12.185 0h-.014C8.66.024 5.963 1.205 4.15 3.51c-1.614 2.05-2.446 4.905-2.474 8.482v.016c.028 3.578.86 6.431 2.473 8.482c1.813 2.305 4.512 3.486 8.022 3.51h.014c3.12-.022 5.319-.839 7.13-2.649c2.371-2.368 2.3-5.336 1.518-7.158c-.56-1.307-1.629-2.368-3.09-3.07zm-5.387 5.065c-1.305.074-2.66-.512-2.728-1.766c-.05-.93.662-1.969 2.808-2.092c.246-.015.487-.021.724-.021c.78 0 1.508.075 2.171.22c-.247 3.088-1.697 3.59-2.975 3.66z" />
    </svg>
);