// import { useContext, useState } from "react";
// import { Context } from "../../main";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// // import toast from "react-hot-toast";
// import createToast from "../../utils/toast";
// // import { GiHamburgerMenu } from "react-icons/gi";

// const Navbar = () => {
//   const [show, setShow] = useState(false);
//   const { isAuthorized, setIsAuthorized, user } = useContext(Context);
//   const navigateTo = useNavigate();
// const token = localStorage.getItem("token");
//       console.log("Retrieved token: logout", token);
//   const handleLogout = async () => {
//     const token = localStorage.getItem("token");
//       console.log("Retrieved token: logout", token);
//    try {
//     const response = await axios.get(
//       "https://backend-food-amber.vercel.app/v1/user/logout", {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//         withCredentials: true, // Ensure cookies are included
//       }
//     );
//       createToast(response.data.message, "success");
//      setIsAuthorized(false);
//     // user.clsar();
//               await new Promise((resolve) => {
//             localStorage.clear();
//             resolve();
//         });
//       setIsAuthorized(false);
//       localStorage.clear();
//       navigateTo("/login");
//     } catch (error) {
//       createToast(error.response.data.message, "error"), setIsAuthorized(false);
//           await new Promise((resolve) => {
//             localStorage.clear();
//             resolve();
//         });
//     }
//   };

//   return (
//     <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
//       <div className="container">
//         <div className="logo">
//         <img src="./images/logo.jpg" alt="logo" />
//         </div>
//         <ul className="shows menus">
//           <li>
//             <Link to={"/"} onClick={() => setShow(false)}>
//               HOME
//             </Link>
//           </li>
//           <li>
//             <Link to={"/about"} onClick={() => setShow(false)}>
//               About
//             </Link>
//           </li>
//           {/* <li>
//             <Link to={"/profile"} onClick={() => setShow(false)}>
//               profile
//             </Link>
//           </li> */}
//           {user && user.role === "agent" ? (
//             <>
//               <li>
//                 <Link to={"/agent/dashboard"} onClick={() => setShow(false)}>
//                   Dashboard
//                 </Link>
//               </li>
//             </>
//           ) : (
//             <></>
//           )}
//           {user && user.role === "doner" ? (
//             <>
//               <li>
//                 <Link to={"/donor/dashboard"} onClick={() => setShow(false)}>
//                   Dashboard
//                 </Link>
//               </li>
//             </>
//           ) : (
//             <></>
//           )}
//           {user && user.role === "admin" ? (
//             <>
//               <li>
//                 <Link to={"/admin/dashboard"} onClick={() => setShow(false)}>
//                   Dashboard
//                 </Link>
//               </li>
//             </>
//           ) : (
//             <></>
//           )}

//           <button onClick={handleLogout}>LOGOUT</button>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import { useContext, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import toast from "react-hot-toast";
import createToast from "../../utils/toast";
// import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
const token = localStorage.getItem("token");
      console.log("Retrieved token: logout", token);
  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "https://backend-food-amber.vercel.app/api/v1/user/logout",
        {
                  headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
          withCredentials: true,
        }
      );
      createToast(response.data.message, "success");
      setIsAuthorized(false);
      navigateTo("/login");
      await new Promise((resolve) => {
                    localStorage.clear();
                    resolve();
                });
    } catch (error) {
      createToast(error.response.data.message, "error"), setIsAuthorized(false);
      await new Promise((resolve) => {
        localStorage.clear();
        resolve();
    });
    }
  };

  return (
    <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
      <div className="container">
        <div className="logo">
        <img src="./images/logo.jpg" alt="logo" />
        </div>
        <ul className="shows menus">
          <li>
            <Link to={"/"} onClick={() => setShow(false)}>
              HOME
            </Link>
          </li>
          <li>
            <Link to={"/about"} onClick={() => setShow(false)}>
              About
            </Link>
          </li>
          {/* <li>
            <Link to={"/profile"} onClick={() => setShow(false)}>
              profile
            </Link>
          </li> */}
          {user && user.role === "agent" ? (
            <>
              <li>
                <Link to={"/agent/dashboard"} onClick={() => setShow(false)}>
                  Dashboard
                </Link>
              </li>
            </>
          ) : (
            <></>
          )}
          {user && user.role === "doner" ? (
            <>
              <li>
                <Link to={"/donor/dashboard"} onClick={() => setShow(false)}>
                  Dashboard
                </Link>
              </li>
            </>
          ) : (
            <></>
          )}
          {user && user.role === "admin" ? (
            <>
              <li>
                <Link to={"/admin/dashboard"} onClick={() => setShow(false)}>
                  Dashboard
                </Link>
              </li>
            </>
          ) : (
            <></>
          )}

          <button onClick={handleLogout}>LOGOUT</button>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
