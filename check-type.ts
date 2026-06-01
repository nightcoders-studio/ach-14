import { betterAuth } from "better-auth";
const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
        minPasswordLength: 6
    }
});
