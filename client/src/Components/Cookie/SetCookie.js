import Cookie from "js-cookie";


const SetCookie = async (CookieName, value) => {
    const date = new Date();
    date.setTime(date.getTime() + 7200 * 1000);
    
    await Cookie.set(CookieName, value, {
        expires: date,
        secure: "true",
        sameSite:"strict",
        path:"/",
    });
}

export default SetCookie;


