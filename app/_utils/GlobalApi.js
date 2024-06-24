import request,{gql} from "graphql-request"
const HYGRAPH_URL=process.env.NEXT_PUBLIC_BACKEND_API_URL;

const GetCategory=async()=>{
    const query=gql`
    query Categories{
        categories(first:50){
            id
            slug
            name
            icon{
                url
            }
        }
    }
    `
    const result=await request(HYGRAPH_URL,query)
    return result
}


const GetBusinessList=async(category)=>{
    const query=gql`
    query GetBusiness {
        restaurants(where:{categories_some:{slug:"`+category+`"}}) {
          aboutUs
          address
          banner {
            url
          }
          categories {
            name
          }
          id
          name
          restroType
          slug
          workingHours
          reviews {
            star
          }
        }
      }
    `
    const result=await request(HYGRAPH_URL,query)
    return result
}

const GetBusinessDetails=async(businessSlug)=>{
    const query=gql`
    query RestuarantDetails {
        restaurant(where: {slug:"`+businessSlug+`"}) {
          aboutUs
          address
          banner {
            url
          }
          categories {
            name
          }
          id
          name
          restroType
          slug
          workingHours
          menu {
            ... on Menu {
              id
              category
              menuItem {
                ... on MenuItem {
                  id
                  name
                  description
                  price
                  productImage {
                    url
                  }
                }
              }
            }
          }
          reviews{
            star
          }
        }
      }
      
    `
    const result=await request(HYGRAPH_URL,query)
    return result
}

const AddToCart=async(data)=>{
  const query=gql`
  mutation AddToCart {
    createUserCart(
      data: {email: "`+data?.email+`", 
        price: `+data?.price+`, 
        productDescription: "`+data?.description+`", 
        productImage: "`+data?.productImage+`", 
        productName: "`+data?.productName+`",
        restaurant:{connect:{slug:"`+data?.restroSlug+`"}}}
    ) {
      id
    }
    publishManyUserCarts(to: PUBLISHED) {
      count
    }
  }  
  `
  const result=await request(HYGRAPH_URL,query)
  return result
}

const GetUserCart=async(email)=>{
  const query=gql`
  query GetUserCart {
    userCarts(where: {email: "`+email+`"}) {
      id
      price
      productDescription
      productImage
      productName
      restaurant {
        name
        banner {
          url
        }
        slug
      }
    }
  }
  `
  const result=await request(HYGRAPH_URL,query)
  return result
}
const DisconnectRestroFromUserCartItem=async(id)=>{
  const query=gql`
  mutation DisconnectRestaurantFromCartItem {
    updateUserCart(data: {restaurant: {disconnect: true}}, where: {id: "`+id+`"})
    {
      id
    }
    publishManyUserCarts(to: PUBLISHED) {
      count
    }
  }
  `
  const result=await request(HYGRAPH_URL,query)
  return result
}

const DeleteItemFromCart=async(id)=>{
  const query=gql`
  mutation DeleteCartItem {
    deleteUserCart(where: {id: "`+id+`"}) {
      id
    }
  }
  `
  const result=await request(HYGRAPH_URL,query)
  return result
}

const getRestaurantReviews=async(slug)=>{
  const query=gql`
  query RestaurantReviews {
    reviews(where: {restaurant: {slug: "`+slug+`"}},orderBy:publishedAt_DESC) {
      id
      profileImage
      email
      publishedAt
      userName
      star
      reviewText
    }
  }
  `
  const result=await request(HYGRAPH_URL,query)
  return result
}

const AddNewReviews=async(data)=>{
  console.log(data);
  const query=gql`
  mutation AddNewReview {
    createReview(
      data: {email: "`+data.email+`", 
        profileImage: "`+data.profileImage+`", 
        reviewText: "`+data.reviewText+`", 
        star: `+data.star+`, 
        userName: "`+data.userName+`", 
        restaurant: {connect: {slug: "`+data.slug+`"}}}
    ) {
      id
    }
    publishManyReviews(to: PUBLISHED) {
      count
    }
  }
  `
  const result=await request(HYGRAPH_URL,query)
  return result
}

const CreateNewOrder=async(data)=>{
  console.log(data)
  const query=gql`
  mutation CreateNewOrder {
    createOrder(
      data: {email: "`+data.email+`", 
        orderAmount: `+data.orderAmount+`, 
        restaurantName: "`+data.restaurantName+`", 
        userName: "`+data.userName+`", 
        phone: "`+data.phone+`", 
        zipcode: "`+data.zip+`", 
        address: "`+data.address+`"}
    ) {
      id
    }
  }
  
  `
  const result=await request(HYGRAPH_URL,query)
  return result
}

const updateOrderToAddOrderItem=async(name,price,id,email)=>{
  const query=gql`
  mutation UpdateOrderWithDetail {
    updateOrder(
      data: {orderDetail: {create: {OrderItem: {data: {name: "`+name+`", price: `+price+`}}}}}
      where: {id: "`+id+`"}
    ) {
      id
    }
    publishManyOrders(to: PUBLISHED) {
      count
    }
      deleteManyUserCarts(where: {email: "`+email+`"}) {
        count
      }
  }
  
  `
  const result=await request(HYGRAPH_URL,query)
  return result
}

export default{
    GetCategory,
    GetBusinessList,
    GetBusinessDetails,
    AddToCart,
    GetUserCart,
    DisconnectRestroFromUserCartItem,
    DeleteItemFromCart,
    AddNewReviews,
    getRestaurantReviews,
    CreateNewOrder,
    updateOrderToAddOrderItem
}


