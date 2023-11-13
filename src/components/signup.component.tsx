import { CheckBox } from "./input.checkbox";

export function SignUp() {
  return (
    <div className="dataCol">
      <div className="containerWhite">
        <h1>O gerenciador definitivo para sua campanha de RPG!</h1>
        <p>
          Tenha acesso a tudo que o Atlas tem a oferecer, basta criar sua conta
        </p>
        <input
          type="text"
          placeholder="Como devemos te chamar?"
          className="inputText"
          id="login"
        />
        <input
          type="text"
          placeholder="Qual seu e-mail?"
          className="inputText"
          id="email"
        />
        <input
          type="password"
          placeholder="Escolha uma senha poderosa!"
          className="inputText"
          id="password"
        />
        <input
          type="password"
          placeholder="Repita sua senha, tem que ser igualzinha!"
          className="inputText"
          id="repeatPassword"
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
      </div>
    </div>
  );
}
