import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

// Query to fetch all products
export const useGetprod = () => {
    return useQuery({
        queryKey: ["GET_PROD_LIST"],
        queryFn: () => {
            return axios.get("http://localhost:3000/api/items/");
        },
    });
};

// Filter products by subtype 'baby care'
export const useGetBabyCareProducts = () => {
    const { data, ...rest } = useGetprod();

    const filteredData = data?.data?.filter((item) => item.sub_item_type === "Baby Care");

    return { data: filteredData, ...rest };
};

// Filter products by subtype 'baby care'
export const useGetWomanCareProducts = () => {
    const { data, ...rest } = useGetprod();

    const filteredData = data?.data?.filter((item) => item.sub_item_type === "Woman Care");

    return { data: filteredData, ...rest };
};
export const useGetMenCareProducts = () => {
    const { data, ...rest } = useGetprod();

    const filteredData = data?.data?.filter((item) => item.sub_item_type === "Men Care");

    return { data: filteredData, ...rest };
};

export const useGetDevicesProducts = () => {
    const { data, ...rest } = useGetprod();

    const filteredData = data?.data?.filter((item) => item.sub_item_type === "Medical Devices");

    return { data: filteredData, ...rest };
};
export const useGetFirstAidProducts = () => {
    const { data, ...rest } = useGetprod();

    const filteredData = data?.data?.filter((item) => item.item_type === "First Aid");

    return { data: filteredData, ...rest };
};


export const useCartprod = () => {
    return useMutation({
        mutationKey: "ADD_TO_CART",
        mutationFn: async ({ itemId, quantity }) => {
            const userId = localStorage.getItem("id"); // Get userId from local storage

            if (!userId) {
                throw new Error("User not logged in");
            }

            return axios.post("http://localhost:3000/api/cart", {
                userId,
                items: [
                    {
                        itemId,
                        quantity,
                    },
                ],
            });
        },
    });
};