import { redirect, usePathname, useRouter } from "next/navigation";

interface WithAuthProps {
  redirectOnFail?: string; // Optional redirect path on failed authentication
}

const withAuth =
  <T extends React.ComponentType>(Component: T, props?: WithAuthProps) =>
  (props: any) => {
    const router = useRouter();
    const pathname = usePathname();
    const token = localStorage.getItem("token");

    if (!token) {
      const redirectTo = props.redirectOnFail || "/login"; // Use default or provided redirect path
      redirect(redirectTo);
      return null; // Prevent rendering while redirecting
    }

    if (props?.clientSideNavigation && !token) {
      // Handle logout redirection on client side (optional)
      router.push("/"); // Redirect to home page on logout
    }

    return <Component {...props} />; // Pass through all props to the wrapped component
  };

export default withAuth;
