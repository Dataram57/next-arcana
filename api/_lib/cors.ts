export function applyCors(req : any, res : any) : boolean {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Handle preflight request
    if (req.method === "OPTIONS") {
        res.status(200).end();
        return true; // tells handler to stop
    }

    return false;
}


export function getClientIp(req: any): string {
    const xfwd = req.headers["x-forwarded-for"];

    let ip =
        typeof xfwd === "string"
        ? xfwd.split(",")[0].trim()
        : Array.isArray(xfwd)
            ? xfwd[0]
            : req.socket.remoteAddress ?? "unknown";

    // normalize IPv6-mapped IPv4 (optional cleanup)
    if (ip.startsWith("::ffff:")) {
        ip = ip.slice(7);
    }

    return ip;
}