

const Card = ({title , value, className, onClick, color}) => {
    return (
        <div className={`shadow-md rounded-lg overflow-hidden lg:w-1/4 h-auto p-4 bg-[${color}]`}>
            <h1 className="lg:text-2xl font-Poppins">{title}</h1>
            <p className={`font-Poppins ${className}`}>{value}</p>
        </div>
    )
}

export default Card;