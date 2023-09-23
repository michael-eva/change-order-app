import { useState, useEffect } from "react";
import supabase from "../config/supabaseClient";
import { getAdminUsers } from "../components/HostComponents/Admin";

// export default function Auth() {
//     const [session, setSession] = useState('')
//     // const isAdmin = getAdminUsers().includes(session?.user.id)
//     console.log("Auth session", session);
//     useEffect(() => {
//         const updateUserLoggedInStatus = (loggedIn) => {
//             localStorage.setItem('userIsLoggedIn', JSON.stringify(loggedIn));
//         };
//         const updateAdminLoggedInStatus = (loggedIn) => {
//             localStorage.setItem('adminIsLoggedIn', JSON.stringify(loggedIn))
//         }

//         supabase.auth.getSession().then(({ data: { session } }) => {
//             setSession(session);
//             if (session) {
//                 // if (isAdmin) {
//                 //     updateAdminLoggedInStatus(true)
//                 // }
//                 updateUserLoggedInStatus(true);
//             } else {
//                 updateUserLoggedInStatus(false);
//                 updateAdminLoggedInStatus(false)
//             }
//         });

//         // // Listen for changes in authentication state
//         supabase.auth.onAuthStateChange((_event, session) => {
//             setSession(session);
//             if (session) {
//                 // if (isAdmin) {
//                 //     updateAdminLoggedInStatus(true)
//                 // }
//                 updateUserLoggedInStatus(true);
//             } else {
//                 updateUserLoggedInStatus(false);
//                 updateAdminLoggedInStatus(false)
//             }
//         });
//         // return () => {
//         //     authListener.unsubscribe();
//         // };
//     }, [])

// }
