import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const MyQuery = (url, key) => {
    const { isLoading, isError, data, error } = useQuery({
        queryKey: [key],
        queryFn: async () => {
            try {
                const res = await axios.get(url)
                return res.data
            }
            catch {
                console.log(error);
            }
        },
    })
    return [data, isLoading, error]
}
export default MyQuery;