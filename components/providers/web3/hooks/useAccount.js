import { useEffect } from "react"
import useSWR from "swr"

const adminAddress = {
    "0x49cA365BD02D83c7a4d43AE99C110a11f99Ce182": true
}

export const handler =  web3 => () => {

    const { data, mutate, ...rest } = useSWR(() => 
        web3 ? "web3/accounts" : null,
        async () => {
            const accounts = await web3.eth.getAccounts()
            return accounts[0]
        }
    )

    useEffect(() => {
        window.ethereum && 
        window.ethereum.on("accountsChanged", accounts => mutate(accounts[0] ?? null))
    }, [])

    return {
        account: {
            data, 
            isAdmin: (data && adminAddress[data]) ?? false,
            mutate,
            ...rest
        }
    }
}