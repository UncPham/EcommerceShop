import React, { useContext, useEffect, useState } from "react";
import "./Product.css";
import { StoreContext } from "../../context/StoreContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import { assets } from "../../assets/assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import ProductItem from "../../components/productItem/ProductItem.jsx";

const Product = () => {

  const stopWordsVietnamese = [
    'và', 'hay', 'là', 'của', 'từ', 'một', 'cái', 'người', 'cho', 'được', 'có', 'trong',
    'đã', 'cũng', 'để', 'không', 'với', 'là', 'làm', 'vào', 'như', 'ở', 'đến', 'này', 'nơi',
    'khi', 'nào', 'nếu', 'sau', 'mà', 'các', 'lên', 'bị', 'ra', 'nên', 'đang', 'hay', 'thì',
    'việc', 'lại', 'có', 'thể', 'cũng', 'nhiều', 'đây', 'về', 'trước', 'qua', 'rằng', 'đó',
    'tại', 'nếu', 'sự', 'là', 'nên', 'để', 'phải', 'chỉ', 'còn', 'hoặc', 'thậm', 'chí', 'đều',
    'vẫn', 'thế', 'nào', 'tất', 'cả', 'đều', 'mình', 'chưa', 'ai', 'nói', 'chúng', 'ta', 'tôi',
    'biết', 'điều', 'gì', 'làm', 'nên', 'đi', 'lại', 'một', 'cách', 'thường', 'nhưng', 'vẫn',
    'nên', 'làm', 'nên', 'làm', 'tại', 'sao', 'đâu', 'mình', 'tôi', 'tớ', 'cậu', 'mày', 'mầy',
    'tao', 'mày', 'nó', 'nó', 'cậu', 'ta', 'tui', 'tui', 'nó', 'chúng', 'nó', 'họ', 'họ', 'chúng',
    'bọn', 'họ', 'chúng', 'bọn', 'họ', 'chúng', 'tui', 'bọn', 'tui', 'bọn', 'họ', 'họ', 'mình', 'tui'
];

  const { id } = useParams();

  const { addToCart, url } = useContext(StoreContext);

  const [data, setData] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [size, setSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [averageRating, setAverageRating] = useState(null);
  const [fullItem, setFullItem] = useState([]);

  const fetchProduct = async () => {
    const response = await axios.get(url + `/api/product/${id}`);
    if (response.data.success) {
      setData(response.data.data);
    } else {
      console.log("Error");
    }
  };

  const fetchRecommendations = async () => {
    try {
      const response = await axios.get(url + `/api/product/list`);
  
      if (response.data.success) {
        const products = response.data.data;
  
        // Tính điểm tương tự giữa các sản phẩm
        const similarities = products.map(product => ({
          _id: product._id,
          similarity: calculateSimilarity(data, product)
        }));
  
        // Sắp xếp các sản phẩm dựa trên điểm tương tự
        const sortedSimilarities = similarities
          .filter(sim => sim._id !== id)
          .sort((a, b) => b.similarity - a.similarity);
  
        // Lựa chọn các sản phẩm tương tự nhất
        const recommendedProducts = sortedSimilarities.slice(0, 10).map(sim => sim._id);
  
        setRecommendations(recommendedProducts);
        fetchItem(recommendedProducts);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const calculateSimilarity = (product1, product2) => {
    // Tính toán điểm tương tự dựa trên các yếu tố
    const sexSimilarity = product1.sex === product2.sex ? 1 : 0;
    const categorySimilarity = product1.category === product2.category ? 1 : 0;
    const descriptionSimilarity = calculateDescriptionSimilarity(product1.description, product2.description);

    // Tổng hợp điểm tương tự từ các yếu tố
    const totalSimilarity = (sexSimilarity + categorySimilarity + descriptionSimilarity) / 3;
    return totalSimilarity;
};

// Hàm tính toán độ tương tự dựa trên mô tả
const calculateDescriptionSimilarity = (desc1, desc2) => {

    if (!desc1 || !desc2) {
      return 0; // Trả về 0 nếu một trong hai mô tả không tồn tại
    }

    const words1 = desc1.split(" ");
    const words2 = desc2.split(" ");

    const commonWords = words1.filter(word => words2.includes(word));

    // Tính toán tỷ lệ số từ chung so với tổng số từ
    const similarity = commonWords.length / Math.max(words1.length, words2.length);

    return similarity;
};

  const fetchItem = async (list) => {
    const item = [];
    for (let i = 0; i < list.length; i++) {
      const response = await axios.get(url + `/api/product/${list[i]}`);
      if (response.status === 200) {
        item.push(response.data.data);
      } else {
        console.log("Can not find item");
      }
    }
    setFullItem(item);
  };

  useEffect(() => {
    fetchProduct();
    fetchRecommendations();
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (data.ratings && data.ratings.length > 0) {
      const total = data.ratings.reduce((acc, rate) => acc + rate.rating, 0);
      setAverageRating((total / data.ratings.length).toFixed(1));
    } else {
      setAverageRating(null);
    }
  }, [data]);

  const onChangeHandler = (event) => {
    let value = event.target.value;
    value = Math.max(1, value);
    setQuantity(value);
  };

  return (
    <div className="App__Container">
      <div className="grid wide">
        <div className="row product__container">
          <div className="product__information">
            <div className="col l-5 m-5 c-5">
              <img
                src={url + "/images/" + data.picture}
                alt=""
                className="product__img--main"
              />
            </div>

            <div className="col l-7 m-7 c-7">
              <div className="row">
                <div className="col l-12 m-12 c-12">
                  <div className="product__information--heading">
                    <span className="product__information--heading--name">
                      {data.name}
                    </span>
                  </div>
                  <div className="product__information--heading--description">
                    <span className="product__information--heading--description">
                      Mô tả: {data.description}
                    </span>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col l-12 m-12 c-12">
                  <div className="product__information--rating">
                    <div className="product__information--rating--number">
                      <span className="product__information--rated--number">
                        {data.ratings ? data.ratings.length : 0}
                      </span>

                      <span className="product__information--rated--title">
                        Đánh giá
                      </span>
                    </div>

                    <div className="product__information--selled">
                      <span className="product__information--selled--number">
                        {data.selling}
                      </span>

                      <span className="product__information--selled--name">
                        Đã bán
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col l-12 m-12 c-12">
                  <div className="product__information--price">
                    <span className="product__information--price__discounted">
                      ₫ {data.price}
                    </span>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col l-12 m-12 c-12">
                  <div className="row sm--gutter product__option--size">
                    <div className="col l-4 product__option--size--name">
                      Size
                    </div>

                    <div className="col l-8 product__option--size--select">
                      <div className="col l-4 m-4 c-4">
                        <button
                          onClick={() => setSize((prev) => "M")}
                          className={
                            size === "M"
                              ? "product__option--size--select--option product__option--size--option--selected"
                              : "product__option--size--select--option"
                          }
                        >
                          M: 45-54kg &lt; 1m65
                        </button>
                      </div>

                      <div className="col l-4 m-4 c-4">
                        <button
                          onClick={() => setSize((prev) => "L")}
                          className={
                            size === "L"
                              ? "product__option--size--select--option product__option--size--option--selected"
                              : "product__option--size--select--option"
                          }
                        >
                          L: 55-64kg &lt; 1m72
                        </button>
                      </div>

                      <div className="col l-4 m-4 c-4">
                        <button
                          onClick={() => setSize((prev) => "XL")}
                          className={
                            size === "XL"
                              ? "product__option--size--select--option product__option--size--option--selected"
                              : "product__option--size--select--option"
                          }
                        >
                          XL: 65-73kg &lt; 1m76
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col l-12 m-12 c-12">
                  <div className="product__option--order--item">
                    <div className="col l-4 m-4 c-4 product__option--order--item--title">
                      Số lượng
                    </div>

                    <div className="col l-8 m-8 c-8 product__option--order--item--quantity">
                      <input
                        type="number"
                        className="product__option--order--item--quantity--input"
                        value={quantity}
                        name="quantity"
                        onChange={onChangeHandler}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="product__information--btn">
                  <div
                    className="Btn Btn--normal--product__information"
                    onClick={() => addToCart(id, size, quantity)}
                  >
                    <FontAwesomeIcon
                      icon={faCartPlus}
                      className="product__information--add--product--icon"
                    />

                    <span className="product__information--add--product--name">
                      Thêm vào giỏ hàng
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="Product-Rating">
            <div className="Product-Rating__Header">ĐÁNH GIÁ SẢN PHẨM</div>

            {averageRating ? (
              <>
                <div className="row product--rating--score">
                  <div className="col l-12 m-12 c-12">
                    <div className="Product-Rating__Score">
                      <div className="Product-Rating__Score--Score">
                        <span className="Product-Rating__Score--Score--highlight">
                          <span>{averageRating} trên 5</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {data.ratings.map((rate, index) => {
                  return (
                    <div key={index} className="Product-Rating__List">
                      <div className="Product-Rating__Main">
                        <div className="Product-Rating__Main--Name">
                          Người dùng: {rate.userId}
                        </div>
                        <div className="">Đánh giá: {rate.rating} sao</div>
                        <div className="Product-Rating__Main--Comment">
                          {rate.comment}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <span className="Product-Rating__List-Empty">
                Không có đánh giá
              </span>
            )}
          </div>
          <div className="recommend-item">
            <h2>Gợi ý</h2>
            <div className="col l-12 m-12 c-12 recommend-list">
              {fullItem.length > 0 ? (
                <div className="row sm--gutter">
                  {fullItem.map((item, index) => (
                    <div className="col l-2-4 m-4 c-6" key={index}>
                      <ProductItem
                        id={item._id}
                        name={item.name}
                        description={item.description}
                        price={item.price}
                        image={item.picture}
                        selling={item.selling}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="recommend-list-empty">Không có gợi ý nào</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
