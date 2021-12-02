import detectEthereumProvider from "@metamask/detect-provider";
import { loadContract } from "utils/loadContract";
import Web3 from "web3";
import { setupHooks } from "./hooks/setupHooks";

// React Hooks
const { createContext, useContext, useEffect, useState, useMemo } = require("react");

// Web3Context constant
const Web3Context = createContext(null)

/**
 * 
 * @param   {Component} children children components 
 * @returns provider    Returns Web3 Provider to interact with blockchain
 */
export default function Web3Provider({children}) {

    // Sets Web3 API properties to null by default
    const [web3Api, setWeb3Api] = useState({
        provider: null,
        web3: null,
        contract: null,
        isLoading: true,
        hooks: setupHooks()
    })

    // Asynchronously load Web3 provider
    useEffect(() => {
        const loadProvider = async () => {
            
            // Web3 provider constant
            const provider = await detectEthereumProvider()

            // If Web3 provider!=null
            if(provider) {

                // Instatiate Web3 constant
                const web3 = new Web3(provider)

                // Instantiate smart contract using loadContract utility function
                const contract = await loadContract("LandRegistration", web3)

                // Setup Web3 API
                setWeb3Api({
                    provider,
                    web3,
                    contract,
                    isLoading: false,
                    hooks: setupHooks(web3, provider)
                })
            
            // If Web3 provider==null
            } else {
                setWeb3Api(api => ({...api, isLoading: false}))
                console.error("Please install MetaMask.")
            }
        }

        // Function call
        loadProvider()
    }, [])

    // Asynchronously load MetaMask wallet provider
    const _web3Api = useMemo(() => {

        // Instantiate Web3 API constant
        const { web3, provider } = web3Api
        return {
            ...web3Api,
            isWeb3Loaded: web3 != null,
            getHooks: () => setupHooks(web3, provider),
            connect: provider ? 
            
            // Asynchronously request for MetaMask accounts
            async () => { 
                try {
                    await provider.request({method: "eth_requestAccounts"})
                } catch {
                    location.reload()
                }
            } :
            () => console.log("Cannot connect to Metamask, please realod browser")
        }
    }, [web3Api])

    return (
        <Web3Context.Provider value={_web3Api}>
            {children}
        </Web3Context.Provider>
    )
}

/**
 * 
 * @returns object  Returns Web3 Context
 */
export function useWeb3() {
    return useContext(Web3Context)
}

/**
 * A custom hook abstraction.
 * 
 * @param   {object}    callback A callback function 
 * @returns object      Returns an abstraction of the hook function
 */
export function useHooks(callback) {
    const { getHooks } = useWeb3()
    return callback(getHooks())
}
