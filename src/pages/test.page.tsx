
import './test.page.css';

export default function TestPage() {
    return (
        <div>
        
            <div className='adress-book-rim'>
                <div className='adress-book'>
                    <h2 className='smiley'>&#9786;&#9787;</h2>
                    <h1>Adress Book</h1>

                    <div className='friend-code'>
                        <p className='info-message'>This console's Wii number</p>
                        <div className='flex items-center'>
                            <p className=''>k54fg15 4525df 4524g5f</p>
                            {/* <button className='clipboard-logo mx-10'><img src="https://img.icons8.com/?size=100&id=43012&format=png&color=000000" alt="" /></button> */}
                        </div>
                    </div>

                    {/* <footer className='adress-book-footer'>
                        <p>Wii</p>
                    </footer> */}
                </div>
            </div>

            <br />
            

            <div className='add-friend-form'>
                <form action="">
                    <div className='add-friend-form-header'>
                        <p>Wii Number</p>
                    </div>
                    <input type="text" placeholder='Enter a Wii Number ...' />
                </form>
            </div>

            <br />


            <div className='friend-request-list'>
                <div className='friend-request-card'>
                    <div className='friend-request-card-info'>
                        <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffiverr-res.cloudinary.com%2Fimages%2Ft_main1%2Cq_auto%2Cf_auto%2Cq_auto%2Cf_auto%2Fgigs%2F55353524%2Foriginal%2F7892661bbe7146c7698d340085ce35e335e50c09%2Fcreate-a-wii-mii-profile-picture.jpg&f=1&nofb=1&ipt=451f0aff439af51981b4ceb34719ecf92fe888e28e751bafea4bdf7cdf7f61aa&ipo=images" alt="profil-picture"/>
                        <p>gf548f gfd5412 gdf568f</p>
                    </div>
                <button>Accept</button>
                </div>
            </div>


                        <p>dsssss</p>

            {/* <footer className='wii-footer'>
                <div className='footer-notch'></div>
            </footer> */}

        </div>

    )
}