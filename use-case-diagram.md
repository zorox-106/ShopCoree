# ShopCore Use Case Diagram

```mermaid
usecaseDiagram
    actor Customer
    actor Admin
    actor "Payment Gateway" as PG

    package "ShopCore E-commerce System" {
        usecase "Login to Account" as UC1
        usecase "Browse Products" as UC2
        usecase "Add Product to Cart" as UC3
        usecase "View Cart" as UC4
        usecase "Remove Item from Cart" as UC5
        usecase "Checkout & Place Order" as UC6
        usecase "Process Payment" as UC7
        usecase "View Order History" as UC8
        
        usecase "Manage Users" as UC9
        usecase "Manage Products" as UC10
        usecase "View All Orders" as UC11
        usecase "Update Order Status" as UC12
    }

    %% Customer Use Cases
    Customer --> UC1
    Customer --> UC2
    Customer --> UC3
    Customer --> UC4
    Customer --> UC5
    Customer --> UC6
    Customer --> UC8
    UC6 ..> UC7 : includes
    UC7 ..> PG : uses

    %% Admin Use Cases
    Admin --> UC1
    Admin --> UC9
    Admin --> UC10
    Admin --> UC11
    Admin --> UC12
```
