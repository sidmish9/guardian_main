import logo from './logo.svg';
import './App.css';
import {ethers} from 'ethers';
import './App.css';
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json';
import {useState} from 'react';


const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// FOR METAMASK
function App() {
  // store greeting in local state
  const [greeting, setGreetingValue] = useState()

  // request access to the user's MetaMask account
  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  // call the smart contract, For doctors
  async function fetchGreeting() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider)
      try {
        const data = await contract.greet()
        console.log('data: ', data)
      } catch (err) {
        console.log("Error: ", err)
      }
    }    
  }

  // call the smart contract, send an update
  async function setGreeting() {
    if (!greeting) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer)
      const transaction = await contract.setGreeting(greeting)
      await transaction.wait()
      fetchGreeting()
    }
  }


// END METAMASK

   
    return (
      <div className="App">
        <header className="App-header">
        <input onChange={e => setGreetingValue(e.target.value)} placeholder="N95 EFFICACY IS 100%  " />
           <button onClick={fetchGreeting}>RANK 1</button>
           <button onClick={setGreeting}>SIGN YES</button>
           <button onClick={setGreeting}>SIGN NO</button>
          
          
           

        </header>
      </div>

    );

   

}
 export default App;