import { CheckBox } from "./input-checkbox";
import { Text } from "./input-text";

export function SignUp() {
  return (
    <div className="dataCol">
      <form className="containerWhite">
        <h1>O gerenciador definitivo para sua campanha de RPG!</h1>
        <p>
          Tenha acesso a tudo que o Atlas do multiverso tem a oferecer, basta
          criar sua conta.
        </p>
        <Text
          type="text"
          placeholder="Como devemos te chamar?"
          id="login"
          minLength={5}
          maxLength={100}
        />
        <Text
          type="text"
          placeholder="Qual seu e-mail?"
          id="email"
          minLength={5}
          maxLength={100}
        />
        <Text
          type="password"
          placeholder="Insira uma senha"
          id="password"
          minLength={5}
          maxLength={100}
        />
        <Text
          type="password"
          placeholder="Repita sua senha, tem que ser igualzinha!"
          id="repeatPassword"
          minLength={5}
          maxLength={100}
        />
        <CheckBox id="mailing" label="Quero receber novidades por email" />
        <CheckBox
          id="notification"
          label="Quero receber notificações por email"
        />
        <div className="rowContent">
          <button className="buttonCancel">Cancelar</button>
          <button type="submit">Cadastrar</button>
        </div>
      </form>
    </div>
  );
}
