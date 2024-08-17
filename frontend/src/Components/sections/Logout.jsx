import useLogout from "../../Hooks/useLogout"

const LogoutButton = (disabled, onClick ) => {
    const {logout, isLoading, error} = useLogout()
    const handleLogout = () => {
        
    }
    return (
        <button className="h-12 p-2 font-Poppins border-2 w-full text-xl" onClick={logout}>
            {isLoading? 'Logging out' : 'Logout'}
        </button>
    )

}

export default LogoutButton