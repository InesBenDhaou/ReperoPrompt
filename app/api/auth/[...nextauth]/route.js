import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {  
    async session({ session }) { // session created with a user object and we add an id to know exactly which user is connected
      try {
        await connectToDB();
        const sessionUser = await User.findOne({ email: session.user.email });

        if (sessionUser) {
          session.user.id = sessionUser._id.toString();
        }

        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        return session;
      }
    },

    async signIn({ profile }) { // profile provided by the provider contains user informations
      try {
        await connectToDB();
        const userExists = await User.findOne({ email: profile.email });

        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(/\s/g, "").toLowerCase(),
            image: profile.picture,
          });
        } else {
          console.log("User already exists:", profile.email);
        }

        return true;
      } catch (error) {
        console.error("Error during sign-in:", error);
        return false; // Returning false will cause "Access Denied"
      }
    },
  },
});

export { handler as GET, handler as POST };

/* By exporting handler as both GET and POST, we ensure that:
   ** GET requests fetch session info.
   ** POST requests handle sign-in, sign-out, and callbacks.
*/