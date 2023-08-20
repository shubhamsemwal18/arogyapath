import { NextResponse } from "next/server";

export default function middleware(request){
    const url = request.nextUrl.clone()

    const token = request ? request.cookies?.Arogya_Path_token : null;
    const userRole = request ? request.cookies?.Arogya_Path_Role : null;

    const { pathname } = request.nextUrl;
    if(pathname.includes("/login")){

        if(token && userRole){        
            if(userRole === process.env.NEXT_PUBLIC_ADMIN){
            url.pathname = '/Dashboard'
            return NextResponse.redirect(url);
            }

            if(userRole === process.env.NEXT_PUBLIC_RECEPTION){
                url.pathname = '/PatientManagement'
                return NextResponse.redirect(url);
            }

            if(userRole === process.env.NEXT_PUBLIC_PRECONSULTATION){
                url.pathname = '/Pre-Consultation'
                return NextResponse.redirect(url);
            }

            if(userRole === process.env.NEXT_PUBLIC_CONSULTATION){
                url.pathname = '/Consultation'
                return NextResponse.redirect(url);
            }

            if(userRole === process.env.NEXT_PUBLIC_DISPENSARY){
                url.pathname = '/Dispensary'
                return NextResponse.redirect(url);
            }

            if(userRole === process.env.NEXT_PUBLIC_ACCOUNTS){
                url.pathname = '/Accounts'
                return NextResponse.redirect(url);
            }

            if(userRole === process.env.NEXT_PUBLIC_HELPDESK){
                url.pathname = '/Helpdesk'
                return NextResponse.redirect(url);
            }

            if(userRole === process.env.NEXT_PUBLIC_PATIENT){
                url.pathname = '/PatientDashboard'
                return NextResponse.redirect(url);
            }

        }
        else{
            return NextResponse.next();
        }
    }
    
    if(pathname.startsWith("/Dashboard") || pathname.startsWith("/Configuration") || pathname.startsWith("/Reports")){
        
        if(token && userRole === process.env.NEXT_PUBLIC_ADMIN){
            return NextResponse.next();
        }
        else{   
            url.pathname = '/login'
            return NextResponse.redirect(url);
        }
    }

    if(pathname.startsWith("/Inventory")){
        
        if(token && (userRole === process.env.NEXT_PUBLIC_ADMIN || userRole === process.env.NEXT_PUBLIC_DISPENSARY)){
            return NextResponse.next();
        }
        else{   
            url.pathname = '/login'
            return NextResponse.redirect(url);
        }
    }

    if(pathname.startsWith("/PatientManagement")){
        
        if(token && userRole === process.env.NEXT_PUBLIC_RECEPTION ){
            return NextResponse.next();
        }
        else{   
            url.pathname = '/login'
            return NextResponse.redirect(url);
        }
    }

    if(pathname.startsWith("/Pre-Consultation")){
        
        if(token && userRole === process.env.NEXT_PUBLIC_PRECONSULTATION ){
            return NextResponse.next();
        }
        else{   
            url.pathname = '/login'
            return NextResponse.redirect(url);
        }
    }

    if(pathname.startsWith("/Consultation")){
        
        if(token && userRole === process.env.NEXT_PUBLIC_CONSULTATION ){
            return NextResponse.next();
        }
        else{   
            url.pathname = '/login'
            return NextResponse.redirect(url);
        }
    }

    if(pathname.startsWith("/Dispensary")){
        
        if(token && userRole === process.env.NEXT_PUBLIC_DISPENSARY ){
            return NextResponse.next();
        }
        else{   
            url.pathname = '/login'
            return NextResponse.redirect(url);
        }
    }

    if(pathname.startsWith("/Helpdesk")){
        
        if(token && userRole === process.env.NEXT_PUBLIC_HELPDESK ){
            return NextResponse.next();
        }
        else{   
            url.pathname = '/login'
            return NextResponse.redirect(url);
        }
    }

    if(pathname.startsWith("/Accounts")){
        
        if(token && userRole === process.env.NEXT_PUBLIC_ACCOUNTS ){
            return NextResponse.next();
        }
        else{   
            url.pathname = '/login'
            return NextResponse.redirect(url);
        }
    }

}