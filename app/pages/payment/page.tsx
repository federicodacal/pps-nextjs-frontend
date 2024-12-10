import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { cookies } from 'next/headers';
import { createPurchase } from "@/app/services/purchases-service";
import { PurchasePayload } from "@/app/types/purchase";
import React, { useEffect } from 'react';

export default async function Payment() {
    const pushPurchase = async () => {
        const cookieStore = cookies();
        const data = cookieStore.get('itemsData')?.value;
        const itemsData: PurchasePayload = data ? JSON.parse(data) : {};

    
        const response = await createPurchase(itemsData)
    
        console.log("RESPONSE PURCHASE")
        console.log(response.data)
    };
    
    const response = pushPurchase()

    return (
        <div className='h-full'>
            <div>
                <Header title="Compra" />
            </div>
            <div className="flex place-content-center m-auto px-10 sm:px-0 " >
                <div className="flex flex-col col-auto  ">


                        <div className="flex mb-72 px-10 sm:px-0 place-items-center">
                            {/*Items*/}
                            <div className="bg-white rounded-xl shadow-xl p-7 text-black">
                                <h2 className="text-2xl mb-2">¡Su pago fue aprobado!</h2>

                                <div className="grid grid-cols-2">

                                    <p>Puede descargar su audios desde su perfil</p>

                                </div>

                            </div>

                        </div>

                        {/*Checkout*/}



                </div>
            </div>
            <div>

                <Footer />
            </div>
        </div>
    );
}

