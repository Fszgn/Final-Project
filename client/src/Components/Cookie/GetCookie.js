import Cookie from "js-cookie";

 const GetCookie = (cookieName) => {
    return console.log(Cookie.get("CookieName"));
}

export default GetCookie;