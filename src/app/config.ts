export const apiURL : string = 
    (typeof(window) != "undefined" && window.location.hostname == "localhost")
        ? "http://localhost:3000/api"
        : "https://next-arcana.vercel.app/api";