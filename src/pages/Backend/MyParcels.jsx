import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const MyParcels = () => {
        const { user } = useAuth();
        const axiosSecure = useAxiosSecure();
    console.log(user.email);
    
    const {data: parcels=[]} = useQuery({
        queryKey: ['my-parcels', user.email],
        queryFn: async() =>{
            const res = await axiosSecure.get(`api/parcels?email=${user.email}`);
            return res.data
        }
    })
    console.log(parcels);
    
    return (
        <div>
            <h1>my Parcels: {parcels.length}</h1>
        </div>
    );
};

export default MyParcels;