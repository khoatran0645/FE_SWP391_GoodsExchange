import './Header.css'
const Header = props => {
    return (
        <div className='header'>
            <div className='top-header'>
                <div className="left-header">
                    <p>Market</p>
                    <p>Bad Market</p>
                    <p>Nice Market</p>
                    <p>Heo Market</p>
                </div>
                <div className="right-header">
                    <p>Feedback</p>
                    <p>Download </p>
                    <p>Support</p>
                </div>
            </div>

            <div className='bottom-header'>
                <div className='logo'>Goods</div>
                <div className='cate'>Category</div>
                <div className='header-search'>
                    <input></input>
                    <button>Search</button>

                </div>
                <div className='noti'>Noti</div>
                <div className='cart'>Cart</div>
                <div className='acc'>Account</div>
                <div className='post'>Post</div>
            </div>
        </div>
    )
}

export default Header