import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import * as dotenv from "dotenv";
import {authOptions} from "@/app/authOptions";

dotenv.config();

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};