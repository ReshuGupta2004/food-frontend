import   { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
 
import createToast from "../../utils/toast";
import { Context } from "../../main";
import "./Register.css"


const Login = () => {
    const { isAuthorized, setIsAuthorized } = useContext(Context);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            role: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address").required("Required"),
            password: Yup.string().required("Required"),
            role: Yup.string().required("Required"),
        }),
 
        
       onSubmit: async (values) => {
    try {
        const response = await fetch("https://ngo-l8vg.vercel.app/v1/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
            credentials: "include",
        });

        if (!response.ok) {
            // Read the response as text (not JSON) since it's an HTML error page
            const errorText = await response.text();
            throw new Error(`Server Error: ${errorText}`);
        }

        const data = await response.json();
        formik.resetForm();
        setIsAuthorized(true);
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('token', data.token);
        createToast("Login Successfully", "success");

    } catch (error) {
        console.error(error);
        createToast(error.message, "error");
    }
}


        
        
    });

    if (isAuthorized) {
        return <Navigate to={"/"} />;
    }

    return (
        <> 
        <div className="containerrr">
            <div className="row">
                <div className="col-md-6">
                    <div className="login-image">
                        <img src="./images/login.png" alt="login" />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="login-form">
                        <h2>Login</h2>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="email"><MdOutlineMailOutline /> Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                />
                                {formik.touched.email && formik.errors.email ? (
                                    <div className="error">{formik.errors.email}</div>
                                ) : null}
                            </div>
                            <div className="form-group">
                                <label htmlFor="password"><RiLock2Fill /> Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                />
                                {formik.touched.password && formik.errors.password ? (
                                    <div className="error">{formik.errors.password}</div>
                                ) : null}
                            </div>
                            <div className="form-group">
                                <label htmlFor="role"><FaRegUser /> Role</label>
                                <select
                                    id="role"
                                    name="role"
                                    onChange={formik.handleChange}
                                    value={formik.values.role}
                                >
                                    <option value="">Select Role</option>
                                    <option value="doner">Donor</option>
                                    <option value="agent">Agent</option>
                                    <option value="admin">Admin</option>
                                </select>
                                {formik.touched.role && formik.errors.role ? (
                                    <div className="error">{formik.errors.role}</div>
                                ) : null}
                            </div>
                            <button type="submit" className="btn">Login</button>
                        </form>
                        <p> Don't have an account? <Link to="/register">Register</Link></p>
                    </div>
                </div>
            </div>
        </div>

        </>
    );
};

export default Login;
