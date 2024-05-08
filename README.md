# Medication SKU Management System

## CRUD Functionalities:

- **Create**: Through AxmedRx's intuitive interface, user can easily create new entries of medicines.
- **Read**: User can access comprehensive information about available medicines.
- **Update**: User can update the details of existing medicines, such as dose, unit and other relevant information.
- **Delete**: User have option to delete the medicines which are no longer available.

## API Endpoints:

- CURD URL: http://localhost:8000/medications/

## Schema:

- POST /medications:

  - request:

  ```json
  {
    "name": "string",
    "dose": "integer",
    "presentation": "string",
    "unit": "integer",
    "countries": ["integer"]
  }
  ```

  - response with 201 status code:

  ```json
  {
    "id": "integer",
    "name": "string",
    "dose": "integer",
    "presentation": "string",
    "unit": "integer",
    "countries": [
      {
        "id": "integer",
        "name": "string"
      }
    ]
  }
  ```

- GET /medications:

  - response:

  ```json
  {
    "medications": [
      {
        "id": "integer",
        "name": "string",
        "dose": "integer",
        "presentation": "string",
        "unit": "integer",
        "countries": [
          {
            "id": "integer",
            "name": "string"
          }
        ]
      }
    ],
    "countries": [
      {
        "id": "integer",
        "name": "string"
      }
    ]
  }
  ```

## Technologies Used

- **Neccessary Requirements**:

  - Node.js 12.x or higher
  - npm or yarn
  - Python 3.8 or higher
  - Django 3.2 or higher
  - Django Rest Framework

- **Backend**: Django REST API
- **Frontend**: React with Next.js
- **Database**: SQLite3

## Installation

### Backend Setup

1. Clone the repository.
2. Navigate to the backend directory.
3. Install dependencies from requirements.txt.
4. Run migrations: `python manage.py migrate`.
5. Create a superuser: `python manage.py createsuperuser`.
6. Run the development server: `python manage.py runserver`.

### Backend is available on [localhost:8000](http://localhost:8000)

### Frontend Setup

1. Clone the repository.
2. Navigate to the frontend directory.
3. Install dependencies using `npm install` or `yarn install`.
4. Run the development server: `npm run dev` or `yarn dev`.

### Now the user can see the UI on [localhost:3000](http://localhost:3000)

## Future Scope of Improvements

1. **Enhanced Security Measures**: Implement authentication and authorization to secure access to the APIs.
2. **API Versioning**: Introduce API versioning to help manage changes and ensure backward compatibility.
3. **Containerization**: Dockerize the application to simplify deployment and scaling across different environments.
4. **Unit and Integration Testing**: Increase the coverage of unit and integration tests to ensure robustness and reliability of the application.
5. **API Documentation**: Use tools like Swagger or Redoc to generate interactive API documentation that can help developers understand and use the APIs more effectively.
