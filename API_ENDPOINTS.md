# ToolEasier API Endpoints

## User Module

- **POST** `/api/users`

  - **Input**: `{ email: string, password: string, role?: string }`
  - **Output**: User object
  - **Description**: Creates a new user

- **GET** `/api/users`

  - **Output**: Array of users
  - **Description**: Retrieves all users

- **GET** `/api/users/:id`

  - **Output**: User object
  - **Description**: Retrieves user by ID

- **PATCH** `/api/users/:id`

  - **Input**: `{ email?: string, role?: string, status?: string }`
  - **Output**: Updated user object
  - **Description**: Updates user information

- **DELETE** `/api/users/:id`

  - **Output**: Deleted user object
  - **Description**: Soft deletes a user

- **PATCH** `/api/users/:id/status`

  - **Input**: `{ status: string }`
  - **Output**: Updated user object
  - **Description**: Changes user status

- **PATCH** `/api/users/:id/password`
  - **Input**: `{ currentPassword: string, newPassword: string }`
  - **Output**: Success message
  - **Description**: Changes user password

## Paraphrase Module

- **POST** `/api/paraphrase`
  - **Input**: `{ text: string }`
  - **Output**: `{ paraphrased: string }`
  - **Description**: Paraphrases text using Hugging Face API

## Polls Module

- **POST** `/api/polls`

  - **Input**: `{ question: string, options: string[] }`
  - **Output**: `{ id: string }`
  - **Description**: Creates a new poll and saves to MongoDB

- **GET** `/api/polls/:id`

  - **Output**: `{ question: string, options: { text: string, votes: number }[] }`
  - **Description**: Retrieves poll details by ID

- **POST** `/api/polls/:id/vote`
  - **Input**: `{ optionIndex: number }`
  - **Output**: Updated poll object
  - **Description**: Records a vote for a specific option

## FaceSwap Module

- **POST** `/api/face-swap`
  - **Input**: FormData `{ image: File, celebrity: string }`
  - **Output**: `{ imageUrl: string }`
  - **Description**: Performs face swap using Replicate API

## Environment Variables Required

- `HUGGING_FACE_API_KEY`: For paraphrase functionality
- `REPLICATE_API_TOKEN`: For face swap functionality
- MongoDB connection string (already configured)

## Notes

- All endpoints include proper validation using Zod schemas
- Error handling is implemented with custom error responses
- File uploads are handled using Multer middleware
- All responses follow the standard format: `{ success: boolean, message: string, data: any }`
- User passwords are automatically hashed using bcrypt
- Soft delete is implemented for user deletion
