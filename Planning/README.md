# Planning Diagrams

This folder contains the main design diagrams for the Egyzon ecommerce platform. Together, they show the system from three angles:

- what users and admins can do
- how the main application objects are structured
- how the data is organized in the database

## 1. Use Case Diagram

File: `new ecommerce platform use case.drawio.png`

![Use Case Diagram](new%20ecommerce%20platform%20use%20case.drawio.png)

This diagram shows the system behavior from the perspective of the different actors:

- Customer: register, log in, browse products, manage wishlist and cart, checkout, and write reviews
- Seller: apply as a seller, manage store information, add and edit products, handle inventory, view sales, and request withdrawals
- Admin: review seller applications, manage users, handle orders, and moderate platform activity

It is useful for understanding the scope of the platform and the main workflows each role supports.

## 2. Class Diagram

File: `class diagram.drawio.png`

![Class Diagram](class%20diagram.drawio.png)

This diagram describes the object-oriented structure of the system. It focuses on the main entities and their relationships, such as:

- User, Customer, Seller, and Admin
- Product, Cart, Wishlist, Order, Payment, and Review
- CartItem and WishlistItem as supporting entities

It also shows the key methods each class is expected to support, which helps define the application logic and responsibilities.

## 3. ERD Diagram

File: `ERD Diagram.jpg`

![ERD Diagram](ERD%20Diagram.jpg)

This diagram shows the database structure. It maps the important tables and their relationships, including:

- customers, sellers, products, orders, payments, carts, reviews, and wallets
- many-to-many and one-to-many relationships between products, categories, tags, and orders
- seller documents, cart items, order items, and wallet transactions

This diagram is the main reference for designing the database schema and understanding how data flows through the platform.

## How the diagrams relate

- The use case diagram defines the platform features and user interactions.
- The class diagram turns those features into application-level entities and methods.
- The ERD diagram turns the same domain into database tables and relationships.

If you are adding a new feature, start with the use case, map the needed classes, then update the ERD if the data model changes.
