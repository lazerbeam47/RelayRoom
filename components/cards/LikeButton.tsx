'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import Image from "next/image";
import { hasUserLikedThread, likeThread, unlikeThread, updateLikeCount } from '@/lib/actions/thread.actions';



const LikeButton = (params: {
    threadId: string,
    userId: string
}) => { 
    const [isLiked, setIsLiked]= useState(false);
    const [likedCount, setLikedCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {likeCount, isLikedByUser} = await hasUserLikedThread(params.userId, params.threadId);
                setIsLiked(isLikedByUser);
                setLikedCount(likeCount);
            } catch (error) {
            console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array to execute only once on component mount

    const handleClick = async () => {
        if (isLiked) {
            await updateLikeCount(params.threadId, -1);
            await unlikeThread(params.userId, params.threadId);
            setLikedCount(likedCount-1);
        }
        else {
            await updateLikeCount(params.threadId, 1);
            await likeThread(params.userId, params.threadId);
            setLikedCount(likedCount+1);
        }
        setIsLiked(!isLiked);
    };

    return (
    <Button onClick={() => handleClick()}>
        <Image
            src={
                isLiked ?
                '/assets/heart-filled.svg' :
                '/assets/heart-gray.svg'
            }
            alt='heart'
            width={24}
            height={24}
            className='cursor-pointer object-contain'
        /> 
        {likedCount}
    </Button>

  )
}

export default LikeButton