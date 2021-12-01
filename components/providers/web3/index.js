const { createContext, useContext, useEffect, useState, useMemo } = require("react");

import detectEthereumProvider from "@metamask/detect-provider";
import { loadContract } from "utils/loadContract";

import Web3 from "web3";
import { setupHooks } from "./hooks/setupHooks";

const Web3Context = createContext(null)

export default function Web3Provider({children}) {

    const [web3Api, setWeb3Api] = useState({
        provider: null,
        web3: null,
        contract: null,
        isLoading: true,
        hooks: setupHooks()
    })

    useEffect(() => {
        const loadProvider = async () => {
            const provider = await detectEthereumProvider()
            if(provider) {
                const web3 = new Web3(provider)
                const contract = await loadContract("LandRegistration", web3)
                setWeb3Api({
                    provider,
                    web3,
                    contract,
                    isLoading: false,
                    hooks: setupHooks(web3, provider)
                })
            } else {
                setWeb3Api(api => ({...api, isLoading: false}))
                console.error("Please install MetaMask.")
            }
        }
        loadProvider()
    }, [])

    const _web3Api = useMemo(() => {
        const { web3, provider } = web3Api
        return {
            ...web3Api,
            isWeb3Loaded: web3 != null,
            getHooks: () => setupHooks(web3, provider),
            connect: provider ? 
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

export function useWeb3() {
    return useContext(Web3Context)
}

export function useHooks(callback) {
    const { getHooks } = useWeb3()
    return callback(getHooks())
}
