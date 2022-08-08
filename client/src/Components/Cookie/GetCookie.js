import Cookie from "js-cookie";

 const GetCookie = (cookieName) => {
    return (Cookie.get("CookieName"));
}

export default GetCookie;