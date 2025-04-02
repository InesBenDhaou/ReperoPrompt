/* Le Provider dans RootLayout.js permet de partager l’état de connexion dans toute l’application en utilisant 
SessionProvider de NextAuth. Tous les composants enfants peuvent ensuite utiliser useSession() pour récupérer 
les informations d’authentification de l’utilisateu */

"use client"
import {SessionProvider, sessionProvider} from "next-auth/react"

const Provider = ({children , session}) => {
    return (
        <SessionProvider session={session}>
           {children}
        </SessionProvider>
    )
}

export default Provider ; 