import AuthHeader from 'components/studio/AuthHeader';
import SideNav from 'components/studio/SideNav';

function Studio({ content }: any) {
    return (
        <>
            <AuthHeader />
            <SideNav />
            <main className='p-8 ml-[90px] bg-[#f6f7f9]' style={{height: 'calc(100% - 68px)'}}>{content}</main>
        </>
    )
}

export default Studio;