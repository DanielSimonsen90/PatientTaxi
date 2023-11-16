import { DOMAIN_NAME } from "SiteConstants";
import { useStateInQuery } from "hooks";
import { LoginContainer, CreateLoginContainer } from "./components";
import { useState } from "react";
import { ErrorForModel, Guid } from "types";
import { LoginPayload, UserModifyPayload } from "models/backend/business/models/payloads";
import { Request } from "utils";
import { useAuth } from "providers/AuthProvider";

export default function Login() {
  const { login } = useAuth();
  const [showCreate, setShowCreate] = useStateInQuery("showCreate", false);
  const [loginErrors, setLoginErrors] = useState<ErrorForModel<LoginPayload>>({});
  const [createErrors, setCreateErrors] = useState<ErrorForModel<UserModifyPayload<false>>>({});

  const onCreateClick = () => setShowCreate(v => !v);
  const onLoginSubmit = async (payload: LoginPayload) => login(payload.username, payload.password);
  const onCreateSubmit = async (payload: UserModifyPayload<false>) => {
    const userCreateResponse = await Request<Guid>('users', {
      method: 'POST',
      body: payload
    });

    if (!userCreateResponse.success) {
      console.error(`Error for POST /users`, userCreateResponse.text, payload);
      return alert(`Der skete en fejl med din oprettelse. - ${userCreateResponse.text}`);
    }

    login(payload.username, payload.password);
  };

  return (
    <main>
      <header>
        <h1>Login</h1>
        <p className="secondary">For at benytte {DOMAIN_NAME}, skal du logge ind.</p>
        <LoginContainer errors={loginErrors} onCreateClick={onCreateClick} onSubmit={onLoginSubmit} />
        {showCreate && <CreateLoginContainer errors={createErrors} onSubmit={onCreateSubmit} />}
      </header>
    </main>
  );
}