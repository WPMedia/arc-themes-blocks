const isServerSide = () => typeof window === "undefined";

export default isServerSide;
