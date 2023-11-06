# Table of Contents <!-- omit in toc -->
- [Readme first!](#readme-first)
- [Mini Peerfives](#mini-peerfives)
  - [Use cases](#use-cases)
    - [1. Person A gives 50 P5 points to Person B](#1-person-a-gives-50-p5-points-to-person-b)
    - [2. Person B gives 50 P5 points to Person A](#2-person-b-gives-50-p5-points-to-person-a)
    - [3. Person A gives 75 P5 points to Person B](#3-person-a-gives-75-p5-points-to-person-b)
    - [4. Person A deletes 1st transaction of P5](#4-person-a-deletes-1st-transaction-of-p5)
  - [Backend](#backend)
    - [Entities/Models](#entitiesmodels)
      - [User](#user)
      - [RewardHistory](#rewardhistory)
    - [REST APIs](#rest-apis)
    - [Frontend](#frontend)
      - [Users List View (Default View, route = `/`)](#users-list-view-default-view-route--)
      - [New User (route = `/new`)](#new-user-route--new)
      - [View User (route = `/:id`)](#view-user-route--id)
      - [P5 History (route = `/:id/p5`)](#p5-history-route--idp5)
      - [Reward History (route = `/:id/rewards`)](#reward-history-route--idrewards)
      - [New Reward (route = `/:id/rewards/new`)](#new-reward-route--idrewardsnew)

# Readme first!

- Try to use less number of 3rd party packages/libraries
- Keep your code clean, maintainable and readable, usage of formatters and linters might come handy here
- Follow best practices for particular framework/library
- Your project should have a `README.md` file, which should contain below:
  - Minimum steps and configurations needed to run the project in local machine under `# Getting Started` section, sample provided below (below content will change based on your project and technology, below is given just for example):
    ```bash
    # after cloning the repo
    
    cd backend
    npm i
    npm start
    
    # new terminal
    
    cd frontend
    npm i
    npm start
    ```
  - The problem statement under `# Problem Statement` section
  - A section called `# Completed`, in which you have to write down what did you complete, you can simply copy/paste relevant tasks from problem statement
- It is ok if you can't complete all the tasks/features, but each individual task should be in considerably complete state
- You will need to push all of your code to a public GitHub repo and share the link of the same

<!-- The actual problem statement start after this -->

# Mini Peerfives

**Mini Peerfives** allows users to reward other people with peerfives (P5) points.

Understand 2 terms:

- P5 - Points that can be given to others
- Rewards - Points that are earned and can not be given to others

## Use cases

- Below examples are given just for reference, there can be more users
- There are 2 persons, Person A and Person B
- Both can give 100 P5 points to each other as a thanking note, they can only spend 100 P5, not the rewards

### 1. Person A gives 50 P5 points to Person B

**Before transaction:**

| Person | P5 balance | Rewards balance |
| ------ | ---------- | --------------- |
| A      | 100        | 0               |
| B      | 100        | 0               |

**After transaction:**

| Person | P5 balance | Rewards balance |
| ------ | ---------- | --------------- |
| A      | 50         | 0               |
| B      | 100        | 50              |

### 2. Person B gives 50 P5 points to Person A

**Before transaction:**

| Person | P5 balance | Rewards balance |
| ------ | ---------- | --------------- |
| A      | 50         | 0               |
| B      | 100        | 50              |

**After transaction:**

| Person | P5 balance | Rewards balance |
| ------ | ---------- | --------------- |
| A      | 50         | 50              |
| B      | 50         | 50              |

### 3. Person A gives 75 P5 points to Person B

**Before transaction:**

| Person | P5 balance | Rewards balance |
| ------ | ---------- | --------------- |
| A      | 50         | 50              |
| B      | 50         | 50              |

**After transaction:**

Not possible as Person A has 50 P5 in balance

### 4. Person A deletes [1st](#1-person-a-gives-50-p5-points-to-person-b) transaction of P5

**Before transaction:**

| Person | P5 balance | Rewards balance |
| ------ | ---------- | --------------- |
| A      | 50         | 50              |
| B      | 50         | 50              |

**After transaction:**

| Person | P5 balance | Rewards balance |
| ------ | ---------- | --------------- |
| A      | 100        | 50              |
| B      | 100        | 0               |

## Backend

- Use any DB and framework of your choice or as mentioned by interviewer/recruiter
- Authentication and authorization is not needed
- A single user can reward 100 P5

### Entities/Models

#### User

- ID - string
- Name - string

#### RewardHistory

- Datetime stamp
- Points - number
- Given by (User ID) - string
- Given to (User ID) - string

### REST APIs

- User - Create, edit
- P5 (Points given) - Create, read, delete
- Reward (Points received) - Read

### Frontend

- We are only looking for decent UI, which can just work.
- Please do not use any css framework like bootstrap, tailwind, etc.
- You can use either Ruby on Rails, React, Vue, Angular or vanilla HTML/CSS/JavaScript.
- Inline styles not allowed
- `:id` in all routes below is `id` of user

#### Users List View (Default View, route = `/`)

- A button to create new user - clicking on which user will be redirected to `/new/` route
- Basic Table layout with all users
  - Table should have 6 columns: #, Name, P5 balance, Reward balance, Login
    - `#` - Static count number starting with 1
    - Name - User's name
    - P5 balance - self explanatory
    - Reward balance - self explanatory
    - Login - a edit button, clicking on which user will be redirected to `/:id` route
- Show each user in separate row

#### New User (route = `/new`)

- 1 input for name
- Save button - saves the user, and redirects user back to list view, i.e. route `/`
- Cancel button - redirects user back to list view, i.e. route `/`

#### View User (route = `/:id`)

- Show a form with user details
  - Re-use the same component from New User
  - Pre-fill the name from the existing user
  - Save button - saves the user
- a button with text which shows logged in user's P5 balance, click on which user will be redirected to `/:id/p5` route
- a button with text which shows logged in user's Reward balance, click on which user will be redirected to `/:id/rewards` route

#### P5 History (route = `/:id/p5`)

- A button to create new reward - clicking on which user will be redirected to `/:id/rewards/new` route
- Show P5 balance
- Basic Table layout with all P5 history
  - Table should have 6 columns: #, Date-Time, P5 given, User Name, Delete
    - `#` - Static count number starting with 1
    - Date-Time - self explanatory
    - P5 given - self explanatory
    - User Name - name of user to whom P5 were given
    - Delete - a delete button which will reverse the P5 given
- Show each P5 in separate row

#### Reward History (route = `/:id/rewards`)

- Show Rewards balance
- Basic Table layout with all Rewards history
  - Table should have 6 columns: #, Date-Time, Rewards received, User Name
    - `#` - Static count number starting with 1
    - Date-Time - self explanatory
    - Rewards received - self explanatory
    - User Name - name of user who gave rewards
- Show each Reward in separate row

#### New Reward (route = `/:id/rewards/new`)

- Basic Form layout to create a new reward
  - A dropdown with list of all users, except self
  - An numeric input with validation of max limit set to 100
    - Below input, show how much P5 balance user have
  - A submit button
    - Clicking on which will create a new reward (deduct P5 from current user and transfer to awardee)
    - Button should be disabled if user enters more than 100 in numeric input or if not sufficient balance
    - After successful submission, user will be redirected back back
  - A cancel button, click on which user will be redirected back
