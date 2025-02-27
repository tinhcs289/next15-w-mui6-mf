import dynamic from "next/dynamic";

const SignInView = dynamic(() => import("./component-root"));

export default SignInView