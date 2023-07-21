import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function main() {
    try {
        await prisma.$connect();
    } catch (error) {
        return Error("Database Connection Unsuccessfull");
    }
}

export const GET = async (req:Request, res:NextRequest) => {
    try {
        await main();
        const posts = await prisma.post.findMany();
        return NextResponse.json({ message: "Success", posts }, { status : 200});
    } catch (error) {
        return NextResponse.json({ message: "Error", error }, { status : 500 })
    } finally {
        await prisma.$disconnect();
    }
};

export const POST = async (req:Request, res:NextRequest) => {
    
    try {
       const { title, description } = await req.json();
       await main();

       const post = await prisma.post.create({ data : {description, title }})
    
       return NextResponse.json({ messsage : "Success", post }, { status : 201 });
   } catch (error) {
       return NextResponse.json({ message : "Error", error }, { status : 500 });
   } finally {
        await prisma.$disconnect();
   }
};
