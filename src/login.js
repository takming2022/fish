import './loginsing.css';
import { useNavigate } from 'react-router';
const Login = ({setDemofishtorf}) => {
    setDemofishtorf(true)
    const history = useNavigate()
    async function login() {
        history("/guess")
        if (typeof window.ethereum !== 'undefined') {
            console.log("有安裝小狐狸");
        }
        else {
            console.log("請安裝小狐狸")

        }
        async function getAccount() {
            const ethereum = window.ethereum
            console.log(ethereum);
            var accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            var wallet_address = accounts[0];
            document.getElementById('wallet').value = wallet_address;
            
        }
        getAccount()
    }
    return (
        <div className='singC'>
            <div className='outC'>
                <p>登入錢包</p>
                <p></p>
                <button onClick={login} className="bottm">登入</button>
                
            </div>
        </div>
    )
}
export default Login;