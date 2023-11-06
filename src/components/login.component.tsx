
const Login = () => {

    return (
        <div className='dataColWhite'>
            <h1>O gerenciador definitivo para sua campanha!</h1>
            <p>Tenha acesso a tudo que o Atlas tem à oferecer, basta criar sua conta</p>  
            <input type="text" placeholder="Como devemos te chamar?" className="inputText"/>
            <input type="text" placeholder="Qual seu e-mail?" className="inputText"/>
            <input type="password" placeholder="Escolha uma senha poderosa!" className="inputText"/>
            <input type="password" placeholder="Repita sua senha, mas tem que ser igualzinha" className="inputText"/>
            <div className="checkbox-wrapper-44">
                <label className="toggleButton">
                    <input type="checkbox" id="mailing" defaultChecked/>
                        <div>
                        <svg viewBox="0 0 44 44">
                            <path d="M14,24 L21,31 L39.7428882,11.5937758 C35.2809627,6.53125861 30.0333333,4 24,4 C12.95,4 4,12.95 4,24 C4,35.05 12.95,44 24,44 C35.05,44 44,35.05 44,24 C44,19.3 42.5809627,15.1645919 39.7428882,11.5937758" transform="translate(-2.000000, -2.000000)"></path>
                        </svg>
                    </div>                    
                    Desejo receber novidades por e-mail
                </label>
            </div>
            <div className="checkbox-wrapper-44">
                <label className="toggleButton">
                    <input type="checkbox" id="notification" defaultChecked/>
                        <div>
                        <svg viewBox="0 0 44 44">
                            <path d="M14,24 L21,31 L39.7428882,11.5937758 C35.2809627,6.53125861 30.0333333,4 24,4 C12.95,4 4,12.95 4,24 C4,35.05 12.95,44 24,44 C35.05,44 44,35.05 44,24 C44,19.3 42.5809627,15.1645919 39.7428882,11.5937758" transform="translate(-2.000000, -2.000000)"></path>
                        </svg>
                    </div>
                    Desejo receber notificações via email.
                </label>
            </div>
            <button >Cancelar</button>   
            <button type="submit">Cadastrar</button>
    </div>
    )
}

export default Login; 