import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const withAuth = (WrappedComponent: React.FC, requiredTypes?:string[]) => {
    return () => {
        const { token, userType, loading } = useAuth();
        const router = useRouter();
        const [isReady, setIsReady] = useState(false);

        useEffect(() => {
            if (loading) return;
            
            if (!token) {
                router.push("/pages/login");
                return;
              }
        
            if (userType === null) return;

            console.log('Token:', token);
            console.log('UserType:', userType);
      
            if (!token || (requiredTypes && !requiredTypes.includes(userType))) {
              router.push("/pages/login"); 
            }
            else {
                setIsReady(true);
            }
        }, [token, userType, loading, requiredTypes, router]);

        if (loading || !isReady) {
            return null; // O devolver un loader
          }

        return token && (!requiredTypes || (userType && requiredTypes.includes(userType))) ? (
            <WrappedComponent />
        ) : null;
    };
};

export default withAuth;