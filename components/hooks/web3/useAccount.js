import { useHooks } from "@components/providers/web3"

/**
 * useAccount hook.
 * 
 * @returns     hook    useAccount Hook
 */
export const useAccount = () => {
    return useHooks(hooks => hooks.useAccount)()
}