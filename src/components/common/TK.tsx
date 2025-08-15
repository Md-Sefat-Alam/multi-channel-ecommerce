import React from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

type Props = { value: number };

export default function TK({ value }: Props) {
    return (
        <div className='flex items-center'>
            {value.toFixed(2)} <FaBangladeshiTakaSign />
        </div>
    );
}
