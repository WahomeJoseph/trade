/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { FaTrashCan } from "react-icons/fa6";
import { FiEdit3 } from "react-icons/fi";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import {useDeleteUserMutation, useGetUsersQuery, useUpdateUserMutation} from '../../redux/api/UsersApi.js'
export const UsersPage = () => {
    const { data: users, refetch, isLoading, error } = useGetUsersQuery();

    const [deleteUser] = useDeleteUserMutation();
    const [updateUser] = useUpdateUserMutation();

    const [editUserId, setEditUserId] = useState(null);
    const [editUserName, setEditUserName] = useState('');
    const [editUserEmail, setEditUserEmail] = useState('');

    useEffect(() => {
        refetch();
    }, [refetch])

    return (
        <div></div>
    )
}