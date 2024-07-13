import { Button, Card, Carousel, Col, Layout, Row } from "antd"
import "./HomePage.scss"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";
import { fetchMovies } from "../store/action/movieAction";
import { CaretRightOutlined, CloseOutlined, LeftOutlined, MenuOutlined, RightOutlined, SearchOutlined } from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
export default function HomePage() {
    const dispatch = useDispatch()
    const movies = useSelector((state) => state.movie.movies);
    const [movieDetail, setMovieDetail] = useState()
    const handleMovieDetail = (movie) => {
        setMovieDetail(movie)
    }

    const handleClose = () => {
        setMovieDetail(null)
    }
    const nextArrow = <Button icon={<RightOutlined />} />;
    const prevArrow = <Button icon={<LeftOutlined />} />;

    console.log(movies)
    useEffect(() => {
        dispatch(fetchMovies())
    }, [])
    return (
        <div className="HomePage">
            {movieDetail ?
                <Layout className="detail__container">
                    <div className="movie__detail">
                        <div className="X" onClick={handleClose}><CloseOutlined /></div>
                        <Row>
                            <Col span={8}>
                                <div className="img__detail">
                                    <img height={500} src={movieDetail.image}></img>
                                </div>
                            </Col>
                            <Col span={16}>
                                <div className="heading__detail">
                                    {movieDetail.name}
                                </div>
                                <p>
                                    {movieDetail.time} min {movieDetail.year}
                                </p>
                                <br />
                                <p style={{ fontSize: "20px" }}>
                                    {movieDetail.introduce}
                                </p>
                                <Button className="button__detail">
                                    <CaretRightOutlined />  PLAY MOVIE
                                </Button>
                            </Col>
                        </Row>
                        <br />

                    </div>
                </Layout>
                :
                <Layout className="home__container">

                    <div className="container__header">
                        <div className="header__icon"><MenuOutlined /></div>
                        <div className="header__logo" >MOVIE<span className="logo">UI</span></div>
                        <div className="header__icon"><SearchOutlined /></div>

                    </div>
                    <div className="line" />
                    <div className="container__carousel">
                        <h3>Most Popular Movies</h3>
                        <Carousel
                            style={{ width: "100%" }}
                            dots={false}
                            infinite={true}
                            draggable={true}
                            slidesToShow={4}
                            slidesToScroll={1}
                            nextArrow={nextArrow}
                            prevArrow={prevArrow}

                        >
                            {movies.map(movie => (
                                <div
                                    key={movie.ID}

                                    className="Carousel__item"
                                >
                                    <Card
                                        hoverable

                                        cover={<img height={380} alt="example" src={movie.image} />}
                                        onClick={() => handleMovieDetail(movie)}
                                    >
                                        <Meta title={movie.name} description={`${movie.time}min ${movie.year}`} />
                                    </Card>
                                </div>
                            ))}

                        </Carousel>
                    </div>
                </Layout>
            }
        </div >
    )
}
