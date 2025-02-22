import { useQuery } from "@tanstack/react-query"
import axios from "axios"


export const useGetUser = () => {
    return useQuery({
        queryKey: ["GET_USER_LIST"],
        queryFn: () => {
            return axios.get("http://localhost:3000/api/creds/getuser", {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
            },)
        }
    })
}