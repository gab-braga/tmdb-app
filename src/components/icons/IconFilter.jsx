export default ({ className }) => {
    const classStyle = `fill-current stroke-current ${className || "text-white"}`;
    return (
        <svg className={classStyle} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12L5 4" strokeWidth="2" strokeLinecap="round" />
            <path d="M19 20L19 18" strokeWidth="2" strokeLinecap="round" />
            <path d="M5 20L5 16" strokeWidth="2" strokeLinecap="round" />
            <path d="M19 12L19 4" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 7L12 4" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 20L12 12" strokeWidth="2" strokeLinecap="round" />
            <circle cx="5" cy="14" r="2" strokeWidth="2" strokeLinecap="round" fill="none" />
            <circle cx="12" cy="9" r="2" strokeWidth="2" strokeLinecap="round" fill="none" />
            <circle cx="19" cy="15" r="2" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
    );
}