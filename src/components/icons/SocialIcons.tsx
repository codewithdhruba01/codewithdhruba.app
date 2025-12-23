type IconProps = {
    size: string;
    className?: string;
};

// 🔹 GitHub
export const GithubIcon = ({ size, className }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 432 416" className={`${className} fill-[#919191]`}>
        <path
            d="M213.5 0q88.5 0 151 62.5T427 213q0 70-41 125.5T281 416q-14 2-14-11v-58q0-27-15-40q44-5 70.5-27t26.5-77q0-34-22-58q11-26-2-57q-18-5-58 22q-26-7-54-7t-53 7q-18-12-32.5-17.5T107 88h-6q-12 31-2 57q-22 24-22 58q0 55 27 77t70 27q-11 10-13 29q-42 18-62-18q-12-20-33-22q-2 0-4.5.5t-5 3.5t8.5 9q14 7 23 31q1 2 2 4.5t6.5 9.5t13 10.5T130 371t30-2v36q0 13-14 11q-64-22-105-77.5T0 213q0-88 62.5-150.5T213.5 0z"
        />
    </svg>
);

// 🔹 LinkedIn
export const LinkedinIcon = ({ size, className }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 42 42" className={`${className} fill-[#919191]`}>
        <path
            d="M6.5 17.5h6v17h-6v-17zm20.141-.58c1.689.01 3.85.84 5.17 2.18c1.369 1.53 1.689 3.259 1.689 5.4v10h-6v-9.29c0-1.7-.689-3.771-2.939-3.84c-1.32.021-2.17.78-2.801 2.06c-.18.42-.14.891-.14 1.36l-.12 9.71h-6v-17h6l.12 2.22a6.19 6.19 0 0 1 1.69-1.829c.96-.691 2.081-.952 3.331-.971zM9.5 9.35c1.54.021 3.07 1.23 3.13 3.07c.04 1.641-1.39 3.07-3.17 3.07h-.04c-1.53 0-3.03-1.25-3.1-3.07c.03-1.62 1.39-3.029 3.18-3.07zM.5 1.5v39h39v-39H.5z"
        />
    </svg>
);

// 🔹 X (Twitter)
export const XIcon = ({ size, className }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" className={`${className} fill-[#919191]`}>
        <path
            d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584l-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
        />
    </svg>
);

// 🔹 Instagram
export const InstagramIcon = ({ size, className }: IconProps) => (
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


// 🔹 Daily.dev
export const DailydotdevIcon = ({ size, className }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" className={`${className} fill-[#919191]`}>
        <path
            d="M18.29 5.706a1.405 1.405 0 0 0-1.987 0L4.716 17.296l1.324-2.65l-2.65-2.649l3.312-3.311l2.65 2.65l1.986-1.988l-3.642-3.642a1.405 1.405 0 0 0-1.987 0L.411 11.004a1.404 1.404 0 0 0 0 1.987l4.305 4.304l.993.993a1.405 1.405 0 0 0 1.987 0L19.285 6.7l-.993-.994Zm-.332 3.647l2.65 2.65l-4.306 4.305a1.404 1.404 0 1 0 1.986 1.986l5.299-5.298a1.404 1.404 0 0 0 0-1.987l-4.305-4.304z"
        />
    </svg>
);

// 🔹 Codepen
export const CodepenIcon = ({ size, className }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" className={`${className} stroke-[#919191]`}>
        <g
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
        >
            <path d="m12 2l10 6.5v7L12 22L2 15.5v-7L12 2zm0 20v-6.5" />
            <path d="m22 8.5l-10 7l-10-7" />
            <path d="m2 15.5l10-7l10 7M12 2v6.5" />
        </g>
    </svg>
);

// 🔹 Forem / News
export const NewsIcon = ({ size, className }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 26 26" className={`${className} fill-[#919191]`}>
        <path
            d="M16.906 1.969H1A1 1 0 0 0 0 3v15.969c0 2.365 1.319 3.818 2.563 4.437C3.806 24.025 5 24 5 24h16.094c.175 0 1.176-.026 2.313-.594c1.186-.593 2.427-1.959 2.53-4.125V8.031s-.004-.702-.375-1.438c-.337-.667-1.147-1.4-2.281-1.53H18V3.187A1 1 0 0 0 17 2zM2 4h14v14.969c0 1.28.406 2.275.969 3.031H5s-.454.002-1-.156C2.681 21.249 2 20.68 2 18.969V4zm2 2c-.551 0-1 .449-1 1v2c0 .551.449 1 1 1h10c.551 0 1-.449 1-1V7c0-.551-.449-1-1-1H4z"
        />
    </svg>
);
