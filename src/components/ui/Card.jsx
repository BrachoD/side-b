function Card({ children, className = "" }) {
    return (
        <div
            className={`bg-surface rounded-xl border border-white/5 p-4 ${className}`}
        >
            {children}
        </div>
    );
}

export default Card;