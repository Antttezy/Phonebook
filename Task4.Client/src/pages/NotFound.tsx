import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <>
            <h1>Page not found</h1>
            <Link to='/'>Return to home page</Link>
        </>
    )
}