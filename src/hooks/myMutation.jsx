import { useMutation } from '@tanstack/react-query'

const MyMutation = (endpoint) => {
    const mutation = useMutation({
        mutationFn: async (data) => {
            try {
                const res = await axios.post(`https://64e45121c55563802913014d.mockapi.io/user/v1/${endpoint}`, data)
                return res.data
            }
            catch {
                console.log(error);
            }
        },
    })
    return [data, isLoading, error]
}
export default MyMutation;