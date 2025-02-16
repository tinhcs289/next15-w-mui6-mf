import dynamic from "next/dynamic";

const NotFoundView = dynamic(() => import("./component-root"));

export default NotFoundView