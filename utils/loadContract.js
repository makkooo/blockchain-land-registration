/**
 * Loads the smart contract.
 * 
 * @param   {object}    name Smart contract name
 * @param   {object}    web3 Web3 instance
 * @returns object      Returns loaded smart contract
 */
export const loadContract = async (name, web3) => {

    // Asyncronously fetch smart contract ABI from public/contracts
    const res = await fetch(`/contracts/${name}.json`)

    // Asyncronously parse response as JSON
    const Artifact = await res.json()

    // Instatiate smart contract to null
    let contract = null

    try {
        /**
         * Instatiate contract using Web3 and 
         * pass contract ABI and network address
         * to web3.eth.Contract function
         */
        contract = new web3.eth.Contract(
            Artifact.abi,
            Artifact.networks[5777].address
        )
    } catch {
        console.log(`Contract ${name} cannot be loaded`)
    }

    return contract
}