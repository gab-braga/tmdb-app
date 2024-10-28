export default ({ className }) => {
    const classStyle = `fill-current stroke-current ${className || "text-white"}`;
    return (
        <svg className={classStyle} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 9L12 15L6 9" strokeWidth="2" fill="none" />
        </svg>
    );
}