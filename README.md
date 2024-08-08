# after cloning the repo

cd backend
npm i
npm start

# new terminal

cd frontend
npm i
npm start

# Problem Statement

Below examples are given just for reference, there can be more users
There are 2 persons, Person A and Person B
Both can give 100 P5 points to each other as a thanking note, they can only spend 100 P5, not the rewards
1. Person A gives 50 P5 points to Person B
Before transaction:

Person	P5 balance	Rewards balance
A	100	0
B	100	0
After transaction:

Person	P5 balance	Rewards balance
A	50	0
B	100	50
2. Person B gives 50 P5 points to Person A
Before transaction:

Person	P5 balance	Rewards balance
A	50	0
B	100	50
After transaction:

Person	P5 balance	Rewards balance
A	50	50
B	50	50
3. Person A gives 75 P5 points to Person B
Before transaction:

Person	P5 balance	Rewards balance
A	50	50
B	50	50
After transaction:

Not possible as Person A has 50 P5 in balance

4. Person A deletes 1st transaction of P5
Before transaction:

Person	P5 balance	Rewards balance
A	50	50
B	50	50
After transaction:

Person	P5 balance	Rewards balance
A	100	50
B	100	0

# Completed

All tasks 