import dynamic from "next/dynamic";

const SignUpView = dynamic(() => import("./component-root"));

export default SignUpView