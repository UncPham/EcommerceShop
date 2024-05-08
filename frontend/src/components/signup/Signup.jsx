import React from 'react'

const Signup = () => {
  return (
    <div class="Modal">
        <div class="Modal_Overlay">

        </div>
        <div class="Modal__Body">
            {/* <!-- Register Form--> */}
            <div class="Auth-Form">
                <div class="Auth-Form__Container">
                    <div class="Auth-Form__Header">
                        <h3 class="Auth-Form__Heading">Đăng ký</h3>

                        <a href="http://localhost:5000/user/login" class="Auth-Form__Switch--Btn">Đăng nhập</a>
                    </div>

                    <form action="/src/resources/views/user/signup" method="POST">
                        <div class="Autho-Form__Form">
                            <div class="Auth-Form__Group">
                                <input type="text" id="email" name="email" class="Auth-Form__Input" placeholder="Email của bạn" required autocomplete="off"/>
                            </div>
                            <div class="Auth-Form__Group">
                                <input type="text" id="phoneNumber" name="phoneNumber" class="Auth-Form__Input" placeholder="Số điện thoại" required/>
                            </div>
                            <div class="Auth-Form__Group">
                                <input type="password" id="password" name="password" class="Auth-Form__Input" placeholder="Mật khẩu của bạn"/>
                            </div>
                            <div class="Auth-Form__Group">
                                <input type="password" id="confirm_password" name="confirm_password" class="Auth-Form__Input" placeholder="Nhập lại mật khẩu của bạn"/>
                            </div>
                        </div>

                        <div class="Auth-Form__Aside">
                            <p class="Auth-Form__Policy--Text">
                                Bằng việc đăng kí, bạn đã đồng ý với UET-Shop về
                                
                                <a href="" class="Auth-Form__Text--Link">Điều khoản dịch vụ</a> &
                                
                                <a href="" class="Auth-Form__Text--Link">Chính sách bảo mật</a>
                            </p>
                        </div>

                        <div class="Auth-Form__Controls">
                            {/* <!-- <button class="Btn Auth-Form__Controls--Back Btn--Normal">TRỞ LẠI</button> --> */}
                            <button type="submit" class="Btn Btn--Primary">ĐĂNG KÝ</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Signup