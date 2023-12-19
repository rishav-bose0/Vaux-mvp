import React from "react";
import AuthHeader from '../studio/AuthHeader';
import SideNav from '../studio/SideNav';
import AiVoicesProvider from '../../context/AiVoicesContext';
import SelectedProjectProvider from '../../context/SelectedProjectContext';

function Studio({ content }: any) {
    return (
        <SelectedProjectProvider>
            <AiVoicesProvider>
                <>
                    <AuthHeader />
                    <SideNav />
                    <main className='p-8 ml-[90px] bg-light-white overflow-y-auto' style={{ height: 'calc(100% - 68px)' }}>{content}</main>
                </>
            </AiVoicesProvider>
        </SelectedProjectProvider>
    )
}

export default Studio;