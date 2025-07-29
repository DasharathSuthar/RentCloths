# RentCloths 👔

A modern clothing rental platform that allows users to rent designer and premium clothing for special occasions, events, or everyday wear.

## 🌟 Features

- **Browse Collection**: Explore a wide variety of clothing items from different categories
- **User Authentication**: Secure login and registration system
- **Rental Management**: Easy booking and rental tracking system
- **Search & Filter**: Find clothes by size, category, brand, or occasion
- **User Profiles**: Manage personal information and rental history
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Payment Integration**: Secure payment processing for rentals
- **Review System**: Rate and review rented items

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (if using MongoDB as database)

### Installation

1. Clone the repository
```bash
git clone https://github.com/DasharathSuthar/RentCloths.git
cd RentCloths
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
```bash
cp .env.example .env
```
Edit the `.env` file with your configuration:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/rentcloths
JWT_SECRET=your_jwt_secret_key
PAYMENT_GATEWAY_KEY=your_payment_key
```

4. Start the development server
```bash
npm start
# or
yarn start
```

The application will be available at `http://localhost:3000`

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript with React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Payment**: Stripe/PayPal integration
- **File Upload**: Multer for image handling

## 📱 Usage

### For Customers
1. **Register/Login**: Create an account or sign in
2. **Browse**: Explore available clothing items
3. **Select**: Choose items by size, occasion, and rental duration
4. **Book**: Complete the booking with payment
5. **Receive**: Get the clothes delivered (or pickup)
6. **Return**: Return items after the rental period

### For Admins
1. **Inventory Management**: Add, edit, or remove clothing items
2. **Order Management**: Track and manage rental orders
3. **User Management**: Handle customer accounts and issues
4. **Analytics**: View rental statistics and revenue reports

## 🔧 API Endpoints

### Authentication
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login
- `POST /api/users/logout` - User logout

### Clothes
- `GET /api/products/list` - Get all available clothes
- `GET /api/products/id` - Get specific clothing item
- `POST /api/products/addproduct` - Add new clothing item (Admin only)
- `PUT /api/products/:id` - Update clothing item (Admin only)
- `DELETE /api/products/:id` - Delete clothing item (Admin only)

### Rentals
- `POST /api/rentals` - Create new rental
- `GET /api/rentals/user/:userId` - Get user's rental history
- `PUT /api/rentals/:id` - Update rental status

## 🎨 Screenshots

*Add screenshots of your application here*

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Dasharath Suthar**
- GitHub: [@DasharathSuthar](https://github.com/DasharathSuthar)

## 🙏 Acknowledgments

- Thanks to all contributors who helped with this project
- Inspiration from modern e-commerce platforms
- Icons from [Font Awesome](https://fontawesome.com/)

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Contact the developer


⭐ Star this repository if you find it helpful!