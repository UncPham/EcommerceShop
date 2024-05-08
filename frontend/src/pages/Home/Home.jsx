import React from 'react'

const Home = () => {
  return (
    <div class="App__Container">
        <div class="grid wide">
            <div class="row sm--gutter App_Content">
            <div class="col l-2 m-0 c-0">
                <nav class="Category">
                <h3 class="Category__Heading">
                    Danh mục
                </h3>

                <ul class="Category--List">
                    <li class="Category--Item Category--Item--Active">
                    <a href="#" class="Category--Item__Link">Sản phẩm</a>
                    </li>

                    <li class="Category--Item">
                    <a href="#" class="Category--Item__Link">Trang điểm môi</a>
                    </li>

                    <li class="Category--Item">
                    <a href="#" class="Category--Item__Link">Trang điểm mắt</a>
                    </li>
                </ul>
                </nav>
            </div>

            <div class="col l-10 m-12 c-12">
                <div class="Home--Filter hide--on--mobile--tablet">
                <span class="Home--Filter__Label">Sắp xếp theo</span>

                <button class="Home--Filter__Btn Btn">Phổ biến</button>

                <button class="Home--Filter__Btn Btn Btn--Primary">Mới nhất</button>

                <button class="Home--Filter__Btn Btn">Bán chạy</button>

                <div class="Select--Input">
                    <span class="Select--Input__Label">Giá</span>

                    <i class="Select--Input__Icon fas fa-angle-down"></i>

                    {/* <!-- List Options --> */}
                    <ul class="Select--Input__List">
                    <li class="Select--Input__Item">
                        <a href="" class="Select--Input__Link">Giá: Thấp đến cao</a>
                    </li>

                    <li class="Select--Input__Item">
                        <a href="" class="Select--Input__Link">Giá: Cao đến thấp</a>
                    </li>
                    </ul>
                </div>

                <div class="Home--Filter__Pagination">
                    <span class="Home--Filter__Pagination--Num">
                    <span class="Home--Filter__Pagination--Current">1</span>/14
                    </span>

                    <div class="Home--Filter__Page--Control">
                    <a
                        href=""
                        class="Home--Filter__Page--Btn Home--Filter__Page--Btn--Disabled"
                    >
                        <i class="Home--Filter__Page--Icon fas fa-angle-left"></i>
                    </a>

                    <a href="" class="Home--Filter__Page--Btn">
                        <i class="Home--Filter__Page--Icon fas fa-angle-right"></i>
                    </a>
                    </div>
                </div>
                </div>

                <nav class="mobile--category">
                <ul class="mobile--category__list">
                    <li class="mobile--category__item">
                    <a href="" class="mobile--category__link">Dụng cụ & Thiết bị tiện
                        ích giúp ích cho mọi nhà hâhhhahahaha</a>
                    </li>
                </ul>
                </nav>

                <div class="Home--Products">
                <div class="row sm--gutter">
                    <div class="col l-2-4 m-4 c-6">
                    {/* <!-- Product Item --> */}
                    <a class="Home--Product--Items" href="#">
                        <div
                        class="Home--Product--Item__Img"
                        style="background-image: url(https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-ltdk0z6wuoqs01_tn);"
                        ></div>

                        <h4 class="Home--Product--Item__Name">Loa Máy Tính Để Bàn
                        Leerfei E-350T Công Suất Lớn Dùng Cho Máy Vi Tính PC, Laptop,
                        Tivi- E-350Ts</h4>

                        <div class="Home--Product--Item__Price">
                        <span
                            class="Home--Product--Item__Price--Old"
                        >1.200.000đ</span>

                        <span
                            class="Home--Product--Item__Price--Current"
                        >999.000đ</span>
                        </div>

                        <div class="Home--Product--Item__Action">
                        <span
                            class="Home--Product--Item__Like Home--Product--Item__Like--Liked"
                        >
                            <i
                            class="Home--Product--Item__Like--Icon--Empty fa-regular fa-heart"
                            ></i>

                            <i
                            class="Home--Product--Item__Like--Icon--Fill fa-solid fa-heart"
                            ></i>
                        </span>

                        <div class="Home--Product--Item__Rating">
                            <i
                            class="Home--Product--Item__Star--Gold fa-solid fa-star"
                            ></i>
                            <i
                            class="Home--Product--Item__Star--Gold fa-solid fa-star"
                            ></i>
                            <i
                            class="Home--Product--Item__Star--Gold fa-solid fa-star"
                            ></i>
                            <i
                            class="Home--Product--Item__Star--Gold fa-solid fa-star"
                            ></i>
                            <i class="fa-solid fa-star"></i>
                        </div>

                        <div class="Home--Product--Item__Sold">88 đã bán</div>
                        </div>

                        <div class="Home--Product--Item__Origin">
                        <span class="Home--Product--Item__Brand">Leerfei</span>

                        <span class="Home--Product--Item__Origin--Name">Hải Phòng</span>
                        </div>

                        <div class="Home--Product--Item__Favourite">
                        <i class="fa-solid fa-check"></i>

                        <span>Yêu thích</span>
                        </div>

                        <div class="Home--Product--Item__Sale--Off">
                        <span
                            class="Home--Product--Item__Sale--Off__Percent"
                        >43%</span>

                        <span
                            class="Home--Product--Item__Sale--Off__Label"
                        >GIẢM</span>
                        </div>
                    </a>
                    </div>
                </div>
                </div>

                <ul class="Pagnination Home--Product__Pagination">
                <li class="Pagnination--Item">
                    <a href="" class="Pagnination--Item__Link">
                    <i class="Pagnination--Item__Icon fas fa-angle-left"></i>
                    </a>
                </li>

                <li class="Pagnination--Item Pagnination--Item--Active">
                    <a href="" class="Pagnination--Item__Link">1</a>
                </li>

                <li class="Pagnination--Item">
                    <a href="" class="Pagnination--Item__Link">
                    <i class="Pagnination--Item__Icon fas fa-angle-right"></i>
                    </a>
                </li>
                </ul>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Home
