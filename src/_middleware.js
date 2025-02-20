import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req) {
    const loginPath = new URL("/login", req.url);

    
    const token = req.cookies.get("token")?.value;
    const sec_key = "bff27443af517d8290c050ded4fa34b562fb54bf52f17ede6e11f52db662a502";

    
    if (!token) {
        if (req.nextUrl.pathname === "/login") {
            return NextResponse.next(); 
        }
        return NextResponse.redirect(loginPath);
    }

    try {
        
        jwt.verify(token, sec_key);

       
        if (req.nextUrl.pathname === "/login") {
            return NextResponse.redirect(new URL("/welcome", req.url));
        }

        return NextResponse.next(); 
    } catch (error) {
        return NextResponse.redirect(loginPath);
    }
}
