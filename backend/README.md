# Simple Todo API - Spring Boot
A RESTful API for managing todo items built with Spring Boot. This project provides complete CRUD (Create, Read, Update, Delete) operations for todo management with input validation and proper error handling.

## 🛠 Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Java** | 17 | Programming Language |
| **Spring Boot** | 3.1.4 | Application Framework |
| **Spring Web** | 3.1.4 | REST API Development |
| **Spring Validation** | 3.1.4 | Input Validation |
| **Maven** | 3.9+ | Build Tool & Dependency Management |
| **Jackson** | 2.15+ | JSON Processing |

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

### Required

- **Java Development Kit (JDK) 17 or higher**
    - Check version: `java -version`
    - Download: [Oracle JDK](https://www.oracle.com/java/technologies/downloads/) or [OpenJDK](https://openjdk.org/)

- **Maven 3.9+ or use included Maven Wrapper**
    - Check version: `mvn -version`
    - Download: [Apache Maven](https://maven.apache.org/download.cgi)


### Verify Installation

```bash
# Check Java
java -version
# Expected: java version "17.x.x"

# Check Maven (if installed globally)
mvn -version
# Expected: Apache Maven 3.9.x

# Alternative: Use Maven Wrapper (no Maven installation needed)
./mvnw -version  # Mac/Linux
mvnw.cmd -version  # Windows
```

---

## 🚀 Installation

### Step 1: Clone the Repository

```bash
# Using HTTPS
git clone https://github.com/patnaikAnwesh/simple-todo-springboot.git

# Or using SSH
git clone git@github.com:patnaikAnwesh/simple-todo-springboot.git

# Navigate to project directory
cd simple-todo-springboot
```

### Step 2: Build the Project

```bash
# Using Maven Wrapper (recommended - works without Maven installation)
./mvnw clean install  # Mac/Linux
mvnw.cmd clean install  # Windows

# Or using Maven (if installed)
mvn clean install
```

This will:
- Download all dependencies
- Compile the source code
- Run tests
- Package the application into a JAR file

**Expected Output:**
```
[INFO] BUILD SUCCESS
[INFO] Total time: XX s
```

---

## ▶️ Running the Application

### Method 1: Using Maven Wrapper (Recommended)

```bash
# Mac/Linux
./mvnw spring-boot:run

# Windows
mvnw.cmd spring-boot:run
```

### Method 2: Using Maven

```bash
mvn spring-boot:run
```

### Method 3: Running the JAR

```bash
# Build first
./mvnw clean package

# Run the JAR
java -jar target/simple-todo-springboot-1.0.0.jar
```

### Method 4: From IDE

1. Open the project in your IDE (IntelliJ IDEA, Eclipse, VS Code)
2. Navigate to `src/main/java/com/example/todo/SimpleTodoSpringbootApplication.java`
3. Right-click and select "Run" or click the green play button

### Verify Application is Running

When the application starts successfully, you'll see:

```
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v3.1.4)

Started SimpleTodoSpringbootApplication in X.XXX seconds
```

**Default Configuration:**
- Base URL: `http://localhost:8080`
- Endpoints: `http://localhost:8080/todos`

---

## 🔌 API Endpoints

### Base URL
```
http://localhost:8080
```

### Endpoints Overview

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| `GET` | `/todos` | Get all todos | None | `200 OK` - Array of todos |
| `POST` | `/todos` | Create a new todo | JSON | `201 Created` - Created todo |
| `PUT` | `/todos/{id}` | Update a todo | JSON | `200 OK` - Updated todo |
| `DELETE` | `/todos/{id}` | Delete a todo | None | `204 No Content` |

### Data Model

#### Todo Object
```json
{
  "id": "string (UUID)",
  "title": "string (1-255 chars)",
  "completed": "boolean",
  "createdAt": "timestamp (ISO-8601)"
}
```

#### Create Todo Request
```json
{
  "title": "string (required, 1-255 chars)",
  "completed": "boolean (optional, default: false)"
}
```

#### Update Todo Request
```json
{
  "title": "string (optional, 1-255 chars)",
  "completed": "boolean (optional)"
}
```

---


## 📁 Project Structure

```
simple-todo-springboot/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── example/
│   │   │           └── todo/
│   │   │               ├── SimpleTodoSpringbootApplication.java  # Main application class
│   │   │               ├── controller/
│   │   │               │   └── TodoController.java               # REST endpoints
│   │   │               ├── dto/
│   │   │               │   ├── CreateTodoRequest.java            # Create request DTO
│   │   │               │   └── UpdateTodoRequest.java            # Update request DTO
│   │   │               ├── model/
│   │   │               │   └── Todo.java                         # Todo entity
│   │   │               ├── repository/
│   │   │               │   ├── TodoRepository.java               # Repository interface
│   │   │               │   └── InMemoryTodoRepository.java       # In-memory implementation
│   │   │               └── service/
│   │   │                   └── TodoService.java                  # Business logic
│   │   └── resources/
│   │       └── application.properties                            # Configuration
│   └── test/
│       └── java/
│           └── com/
│               └── example/
│                   └── simple_todo_springboot/
│                       └── SimpleTodoSpringbootApplicationTests.java
├── target/                                                        # Build output
├── .gitignore                                                     # Git ignore rules
├── mvnw                                                           # Maven wrapper (Unix)
├── mvnw.cmd                                                       # Maven wrapper (Windows)
├── pom.xml                                                        # Maven configuration
└── README.md                                                      # This file
```


---


## 🏗 Architecture

### Design Pattern: Layered Architecture

```
┌─────────────────────────────────────┐
│     REST API (HTTP Requests)        │
└─────────────────┬───────────────────┘
                  │
┌─────────────────▼───────────────────┐
│   Controller Layer                  │
│   - TodoController                  │
│   - Request validation              │
│   - Response formatting             │
└─────────────────┬───────────────────┘
                  │
┌─────────────────▼───────────────────┐
│   Service Layer                     │
│   - TodoService                     │
│   - Business logic                  │
│   - Data transformation             │
└─────────────────┬───────────────────┘
                  │
┌─────────────────▼───────────────────┐
│   Repository Layer                  │
│   - TodoRepository (interface)      │
│   - InMemoryTodoRepository          │
│   - Data persistence                │
└─────────────────┬───────────────────┘
                  │
┌─────────────────▼───────────────────┐
│   Data Storage                      │
│   - ConcurrentHashMap               │
│   - In-memory storage               │
└─────────────────────────────────────┘
```

### Key Design Principles

1. **Separation of Concerns** - Each layer has a specific responsibility
2. **Dependency Injection** - Components are loosely coupled
3. **Interface Segregation** - Repository uses interface for flexibility
4. **Single Responsibility** - Each class has one clear purpose
5. **Open/Closed Principle** - Easy to extend without modification

---
