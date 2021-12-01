<template>
  <div class="header">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <router-link to='/'><a class="navbar-brand" href="#">Tshoes</a></router-link>
          
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-0 mb-2 mb-lg-0">


              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
                  aria-expanded="false">
                  Thương hiệu
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li v-for="(brand,k) in brands" :key="k" @click="$router.push({name: 'Brand', params: {id: brand.id, name: brand.name}})">
                    <a class="dropdown-item">{{brand.name}}</a>
                    </li>

                </ul>
              </li>

            </ul>
            <Search />
            
          </div>
          <!-- Cart -->
          <div class="icon" id="cart" style="user-select:none">
            <div @click="handleClickedCart" >
            <i class="fa fa-shopping-cart" aria-hidden="true" ></i>
             Giỏ hàng
            </div>
            <div v-if="numberOfItems" class="number-item">{{numberOfItems}}</div>
                
            <div v-if="showCartMessage" @click="$router.push({name:'Login'})" class='message-cart'>
              <div class="alert alert-warning" role="alert">
                  Vui lòng đăng nhập để sử dụng giỏ hàng!
                </div>
            </div>
            <!-- Cart detail -->
            <CartDetail v-if='isClickedCart' @goToCart="isClickedCart=false"/>

            
          </div>
          <!-- Login/Register -->
          <div v-if="!userLoggedIn">
          <router-link to='/login'>
            <div class="icon" style="user-select:none">
              <i class="fa fa-user" aria-hidden="true"></i>
              <span id="login" style="margin: auto 5px;">Login</span>
            </div>
            </router-link>
          </div>
          <!-- AccountInfo -->
          <div v-if="userLoggedIn" @click="showAccountMenu=!showAccountMenu" class="account">
            <div  class="icon" style="user-select:none">
              <i class="fa fa-user" aria-hidden="true"></i>
              <span style="margin: auto 5px;">Hi, {{loggedInUser.fullname}}</span>
            </div>
            <div v-if="showAccountMenu" class="account-menu">
              <ul class="list-group list-group-flush">
                <li @click="$router.push({name:'Cart'})" class="list-group-item">Giỏ hàng</li>
                <li class="list-group-item">Đơn hàng</li>
                <li class="list-group-item">Sản phẩm yêu thích</li>
                <li class="list-group-item">Tài khoản</li>
                <li class="list-group-item" @click="handleLogout">Đăng xuất</li>
              </ul>
            </div>
          </div>
         
        </div>
      </nav>
    </div>
</template>

<script>
import Search from "./Search.vue"
import BrandService from '../../services/brand.service'
import CartDetail from './cart/CartDetail.vue'
import {mapActions, mapGetters, mapMutations}  from 'vuex'
export default {
  data(){
    return {
      isClickedCart : false,
      showAccountMenu : false,
      showCartMessage : false,
      brands:[],
    }
  },
  methods: {
    ...mapActions(['getAll']),
    ...mapMutations(['logout', 'clearCart']),
    handleClickedCart(){
      if(!this.userLoggedIn){
        this.showCartMessage = true
        //Show message require login to use cart
        setTimeout(() => this.showCartMessage =false, 10000)
      }else{
        //Open cart
        this.isClickedCart = !this.isClickedCart
        //Get cart from server when cart is empty
        if(this.isEmptyCart){
          this.getAll()
        }
      }
      
    },
    handleLogout(){
      this.isClickedCart = this.showAccountMenu = false
      this.logout()
      this.clearCart()
    },
    async getBrands(){
      const [err, res] = await this.handle(
        BrandService.getAll()
      )
      if(err) console.log("Loi lay brand trong header")
      else{
        this.brands = res.data
      }
    }
  },
  components:{
    Search,
    CartDetail,
  },
  computed: {
    ...mapGetters(['userLoggedIn',
      'loggedInUser',
      'isEmptyCart',
      'numberOfItems'
    ])
  },
  mounted(){
    this.getAll()
    this.getBrands()
  },
}
</script>

<style scoped>
/* message cart */
.message-cart{
  position: absolute;
  width: 200px;
  z-index: 5;
  top:0;
  right:0;
}

/* dropdown Account menu */
.account{
  position: relative;
}
.account-menu{
  position: absolute;
  top:0;
  right:0;
  z-index: 1000;
  transform: translate(0,20%);
  font-weight: bold
}
.account-menu li:hover{
  cursor: pointer;
  background-color:rgb(133, 140, 143);
  color: white;
}
/* header */


/* Cart */
.icon{
    font-size: 15px;
    margin: 10px;
    position: relative;
}
.icon i{
    font-size: 25px;
}

#cart:hover{
    color: rgb(30, 91, 224);
}
.icon i:hover{
    cursor: pointer;
}
.icon .number-item{
    position: absolute;
    width: 20px;
    height:20px;
    background-color: red;
    top: -8px;
    left: -5px;
    font-size:12px;
    border-radius: 50%;
    text-align:center;
    color: white;
    font-weight: 800;
}
.icon:hover{
    cursor: pointer;
}
#cart-detail{
    position: absolute;
    top: 100%;
    width:550px;
    z-index: 1;
    transform: translate(-59%, 10px);
}
.cart-item{
    display:flex;
    margin-top: 5px;
    align-items: center;
    justify-content: space-between;
}
.cart-item img{
    width: 50px;
    height: 50px;
}
.cart-item span{
    margin: 0 4px;
}
.quality{
    /* font-weight: 800; */
    font-size: 20px;
    margin:auto 4px;
}
.quality-plus, .quality-minus, .delete-item{
    margin:auto 3px;
    font-size: 20px !important;
}
.quality-plus{
    color: #9a9f9a;
}
.quality-minus{
    color: #c3c3c3;
}

.name-price{
    margin-left: 2px;
}
.quality-modify{
    width:30%;
    display:flex;
}
/* .delete-item{
  
} */


#login:hover, #register:hover{
    color: rgb(30, 91, 224);
}




    







footer{
    background-color:#f3f3f3;
    color: black;
}
footer .text-black{
    color: black;
}
</style>