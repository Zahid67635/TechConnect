import { useQuery } from '@tanstack/react-query'

const MyQuery = (key, endpoint) => {
    const { isLoading, isError, data, error } = useQuery({
        queryKey: [key],
        queryFn: async () => {
            try {
                const res = await fetch(`https://64e45121c55563802913014d.mockapi.io/user/v1/${endpoint}`)
                return res.json()
            }
            catch {
                console.log(error);
            }
        },
    })
    return [data, isLoading, error]
}
export default MyQuery;