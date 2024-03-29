import React, { useEffect, useState } from "react";
import buy1 from "../../images/product2.jpg";
import ReactStars from "react-rating-stars-component";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductDetails,
  addReviews,
  clearErrors,
} from "../../redux/actions/productAction";
import { addToCart } from "../../redux/actions/cartActions";
import ImageGallery from "react-image-gallery";
import "./ProductDetail.css";
import { animateScroll as scroll } from "react-scroll";
import HeadShake from "react-reveal/HeadShake";
import { Rating } from "@material-ui/lab";
import Loader from "../../component/Layout/Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../../component/Layout/MetaData";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ReviewCard from "../../component/ReviewCard/ReviewCard";
import Header from "../../component/Layout/Header/Header";
import Footer from "../../component/Layout/Footer/Footer";

const ProductDetail = () => {
  const alert = useAlert();

  const { currentUser } = useSelector((state) => state.loginUser);

  const { success, reviewerror } = useSelector((state) => state.addReviews);
  const param = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product, loading, error } = useSelector(
    (state) => state.productDetail
  );
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const toSend = { rating, comment, productId: product._id };
  const [qty, setQty] = useState(1);
  let galleryImages;
  const increaseQuantity = () => {
    if (product.stock <= qty) return;
    const updatedQty = qty + 1;
    setQty(updatedQty);
  };
  const decreaseQuantity = () => {
    if (1 >= qty) return;
    const updatedQty = qty - 1;
    setQty(updatedQty);
  };

  const [loginCheck, setLoginCheck] = useState(true);
  const submitReview = (e) => {
    if (!currentUser) {
      alert.error("Please login");
      setLoginCheck(false);
    } else {
      setLoginCheck(true);
      e.preventDefault();
      dispatch(addReviews(toSend, currentUser));
      setComment("");
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (reviewerror) {
      alert.error(reviewerror);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Review added");
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(param.id));
    scroll.scrollTo(1);
  }, [dispatch, error, alert, success, reviewerror]);

  // const galleryImagesFunc = () => {
  //   galleryImages = product.images.map(({ url: original, url: thumbnail }) => ({
  //     original,
  //     thumbnail,
  //   }));
  // };

  galleryImages = [
    {
      original:
        "https://static-01.daraz.pk/p/4b8a12407bdaf4e478f2b45703ae5209.jpg",
      thumbnail:
        "https://static-01.daraz.pk/p/4b8a12407bdaf4e478f2b45703ae5209.jpg",
    },
    {
      original:
        "https://static-01.daraz.pk/p/6353ac5bff212225c0151d1fffafe8d8.jpg",
      thumbnail:
        "https://static-01.daraz.pk/p/6353ac5bff212225c0151d1fffafe8d8.jpg",
    },
    {
      original:
        "https://static-01.daraz.pk/p/75d5db586ddba2ffada40c7d156dd4b1.jpg",
      thumbnail:
        "https://static-01.daraz.pk/p/75d5db586ddba2ffada40c7d156dd4b1.jpg",
    },
  ];

  const addToCartHandler = () => {
    if (product.stock > 0) {
      dispatch(addToCart(product._id, qty));
      alert.success(`${product.productName} added to card`);
      navigate(`/cart/${param.id}?qty=${qty}`);
    } else {
      alert.error("Not added to cart");
    }
  };

  return (
    <React.Fragment>
      <MetaData title={product.productName} />
      {loading ? (
        <Loader />
      ) : (
        <React.Fragment>
          <Header />
          <div className="product-detail-container">
            <div className="product-detail-row">
              <div className="product-detail-left">
                <ImageGallery items={galleryImages} />
              </div>
              <div className="product-detail-right">
                <div className="product-detail-content">
                  <h2>{product.productName} </h2>
                  <p>{product._id}</p>
                  <p>{product.category}</p>
                </div>
                <hr />
                <div className="no-of-reviews">
                  <ReactStars
                    edit={false}
                    color="rgba(20,20,20,0.1)"
                    activeColor="#ffd700"
                    size={window.innerWidth < 600 ? 20 : 25}
                    value={product.ratings}
                    isHalf={true}
                  />
                  <p>({product.numOfReviews} reviews) </p>
                </div>
                <hr />
                <div className="product-detail-price-cart">
                  <p className="product-detail-price">Rs: {product.price}</p>
                  <div className="inc-dec">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={qty} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                </div>
                <div className="add-to-cart-btn">
                  <button className="btn mx-10 " onClick={addToCartHandler}>
                    Add to cart{" "}
                    <ShoppingCartIcon style={{ fontSize: "15px" }} />
                  </button>
                </div>
                <hr />
                <h3 className={"mx-10" && product.stock > 0 ? "green" : "red"}>
                  Availablity:{" "}
                  {product.stock > 0 ? `In stock ` : "Out of stock"}
                </h3>
                <p className="mx-10">
                  <b>Description:</b> {product.description}
                </p>
              </div>
            </div>
          </div>
          {/* Review Section*/}
          <div className="product-detail-container">
            <h4 className="page-title-small">
              What others say's about {product.productName}{" "}
            </h4>
            {product.reviews &&
              product.reviews.map((review) => (
                <HeadShake>
                  <ReviewCard review={review} />
                </HeadShake>
              ))}
            <div className="leave-comment my-20">
              <div className="give-rating">
                <h4>Submit Rating:</h4>
                <Rating
                  onChange={(e) => setRating(e.target.value)}
                  value={rating}
                  isHalf={true}
                  size="large"
                  color="rgba(20,20,20,0.1)"
                  activeColor="#ffd700"
                />
              </div>
              <textarea
                cols="30"
                rows="5"
                placeholder="Leave a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="mx-10"
              />
              <div className="leave-comment-btn">
                <button
                  onClick={submitReview}
                  className="btn"
                  disable={loginCheck}
                >
                  Comment
                </button>
              </div>
            </div>
          </div>
          <Footer />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ProductDetail;
