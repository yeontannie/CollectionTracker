export default function Logout(){
    async function handleLogout(){
        localStorage.clear()
        window.location.href = "/login"
    }

    handleLogout()
}