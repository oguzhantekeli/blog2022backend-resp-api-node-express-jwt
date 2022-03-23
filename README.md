# blog2022backend-rest-api-node-express-mongodb-jwt  
  
backend rest api made with node js express mongodb for blog2022  
json web token -jwt- used for user authentication  
  
!! Important notice : This api is still in development and may have some bugz. So please keep   that in mind and contribute if you can.Thanks for your support.  
  
Using Postman is recommended.  
 
*Protected = Needs user authentication.(Login or Register)  
  
BASE_URI = https://mern-backend-blog2022.herokuapp.com/api  
  
USER ENDPOINTS  
  
Register   
method: post  
url: /users  
body->{userName, email, password}  
  
Login  
method: post  
url: /users/login  
body->{email, password}  
  
Get User Data  
method: get  
url: /users/user/:id  
  
Update User Data (Protected)  
method: put  
url: /users/:id  
Auth: Bearer Token  
Body->{userName(required),title,avatar,about,status,webSite,facebook,twitter,instagram}  
  
Change User Password (Protected)   
method: put  
url: /users/changepassword/:id  
Auth: Bearer Token  
Body->{currentPassword, password}  
  
Delete User (Protected)  
method: delete  
url: /users/:id  
Auth: Bearer Token  
  
------------------------------------------  
  
BLOG ENDPOINTS  (Development in progress.)
  
Get All Blog Posts  
method: get  
url: /blogs  
  
Get Single Blog Post  
method: get  
url: /blogs/:id  
  
Post New Blog (Protected)  
method: post  
url: /blogs  
Auth: Bearer Token  
Body->{authorId(required),title(required),text,imageBigUrl,imageThumbUrl,category(required),tags}  
  
Update A Blog Post (Protected)  
method: put  
url: /blogs/:id  
Auth: Bearer Token  
Body->{authorId(required),title(required),text,imageBigUrl,imageThumbUrl,category(required),tags}  
  
Delete A Blog Post (Protected)  
method: delete  
url: /blogs/:id  
Auth: Bearer Token  
  
------------------------------------------  
  
COMMENTS ENDPOINTS (may not be working 8-D ) also needs mongo data schema refactor...  
  
Thx BTW..  
  
