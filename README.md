# Real-Time Product Price Monitoring

## Overview

This project is a web application that allows users to monitor the average price of products in real-time. It includes features for managing products and contacts, and provides real-time updates using WebSockets.

## Features

- **Product Management**: Add, update, delete, and view products.
- **Real-Time Updates**: Uses WebSockets to provide real-time updates of the average product price.
- **Contact Management**: Add, update, delete, and view contacts.
- **Error Handling**: Enhanced error handling for better reliability and user experience.
- **Responsive Design**: User interface designed to be responsive and user-friendly.

## Technologies Used

- **Backend**: Node.js, Express.js, MongoDB
- **Frontend**: HTML, CSS, JavaScript, Twig
- **Real-Time Communication**: Socket.io

## Setup Instructions

1. **Clone the repository**:
    ```sh
    git clone https://github.com/Houssemaskri/real-time-product-price-monitoring.git
    cd real-time-product-price-monitoring
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Create a `.env` file for environment variables** (if necessary):
    ```sh
    touch .env
    ```


4. **Start the server**:
    ```sh
    npm start
    ```

5. **Open your browser and navigate to** `http://localhost:3000`.

## Usage

- **Product Management**:
  - Add a product: `POST /product/add`
  - Update a product: `PUT /product/updateProduct/:id`
  - Delete a product: `DELETE /product/deleteProduct/:id`
  - Get all products: `GET /product`
  - Get product by name: `GET /product/getProductByName/:name`
  - Get average price: `GET /product/averagePrice`
  - Get products above average price: `GET /product/aboveAveragePrice`

- **Contact Management**:
  - Add a contact: `POST /contact`
  - Update a contact: `PUT /contact/updateContact/:id`
  - Delete a contact: `DELETE /contact/deleteContact/:id`
  - Get all contacts: `GET /contact`
  - Get contact by name: `GET /contact/findbyName/:name`

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.
