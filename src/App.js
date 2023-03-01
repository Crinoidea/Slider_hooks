import {useState, useEffect, useCallback, useMemo} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';

/* class Slider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            autoplay: false,
            slide: 0
        }
    }

    componentDidMount() {
        document.title = `Slide: ${this.state.slide}`;
    }

    componentDidUpdate() {
        document.title = `Slide: ${this.state.slide}`;
    }

    changeSlide = (i) => {
        this.setState(({slide}) => ({
            slide: slide + i
        }))
    }

    toggleAutoplay = () => {
        this.setState(({autoplay}) => ({
            autoplay: !autoplay
        }))
    }

    render() {
        return (
            <Container>
                <div className="slider w-50 m-auto">
                    <img className="d-block w-100" src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg" alt="slide" />
                    <div className="text-center mt-5">Active slide {this.state.slide} <br/> {this.state.autoplay ? 'auto' : null}</div>
                    <div className="buttons mt-3">
                        <button 
                            className="btn btn-primary me-2"
                            onClick={() => this.changeSlide(-1)}>-1</button>
                        <button 
                            className="btn btn-primary me-2"
                            onClick={() => this.changeSlide(1)}>+1</button>
                        <button 
                            className="btn btn-primary me-2"
                            onClick={this.toggleAutoplay}>toggle autoplay</button>
                    </div>
                </div>
            </Container>
        )
    }
} */
/* const getSomeImages = () => {
    console.log('fetching')
    return [
        'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Bukovina.JPG/1280px-Bukovina.jpg',
        'https://lp-cms-production.imgix.   net/features/2015/11/tatra-mountains-750-cs.jpg'
    ]
} */

const countTotal = (num) => {
    console.log('counting...');

    return num + 10
}

const Slider = (props) => {

    // const slideStateArray = useState();
    const [slide, setSlide] = useState(0);
    const [autoplay, setAutoplay] = useState(false);

    function logging() {
        console.log('log')
    }

    const getSomeImages = useCallback(() => {
        console.log('fetching')
        return [
            'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Bukovina.JPG/1280px-Bukovina.jpg',
            'https://lp-cms-production.imgix.net/features/2015/11/tatra-mountains-750-cs.jpg'
        ]
    }, [slide])


    useEffect(() => {
        console.log('effect update')
        document.title = `Slide: ${slide}`;

        window.addEventListener('click', logging);

        return () => {
            window.removeEventListener('click', logging);
        }

    }, [slide])

    useEffect(() => {
        console.log('effect')
        document.title = `Slide: ${slide}`;
    }, [])

    useEffect(() => {
        console.log('autoplay')
    }, [autoplay])

    // useEffect(() => {
    //     console.log('effect update')
    //     document.title = `Slide: ${slide}`;
    // }, [slide])

    function changeSlide(i) {
        setSlide(slide => slide + i);
    }

    function toggleAutoplay() {
        setAutoplay(autoplay => !autoplay);
    }

    const total = useMemo(() => {
        return countTotal(slide);
    }, [slide]);

/*     const style = {
        color: slide > 4 ? 'red' : 'black'
    } */
    const style = useMemo(() => ({
        color: slide > 4 ? 'red' : 'black'
    }), [slide])


    useEffect(() => {
        console.log('style')
    }, [style])

    return (
        <Container>
            <div className="slider w-50 m-auto">
{/*                 {
                    getSomeImages().map((url, i) => {
                        return (
                            <img key={i} className="d-block w-100" src={url} alt="slide" />
                        )
                    })
                } */}
                
                <Slide getSomeImages={getSomeImages}>

                </Slide>
                <div className="text-center mt-5">Active slide {slide} <br/> {autoplay ? 'auto' : null}</div>
                <div style={style} className="text-center mt-5">Total slides: {total}</div>
                <div className="buttons mt-3">
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(-1)}>-1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(1)}>+1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={toggleAutoplay}>toggle autoplay</button>
                </div>
            </div>
        </Container>
    )
}

const Slide = ({getSomeImages}) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        setImages(getSomeImages())
    }, [getSomeImages])

    return (
        <>
            {images.map((url, i) => {
                <img key={i} className="d-block w-100" src={url} alt="slide" />
            })}
        </>
    )
}

const Form = () => {
    const myRef = ?

    const focusFirstTI = () => {
        myRef.current.focus();
    }

    return (
        <Container>
            <form className="w-50 border mt-5 p-3 m-auto">
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                    <input ref={myRef} type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
                    <textarea onClick={focusFirstTI} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
            </form>
        </Container>
    )
}

function App() {
    const [slider, setSlider] = useState(true);


    return (
        <>
            <Form/>

            <button onClick={() => setSlider(false)}>Click</button>
            {slider ? <Slider/> : null}
        </>
    );
}

export default App;
