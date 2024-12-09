# NestJS Application with Prisma and MySQL

This is a NestJS application that uses Prisma for database management and MySQL as the database. It provides a basic setup with the necessary scripts to run and manage your database schema.

## Requirements

- Node.js (>= 14.x)
- MySQL
- npm or yarn

## Setup

### 1. Install Dependencies

First, clone this repository and install the required dependencies.

```bash
git clone <repository-url>
cd foundary/api

# Install all npm dependency
npm install


# Generate the Prisma Client
npm run prisma:generate

# to run the migration, create and seeding
npm run migrate

# To start the application
npm run start