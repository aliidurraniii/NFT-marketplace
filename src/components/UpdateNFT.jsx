import React from 'react'
import {
    useGlobalState,
    setGlobalState,
    setLoadingMsg,
    setAlert,
} from '../store'
import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { create } from 'ipfs-http-client'
import { updateNFT } from '../Blockchain.services'


export const UpdateNFT = () => {

    const [modal] = useGlobalState('updateModal')
    const [nft] = useGlobalState('nft') 
    const [price, setPrice] = useState(nft?.cost)

    const handleSubmit =  async(e) => {
        e.preventDefault()

        if (!price || price <=0 ) return

        setGlobalState('updateModal', 'scale-0')
        setLoadingMsg('Initializing price update...')

        try{
            setLoadingMsg('Price Updating...')
            setGlobalState('updateModal', 'scale-0')
            await updateNFT({ ...nft, cost: price })
            setAlert('Price updated...', 'green')
            window.location.reload()

        }catch(error){

            console.log('Error updating file: ', error)
            setAlert('Updating failed..', 'red')

        }
    }

    
    
      const resetForm = () => {
       
        setPrice('')
        
      }
    return (
        <div
            className={`fixed top-0 left-0 w-screen h-screen flex items-center
        justify-center bg-black bg-opacity-50 transform
        transition-transform duration-300 ${modal}`}
        >
            <div className="bg-[#151c25] shadow-xl shadow-[#e32970] rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
                <form className="flex flex-col">
                    <div className="flex flex-row justify-between items-center">
                        <p className="font-semibold text-gray-400">{nft?.title}</p>
                        <button
                        type="button"
                        onClick={() => setGlobalState('updateModal', 'scale-0')}
                        className="border-0 bg-transparent focus:outline-none"
                        >
              <FaTimes className="text-gray-400" />
                        </button>
                    </div>


                    <div className="flex flex-row justify-center items-center rounded-xl mt-5">
                        <div className="shrink-0 rounded-xl overflow-hidden h-20 w-20">
                        <img
                            alt={nft?.title}
                            className="h-full w-full object-cover cursor-pointer"
                            src={nft?.metadataURI}
                            
                            />
                        </div>
                    </div>

                    

                    
                    <div className="flex flex-row justify-between items-center bg-gray-800 rounded-xl mt-5">
                    <input
                    className="block w-full text-sm
                        text-slate-500 bg-transparent border-0
                        focus:outline-none focus:ring-0"
                         type="number"
                        name="price"
                        step={0.01}
                        min={0.01}
                        placeholder="Price (ETH)"
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}

                        required
                        />
                    </div>
                    

                    <button
            type="submit"
            
            className="flex flex-row justify-center items-center
              w-full text-white text-md bg-[#e32970]
              hover:bg-[#bd255f] py-2 px-5 rounded-full
              drop-shadow-xl border border-transparent
              hover:bg-transparent hover:text-[#e32970]
              hover:border hover:border-[#bd255f]
              focus:outline-none focus:ring mt-5"
              onClick ={handleSubmit}
          >
            Update Price
          </button>

                    
                </form>
            </div>
        </div>
    )

}
