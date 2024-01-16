import { createViewerToken } from "@/actions/token-action";
import { useEffect, useState } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { toast } from "sonner";

export const useViewerToken = (hostIdentity: string) => {
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [identity, setIdentity] = useState("");

  useEffect(() => {
    const createToken = async () => {
      try {
        const token = await createViewerToken(hostIdentity);
        if (token) {
          setToken(token);
        }
        const decodedToken = jwtDecode(token) as JwtPayload & { name?: string };
        const { name, jti: identity } = decodedToken;
        if (name) {
          setName(name);
        }

        if (identity) {
          setIdentity(identity);
        }
      } catch {
        toast.error("Something went wrong!!");
      }
    };

    createToken();
  }, [hostIdentity]);

  return {
    token,
    name,
    identity,
  };
};
