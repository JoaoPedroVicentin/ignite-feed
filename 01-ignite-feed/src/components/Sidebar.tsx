import styles from "./Sidebar.module.css"
import { PencilLine } from "phosphor-react"
import { Avatar } from "./Avatar"

export function Sidebar() {
    return (
        <aside className={styles.sidebar}>
            <img 
            className={styles.cover} 
            src="https://img.freepik.com/free-photo/close-up-image-programer-working-his-desk-office_1098-18707.jpg?t=st=1657845300~exp=1657845900~hmac=33ad2faced0e20f082c1734e803c5d717f5422fc519205afa850387996ecfd50&w=500" 
            />
            
            <div className={styles.profile}>
                <Avatar src="https://github.com/JoaoPedroVicentin.png" />

                <strong>João Pedro Vicentin</strong>
                <span>FrontEnd Developer</span>
            </div>

            <footer>
                <a href="#">
                    <PencilLine size={20}/>
                    Editar seu perfil
                </a>
            </footer>
        </aside>
    )
}