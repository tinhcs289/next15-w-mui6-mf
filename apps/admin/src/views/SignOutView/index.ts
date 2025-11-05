import dynamic from "next/dynamic";

const SignOutView = dynamic(() => import("./component-root"));

export default SignOutView