import { Link } from 'react-router-dom';
import { useGetCarouselQuery } from '../slices/productsApiSlice';
import Message from './Message';
import Loader from './Loader';
import { Carousel } from 'react-bootstrap';

const ProductCarousel = () => {
    const { data, error, isLoading } = useGetCarouselQuery();
    return (
        <>
            {isLoading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Carousel pause='hover' className='bg-primary mb-4 mt-4 product-carousel'>
                    {data.map((product) => (
                        <Carousel.Item key={product._id}>
                            <Link to={`/product/${product._id}`}>
                                <img src={product.image} alt={product.name} fluid/>
                                <Carousel.Caption className='carousel-caption'>
                                    {/* <div>
                                        <h3>{product.name}</h3>
                                        <h3>${product.price}</h3>
                                    </div> */}
                                    <h2>{product.name} (${product.price})</h2>
                                </Carousel.Caption>
                            </Link>
                        </Carousel.Item>
                    ))}
                </Carousel>
            )}       
        </>
    )
 
};

export default ProductCarousel;