# NestJS Application with Prisma and MySQL

This is a NestJS application that uses Prisma for database management and MySQL as the database. It provides a basic setup with the necessary scripts to run and manage your database schema.

## Requirements

- Node.js (>= 14.x)
- MySQL
- npm or yarn

## Setup

### 1. Install Dependencies


```bash
git clone <repository-url>
cd foundary/api

 First, clone this repository and install the required dependencies.

 Rename sample.env with .env and replace with your mysql username and password(in sample it's root:root)

# Install all npm dependency
npm install


# Generate the Prisma Client
npm run prisma:generate

# to run the migration, create and seeding
npm run migrate

# To start the application
npm run start
```

## API Detail
```
Surveys API
 - /toolbox/centers
 - /toolbox/subjects
 - /toolbox/initiated
 - /toolbox/initiate
 - /toolbox/survey-forms

Users API
 - /users

Form API
 - /toolbox/form/status
 - /toolbox/form/change-status
 - /toolbox/form/validate

Visit API
 - /toolbox/visit/latest

Subject API
 - /toolbox/subject/detail
 - /toolbox/subject/search-fields

```
